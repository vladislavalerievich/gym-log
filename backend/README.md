# Gym Log (backend)

## Local development

Setup local environment for the development process in the current directory `gym-log/backend`.

### Run in a terminal

Create and Activate virtual environment:

#### Mac OS / Linux

```shell
python3.10 -m venv env
source venv/bin/activate   
```

#### Windows

```shell
virtualenv --python=/usr/bin/python3.10 venv 
venv\Scripts\activate    
```

#### Available commands

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata ./core/fixtures/exercise.json
python manage.py createsuperuser
python manage.py runserver
```

### Run in a docker

```shell
docker build -t backend:latest .   
docker run -it -p 8000:8000 backend:latest
```