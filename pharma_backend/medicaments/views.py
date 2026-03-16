from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

from .models import Medicament
from .serializers import MedicamentSerializer


class MedicamentViewSet(ModelViewSet):

    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    def perform_destroy(self, instance):
        """
        Soft delete medicament
        """
        instance.est_actif = False
        instance.save()

    @action(detail=False, methods=["get"])
    def alertes(self, request):
        """
        Return medicaments with low stock
        """

        low_stock = Medicament.objects.filter(
            stock_actuel__lte=F("stock_minimum")
        )

        serializer = self.get_serializer(low_stock, many=True)

        return Response(serializer.data)