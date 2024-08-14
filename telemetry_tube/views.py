from django.shortcuts import render
from django.http import JsonResponse
from django.db import connections
from django.db.utils import OperationalError
from rest_framework import status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.request import Request # type: ignore
from rest_framework.views import APIView # type: ignore
from .utils import get_telemetry_tubes, get_date, get_telemetry_tube_table
from datetime import datetime
from .models import *


# Проверка соединения с БД контроллеров
def database_status(request):
    db_conn = connections['telemetry']
    try:
        db_conn.cursor()
        status = 'Connected'
    except OperationalError:
        status = 'Disconnected'
    return JsonResponse({'database_status': status})


class TubeSensorView(APIView):
    def get(self, request):
        # Получение даты из запроса
        date = get_date(date_str = request.GET.get('date'))

        # Фильтрация логов датчика за выбранную дату
        queryset = Logos.objects.using('telemetry').filter(time_line__date=date)
        if not queryset.exists():
            return Response({"error": "Нет данных за выбранную дату"}, status=status.HTTP_404_NOT_FOUND)
        
        # Обработка данных с датчика
        sensor_data = get_telemetry_tubes(queryset)

        return Response(sensor_data.to_dict(orient='records'), status=status.HTTP_200_OK)
    

class TabeTableView(APIView):
    def get(self, request):
        # Получение даты из запроса
        date_str = request.GET.get('date')
        if not date_str:
            return Response({"error": "Необходимо передать дату"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d')
        except ValueError:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        
        # Фильтрация логов датчика за выбранную дату
        queryset = Logos.objects.using('telemetry').filter(time_line__date=date)
        if not queryset.exists():
            return Response({"error": "Нет данных за выбранную дату"}, status=status.HTTP_404_NOT_FOUND)
        
        table_date = get_telemetry_tube_table(sensor_data=get_telemetry_tubes(queryset))
        
        return Response(table_date, status=status.HTTP_200_OK)