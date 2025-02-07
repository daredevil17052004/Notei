#!/bin/bash
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
