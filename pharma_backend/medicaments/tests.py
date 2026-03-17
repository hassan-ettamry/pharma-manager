from django.test import TestCase
from .models import Medicament
from .serializers import MedicamentSerializer
from categories.models import Category

from rest_framework.test import APITestCase
from rest_framework import status


class MedicamentSerializerTest(TestCase):

    def setUp(self):
        self.category = Category.objects.create(nom="Test Cat")

    def test_serializer_valid_data(self):
        data = {
            "nom": "Doliprane",
            "dci": "Paracetamol",
            "categorie": self.category.id,
            "forme": "Comprime",
            "dosage": "500mg",
            "prix_achat": 5,
            "prix_vente": 10,
            "stock_actuel": 100,
            "stock_minimum": 10,
            "date_expiration": "2027-01-01",
            "ordonnance_requise": False,
            "est_actif": True,
        }

        serializer = MedicamentSerializer(data=data)

        self.assertTrue(serializer.is_valid())

class MedicamentViewTest(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(nom="Test Cat")

    def test_create_medicament_api(self):
        data = {
            "nom": "TestMed",
            "dci": "Test",
            "categorie": self.category.id,
            "forme": "Comprime",
            "dosage": "500mg",
            "prix_achat": 5,
            "prix_vente": 10,
            "stock_actuel": 100,
            "stock_minimum": 10,
            "date_expiration": "2027-01-01",
            "ordonnance_requise": False,
            "est_actif": True,
        }

        response = self.client.post("/api/v1/medicaments/", data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)