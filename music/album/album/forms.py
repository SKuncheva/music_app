from django import forms

from music.account.models import ProfileUser
from music.album.models import Album, Song, MusicAuthor, PublishingHouse


class AlbumBaseForm(forms.ModelForm):
    class Meta:
        model = Album
        exclude = ('profile', 'author')


class CreateAlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        exclude = ('profile',)


class EditAlbumForm(AlbumBaseForm):
    pass


class DeleteAlbumForm(AlbumBaseForm):
    class Meta:
        model = Album
        fields = ()


class CreateSongForm(forms.ModelForm):
    class Meta:
        model = Song
        fields = '__all__'


class CreateAuthorForm(forms.ModelForm):
    class Meta:
        model = MusicAuthor
        fields = '__all__'


class CreatePublishingForm(forms.ModelForm):
    class Meta:
        model = PublishingHouse
        fields = '__all__'

