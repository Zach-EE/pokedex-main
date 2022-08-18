from django.shortcuts import render
from rest_framework import generics, viewsets
# Create your views here.
from pokemon.models import Pokemon, Type
from .serializers import PokemonSerializer, TypeSerializer

# class listPokemon(generics.ListCreateAPIView):
#     queryset = Pokemon.objects.all()
#     serializer_class = PokemonSerializer
    
# class DetailPokemon(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Pokemon.objects.all()
#     serializer_class = PokemonSerializer
    

class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer   
    
class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer 