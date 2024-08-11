from django.shortcuts import render
import json
from django.conf import settings
from django.http import JsonResponse, StreamingHttpResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from user.private import create_user, get_user_details, get_user_positions

# Create your views here.


@method_decorator(csrf_exempt, name="dispatch")
class VerifiedUserView(View):
    def get(self, request):
        email = request.GET.get("email")
        user = get_user_details(email)

        if not user:
            return JsonResponse({"success": False, "error": "User not found"})

        return JsonResponse({"success": True, "data": user})

    def post(self, request):
        data = json.loads(request.body)
        email = data.get("email")
        ethAddress = data.get("eth_address")
        verification_proof = data.get("verification_proof")
        user = create_user(email, ethAddress, verification_proof)

        if not user:
            return JsonResponse({"success": False, "error": "User not found"})

        return JsonResponse({"success": True, "data": user})


def get_user_position(request):
    market_id = request.GET.get("market_id")
    eth_address = request.GET.get("eth_address")

    position = get_user_positions(eth_address, market_id)

    if not position:
        return JsonResponse({"success": False, "error": "User Position not found"})

    return JsonResponse({"success": True, "data": position})
