from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('process_daily/', ProcessDaily.as_view())

]