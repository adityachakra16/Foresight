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


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # The origin for frontend
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]
