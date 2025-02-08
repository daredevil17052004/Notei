from fastapi import FastAPI
from pydantic import BaseModel
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import subprocess
import time
import pyaudio
import wave
import threading
import os
from datetime import datetime

app = FastAPI()

# Request model for FastAPI
class MeetingRequest(BaseModel):
    email: str
    password: str
    meeting_url: str
    recording_duration: int

def transcribe_audio_with_whisper(audio_file_path, transcription_file_path):
    """
    Transcribes an audio file using the Whisper model via a subprocess call.
    """
    try:
        result = subprocess.run(
            ['python', 'whisper_transcribe.py', audio_file_path, transcription_file_path],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("Transcription completed successfully.")
        else:
            print("Error during transcription:", result.stderr)
    except Exception as e:
        print(f"Error running Whisper transcription: {e}")

def record_audio(output_file, duration):
    """
    Records system audio for a specified duration and saves it to an output file.
    """
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 16000

    audio = pyaudio.PyAudio()
    stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    print("Recording audio...")
    frames = []

    for _ in range(0, int(RATE / CHUNK * duration)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("Recording finished.")

    stream.stop_stream()
    stream.close()
    audio.terminate()

    with wave.open(output_file, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

def join_google_meet(meeting_url, email, password, recording_duration=30):
    """
    Joins a Google Meet session, records audio, and transcribes the session.
    """
    options = Options()
    options.add_argument("--use-fake-ui-for-media-stream")
    options.add_argument("--disable-blink-features=AutomationControlled")
    
    # Using WebDriver Manager to manage ChromeDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    driver.get("https://accounts.google.com/signin")

    # Login to Google account
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.ID, "identifierId"))
    ).send_keys(email + Keys.ENTER)
    time.sleep(2)

    try:
        account_choice = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, f"//*[text()='{email}']"))
        )
        account_choice.click()
    except Exception:
        pass

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, "//input[@type='password']"))
    ).send_keys(password + Keys.ENTER)
    time.sleep(5)

    # Navigate to Google Meet
    driver.get(meeting_url)
    time.sleep(5)

    try:
        driver.find_element(By.XPATH, "//div[@aria-label='Turn off camera']").click()
        time.sleep(2)
        driver.find_element(By.XPATH, "//div[@aria-label='Turn off microphone']").click()
        time.sleep(2)
        button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//*[text()='Ask to join' or text()='Join now']"))
        )
        button.click()
    except Exception as e:
        print(f"Error joining the meeting: {e}")

    # Start audio recording in a separate thread
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    audio_file_path = f"meeting_audio_{timestamp}.wav"
    recording_thread = threading.Thread(target=record_audio, args=(audio_file_path, recording_duration))
    recording_thread.start()

    # Wait for the recording to complete
    recording_thread.join()

    print("Audio recording complete.")

    # Transcribe the recorded audio
    transcription_file_path = f"transcription_{timestamp}.txt"
    transcribe_audio_with_whisper(audio_file_path, transcription_file_path)

    # Monitor participants and leave if only one participant remains
    try:
        while True:
            participant_count_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[@class='uGOf1d']"))
            )
            participant_count = int(participant_count_element.text.strip())
            print(f"Current participant count: {participant_count}")
            if participant_count == 1:
                leave_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, "//*[contains(@aria-label, 'Leave call')]"))
                )
                leave_button.click()
                break

            time.sleep(10)

    except Exception as e:
        print(f"Error while monitoring participants: {e}")

    driver.quit()

@app.post("/start-meeting")
def start_meeting(request: MeetingRequest):
    """
    FastAPI endpoint to start a Google Meet session.
    """
    threading.Thread(target=join_google_meet, args=(
        request.meeting_url, request.email, request.password, request.recording_duration)).start()
    
    return {"message": "Meeting started", "meeting_url": request.meeting_url}
