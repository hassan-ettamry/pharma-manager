from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models

from .models import Medicament
from .serializers import MedicamentSerializer


class MedicamentViewSet(ModelViewSet):

    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    @action(detail=False, methods=["get"])
    def alertes(self, request):

        low_stock = Medicament.objects.filter(
            stock_actuel__lte=models.F("stock_minimum"),
            est_actif=True
        )

        serializer = self.get_serializer(low_stock, many=True)

        return Response(serializer.data)