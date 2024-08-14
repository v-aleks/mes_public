from .models import Logos1
from erp import config
import pandas as pd
from datetime import datetime


def get_sensor_data(sensor_id, date):
    work_periods = []
    idle_periods = []

    date_obj = datetime.strptime(date, '%Y-%m-%d')
    # Получение датафрейма из БД
    queryset = Logos1.objects.using('telemetry').filter(sens_id=sensor_id, time_line__date=date_obj, time_line__time__gte = config.shift_start, time_line__time__lte = config.shift_end).values()
    queryset_list = list(queryset.values())
    df = pd.DataFrame.from_records(queryset_list)
    # Преобразуем столбец time_line в тип datetime
    df['time_line'] = pd.to_datetime(df['time_line'])
    # Преобразуем start_date и end_date в тип datetime
    date = pd.to_datetime(date)
    # Фильтруем данные по заданному периоду времени
    df = df[df['time_line'].dt.date == date.date()]
    # Сортируем данные по времени
    df = df.sort_values('time_line')
    # Вычисляем разницу времени между текущим и предыдущим срабатыванием датчика
    df['time_diff'] = df['time_line'].diff().dt.total_seconds() / 60.0
    # Переменные для хранения начала и конца текущего периода
    start_time = df['time_line'].iloc[0]
    current_period_type = 'work'  # Тип текущего периода: 'work' или 'idle'
    # Проходим по строкам датафрейма, начиная со второй строки
    for i in range(1, len(df)):
        if df['time_diff'].iloc[i] <= config.idle_time:
            if current_period_type == 'idle':
                end_time = df['time_line'].iloc[i - 1]
                idle_periods.append((start_time, end_time, (end_time - start_time).total_seconds() / 60.0))
                start_time = df['time_line'].iloc[i - 1]
                current_period_type = 'work'
        else:
            if current_period_type == 'work':
                end_time = df['time_line'].iloc[i - 1]
                work_periods.append((start_time, end_time, (end_time - start_time).total_seconds() / 60.0))
                start_time = df['time_line'].iloc[i - 1]
                current_period_type = 'idle'
    # Добавляем последний период
    if current_period_type == 'work':
        end_time = df['time_line'].iloc[-1]
        work_periods.append((start_time, end_time, (end_time - start_time).total_seconds() / 60.0))
    else:
        end_time = df['time_line'].iloc[-1]
        idle_periods.append((start_time, end_time, (end_time - start_time).total_seconds() / 60.0))

    return {'sensor_id': sensor_id, 'work_periods': work_periods, 'idle_periods': idle_periods}