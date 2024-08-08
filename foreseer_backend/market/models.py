from django.db import models


# Create your models here.
class Market(models.Model):
    name = models.CharField(max_length=100)
    rules = models.CharField(max_length=1000)
    expiration = models.DateTimeField()
    active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
