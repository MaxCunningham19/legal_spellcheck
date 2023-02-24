from rest_framework import serializers
from . import models

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'created_at', 'updated_at',)
        model = models.Document

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('block_order', 'block_content')
        model = models.Block

class MistakeSerializer(serializers.Serializer):
    word = serializers.CharField(max_length=200)
    start = serializers.IntegerField()
    end = serializers.IntegerField()
    suggestions = serializers.ListField(
        child=serializers.CharField(max_length=200),
        allow_empty=True
    )
