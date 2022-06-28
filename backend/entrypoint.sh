#!/bin/bash
python manage.py makemigrations --no-input
python manage.py migrate --no-input
python manage.py loaddata core/fixtures/exercise.json

python manage.py runserver 0.0.0.0:$PORT
