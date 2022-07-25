from rest_framework import serializers
from pokemon import models

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'name',
            'number',
            'image_front',
            'image_back',
        )
        model = models.Pokemon