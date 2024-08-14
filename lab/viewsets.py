from rest_framework import status, viewsets, permissions, decorators, response # type: ignore
from rest_framework.response import Response # type: ignore
from .models import Project, Task, Recipe, Component, RecipeComponent
from django.contrib.auth.models import User
from .serializers import ProjectSerializer, TaskSerializer, RecipeSerializer, ComponentSerializer, RecipeComponentSerializer, UserSerializer
from .filters import *


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @decorators.action(detail=False, methods=['get'], url_path='project/(?P<project_id>[^/.]+)')
    def tasks_by_project(self, request, project_id=None):
        tasks = Task.objects.filter(project_id=project_id)
        serializer = self.get_serializer(tasks, many=True)
        return response.Response(serializer.data)
    
    @decorators.action(detail=True, methods=['get'], url_path='recipes')
    def task_recipes(self, request, pk=None):
        task = self.get_object()
        recipes = Recipe.objects.filter(task=task)
        serializer = RecipeSerializer(recipes, many=True)
        return response.Response(serializer.data)


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    

class RecipeComponentViewSet(viewsets.ModelViewSet):
    queryset = RecipeComponent.objects.all()
    serializer_class = RecipeComponentSerializer

    def get_queryset(self):
        recipe_id = self.request.query_params.get('recipe_id')
        if recipe_id:
            return self.queryset.filter(recipe__id=recipe_id)
        return self.queryset
    
    @decorators.action(detail=False, methods=['delete'], url_path='delete-by-recipe')
    def delete_by_recipe(self, request):
        recipe_id = request.query_params.get('recipe_id')
        if not recipe_id:
            return Response({'error': 'recipe_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        RecipeComponent.objects.filter(recipe_id=recipe_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter
