from rest_framework.viewsets import ModelViewSet
from drf_spectacular.utils import extend_schema_view, extend_schema

from .models import Category
from .serializers import CategorySerializer


@extend_schema_view(
    list=extend_schema(
        description="Retrieve list of all medicament categories",
        tags=["Categories"]
    ),
    retrieve=extend_schema(
        description="Retrieve details of a specific category",
        tags=["Categories"]
    ),
    create=extend_schema(
        description="Create a new medicament category",
        tags=["Categories"]
    ),
    update=extend_schema(
        description="Update an existing category",
        tags=["Categories"]
    ),
    destroy=extend_schema(
        description="Delete a category",
        tags=["Categories"]
    ),
)
class CategoryViewSet(ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer