from django.db import models

class Logos(models.Model):
    click = models.CharField(db_column='Click', max_length=1)
    time_line = models.DateTimeField(db_column='Time_line', primary_key=True)
    mk_id = models.CharField(db_column='Mk_id', max_length=3)
    sens_id = models.CharField(db_column='Sens_id', max_length=6)

    class Meta:
        managed = False
        db_table = 'Logos'
        unique_together = (('time_line', 'mk_id', 'sens_id'))