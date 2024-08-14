from django.shortcuts import render
from rest_framework import status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
import pandas as pd
from erp import config
from .models import Defect
from .utils import *
from production.models import Process
from datetime import datetime, timedelta


class QualityDaily(APIView):
    def get(self, request):
        date_str = request.GET.get('date')
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        defect_data = list(Defect.objects.filter(date=date).values())

        return Response(defect_data, status=status.HTTP_200_OK)


class HomeDashCard(APIView):
    def get(self, request):
        data = {}
        if request.method=='GET':
            # Определение периода времени
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=config.dashboard_period)
            prev_end_date = start_date
            prev_start_date = prev_end_date - timedelta(days=config.dashboard_period)

            # Получение данных за периоды и преобразование их в датафреймы
            defect = list(Defect.objects.filter(date__range=[start_date, end_date]).values())
            df_defect = pd.DataFrame.from_records(defect)
            prev_defect = list(Defect.objects.filter(date__range=[prev_start_date, prev_end_date]).values())
            prev_df_defect = pd.DataFrame.from_records(prev_defect)
            process = list(Process.objects.filter(date__range=[start_date, end_date]).values())
            df_process = pd.DataFrame.from_records(process)
            prev_process = list(Process.objects.filter(date__range=[prev_start_date, prev_end_date]).values())
            prev_df_process = pd.DataFrame.from_records(prev_process)

            # Расчет параметров
            defect_rate_data = get_defect_rate(df_defect, prev_df_defect)
            total_done_data = get_total_done(df_defect, prev_df_defect)
            total_done_daily_data = get_total_done_daily(df_defect, prev_df_defect)
            total_done_defect_data = get_total_done_defect(df_defect, prev_df_defect)
            daily_productivity_data = get_daily_productivity (df_defect, prev_df_defect)
            daily_capacity_data = get_daily_capacity(df_process, prev_df_process)
            data = {**defect_rate_data, **total_done_data, **total_done_daily_data, **total_done_defect_data, **daily_productivity_data, **daily_capacity_data}

            return Response(data, status=status.HTTP_200_OK)
        

class HomeDashChart(APIView):
    def get(self, request):
        data = []
        if request.method == 'GET':

            # Получение данных за периоды
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=config.dashboard_period)
            defect = Defect.objects.filter(date__range=[start_date, end_date])

            # Преобразование в датафрейм и фильтрация по датам
            defect = list(defect.values())
            df = pd.DataFrame.from_records(defect)
            df_filtered = df[(df.date >= start_date) & (df.date <= end_date)]

            # Расчет среднего значения и наполнения словаря data
            unique_dates = df_filtered.date.unique()
            for date in unique_dates:
                avg_daily_defect_rate = df_filtered[df_filtered.date == date]['defect_rate'].mean()
                avg_daily_total_done = df_filtered[df_filtered.date == date]['total_done_good'].unique().sum()

                data.append({
                    'date': date.strftime('%d.%m.%Y'),
                    'daily_defect_rate': round(avg_daily_defect_rate, 2),
                    'avg_daily_total_done': avg_daily_total_done,
                })

        return Response(data, status=status.HTTP_200_OK)