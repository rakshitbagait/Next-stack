from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

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
from django.apps import apps

# from .serializer import *'/'
from .models import *
from .utility import *

import traceback

from django.contrib.auth import authenticate, login
from django.http import JsonResponse

from django.contrib.auth import logout
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import LearningPath, UserSkill, KnowledgeNode
from .utility import roadmap_creator

from django.db import transaction

@csrf_exempt
@require_http_methods(["POST"])
def generate_roadmap(request):
    try:
        body = json.loads(request.body)

        user = request.user

        if not user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )

        goal = body.get("goal")
        known_topics = body.get("known_topics", [])

        with transaction.atomic():

            learning_path = LearningPath.objects.create(
                user=user,
                goal=goal
            )

            user_skill_nodes = []

            for skill in known_topics:

                node = KnowledgeNode.objects.get(title=skill)

                UserSkill.objects.create(
                    user=user,
                    knowledge_node=node
                )

                user_skill_nodes.append(node)

            roadmap_creator(
                tuple(user_skill_nodes),
                goal
            )

            user.onboarding_completed = True
            user.save(update_fields=["onboarding_completed"])

        return JsonResponse({
            "success": True,
            "learning_path_id": str(learning_path.id)
        })

    except KnowledgeNode.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid skill selected."},
            status=400
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )