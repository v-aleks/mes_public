from django.db import models
from django.contrib.auth.models import User
from lab.models import Project, Recipe
from datetime import datetime


class Feedback(models.Model):
    STATUS_CHOICES = (
        ('created', 'Запрос создан'),
        ('pending', 'Запрос отправлен'),
        ('recieved', 'Ответ получен'),
        ('processed', 'Ответ обработан'),
    )
    initial_author = models.ForeignKey(User,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='initial')
    responsible_person = models.ForeignKey(User,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='responsible')
    project = models.ForeignKey(Project,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='feedbacks')
    recipe = models.ForeignKey(Recipe,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='feedbacks')
    date_created = models.DateTimeField('Дата создания запроса', 
                                        default=datetime.now())
    date_answered = models.DateTimeField('Дата получения обратной связи', 
                                         default=datetime.now())
    status = models.CharField('Статус',
                              max_length=20, 
                              choices=STATUS_CHOICES,
                              default='created')
    comment = models.TextField('Комментарий',
                               default='Развернутый комментарий')
    
    def __str__(self):
        return f"{self.project.name} - {self.recipe.name}"
    
    class Meta:
        verbose_name = 'Обратная связь'
        verbose_name_plural = 'Обратные связи'


class Question (models.Model):
    feedback = models.ForeignKey(Feedback,
                               default=1, 
                               on_delete=models.CASCADE, 
                               related_name='feedbacks')
    text = models.TextField('Вопрос',
                            default='Вопрос')
    
    def __str__(self):
        return f"{self.feedback.recipe.name} - {self.text}"
    

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'


class Choice(models.Model):
    question = models.ForeignKey(Question, 
                                 on_delete=models.CASCADE)
    text = models.CharField('Ответ', 
                            max_length=200,
                            default='Ответ')
    votes = models.IntegerField('Оценка',
                                default=0)
    
    def __str__(self):
        return f"{self.question.text} - {self.text}"
    

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'