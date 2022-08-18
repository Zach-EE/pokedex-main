# apis/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PokemonViewSet, TypeViewSet

router = DefaultRouter()
router.register('pokemon', PokemonViewSet, basename='pokemon')
router.register('type', TypeViewSet, basename='type')

# urlpatterns = [
#     path('', listPokemon.as_view()),
#     path('<int:pk>/', DetailPokemon.as_view()),
    
# ]
urlpatterns = router.urls 
