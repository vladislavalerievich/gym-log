import os

from backend.settings.base import *
from common.utils import get_env_var

DEBUG = False

INSTALLED_APPS += [
    'whitenoise.runserver_nostatic',
]

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

WHITENOISE_STATIC_PREFIX = '/static/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': get_env_var('POSTGRESQL_DATABASE'),
        'USER': get_env_var('POSTGRESQL_USER'),
        'PASSWORD': get_env_var('POSTGRESQL_PASSWORD'),
        'HOST': get_env_var('POSTGRESQL_HOST'),
        'PORT': int(os.environ.get('POSTGRESQL_PORT', 5432)),
        'OPTIONS': {
            'connect_timeout': 3,
        }
    }
}
