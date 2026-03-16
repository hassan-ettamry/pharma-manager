from rest_framework import serializers
from django.db import transaction

from .models import Vente, LigneVente
from apps.medicaments.models import Medicament


class LigneVenteSerializer(serializers.ModelSerializer):
    """
    Serializer for sale line items.
    """

    class Meta:
        model = LigneVente
        fields = "__all__"


class VenteSerializer(serializers.ModelSerializer):
    """
    Serializer for sales with nested sale lines.
    Handles stock deduction automatically.
    """

    lignes = LigneVenteSerializer(many=True)

    class Meta:
        model = Vente
        fields = "__all__"

    def create(self, validated_data):
        """
        Create a sale and deduct stock from medicaments.
        """

        lignes_data = validated_data.pop("lignes")

        with transaction.atomic():

            vente = Vente.objects.create(**validated_data)

            total = 0

            for ligne in lignes_data:

                medicament = ligne["medicament"]
                quantite = ligne["quantite"]
                prix_unitaire = ligne["prix_unitaire"]

                if medicament.stock_actuel < quantite:
                    raise serializers.ValidationError(
                        f"Stock insuffisant pour {medicament.nom}"
                    )

                # deduct stock
                medicament.stock_actuel -= quantite
                medicament.save()

                sous_total = quantite * prix_unitaire

                LigneVente.objects.create(
                    vente=vente,
                    medicament=medicament,
                    quantite=quantite,
                    prix_unitaire=prix_unitaire,
                    sous_total=sous_total
                )

                total += sous_total

            vente.total_ttc = total
            vente.save()

        return vente