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
import sounddevice as sd
import numpy as np
import wave
import threading
from datetime import datetime

app = FastAPI()

class MeetingRequest(BaseModel):
    meeting_url: str
    recording_duration: int

def transcribe_audio_with_whisper(audio_file_path, transcription_file_path):
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

# def record_audio(output_file, duration):
    
#     CHUNK = 1024
#     FORMAT = pyaudio.paInt16
#     CHANNELS = 1
#     RATE = 16000

#     audio = pyaudio.PyAudio()
#     stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

#     frames = []

#     for _ in range(0, int(RATE / CHUNK * duration)):
#         data = stream.read(CHUNK)
#         frames.append(data)

#     stream.stop_stream()
#     stream.close()
#     audio.terminate()

#     with wave.open(output_file, 'wb') as wf:
#         wf.setnchannels(CHANNELS)
#         wf.setsampwidth(audio.get_sample_size(FORMAT))
#         wf.setframerate(RATE)
#         wf.writeframes(b''.join(frames))

def record_audio(output_file, duration):
    SAMPLE_RATE = 16000  # Sample rate
    CHANNELS = 1  # Mono audio

    print(f"Recording started for {duration} seconds...")
    audio_data = sd.rec(int(duration * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=CHANNELS, dtype=np.int16)
    sd.wait()  # Wait for recording to finish
    print("Recording finished.")

    # Save recorded data to a WAV file
    with wave.open(output_file, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(2)  # 16-bit audio
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(audio_data.tobytes())

def join_google_meet(meeting_url, recording_duration=30):
    
    options = Options()
    options.add_argument("--use-fake-ui-for-media-stream")
    options.add_argument("--disable-blink-features=AutomationControlled")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    driver.get(meeting_url)
    time.sleep(5)

    try:
        driver.find_element(By.XPATH, "//div[@aria-label='Turn off camera']").click()
        time.sleep(2)
        driver.find_element(By.XPATH, "//div[@aria-label='Turn off microphone']").click()
        time.sleep(2)

        try:
            name_input = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Your name']"))
            )
            name_input.send_keys("NoteAI")  
            time.sleep(2) 
        except Exception:
            pass  

        button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//*[text()='Ask to join' or text()='Join now']"))
        )
        button.click()

    except Exception as e:
        print(f"Error joining the meeting: {e}")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    audio_file_path = f"meeting_audio_{timestamp}.wav"
    recording_thread = threading.Thread(target=record_audio, args=(audio_file_path, recording_duration))
    recording_thread.start()

    start_time = time.time()
    try:
        while True:
            elapsed_time = time.time() - start_time
            remaining_time = recording_duration - elapsed_time
            if remaining_time <= 0:
                break

            try:
                participant_count_element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@class='uGOf1d']"))
                )
                participant_count = int(participant_count_element.text.strip())
                
                if participant_count == 1:
                    break
            except Exception as e:
                print(f"Error while checking participants: {e}")
    except Exception as e:
        print(f"Error while monitoring meeting: {e}")

    if recording_thread.is_alive():
        recording_thread.join()

    transcription_file_path = f"transcription_{timestamp}.txt"
    transcribe_audio_with_whisper(audio_file_path, transcription_file_path)
    
    try:
        leave_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[contains(@aria-label, 'Leave call')]")
        ))
        leave_button.click()
    except Exception as e:
        print(f"Error while leaving the meeting: {e}")

    driver.quit()

@app.post("/start-meeting")
def start_meeting(request: MeetingRequest):
    threading.Thread(target=join_google_meet, args=(
        request.meeting_url, request.recording_duration)).start()
    
    return {"message": "Meeting started", "meeting_url": request.meeting_url}

@app.get("/")
def home():
    return {"message": "Welcome to NoteAI Google Meet Bot API!"}
