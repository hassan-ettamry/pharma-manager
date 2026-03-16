from rest_framework import serializers
from .models import Vente
from .models import LigneVente

class VenteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vente
        fields = "__all__"

class LigneVenteSerializer(serializers.ModelSerializer):

    class Meta:
        model = LigneVente
        fields = "__all__"