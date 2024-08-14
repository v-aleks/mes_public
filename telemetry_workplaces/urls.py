from django.urls import path
from .views import WorkPlace


urlpatterns = [
    path('wp/', WorkPlace.as_view(), name='wp'),
]