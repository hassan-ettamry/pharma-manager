from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Medicament
from .serializers import MedicamentSerializer

import csv
from django.http import HttpResponse


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
    ViewSet for managing medicaments.

    Features:
    - CRUD operations
    - Soft delete (est_actif)
    - Filtering (categorie, ordonnance_requise)
    - Search (nom, dci)
    - Low stock alerts
    - CSV export
    """

    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    # Enable filtering and search
    filter_backends = [DjangoFilterBackend, SearchFilter]

    # Filter by category and ordonnance requirement
    filterset_fields = ["categorie", "ordonnance_requise"]

    # Search by name or DCI
    search_fields = ["nom", "dci"]

    def perform_destroy(self, instance):
        """
        Soft delete a medicament by setting est_actif to False
        instead of removing it from database.
        """
        instance.est_actif = False
        instance.save()

    @action(detail=False, methods=["get"])
    def alertes(self, request):
        """
        Return medicaments with low stock.

        Condition:
        stock_actuel <= stock_minimum
        """
        low_stock = Medicament.objects.filter(
            stock_actuel__lte=F("stock_minimum")
        )

        serializer = self.get_serializer(low_stock, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def export_csv(self, request):
        """
        Export medicaments data as CSV file.

        Fields included:
        - ID
        - Nom
        - DCI
        - Stock
        - Prix Vente
        """

        # Create HTTP response with CSV content type
        response = HttpResponse(content_type="text/csv")

        # Set file name for download
        response["Content-Disposition"] = 'attachment; filename="medicaments.csv"'

        writer = csv.writer(response)

        # Write CSV header
        writer.writerow(["ID", "Nom", "DCI", "Stock", "Prix Vente"])

        # Get active medicaments
        medicaments = self.get_queryset()

        # Write each medicament row
        for m in medicaments:
            writer.writerow([
                m.id,
                m.nom,
                m.dci,
                m.stock_actuel,
                m.prix_vente
            ])

        return response