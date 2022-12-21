from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MinLengthValidator
from django.db import models

from music.account.models import ProfileUser
from music.album.validators import characters_validator

UserModel = get_user_model()


class MusicAuthor(models.Model):
    MAX_LEN_NAME = 20
    MIN_LEN_NAME = 2
    MAX_LEN_PERFORMER = 50
    CHOICES = (
        ("Musician", "Musical Artist"),
        ("Band", "Music Band"),
    )

    author_name = models.CharField(
        max_length=MAX_LEN_NAME,
        unique=True,
        validators=[
            characters_validator,
            MinLengthValidator(MIN_LEN_NAME)])

    performer = models.CharField(
        max_length=MAX_LEN_PERFORMER,
        choices=CHOICES)

    def __str__(self):
        return self.author_name


class Album(models.Model):
    MAX_LEN_NAME = 30
    MIN_LEN_NAME = 2

    album_name = models.CharField(
        max_length=MAX_LEN_NAME,
        unique=True,
        validators=[
            characters_validator,
            MinLengthValidator(MIN_LEN_NAME)
        ])
    date_of_publication = models.DateField()
    description = models.TextField(
        null=True,
        blank=True)
    image_url = models.URLField(verbose_name='Image URL:')
    price = models.FloatField(validators=[MinValueValidator(0)])

    author = models.ForeignKey(
        MusicAuthor,
        on_delete=models.CASCADE,

    )
    profile = models.ForeignKey(
        ProfileUser,
        on_delete=models.CASCADE,
        related_name='current_profile',
    )

    def __str__(self):
        return self.album_name


class Song(models.Model):
    MAX_LEN_NAME = 50
    MIN_LEN_NAME = 2
    MAX_LEN_GENRE = 20
    CHOICES = (
        ("Pop Music", "Pop Music"),
        ("Jazz Music", "Jazz Music"),
        ("R&B Music", "R&B Music"),
        ("Rock Music", "Rock Music"),
        ("Country Music", "Country Music"),
        ("Dance Music", "Dance Music"),
        ("Hip Hop Music", "Hip Hop Music"),
        ("Other", "Other"),
    )
    song_name = models.CharField(
        max_length=MAX_LEN_NAME,
        unique=True,
        validators=[
            characters_validator,
            MinLengthValidator(MIN_LEN_NAME)])
    genre = models.CharField(
        max_length=MAX_LEN_GENRE,
        choices=CHOICES)
    album = models.ForeignKey(
        Album,
        on_delete=models.RESTRICT
    )

    def __str__(self):
        return self.song_name


class PublishingHouse(models.Model):
    MAX_LEN_NAME = 30
    MIN_LEN_NAME = 2

    publishing_name = models.CharField(
        max_length=MAX_LEN_NAME,
        unique=True,
        validators=[
            MinLengthValidator(MIN_LEN_NAME),
            characters_validator])

    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.publishing_name
