from django.shortcuts import render
from rest_framework import status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
import pandas as pd
from .utils import *
from .models import Recipe, RecipeComponent, Component
from datetime import datetime


class LabComponentReport(APIView):
    def get(self, request):
        recipe_components_data = []
        report_id = []

        # Получение периода дат из запроса
        start_date = datetime.strptime(request.GET.get('start_date'), '%Y-%m-%d')
        end_date = datetime.strptime(request.GET.get('end_date'), '%Y-%m-%d')

        # Фильтрация рецептов за выбранный период дат
        recipes = Recipe.objects.filter(date__range=(start_date, end_date))
        for recipe in recipes:
            report_id.append(recipe.id)

        # Получение списка компонентов отфильтрованных рецептов
        recipe_components = RecipeComponent.objects.filter(recipe__in=report_id)
        for component in recipe_components:
            recipe_components_data.append({
                'component_id': component.component.id,
                'component_title_1c': component.component.title_1c,
                'component_name': component.component.name,
                'concentration': component.concentration
            })

        # Преобразование данных в датафрейм и группировка компонентов
        df = pd.DataFrame(recipe_components_data)

        # Группировка данных и агрегирование концентрации
        report_data = df.groupby('component_id').agg({
            'concentration': 'sum',
            'component_title_1c': 'first',
            'component_name': 'first'
        }).reset_index()

        return Response(report_data.to_dict(orient='records'), status=status.HTTP_200_OK)
    

class RecipeURL(APIView):
    def get(self, request):
        recipe_data = []
        recipe_description = []
        # Получение ссылки из формы
        url = request.GET.get('url')
        # Если ссылка не пустая
        if url:
            # Парсинг таблицы из ссылки
            df = get_recipe_from_url(url)

            for index, row in df.iterrows():
                recipe_data.append({
                    'component': row['Название компонента'],
                    'phase': row['Фаза'],
                    'concentration': row['Расчет партии, кг'],
                })
            recipe_description.append({'description': df['Описание процесса:'].values[0]})

        return Response({'recipe_data': recipe_data, 'recipe_description': recipe_description}, status=status.HTTP_200_OK)