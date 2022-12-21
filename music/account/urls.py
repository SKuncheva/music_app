from django.urls import path, include
from .signals import *
from music.account.views import LoginUserView, LogoutUserView, RegisterUserView, HomeView, ShowProfileDetailsView, \
    EditProfile, DeleteProfileView, CreateProfile

urlpatterns = [
    path('', include([
        path('', HomeView.as_view(), name='home'),
        path('account/', include([
            path('login/', LoginUserView.as_view(), name='login'),
            path('register/', RegisterUserView.as_view(), name='register'),
            path('logout/', LogoutUserView.as_view(), name='logout'),
        ])),
        path('profile/', include([
            path('', CreateProfile.as_view(), name='fill in profile'),
            path('details/<int:pk>/', ShowProfileDetailsView.as_view(), name='detail profile'),
            path('edit/<int:pk>/', EditProfile.as_view(), name='edit profile'),
            path('delete/<int:pk>/', DeleteProfileView.as_view(), name='delete profile'),
        ]),
             )
    ]))]
