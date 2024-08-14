from django.db import models


# Модель для таблицы Брака
class Defect(models.Model):
    date = models.DateField("Дата", default=None)
    source = models.CharField("Источник", max_length=240, default=None)
    machine = models.CharField("Машина", max_length=240, default=None)
    process_type = models.CharField("Тип процесс", max_length=240, default=None)
    product = models.CharField("Продукт", max_length=240, default=None)
    serie = models.IntegerField("Серия", default=None)
    assemble_order = models.IntegerField("Заказ на сборку", default=None)
    total_done_good = models.IntegerField("Произведено, не считая брак", default=None)
    total_done_defect = models.IntegerField("Произведено брак", default=None)
    defect_rate = models.FloatField("Процент брака", default=0)
    component = models.CharField("Комплектующее", max_length=240, default=None)
    
    def __str__(self):
        return f'{self.date} - {self.product}'
    

# Модель для таблицы Забракованные варки
class DefectBatch(models.Model):
    date = models.DateField("Дата", default=None)
    person = models.CharField("Ответственный", max_length=240, default=None)
    product = models.CharField("Продукт", max_length=240, default=None)
    serie = models.IntegerField("Серия", default=None)
    quantity = models.FloatField("Количество", default=0)
    description = models.TextField("Описание", default=None)
    
    def __str__(self):
        return f'{self.date} - {self.product}, серия {self.serie}'
    

# Модель для текстовой части отчета по качеству
class QualityReportText(models.Model):
    date = models.DateField("Дата", default=None)
    dpmo = models.FloatField("Дефектов на миллион возможностей", default=0)
    sigma_level = models.FloatField("Сигма уровень", default=0)
    text = models.TextField("Текст", default=None)

    def __str__(self):
        return f'{self.date}'