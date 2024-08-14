import re
import numpy as np
import pandas as pd


# Функция конвертирует ссылку на гугл-таблицы в csv формат
def convert_google_sheet_url(url):
    pattern = r'https://docs\.google\.com/spreadsheets/d/([a-zA-Z0-9-_]+)(/edit#gid=(\d+)|/edit.*)?'
    replacement = lambda m: f'https://docs.google.com/spreadsheets/d/{m.group(1)}/export?' + (f'gid={m.group(3)}&' if m.group(3) else '') + 'format=csv'
    new_url = re.sub(pattern, replacement, url)

    return new_url


# Функция получения датафрейма брака
def get_defect_raw():
  #Инициализация параметров
    df_defect = None

    #Ссылка на таблицу процессов:
    url_defect = ''

    #Конвертация в CSV
    new_url_defect = convert_google_sheet_url(url_defect)

    #Получение ДФ:
    df_defect = pd.read_csv(new_url_defect)

    #Очистка пустых строк
    df_defect.loc[(df_defect["Тип_процесса"] == "Розлив ручной") & (df_defect["Машина"].isna()), "Машина"] = "Ручная"
    df_defect.loc[(df_defect["Процент_брака"] == 0) & (df_defect["Комплектующее"].isna()), "Комплектующее"] = "П\Ф"
    df_defect = df_defect.dropna()

    # Приведение типа данных для продукта и типа процесса к строковому
    df_defect["Дата"] = pd.to_datetime(df_defect['Дата'], dayfirst=True)
    df_defect['Продукт'] = df_defect['Продукт'].astype(str)
    df_defect['Тип_процесса'] = df_defect['Тип_процесса'].astype(str)
    

    df_defect['Серия'] = df_defect['Серия'].astype(str).str.replace('.0','')
    df_defect['Процент_брака'] = df_defect['Процент_брака'].str.replace(',', '.').astype(float)

    return df_defect


# Получение датафрейма процессов
def get_op_data ():

    ##Ссылка на таблицу данных о процессах:
    url_op = ''

    #Конвертация в CSV
    new_url_op = convert_google_sheet_url(url_op)

    #Получение ДФ:
    df_op = pd.read_csv(new_url_op)

    #Препроцессинг
    df_op.loc[(df_op["Тип_процесса"] == "Розлив ручной") & (df_op["Машина"].isna()), "Машина"] = "Ручная"
    df_op.loc[(df_op["Тип_процесса"] == "Варка ручная") & (df_op["Машина"].isna()), "Машина"] = "Ручная"
    df_op = df_op.dropna()

    df_op["Дата_начала"] = pd.to_datetime(df_op['Дата_начала'], dayfirst=True)
    df_op["Время_окончания"] = pd.to_datetime(df_op['Время_окончания'])
    df_op["Время_начала"] = pd.to_datetime(df_op['Время_начала'])
    
    
    #Добавление столбцов с параметрами
    df_op["Длительность_процесса"] = df_op["Время_окончания"] - df_op["Время_начала"]
    df_op['Длительность_процесса'] = pd.to_timedelta(df_op['Длительность_процесса'])
    df_op['Длительность_в_часах'] = df_op['Длительность_процесса'].dt.total_seconds() / 3600
    df_op['Емкость_процесса'] = round((df_op["Длительность_в_часах"] * df_op['Количество_человек']), 2)
    df_op["Время_окончания"] = pd.to_datetime(df_op['Время_окончания'])
    df_op["Время_начала"] = pd.to_datetime(df_op['Время_начала'])


    return df_op


# Функция записи датафрейма в БД
def to_django(df, DjangoModel, if_exists="fail"):
    """Uses bulk_create to insert data to Django table
    if_exists: see pd.DataFrame.to_sql API
    """
    import numpy as np

    if if_exists not in ["fail", "replace", "append"]:
        raise Exception("if_exists must be fail, replace or append")

    if if_exists == "replace":
        DjangoModel.objects.all().delete()
    elif if_exists == "fail":
        if DjangoModel.objects.all().count() > 0:
            raise ValueError("Data already exists in this table")
    else:
        pass

    dct = df.replace({np.nan: None}).to_dict(
        "records"
    )  # replace NaN with None since Django doesn't understand NaN

    bulk_list = []
    for x in dct:
        bulk_list.append(DjangoModel(**x))
    DjangoModel.objects.bulk_create(bulk_list)
    print("Successfully saved DataFrame to Django table.")