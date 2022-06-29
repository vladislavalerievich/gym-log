# Gym Log (backend)

## Local development

Setup local environment for the development process in the current directory `gym-log/backend`.

Create and Activate virtual environment:

### Mac OS / Linux

```shell
python3.10 -m venv env
source venv/bin/activate   
```

### Windows

```shell
virtualenv --python=/usr/bin/python3.10 venv 
venv\Scripts\activate    
```

### Run in a terminal

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata ./core/fixtures/exercise.json
python manage.py createsuperuser
python manage.py runserver
```

### Django models entity relationships diagram

![Django models relationships](https://i.ibb.co/3TV6d90/Models-Reletionshps.png)