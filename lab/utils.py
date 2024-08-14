from erp.utils import convert_google_sheet_url
import pandas as pd

def get_recipe_from_url (url):
  new_url = convert_google_sheet_url(url)
  df = pd.read_csv(new_url)
  df = df[['Название компонента', 'Фаза', 'Расчет партии, кг', 'Описание процесса:']]
  df.drop(df.tail(1).index,inplace=True)

  return df