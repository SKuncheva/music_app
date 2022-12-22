from django.urls import path, include

from music.album.views import CreateAlbum, DetailAlbum, EditAlbum, DeleteAlbum, Catalog, CreateSong, CreateAuthor, \
    CreatePublishing, AllSongs

urlpatterns = [
    path('', include([
        path('catalog/', Catalog.as_view(), name='catalog albums'),

        path('add/', CreateAlbum.as_view(), name='add album'),
        path('details/<int:pk>/', DetailAlbum.as_view(), name='album details'),
        path('edit/<int:pk>/', EditAlbum.as_view(), name='edit album'),
        path('delete-album/<int:pk>/', DeleteAlbum.as_view(), name='delete album'),

        path('song/', include([
            path('', CreateSong.as_view(), name='create song'),
            path('all/<int:pk>', AllSongs.as_view(), name='songs in album'),
        ])),

        path('author/', CreateAuthor.as_view(), name='create author'),
        path('publishing/', CreatePublishing.as_view(), name='create publishing'), ]))
]
