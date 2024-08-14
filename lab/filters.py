from rest_framework import filters # type: ignore
from django_filters import rest_framework as filters # type: ignore
from .models import Project, Task, Recipe, Component, RecipeComponent
from django.contrib.auth.models import User


class RecipeFilter(filters.FilterSet):
    status = filters.CharFilter(field_name="status")
    task = filters.CharFilter(field_name="task")

    class Meta:
        model = Recipe
        fields = ['status', 'task']


class UserFilter(filters.FilterSet):
    status = filters.CharFilter(field_name="id")

    class Meta:
        model = User
        fields = ['id']