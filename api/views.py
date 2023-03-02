import json
import rest_framework
from django.http import HttpRequest
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

@api_view(['POST'])
def add_documents(request: HttpRequest):
    doclist = json.loads(request.body.decode())
    for document in doclist['documents']:
        doc_object = Document.objects.create(title= document['title'])
        for order, block in enumerate (document['blocks']):
            doc_object.block_set.create(
                block_document=doc_object,
                block_content=block,
                block_order=order
            )
    return Response(status=201)