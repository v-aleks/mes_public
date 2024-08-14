from erp import config
import pandas as pd


def get_defect_rate(df_defect, prev_df_defect):
    defect_rate_data = {}

    avg_defect_rate = round(df_defect.defect_rate.mean(), 2)
    prev_avg_defect_rate = round(prev_df_defect.defect_rate.mean(), 2)
    diff_avg_defect_rate = round(avg_defect_rate - prev_avg_defect_rate, 2)

    defect_rate_data = {'avg_defect_rate': avg_defect_rate,
                        'prev_avg_defect_rate': prev_avg_defect_rate,
                        'diff_avg_defect_rate': diff_avg_defect_rate}

    return defect_rate_data


def get_total_done(df_defect, prev_df_defect):
    total_done_data = {}

    total_done = round(df_defect.total_done_good.unique().sum(), 2)
    prev_total_done = round(prev_df_defect.total_done_good.unique().sum(), 2)
    diff_total_done = round(total_done - prev_total_done, 2)

    total_done_data = {
        'total_done': total_done,
        'prev_total_done': prev_total_done,
        'diff_total_done': diff_total_done,
    }

    return total_done_data


def get_total_done_daily(df_defect, prev_df_defect):
    total_done_daily_data = {}

    total_done_daily = round(get_total_done(df_defect, prev_df_defect)['total_done'] / config.dashboard_period, 2)
    prev_total_done_daily = round(get_total_done(df_defect, prev_df_defect)['prev_total_done'] / config.dashboard_period, 2)   
    diff_total_done_daily = round(total_done_daily - prev_total_done_daily, 2)

    total_done_daily_data = {
        'total_done_daily': total_done_daily,
        'prev_total_done_daily': prev_total_done_daily,
        'diff_total_done_daily': diff_total_done_daily,
    }

    return total_done_daily_data


def get_total_done_defect(df_defect, prev_df_defect):
    total_done_defect_data = {}

    total_done_defect = df_defect.total_done_defect.sum()    
    prev_total_done_defect = prev_df_defect.total_done_defect.sum()
    diff_total_done_defect = round(total_done_defect - prev_total_done_defect, 2)

    total_done_defect_data = {
        'total_done_defect': total_done_defect,
        'prev_total_done_defect': prev_total_done_defect,
        'diff_total_done_defect': diff_total_done_defect,
    }

    return total_done_defect_data


def get_daily_productivity (df_defect, prev_df_defect):
    daily_productivity_data = {}

    daily_productivity = round(get_total_done_daily(df_defect, prev_df_defect)['total_done_daily'] / config.shift_duration, 2)
    prev_daily_productivity = round(get_total_done_daily(df_defect, prev_df_defect)['prev_total_done_daily'] / config.shift_duration, 2)
    diff_daily_productivity = round(daily_productivity - prev_daily_productivity, 2)

    daily_productivity_data = {
        'daily_productivity': daily_productivity,
        'prev_daily_productivity': prev_daily_productivity,
        'diff_daily_productivity': diff_daily_productivity,
    }

    return daily_productivity_data

def get_daily_capacity(df_process, prev_df_process):
    daily_capacity_data = {}
    
    daily_capacity = round(df_process.capacity.sum() / config.dashboard_period, 2)
    prev_daily_capacity = round(prev_df_process.capacity.sum() / config.dashboard_period, 2)
    diff_daily_capacity = round(daily_capacity - prev_daily_capacity, 2)

    daily_capacity_data = {
        'daily_capacity': daily_capacity,
        'prev_daily_capacity': prev_daily_capacity,
        'diff_daily_capacity': diff_daily_capacity,
    }

    return daily_capacity_data