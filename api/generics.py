from rest_framework import generics
from . import models
from . import serializers

class DocumentList(generics.ListAPIView):
    queryset = models.Document.objects.all()
    serializer_class = serializers.DocumentSerializer

class DocumentDetail(generics.RetrieveAPIView):
    queryset = models.Document.objects.all()
    serializer_class = serializers.DocumentSerializer


class DocumentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Document.objects.all()
    serializer_class = serializers.DocumentSerializer
