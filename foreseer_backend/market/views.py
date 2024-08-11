import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from market.models import Market

from market.private import (
    calculate_costs_of_one_share,
    calculate_marginal_prices_of_markets,
    calculate_market_costs,
    create_market,
    get_liquidity_of_markets,
    get_market_by_id,
    get_market_reputation,
    resolve_market,
)


def get_liquidity(request):
    market_ids = request.GET.get("market_ids")
    market_ids = market_ids.split(",")
    liq = get_liquidity_of_markets(market_ids)

    if not liq:
        return JsonResponse({"success": False, "error": "Failed to get liquidity"})

    return JsonResponse({"success": True, "data": liq})


def get_cost(request):
    market_id = request.GET.get("market_id")
    outcome_index = request.GET.get("outcome_index")
    shares = request.GET.get("shares")
    buy_sell = request.GET.get("buy_sell")
    cost = calculate_market_costs(market_id, outcome_index, shares, buy_sell)

    if not cost:
        return JsonResponse({"success": False, "error": "Failed to get costs"})

    return JsonResponse({"success": True, "data": cost})


def get_marginal_cost(request):
    market_id = request.GET.get("market_id")
    buy_sell = request.GET.get("buy_sell", "buy")
    mp = calculate_costs_of_one_share(int(market_id), buy_sell)
    return JsonResponse({"success": True, "data": mp})


# Create your views here.
def get_markets(request):
    markets = Market.objects.all()

    return JsonResponse(
        {
            "success": True,
            "data": [
                {
                    "name": market.name,
                    "rules": market.rules,
                    "expiration": market.expiration,
                    "active": market.active,
                    "created_at": market.created_at,
                    "updated_at": market.updated_at,
                    "id": market.id,
                }
                for market in markets
            ],
        }
    )


@method_decorator(csrf_exempt, name="dispatch")
class MarketResolutionView(View):
    def post(self, request):
        data = json.loads(request.body)
        outcome = data.get("outcome")
        market_id = data.get("market_id")
        resolution = resolve_market(market_id=market_id, correct_outcome_index=outcome)

        if not resolution:
            return JsonResponse({"success": False, "error": "Failed to resolve market"})

        return JsonResponse({"success": True})


@method_decorator(csrf_exempt, name="dispatch")
class MarketReputationView(View):
    def post(self, request):
        data = json.loads(request.body)

        reputatuon = get_market_reputation(**data)

        if not reputatuon:
            return JsonResponse({"success": False, "error": "Failed to create market"})

        return JsonResponse({"success": True, "data": reputatuon})


@method_decorator(csrf_exempt, name="dispatch")
class MarketView(View):
    def get(self, request):
        id = request.GET.get("id")
        market = get_market_by_id(id)

        if not market:
            return JsonResponse({"success": False, "error": "Market not found"})

        return JsonResponse({"success": True, "data": market})

    def post(self, request):
        data = json.loads(request.body)

        market = create_market(**data)

        if not market:
            return JsonResponse({"success": False, "error": "Failed to create market"})

        return JsonResponse(
            {
                "success": True,
                "data": {
                    "name": market.name,
                    "rules": market.rules,
                    "expiration": market.expiration,
                    "active": market.active,
                    "created_at": market.created_at,
                    "updated_at": market.updated_at,
                    "id": market.id,
                },
            }
        )

    def patch(self, request):
        data = json.loads(request.body)

        id = request.GET.get("id")
        market = get_market_by_id(id)

        if not market:
            return JsonResponse({"success": False, "error": "Market not found"})

        for key, value in data.items():
            setattr(market, key, value)

        market.save()

        return JsonResponse({"success": True, "data": market})
