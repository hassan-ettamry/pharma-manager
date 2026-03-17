from django.test import TestCase
from rest_framework.test import APITestCase
from medicaments.models import Medicament
from categories.models import Category


class VenteStockTest(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(nom="Test")

        self.medicament = Medicament.objects.create(
            nom="TestMed",
            dci="Test",
            categorie=self.category,
            forme="Comprime",
            dosage="500mg",
            prix_achat=5,
            prix_vente=10,
            stock_actuel=100,
            stock_minimum=10,
            date_expiration="2027-01-01"
        )

    def test_create_sale_reduces_stock(self):
        data = {
            "reference": "V-1",
            "statut": "EN_COURS",
            "notes": "Test",
            "lignes": [
                {
                    "medicament": self.medicament.id,
                    "quantite": 5,
                    "prix_unitaire": 10,
                }
            ],
        }

        self.client.post("/api/v1/ventes/", data, format="json")

        self.medicament.refresh_from_db()

        self.assertEqual(self.medicament.stock_actuel, 95)

def test_cancel_sale_restores_stock(self):
    # create sale first
    data = {
        "reference": "V-2",
        "statut": "EN_COURS",
        "notes": "Test",
        "lignes": [
            {
                "medicament": self.medicament.id,
                "quantite": 5,
                "prix_unitaire": 10,
            }
        ],
    }

    response = self.client.post("/api/v1/ventes/", data, format="json")
    vente_id = response.data["id"]

    # cancel
    self.client.post(f"/api/v1/ventes/{vente_id}/annuler/")

    self.medicament.refresh_from_db()

    self.assertEqual(self.medicament.stock_actuel, 100)