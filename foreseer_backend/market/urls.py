from django.urls import path, include
from market import views

urlpatterns = [
    path(
        "api/market",
        views.MarketView.as_view(),
        name="market",
    ),
]
