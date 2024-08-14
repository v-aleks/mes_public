from rest_framework import filters # type: ignore
from django_filters import rest_framework as filters # type: ignore
from .models import Logos1


class WorkPlaceFilter(filters.FilterSet):
    sensor_id = filters.CharFilter(field_name="sens_id")

    class Meta:
        model = Logos1
        fields = ['sens_id']