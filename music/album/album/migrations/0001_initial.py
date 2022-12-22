# Generated by Django 4.1.4 on 2022-12-18 20:39

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import music.album.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_name', models.CharField(max_length=30, unique=True, validators=[music.album.validators.characters_validator, django.core.validators.MinLengthValidator(2)])),
                ('date_of_publication', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('image_url', models.URLField(verbose_name='Image URL:')),
                ('price', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='MusicAuthor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author_name', models.CharField(max_length=20, unique=True, validators=[music.album.validators.characters_validator, django.core.validators.MinLengthValidator(2)])),
                ('performer', models.CharField(choices=[('Musician', 'Musical Artist'), ('Band', 'Music Band')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song_name', models.CharField(max_length=50, unique=True, validators=[music.album.validators.characters_validator, django.core.validators.MinLengthValidator(2)])),
                ('genre', models.CharField(choices=[('Pop Music', 'Pop Music'), ('Jazz Music', 'Jazz Music'), ('R&B Music', 'R&B Music'), ('Rock Music', 'Rock Music'), ('Country Music', 'Country Music'), ('Dance Music', 'Dance Music'), ('Hip Hop Music', 'Hip Hop Music'), ('Other', 'Other')], max_length=20)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='album.album')),
            ],
        ),
        migrations.CreateModel(
            name='PublishingHouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publishing_name', models.CharField(max_length=30, unique=True, validators=[django.core.validators.MinLengthValidator(2), music.album.validators.characters_validator])),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='album.album')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='album.musicauthor'),
        ),
        migrations.AddField(
            model_name='album',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='current_profile', to='account.profileuser'),
        ),
    ]
