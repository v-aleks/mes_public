from django.shortcuts import render
from rest_framework import status # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from .models import Process
from datetime import datetime


class ProcessDaily(APIView):
    def get(self, request):
        date_str = request.GET.get('date')
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        process_data = list(Process.objects.filter(date=date).values())

        return Response(process_data, status=status.HTTP_200_OK)