from erp import config
from datetime import datetime
import pandas as pd
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore

# Обработка данных телеметрии из БД для графика
def get_telemetry_tubes(queryset):
    queryset_list = list(queryset.values())
    
    shift_start = datetime.strptime(config.shift_start, '%H:%M').time()
    shift_end = datetime.strptime(config.shift_end, '%H:%M').time()

    # Получение датафрейма из БД
    df = pd.DataFrame.from_records(queryset_list)

    # Ресемплинг датафрейма по интервалу в 10 минут
    df['time_line'] = pd.to_datetime(df['time_line'], errors='coerce')
    df['click'] = pd.to_numeric(df['click'], errors='coerce')
    df.set_index('time_line', inplace=True)
    resampled_df = df.resample(config.tube_resample_interval).sum()
    resampled_df.reset_index(inplace=True)

    # Производительность в ед\час
    resampled_df['period_prod'] = resampled_df['click']
    resampled_df = resampled_df[['time_line', 'click', 'period_prod']]

    # Фильтрация данных на основе параметров смены
    resampled_df['time'] = resampled_df['time_line'].dt.time
    resampled_df = resampled_df[(resampled_df['time'] >= shift_start) & (resampled_df['time'] <= shift_end)]

    return resampled_df

# Обработка данных телеметрии из БД для таблицы
def get_telemetry_tube_table(sensor_data):
    table_data = {}
    df = sensor_data

    # Расчет времени начала и окончания процесса
    start_work = df['time_line'][df['period_prod'] > config.threshold].iloc[0].to_pydatetime()
    end_work = df['time_line'][df['period_prod'] > config.threshold].iloc[-1].to_pydatetime()
    # Фильтрация данных на основе параметров времени
    filter_df_to_sum = df[(df['time_line'] >= start_work) & (df['time_line'] <= end_work)]
    total_done = filter_df_to_sum['period_prod'].sum()
    # Маска-условие для режима низкой производительности
    low_prod_mask = filter_df_to_sum['period_prod'] <= config.threshold
    # Маска-условие для режима простоя
    downtime_mask = filter_df_to_sum['period_prod'] <= config.downtime_threshold
    # Расчет времени простоя и низкой производительности
    time_interval = (df['time_line'].iloc[1] - df['time_line'].iloc[0]).total_seconds()
    low_prod_mins = (low_prod_mask.sum() * time_interval) / 60
    downtime_mins = (downtime_mask.sum() * time_interval) / 60
    # Расчет длительности процесса и производительности
    duration = end_work - start_work
    duration_hours, remainder = divmod(duration.total_seconds(), 3600)
    duration_minutes = remainder / 60
    duration_norm = duration_hours + (duration_minutes / 60)
    productivity = total_done / duration_norm
    # Форматирование параметров для вывода на фронт
    start_work_time = start_work.strftime('%H:%M')
    end_work_time = end_work.strftime('%H:%M')
    total_done_show = f'{total_done} ед'
    duration_time = f'{duration_hours} ч {duration_minutes} мин'
    productivity_norm = f'{round(productivity, 2)} ед/час'
    low_prod_mins = f'{low_prod_mins} мин'
    downtime_mins = f'{downtime_mins} мин'

    table_data = {
        'start_work_time': start_work_time,
        'end_work_time': end_work_time,
        'total_done_show': total_done_show,
        'duration_time' : duration_time,
        'productivity_norm': productivity_norm,
        'low_prod_mins': low_prod_mins,
        'downtime_mins': downtime_mins
    }

    return table_data

def get_date(date_str):
    if not date_str:
        return Response({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
    
    return date