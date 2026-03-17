from django.test import TestCase
from .models import Medicament
from categories.models import Category


class MedicamentTestCase(TestCase):

    def setUp(self):
        self.category = Category.objects.create(nom="Test")

    def test_create_medicament(self):
        medicament = Medicament.objects.create(
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

        self.assertEqual(medicament.nom, "TestMed")