from rest_framework import status, viewsets, response # type: ignore
from rest_framework.response import Response # type: ignore
from .models import Logos1
from .filters import *
from .serializers import *


class WorkplaceViewSet(viewsets.ModelViewSet):
    queryset = Logos1.objects.all()
    serializer_class = Logos1Serializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = WorkPlaceFilter