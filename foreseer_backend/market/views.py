from django.shortcuts import render
import json
from django.conf import settings
from django.http import JsonResponse, StreamingHttpResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from market.models import Market

from market.private import create_market, get_market_by_id, get_market_reputation


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
                }
                for market in markets
            ],
        }
    )


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
