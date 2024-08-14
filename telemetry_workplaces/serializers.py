from rest_framework import serializers # type: ignore
from .models import Logos1

class Logos1Serializer(serializers.ModelSerializer):

    class Meta:
        model = Logos1
        fields = '__all__'