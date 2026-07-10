from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.
# Interest Table
class Interest(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    interest_name = models.CharField(unique=True,null=False)
    icon = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
# ----------------------------------------------------------------------
# User table
class User(AbstractUser):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    username = models.CharField(max_length=150,editable=False,unique=True,null=False)
    first_name = models.CharField(max_length=100,editable=True,unique=False,null=False)
    last_name = models.CharField(max_length=100,editable=True,unique=False,null=False)
    email = models.EmailField(unique=True,null=False,)
    avatar = models.URLField(unique=False,blank=True)
    bio = models.TextField(unique=False,blank=True,max_length=250)
    country = models.CharField(max_length=100,unique=False,null=False,)
    is_verified = models.BooleanField(default=False)
    interests = models.ManyToManyField(Interest,related_name="users",blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(auto_now=True)

# ----------------------------------------------------------------------------------------------
