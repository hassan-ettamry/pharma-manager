from rest_framework.routers import DefaultRouter
from .views import VenteViewSet

router = DefaultRouter()
router.register("", VenteViewSet)

urlpatterns = router.urls