from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


# Модель Project
class Project(models.Model):
    name = models.CharField('Название проекта', 
                            max_length=255,
                            default='Название проекта')
    description = models.TextField('Описание проекта',
                                   default='Добавьте описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


# Модель Task
class Task(models.Model):
    project = models.ForeignKey(Project, 
                                on_delete=models.CASCADE, 
                                related_name='tasks')
    start_date = models.DateTimeField('Дата начала', default=datetime.now())
    end_date = models.DateTimeField('Дата окончания', default=datetime.now())
    name = models.CharField('Название задачи',
                            max_length=255,
                            default='Название задачи')
    description = models.TextField('Описание задачи',
                                   default='Описание')
    mark = models.FloatField('Оценка',
                             default=0)

    def __str__(self):
        return f'Задача {self.name}: {self.start_date} - {self.end_date}'
    
    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'


# Модель Component
class Component(models.Model):
    name = models.CharField('Название компонента',
                            max_length=255,
                            default='Название')
    title_1c = models.CharField('Номенклатура 1С',
                               max_length=255,
                               default='Номенклатура')
    short_name = models.CharField('Шифрованное название',
                            max_length=255,
                            default='Шифр')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Компонент'
        verbose_name_plural = 'Компоненты'


# Модель Recipe
class Recipe(models.Model):
    STATUS_CHOICES = (
        ('planned', 'Запланировано'),
        ('assigned', 'На сборке'),
        ('done', 'Собрано'),
        ('on_review', 'Отправлено'),
        ('confirmed', 'Подтверждено'),
        ('denied', 'Не подтверждено'),
    )
    date = models.DateTimeField('Дата сборки',
                                default=datetime.now())
    name = models.CharField('Название рецепта',
                            max_length=255,
                            default='Название')
    task = models.ForeignKey(Task, 
                             on_delete=models.CASCADE, 
                             related_name='recipes')
    comment = models.CharField('Комментарий',
                            max_length=255,
                            default='Комментарий')
    technology = models.CharField('Описание сборки',
                            max_length=255,
                            default='Описание процесса сборки')
    person = models.ForeignKey(User,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='recipes')
    status = models.CharField('Статус',
                              max_length=20, 
                              choices=STATUS_CHOICES,
                              default='planned')
    ph = models.FloatField('рН', 
                           default=7,
                           blank=True,
                           null=True)
    viscosity = models.IntegerField('Вязкость',
                                    blank=True,
                                    null=True,
                                    default=1)
    stability = models.BooleanField('Коллоидная стабильность',
                                    blank=True,
                                    null=True,
                                    default=False)

    def __str__(self):
        return f"{self.name} - {self.task.name}"
    
    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'
        ordering = ['-date']


# Модель RecipeComponent
class RecipeComponent(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    concentration = models.FloatField('Концентрация',
                                      default=0)
    phase = models.IntegerField('Фаза',
                                      default=0)
    component_order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.component.name}"
    
    class Meta:
        ordering = ['component_order']
        verbose_name = 'Компонент'
        verbose_name_plural = 'Компоненты'