from django.urls import path, include
from market import views

urlpatterns = [
    path(
        "api/markets",
        views.get_markets,
        name="market",
    ),
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
