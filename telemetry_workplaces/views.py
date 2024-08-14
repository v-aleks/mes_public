from django.shortcuts import render
from rest_framework import status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from .utils import get_sensor_data


class WorkPlace(APIView):
    def get(self, request):
        if request.method == 'GET':
            date = request.GET.get('date')
            sensor_id = request.GET.get('sensor_id')
            work_place = get_sensor_data(sensor_id, date)

        return Response(work_place, status=status.HTTP_200_OK)