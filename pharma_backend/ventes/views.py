from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Vente
from .serializers import VenteSerializer


@extend_schema_view(
    list=extend_schema(
        description="Retrieve sales history",
        tags=["Sales"]
    ),
    retrieve=extend_schema(
        description="Retrieve sale details",
        tags=["Sales"]
    ),
    create=extend_schema(
        description="Create a new sale and deduct stock",
        tags=["Sales"]
    ),
)
class VenteViewSet(ModelViewSet):
    """
    API endpoint for managing pharmacy sales.
    """

    queryset = Vente.objects.all()
    serializer_class = VenteSerializer

    @extend_schema(
        description="Cancel a sale and restore medicament stock",
        tags=["Sales"],
        responses={200: "Sale cancelled successfully"}
    )
    @action(detail=True, methods=["post"])
    def annuler(self, request, pk=None):

        vente = self.get_object()

        if vente.statut == "ANNULEE":
            return Response(
                {"detail": "La vente est déjà annulée"},
                status=status.HTTP_400_BAD_REQUEST
            )

        for ligne in vente.lignes.all():

            medicament = ligne.medicament
            medicament.stock_actuel += ligne.quantite
            medicament.save()

        vente.statut = "ANNULEE"
        vente.save()

        return Response(
            {"detail": "Vente annulée et stock restauré"},
            status=status.HTTP_200_OK
        )