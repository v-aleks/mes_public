from django.contrib.auth import authenticate, login
from rest_framework import status # type: ignore
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny # type: ignore
from rest_framework.response import Response # type: ignore
from .serializers import *
from .to_sql import get_defect_raw, to_django, get_op_data
from rest_framework.views import APIView # type: ignore
from quality.models import Defect
from production.models import Process



@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is not None:
            login(request._request, user)  # Используем request._request
            return Response({'status': 'Success'})
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)
    

class SyncView(APIView):
    def get(self, request):
        if request.method == "GET":
            df = get_defect_raw()
            df.rename(columns = {'Дата':'date', 
                                'Источник':'source', 
                                'Машина':'machine', 
                                'Тип_процесса':'process_type', 
                                'Продукт':'product', 
                                'Серия':'serie',
                                'Номер_заказа_на _сборку':'assemble_order',
                                'Количество_произведенного_продукта_НЕ_считая_брак':'total_done_good',
                                'Количество_брака':'total_done_defect',
                                'Процент_брака':'defect_rate',
                                'Комплектующее':'component',
                                }, 
                                inplace=True)
            dfp = get_op_data()
            dfp.rename(columns = {'Дата_начала':'date', 
                                'Продукт':'product', 
                                'Серия':'serie', 
                                'Срок_годности':'shelf_life', 
                                'Время_начала':'start_time', 
                                'Время_окончания':'end_time',
                                'Тип_процесса':'process_type',
                                'Машина':'machine',
                                'Количество_человек':'person_count',
                                'Годен_до':'expire',
                                'Расфасовано':'is_packed',
                                'Длительность_процесса':'duration_dt',
                                'Длительность_в_часах':'duration',
                                'Емкость_процесса':'capacity',
                                }, 
                                inplace=True)
            to_django(df, Defect, if_exists='replace')
            to_django(dfp, Process, if_exists='replace')

            message = 'Данные успешно синхронизированы'

            return Response(message, status=status.HTTP_200_OK)
