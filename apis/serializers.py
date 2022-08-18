from rest_framework import serializers
from pokemon import models

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
        model = models.Pokemon
        

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'type',
            'pokemon',
        )
        model = models.Type