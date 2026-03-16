from django.db import models
from medicaments.models import Medicament


class Vente(models.Model):

    STATUT_CHOICES = [
        ("EN_COURS", "En cours"),
        ("COMPLETEE", "Complétée"),
        ("ANNULEE", "Annulée"),
    ]

    reference = models.CharField(max_length=50, unique=True)

    date_vente = models.DateTimeField(auto_now_add=True)

    total_ttc = models.DecimalField(max_digits=10, decimal_places=2)

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default="EN_COURS"
    )

    notes = models.TextField(blank=True)


class LigneVente(models.Model):

    vente = models.ForeignKey(
        Vente,
        on_delete=models.CASCADE,
        related_name="lignes"
    )

    medicament = models.ForeignKey(
        Medicament,
        on_delete=models.PROTECT
    )

    quantite = models.IntegerField()

    prix_unitaire = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    sous_total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )