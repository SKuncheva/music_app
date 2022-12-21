from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from music.account.models import ProfileUser

UserModel = get_user_model()


@admin.register(UserModel)
class MyUserAdmin(UserAdmin):
    model = UserModel
    list_display = ('email', 'is_staff', 'is_active')
    list_filter = ('is_staff',)
    ordering = ('email',)
    fieldsets = ()


@admin.register(ProfileUser)
class ProfileAdmin(ModelAdmin):
    model = ProfileUser
    list_display = ('first_name', 'last_name', 'gender')
    list_filter = ('first_name',)
    ordering = ('first_name',)
    fieldsets = ()
