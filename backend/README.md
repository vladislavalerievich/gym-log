# Gym Log (backend)

## Local development

Setup local environment for the development process.

Create and Activate virtual environment:

```shell
virtualenv --python=/usr/bin/python3.10 venv
source venv/bin/activate  # Mac OS / Linux
venv\Scripts\activate   # Windows
```

### Available commands

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata ./core/fixtures/exercise.json
python manage.py createsuperuser
python manage.py runserver
```

Open [http://localhost:8000/swagger/](http://localhost:8000/swagger/) to view it in your browser.

## Production

Set up a PostgreSQL database and provide data in the environment variables that are listed in `.env` file.