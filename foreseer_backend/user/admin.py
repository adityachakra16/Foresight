from django.contrib import admin

# Register your models here.

from django.contrib import admin
from user import models


# Register your models here.
@admin.register(models.UserDetails)
class UserDetailsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
    )
