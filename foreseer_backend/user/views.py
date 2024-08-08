from django.shortcuts import render
import json
from django.conf import settings
from django.http import JsonResponse, StreamingHttpResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from user.private import create_user, get_user_details

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
        email = request.POST.get("email")
        ethAddress = request.POST.get("ethAddress")
        user = create_user(email, ethAddress)

        return JsonResponse({"success": True, "data": "User is verified"})
