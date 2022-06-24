import os

from django.core.exceptions import ImproperlyConfigured


def get_env_var(env_variable):
    try:
        return os.environ[env_variable]
    except KeyError:
        raise ImproperlyConfigured(f'Set the {env_variable} environment variable')
