from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UsernameField, AuthenticationForm
from django.forms import ModelForm
from music.account.models import ProfileUser

UserModel = get_user_model()


class FormUserRegister(UserCreationForm):
    class Meta:
        model = UserModel
        fields = ('email', )
        field_classes = {"email": UsernameField}

        def save(self, commit=True):
            user = super().save(commit=commit)
            profiles = ProfileUser(
                user=user
            )
            if commit:
                profiles.save()
            return user


class FormProfileUser(ModelForm):
    class Meta:
        model = ProfileUser
        exclude = ('user',)


class EditProfileForm(ModelForm):
    class Meta:
        model = ProfileUser
        exclude = ('user',)


class LoginForm(AuthenticationForm):
    pass


class DeleteProfile(ModelForm):
    class Meta:
        model = ProfileUser
        fields = ()
