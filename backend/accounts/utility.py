import random
from  django.core.validators import validate_email
from django.core.exceptions import ValidationError
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings

def generate_otp():
    otp = f"{random.randint(0, 999999):06d}"
    otp_expiry = timezone.now() + timedelta(minutes=5)
    return otp, otp_expiry


def field_validator(attribute,field_name):
    error ={}
    if not attribute:
        error[field_name] = f"Required."
    return error

def valid_email(email):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False

def create_username(email):
    username_part = email.split('@')[0]   # '@' se pehle ka part lo
    random_number = random.randint(100000,999999)
    username = f"{username_part}_{random_number}"
    return username




def send_otp_email(email, otp):

    subject = "Verify your StackMaps account"

    message = f"""
Hello,

Your StackMaps verification code is:

{otp}

This OTP is valid for 5 minutes.

If you didn't request this, you can safely ignore this email.

Regards,
StackMaps Team
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )