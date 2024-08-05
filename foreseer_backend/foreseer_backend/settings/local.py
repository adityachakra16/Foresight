from .base import *


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "foresight_main",
        "USER": "local_user",
        "PASSWORD": "local_password",
        "HOST": "localhost",
        "PORT": "5433",  # default PostgreSQL port
    }
}

FRONTEND_URL = "http://localhost:3000"

ENVIRONMENT = "local"
