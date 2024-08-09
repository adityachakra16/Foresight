from django.contrib import admin

# Register your models here.
from django.contrib import admin
from market import models


# Register your models here.
@admin.register(models.Market)
class MarketAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
