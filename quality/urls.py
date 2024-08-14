from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('defect_daily/', QualityDaily.as_view()),
    path('home-dash/', HomeDashCard.as_view()),
    path('home-dash-chart/', HomeDashChart.as_view()),

]