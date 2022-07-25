from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from pokemon import models
from .serializers import PokemonSerializer

class listPokemon(generics.ListCreateAPIView):
    queryset = models.Pokemon.objects.all()
    serializer_class = PokemonSerializer
    
class DetailPokemon(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Pokemon.objects.all()
    serializer_class = PokemonSerializer