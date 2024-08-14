from django.contrib import admin
from .models import *


admin.site.register(Defect)
admin.site.register(DefectBatch)
admin.site.register(QualityReportText)