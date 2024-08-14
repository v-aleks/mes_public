from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .viewsets import ProjectViewSet, TaskViewSet, RecipeViewSet, ComponentViewSet, RecipeComponentViewSet, UserViewSet
from .views import *

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'recipes', RecipeViewSet, basename='recipe')
router.register(r'components', ComponentViewSet, basename='component')
router.register(r'recipe-components', RecipeComponentViewSet)
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path(r'comp_report/', LabComponentReport.as_view()),
    path(r'recipe_url/', RecipeURL.as_view())
]