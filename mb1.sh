#!/bin/bash
source venv/bin/activate
gunicorn -w 2 -b 0.0.0.0:5000 app:app --log-file /home/notroot/MB1-Waschmaschienen/gunicorn.log
