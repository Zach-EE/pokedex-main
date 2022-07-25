# apis/urls.py
from django.urls import path

from .views import listPokemon, DetailPokemon

urlpatterns = [
    path('', listPokemon.as_view()),
    path('<int:pk>/', DetailPokemon.as_view()),
]