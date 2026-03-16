from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Medicament
from .serializers import MedicamentSerializer


class MedicamentViewSet(ModelViewSet):
    """
    API for managing medicaments.
    """

    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    # Filters and search
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["categorie", "ordonnance_requise"]
    search_fields = ["nom", "dci"]

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