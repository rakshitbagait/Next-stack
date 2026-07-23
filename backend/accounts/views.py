from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from keycloak import KeycloakOpenID
from django.http import JsonResponse
from django.conf import settings
import requests
import base64
import json
from google.oauth2 import id_token
from google.auth.transport import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializer import *
from .models import *
from .utility import *

import traceback
class GoogleLoginAPIView(APIView):

    def post(self, request):

        serializer = GoogleLoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        credential = serializer.validated_data["credential"]

        try:

            idinfo = id_token.verify_oauth2_token(
                credential,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )

        except Exception:

            return Response(
                {
                    "status": False,
                    "message": "Invalid Google Token"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        email = idinfo["email"]
        name = idinfo["name"]
        google_id = idinfo["sub"]
        picture = idinfo.get("picture")

        return Response(
            {
                "status": True,
                "email": email,
                "name": name,
                "google_id": google_id,
                "picture": picture
            }
        )
@csrf_exempt
@require_http_methods(["POST"])
def register_user_view(request):
    try:
        body = json.loads(request.body)
        full_name = body.get("fullName")
        email = body.get("email")
        password = body.get("password")
        confirm_password = body.get("confirmPassword")
        agree = body.get("agree")
        fields = {
            "name": full_name,
            "email": email,
            "password": password,
            "confirm_password": confirm_password,
        }

        request_error = {}
        
        for field_name, value in fields.items():
            request_error.update(field_validator(value, field_name))
        if email:
            email = email.strip().lower()
            if valid_email(email) == False:
                request_error["email"] = "Enter a valid email"
            if User.objects.filter(email = email).exists():
                request_error["email"]= "This email exists"

        if password and confirm_password:
            if password != confirm_password:
                request_error["confirm_password"] = "Password do not match"
 
        if request_error:
            return JsonResponse(
                {
                    "status": False,
                    "error": request_error
                },
                status=400
            )

        # Generate OTP
        otp, otp_expiry = generate_otp()
        # Save Pending Registration
        username = create_username(email)
        PendingRegistration.objects.create(
            username = username,
            full_name = full_name,
            email = email,
            password_hash = password,
            otp = otp,
            otp_expiry = otp_expiry
        )
        
        # Send OTP
        send_otp_email(email=email,otp=otp)
        return JsonResponse(
            {
                "status":True,
            }
        )
    except Exception as e:
        traceback.print_exc()

        return JsonResponse({"error":str(e)},status=500)
@csrf_exempt
@require_http_methods(["POST"])
def verify_register(request):

    try:

        body = json.loads(request.body)

        email = body.get("email")
        otp = body.get("otp")

        request_error = {}

        request_error.update(field_validator(email, "email"))
        request_error.update(field_validator(otp, "otp"))

        if request_error:
            return JsonResponse(
                {
                    "status": False,
                    "error": request_error
                },
                status=400
            )

        pending_user = PendingRegistration.objects.filter(
            email=email
        ).first()

        if not pending_user:
            request_error["email"] = "Registration not found."

        elif timezone.now() > pending_user.otp_expiry:
            request_error["otp"] = "OTP has expired."

        elif pending_user.otp != otp:
            request_error["otp"] = "Invalid OTP."

        if request_error:
            return JsonResponse(
                {
                    "status": False,
                    "error": request_error
                },
                status=400
            )

        user = User.objects.create(

            username=pending_user.username,

            full_name=pending_user.full_name,

            email=pending_user.email,

            password=pending_user.password_hash,

        )

        pending_user.delete()

        return JsonResponse(
            {
                "status": True,
                "error": "Registration successful."
            }
        )

    except Exception as e:

        traceback.print_exc()

        return JsonResponse(
            {
                "status": False,
                "error": "Something went wrong."
            },
            status=500
        )
@csrf_exempt
@require_http_methods(["POST"])
def resend_otp(request):
    try:
        body = json.loads(request.body)
        email = body.get("email")
        otp, otp_expiry = generate_otp()
        PendingRegistration.objects.update(
            email=email,
            otp = otp,
            otp_expiry= otp_expiry,
        )
        send_otp_email(email=email,otp=otp)
        return JsonResponse(
            {
                "status": True,
                "message": "Otp sent."
            }
        )
    except Exception as e:
        traceback.print_exc()
        return JsonResponse(
            {"status": False,"error" : "Something went wrong"},status = 500)