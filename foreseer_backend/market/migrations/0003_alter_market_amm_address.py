# Generated by Django 5.0.4 on 2024-08-10 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_market_amm_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='market',
            name='amm_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
