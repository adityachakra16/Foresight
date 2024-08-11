from django.urls import path, include
from market import views

urlpatterns = [
    path(
        "api/markets",
        views.get_markets,
        name="markets",
    ),
    path(
        "api/markets/liquidity",
        views.get_liquidity,
        name="market_liquidity",
    ),
    path(
        "api/markets/cost",
        views.get_cost,
        name="market_costs",
    ),
    path("api/markets/margin", views.get_marginal_price, name="market_marginal"),
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
    path(
        "api/market/resolve",
        views.MarketResolutionView.as_view(),
        name="market_reputation",
    ),
]
