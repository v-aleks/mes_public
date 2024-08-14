from rest_framework import filters # type: ignore
from django_filters import rest_framework as filters # type: ignore
from .models import *


class FeedbackFilter(filters.FilterSet):
    status = filters.CharFilter(field_name="status")
    project = filters.CharFilter(field_name="project")

    class Meta:
        model = Feedback
        fields = ['status', 'project']


class QuestionFilter(filters.FilterSet):
    feedback = filters.CharFilter(field_name="feedback")

    class Meta:
        model = Question
        fields = ['feedback']


class ChoiceFilter(filters.FilterSet):
    question = filters.CharFilter(field_name="question")

    class Meta:
        model = Choice
        fields = ['question']
