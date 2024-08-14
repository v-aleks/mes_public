from django.db import models

# Модель для таблицы Процессов
class Process(models.Model):
    date = models.DateField("Дата", default=None)
    machine = models.CharField("Машина", max_length=240, default=None)
    process_type = models.CharField("Тип процесс", max_length=240, default=None)
    product = models.CharField("Продукт", max_length=240, default=None)
    serie = models.IntegerField("Серия", default=0)
    shelf_life = models.IntegerField("Срок годности", default=0)
    start_time = models.TimeField("Время начала", default='09:00')
    end_time = models.TimeField("Время окончания", default='21:00')
    person_count = models.IntegerField("Количество человек", default=1)
    expire = models.CharField("Годен до", max_length=240, default=0)
    is_packed = models.BooleanField("Расфасовано", default=False)
    duration_dt = models.CharField("Длительность процесса", max_length=240, default="0")
    duration = models.FloatField("Длительность в часах", default=0)
    capacity = models.FloatField("Трудозатраты", default=0)

    def __str__(self):

        return f'{self.date} - {self.product}'