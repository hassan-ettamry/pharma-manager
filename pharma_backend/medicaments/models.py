from django.db import models
from apps.categories.models import Category


class Medicament(models.Model):

    nom = models.CharField(max_length=255)
    dci = models.CharField(max_length=255)

    categorie = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="medicaments"
    )

    forme = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)

    prix_achat = models.DecimalField(max_digits=10, decimal_places=2)
    prix_vente = models.DecimalField(max_digits=10, decimal_places=2)

    stock_actuel = models.IntegerField()
    stock_minimum = models.IntegerField()

    date_expiration = models.DateField()

    ordonnance_requise = models.BooleanField(default=False)

    date_creation = models.DateTimeField(auto_now_add=True)

    est_actif = models.BooleanField(default=True)

    def __str__(self):
        return self.nom