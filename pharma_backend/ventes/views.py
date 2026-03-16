from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Vente
from .serializers import VenteSerializer


class VenteViewSet(ModelViewSet):
    """
    API endpoint for managing pharmacy sales.
    """

    queryset = Vente.objects.all()
    serializer_class = VenteSerializer

    @action(detail=True, methods=["post"])
    def annuler(self, request, pk=None):
        """
        Cancel a sale and restore stock.
        """

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