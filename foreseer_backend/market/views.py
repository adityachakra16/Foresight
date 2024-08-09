from django.shortcuts import render
import json
from django.conf import settings
from django.http import JsonResponse, StreamingHttpResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from market.private import create_market, get_market_by_id, get_market_reputation

# Create your views here.


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

        return JsonResponse({"success": True, "data": market})
