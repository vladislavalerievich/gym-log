import os
import dj_database_url
from backend.settings.base import *

DEBUG = False

INSTALLED_APPS += [
    'whitenoise.runserver_nostatic',
]

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

DATABASE_URL = os.environ.get('DATABASE_URL')
DATABASES['default'] = dj_database_url.config(default=DATABASE_URL, conn_max_age=500, ssl_require=True)

TEMPLATES[0]["DIRS"] = [os.path.join(BASE_DIR, "frontend", "build")]
WHITENOISE_ROOT = os.path.join(BASE_DIR, "frontend", "build", "root")

STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend", "build", "static")]

CSRF_TRUSTED_ORIGINS = ['https://*.127.0.0.1', os.environ.get("HOST_NAME")]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
