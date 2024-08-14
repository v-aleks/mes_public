from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .viewsets import *
from .views import *

router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet, basename='feedback')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'choices', ChoiceViewSet, basename='choice')

urlpatterns = [
    path('', include(router.urls)),
]