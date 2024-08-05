from .base import *
import os

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("APP_DB_NAME"),
        "USER": os.getenv("APP_DB_USER"),
        "PASSWORD": os.getenv("APP_DB_PASSWORD"),
        "HOST": os.getenv("APP_DB_HOST"),
        "PORT": os.getenv("APP_DB_PORT"),  # default PostgreSQL port
    }
}


INSTALLED_APPS += ["storages"]

CORS_ALLOWED_ORIGINS = [
    "https://foresight-finance.vercel.app",  # The origin for frontend
    "https://www.foresight-finance.vercel.app",
]

TEST_MODE = False

CSRF_TRUSTED_ORIGINS = []
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "my_cache_table",
    }
}
ALLOWED_HOSTS = []  # Add your server's IP or domain name


FRONTEND_URL = "https://foresight-finance.vercel.app"

ENVIRONMENT = "production"
