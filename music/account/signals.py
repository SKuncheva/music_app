from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from music.account.models import ProfileUser

UserModel = get_user_model()


@receiver(post_save, sender=UserModel)
def create_profile(sender, instance, created, *args, **kwargs):
    if created:
        profile = ProfileUser(user=instance)
        profile.save()
