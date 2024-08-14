from django.urls import path
from .views import *


urlpatterns = [
    path('tube_chart/', TubeSensorView.as_view(), name='tube_chart'),
    path('tube_table/', TabeTableView.as_view(), name='tube_table'),
    path('database-status/', database_status, name='database_status'),

]