from django.urls import path, include
from market import views

urlpatterns = [
    path(
        "api/market",
        views.MarketView.as_view(),
        name="market",
    ),
    path(
        "api/market/reputation",
        views.MarketReputationView.as_view(),
        name="market_reputation",
    ),
]
