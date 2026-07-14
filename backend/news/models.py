from django.db import models

# Create your models here.
from django.conf import settings
import uuid

class News(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    title = models.CharField(max_length=500,blank=False)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    image = models.URLField( max_length=500)
    author = models.CharField(max_length=150)
    source = models.CharField(max_length=150)
    source_url = models.URLField(max_length=250,unique=True)
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    def __str__(self):
     return self.title

class NewsLike(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    news = models.ForeignKey(News, on_delete=models.CASCADE)
    user  = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["news", "user"],
                name="unique_news_like"
            )
    ]
    def __str__(self):
        return f"{self.user.username} liked {self.news.title}"