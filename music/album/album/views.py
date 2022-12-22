from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView, ListView
from music.album.forms import CreateAlbumForm, DeleteAlbumForm, EditAlbumForm, CreateSongForm, CreateAuthorForm, \
    CreatePublishingForm
from music.album.models import Album, Song, MusicAuthor, PublishingHouse


class Catalog(LoginRequiredMixin, ListView):
    model = Album
    template_name = 'home-with-profile.html'

    context_object_name = 'albums'
    paginate_by = 4


#######################################################
class CreateAlbum(CreateView, LoginRequiredMixin):
    form_class = CreateAlbumForm
    template_name = 'album/add-album.html'

    def form_valid(self, form):
        form = super().get_form()
        profile = self.request.user.profileuser
        form.instance.profile = profile
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('create song')


class DetailAlbum(LoginRequiredMixin, DetailView):
    model = Album
    template_name = 'album/album-details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        album = Album.objects.get(pk=self.object.pk)
        context['current_album'] = album
        try:
            publishing = PublishingHouse.objects.filter(album_id=album.pk).get().publishing_name
        except:
            publishing = ''
        context['publishing'] = publishing
        context['owner_album'] = Album.objects.get(pk=self.object.pk).profile.pk == self.request.user.pk
        return context


class EditAlbum(UpdateView, LoginRequiredMixin):
    template_name = 'album/edit-album.html'
    model = Album
    form_class = EditAlbumForm
    success_url = reverse_lazy('catalog albums')


class DeleteAlbum(DeleteView, LoginRequiredMixin):
    template_name = 'album/delete-album.html'
    model = Album
    form_class = DeleteAlbumForm
    success_url = reverse_lazy('home')


#######################################################

class CreateSong(CreateView, PermissionRequiredMixin, LoginRequiredMixin):
    form_class = CreateSongForm
    model = Song
    template_name = 'song/create-song.html'

    def get_success_url(self):
        return reverse_lazy('catalog albums')


class AllSongs(ListView):
    model = Song
    template_name = 'song/all-song.html'
    context_object_name = 'songs'

    def get_queryset(self):
        queryset = super().get_queryset()
        album_id = self.kwargs['pk']
        queryset = queryset.filter(album_id=album_id)
        queryset = queryset.order_by('id').reverse()
        return queryset


#######################################################


class CreateAuthor(CreateView, LoginRequiredMixin):
    form_class = CreateAuthorForm
    model = MusicAuthor
    template_name = 'author/music-author.html'

    def get_success_url(self):
        return reverse_lazy('add album')


######################################################
class CreatePublishing(CreateView, LoginRequiredMixin, PermissionRequiredMixin):
    form_class = CreatePublishingForm
    model = PublishingHouse
    template_name = 'publishing/create-publishing.html'
    permission_required = ('album.add_publishinghouse', 'album.view_publishinghouse', 'album.change_publishinghouse',
                           'album.delete_publishinghouse')

    def get_success_url(self):
        return reverse_lazy('catalog albums')
