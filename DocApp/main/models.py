from django.db import models
from django.contrib.auth.models import User

from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
import uuid


class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    is_provider = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


@receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
    if created:
        Profile.objects.create(user=instance)
        instance.profile.save()


@receiver(post_save,sender=User)
def update_profile(sender,instance,**kwargs):
    instance.profile.save()
    
class Connection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='connections')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="userconnections")
    created_on = models.DateTimeField(auto_now_add=True, editable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "provider": self.provider.name,
            "user": self.user.name,
            "created_on": self.created_on
        }