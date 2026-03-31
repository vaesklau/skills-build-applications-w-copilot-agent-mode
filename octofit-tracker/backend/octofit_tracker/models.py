

from django.db import models
import uuid


class User(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=lambda: str(uuid.uuid4()), editable=False, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Team(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=lambda: str(uuid.uuid4()), editable=False, unique=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name


class Activity(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=lambda: str(uuid.uuid4()), editable=False, unique=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, to_field='id')
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()  # in minutes
    date = models.DateField()
    def __str__(self):
        return f"{self.user.name} - {self.activity_type}"


class Workout(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=lambda: str(uuid.uuid4()), editable=False, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Leaderboard(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=lambda: str(uuid.uuid4()), editable=False, unique=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, to_field='id')
    score = models.IntegerField()
    rank = models.IntegerField()
    def __str__(self):
        return f"{self.user.name} - Rank {self.rank}"
