from django.db import models

# Датчики движения на сборке
class Logos1(models.Model):
    click = models.CharField(db_column='click', max_length=1)
    time_line = models.DateTimeField(db_column='time_line', primary_key=True)
    mk_id = models.CharField(db_column='mk_id', max_length=3)
    sens_id = models.CharField(db_column='sens_id', max_length=6)

    class Meta:
        managed = False
        db_table = 'Logos_1'
        unique_together = (('time_line', 'mk_id', 'sens_id'))