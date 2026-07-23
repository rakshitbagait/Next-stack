from django.urls import path
from .views import *
urlpatterns = [
    path("google-login/", GoogleLoginAPIView.as_view(),name="google-login"),
    path("register-user/",register_user_view,name="register-user"),
    path("verify-register/",verify_register,name="verify-register"),
    path("resend-otp/",resend_otp,name="resend-otp"),


    
]
