from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Medicament
from .serializers import MedicamentSerializer


@extend_schema_view(
    list=extend_schema(
        description="Retrieve all active medicaments",
        tags=["Medicaments"]
    ),
    retrieve=extend_schema(
        description="Retrieve details of a medicament",
        tags=["Medicaments"]
    ),
    create=extend_schema(
        description="Create a new medicament",
        tags=["Medicaments"]
    ),
    update=extend_schema(
        description="Update a medicament",
        tags=["Medicaments"]
    ),
    destroy=extend_schema(
        description="Soft delete a medicament",
        tags=["Medicaments"]
    ),
)
class MedicamentViewSet(ModelViewSet):
    """
    API for managing medicaments.
    """

    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["categorie", "ordonnance_requise"]
    search_fields = ["nom", "dci"]

    def perform_destroy(self, instance):
        """
        Soft delete medicament
        """
        instance.est_actif = False
        instance.save()

    @extend_schema(
        description="Retrieve medicaments with stock below minimum threshold",
        tags=["Medicaments"],
        responses={200: MedicamentSerializer(many=True)}
    )
    @action(detail=False, methods=["get"])
    def alertes(self, request):

        low_stock = Medicament.objects.filter(
            stock_actuel__lte=F("stock_minimum")
        )

        serializer = self.get_serializer(low_stock, many=True)

        return Response(serializer.data)