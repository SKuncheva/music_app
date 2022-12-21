from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import MinLengthValidator
from django.db import models
from music.account.manager import UserObjectManager
from music.account.validators import validate_name_contains_only_letters


class UsersModelApp(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = UserObjectManager()


class ProfileUser(models.Model):
    MAX_FIRST_LEN_NAME = 50
    MAX_LAST_LEN_NAME = 50
    MIN_FIRST_LEN_NAME = 2
    MIN_LAST_LEN_NAME = 2
    MAX_LEN_GENDER = 10
    CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    first_name = models.CharField(
        max_length=MAX_FIRST_LEN_NAME,
        validators=(
            MinLengthValidator(MIN_FIRST_LEN_NAME),
            validate_name_contains_only_letters,))

    last_name = models.CharField(
        max_length=MAX_LAST_LEN_NAME,
        validators=(
            MinLengthValidator(MIN_LAST_LEN_NAME),
            validate_name_contains_only_letters,))

    age = models.PositiveIntegerField(default=0)

    gender = models.CharField(
        max_length=MAX_LEN_GENDER,
        choices=CHOICES)

    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        primary_key=True,
    )

    def __str__(self):
        return self.first_name


