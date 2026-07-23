from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.contrib.auth.hashers import make_password

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
    full_name = models.CharField(max_length=200,null=True,blank=True)  
    email = models.EmailField(unique=True,null=False,)
    avatar = models.URLField(unique=False,blank=True)
    bio = models.TextField(unique=False,blank=True,max_length=250)
    onboarding_completed = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    interests = models.ManyToManyField(Interest,related_name="users",blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

        
class PendingRegistration(models.Model):
# ----------------------------------------------------------------------------------------------
    
    username = models.CharField(max_length=100)
    
    full_name = models.CharField(max_length=150)

    email = models.EmailField(null = False)

    password_hash = models.CharField(max_length=255)   # hashed password

    otp = models.CharField(max_length=6)

    otp_expiry = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "pending_registrations"
        ordering = ["-created_at"]

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def __str__(self):
        return self.email