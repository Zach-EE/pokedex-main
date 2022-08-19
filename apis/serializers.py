from rest_framework import serializers
from users.models import CustomUser
from pokemon.models import Pokemon, Type

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'number',
            'name',
            'height',
            'weight',
            'image_front',
            'image_back',
            'caught_by',
        )
        model = Pokemon
        

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'type',
            'pokemon',
        )
        model = Type
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'caught',
            'username'
        )
        model = CustomUser