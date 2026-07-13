from django.db import models
# from django.contrib.auth.models import AbstractUser
import uuid
from django.conf import settings

class KnowledgeNode(models.Model):
    class Difficulty(models.IntegerChoices):
        BEGINNER = 1
        INTERMEDIATE = 2
        ADVANCED = 3
        EXPERT = 4
        MASTER = 5
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    title = models.CharField(max_length=300,blank=False)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    difficulty = models.IntegerField(choices=Difficulty.choices,default=1)
    estimated_hours = models.IntegerField(blank=False)
    icon = models.URLField()
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

class KnowledgeEdge(models.Model):
    class RelationType(models.TextChoices):
        PREREQUISITE = "prerequisite"
        RECOMMENDED  = "recommended"
        ALTERNATIVE = "alternative"
        OPTIONAL = "optional"
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    from_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE,related_name="outgoing_edges")
    to_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE,related_name="incoming_edges")
    relation_type = models.CharField(choices = RelationType.choices,default=RelationType.PREREQUISITE,max_length=20)
    weight = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["from_node", "to_node"],
                name="unique_edge"
            )
        ]

class Resource(models.Model):
    class ResourceType(models.TextChoices):
        VIDEO = "video"
        ARTICLE = "article"
        DOCUMENTATION = "documentation"
        GITHUB = "github"
        COURSE = "course"
        PRACTICE = "practice"
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    knowledge_node = models.ForeignKey(KnowledgeNode,null= False,blank=False,on_delete=models.CASCADE)
    title = models.CharField(blank=False, max_length=150)
    description = models.TextField(blank=True)
    url = models.URLField(max_length=200)
    resource_type = models.CharField(choices=ResourceType.choices,default=ResourceType.DOCUMENTATION,max_length=20)
    source = models.CharField(max_length=150,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
     return self.title

class LearningPath(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active"
        COMPLETED  = "completed"
        PAUSED = "paused"
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    goal = models.CharField(max_length=250)
    status = models.CharField(max_length=50,choices=Status.choices,default=Status.ACTIVE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.user.username} - {self.goal}"
class LearningPathNode(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    learning_path= models.ForeignKey(LearningPath,on_delete=models.CASCADE)
    knowledge_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE)
    order_no = models.IntegerField()
    recommendation_reason = models.TextField(max_length=300,blank =True)
    created_at = models.DateTimeField(auto_now_add = True)
    class Meta:
        ordering = ["order_no"]
    def __str__(self):
        return f"{self.learning_path.goal} - {self.knowledge_node.title}"

class UserProgress(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = "Not Started"
        IN_PROGRESS = "In_Progress"
        COMPLETED = "Completed"
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    knowledge_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE)
    status = models.CharField(choices= Status.choices, default=Status.NOT_STARTED,max_length=20)
    time_spent_minutes = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null= True,blank=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserNote(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    knowledge_node = models.ForeignKey(KnowledgeNode,on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)

