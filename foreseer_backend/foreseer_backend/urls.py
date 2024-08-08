"""
URL configuration for foreseer_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from oms import urls as oms_urls
from market import urls as market_urls
from user import urls as user_urls

FORESIGHT_URLS = [
    oms_urls.urlpatterns,
    market_urls.urlpatterns,
    user_urls.urlpatterns,
]

urlpatterns = [
    path("admin/", admin.site.urls),
] + [path("", include(url)) for url in FORESIGHT_URLS]
