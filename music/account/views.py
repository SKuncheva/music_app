from django.contrib.auth import login, get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, TemplateView, DeleteView, UpdateView
from music.account.forms import FormUserRegister, FormProfileUser, LoginForm, DeleteProfile, EditProfileForm
from music.account.models import ProfileUser
from music.album.models import Album

UserModel = get_user_model()


class HomeView(TemplateView):
    template_name = "home.html"


class LoginUserView(LoginView, LoginRequiredMixin):
    form_class = LoginForm
    template_name = 'profile/login-profile.html'
    next_page = reverse_lazy('catalog albums')


class RegisterUserView(CreateView):
    form_class = FormUserRegister
    template_name = 'profile/home-no-profile.html'

    success_url = reverse_lazy('fill in profile')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profile'] = FormProfileUser
        return context

    def form_valid(self, form):
        result = super().form_valid(form)
        created_user = form.save()
        login(self.request, created_user)
        return result


class LogoutUserView(LogoutView):
    template_name = 'home.html'


class CreateProfile(CreateView):
    form_class = FormProfileUser
    template_name = 'profile/profile-create.html'

    def form_valid(self, form):
        form = super().get_form()
        user = self.request.user
        form.instance.user = user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('catalog albums')


class ShowProfileDetailsView(DetailView):
    model = UserModel
    template_name = 'profile/profile-details.html'
    context_object_name = 'profile'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profile_info'] = self.object.profileuser
        context['profile_owner'] = self.request.user == self.object
        context['all_albums'] = len(Album.objects.filter(profile_id=self.object.pk))
        return context


class EditProfile(UpdateView):
    model = ProfileUser
    form_class = EditProfileForm
    template_name = 'profile/profile-edit.html'

    def get_success_url(self):
        return reverse_lazy('detail profile', kwargs={'pk': self.request.user.pk})


class DeleteProfileView(LoginRequiredMixin, DeleteView):
    form_class = DeleteProfile
    model = UserModel
    template_name = 'profile/profile-delete.html'
    success_url = reverse_lazy('logout')
