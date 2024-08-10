from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.


class UserDetails(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ethAddress = models.CharField(max_length=100)
    markets_created = models.JSONField(blank=True, null=True)
    markets_participated = models.JSONField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
