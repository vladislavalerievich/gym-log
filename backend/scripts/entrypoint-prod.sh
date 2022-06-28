#!/bin/bash
python manage.py makemigrations --no-input
python manage.py migrate --no-input
python manage.py loaddata backend/core/fixtures/exercise.json

python backend/manage.py runserver 0.0.0.0:$PORT
