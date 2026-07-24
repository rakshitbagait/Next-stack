from django.urls import path
from .views import *
urlpatterns = [
    path("google-login/", GoogleLoginAPIView.as_view(),name="google-login"),
    path("register-user/",register_user_view,name="register-user"),
    path("verify-register/",verify_register,name="verify-register"),
    path("resend-otp/",resend_otp,name="resend-otp"),
    path("login-view/",login_view,name = "login-view"),
    path("logout-view/",logout_view,name ="logout-view"),
    path("session-view/",session_view,name="session-view"),
    path("bootstrap/",app_bootstrap,name="bootstrap"),

]
