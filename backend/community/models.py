from django.db import models
from django.conf import settings
import uuid
from learning.models import KnowledgeNode

class Discussion(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    knowledge_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE)
    title = models.CharField(max_length =150)
    content = models.TextField()
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    soft_delete = models.BooleanField(default=False)

class Reply(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    parent_reply = models.ForeignKey("self",on_delete=models.CASCADE,null= True, blank=True, related_name="replies")
    content = models.TextField()
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    soft_delete = models.BooleanField(default=False)

class Tag(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    name = models.CharField(unique=True, max_length=50)
    slug = models.SlugField(unique=True)

class DiscussionTag(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    discussion= models.ForeignKey(Discussion,on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag,on_delete=models.CASCADE)
class DiscussionLike(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
class ReplyLike(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

class DiscussionBookmark(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
