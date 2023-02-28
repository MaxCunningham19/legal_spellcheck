import rest_framework
from django.shortcuts import render, get_list_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Document, Block
from .serializers import DocumentSerializer, BlockSerializer, MistakeSerializer

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DocumentDetail(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

@api_view()
def get_document_blocks(request, pk):
    blocks = Block.objects.filter(block_document=pk)
    serializer = BlockSerializer(blocks, many=True)
    return Response(serializer.data, status=200)

@api_view()
def check_document_blocks(request, pk):
    mistakes = [dict(block_order=block.block_order,
                     mistakes=MistakeSerializer(block.spellcheck(), many=True).data) \
                for block in Block.objects.filter(block_document=pk)]
    return Response(mistakes, status=200)

@api_view()
def add_documents(request):
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)