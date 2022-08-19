# apis/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PokemonViewSet, TypeViewSet, UserViewSet, ActiveUser

router = DefaultRouter()
router.register('pokemon', PokemonViewSet, basename='pokemon')
router.register('type', TypeViewSet, basename='type')
router.register('users', UserViewSet,basename='users' )

# urlpatterns = [
#     path('', listPokemon.as_view()),
#     path('<int:pk>/', DetailPokemon.as_view()),
    
# ]
urlpatterns = router.urls + [
    path('activeuser/', ActiveUser.as_view())
]
