from django.contrib import admin
from django.contrib.admin import ModelAdmin

from music.album.models import Album, MusicAuthor, Song, PublishingHouse


# Register your models here.
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    pass


@admin.register(MusicAuthor)
class AuthorAdmin(ModelAdmin):
    pass


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    pass


@admin.register(PublishingHouse)
class PublishingAdmin(admin.ModelAdmin):
    pass
