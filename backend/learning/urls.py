from django.urls import path
from .views import *

urlpatterns = [
    path("generate-roadmap/", generate_roadmap, name="generate-roadmap")
]
