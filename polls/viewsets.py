from rest_framework import viewsets # type: ignore
from rest_framework.response import Response # type: ignore
from .models import *
from django.contrib.auth.models import User
from .serializers import *
from .filters import *


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FeedbackFilter


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = QuestionFilter


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ChoiceFilter