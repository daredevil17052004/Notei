import whisper
import sys

# Load Whisper model
model = whisper.load_model("base")

# Get file paths from command-line arguments
audio_file = sys.argv[1]
transcription_file = sys.argv[2]

# Transcribe the audio
result = model.transcribe(audio_file)

# Save the transcription to a file
with open(transcription_file, 'w') as f:
    f.write(result['text'])

print("Transcription complete.")