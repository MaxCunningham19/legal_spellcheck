import json
import rest_framework
from django.http import HttpRequest
from django.shortcuts import render, get_list_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Document, Block
from rest_framework.response import Response
from rest_framework.request import Request
from django.db.models import Max
from django.db.models import F
from .serializers import DocumentSerializer, BlockSerializer, MistakeSerializer

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DocumentDetail(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

@api_view(['GET', 'DELETE'])
def document_view(request, pk):
    if request.method == 'GET':
        if not Document.objects.filter(id=pk):                  # Empty lists are considered false in python. not Document.objects.filter(id=pk) will be true only if filter returns an empty list, i.e. document does not exist.
          return Response('Document not found', status=404)
        blocks = Block.objects.filter(block_document=pk)
        serializer = BlockSerializer(blocks, many=True)
        return Response(serializer.data, status=200)
    if request.method == 'DELETE':
        try:    
            block = Document.objects.get(id=pk)
            block.delete()
            return Response(status=204)
        except Block.DoesNotExist:
            return rest_framework.response.Response(status=404)

@api_view(['DELETE', 'PUT', 'POST'])
def block_view(request, pk, bo):
    if not Document.objects.filter(id=pk):
            return Response(status=404)
    if request.method == 'DELETE':
        try:    
            block = Block.objects.get(block_document=pk, block_order=bo)
            block.delete()
            Block.objects.filter(
                block_order__gte=bo,
                block_document=pk
            ).update (
                block_order=F('block_order') - 1
            )
            return Response(status=204)
        except Block.DoesNotExist:
            return Response(status=409)
    if request.method == 'PUT':
        try:
            block = Block.objects.get(block_document=pk, block_order=bo)
            block.block_content = request.body.decode()
            block.save()
            return Response(status=204)
        except Block.DoesNotExist:
            return Response(status=404)
    if request.method == 'POST':
        document = Document.objects.get(id=pk)
        try:
            block = Block.objects.get(block_document=pk, block_order=bo)
            blocks = Block.objects.filter(
                block_order__gte=bo,
                block_document=pk
            ).order_by('-block_order')
            for block in blocks:
                block.block_order = block.block_order + 1
                block.save(force_update=True)
            document.block_set.create(
                block_order = bo,
                block_content = request.body.decode()
            )
            return Response(status=201)
        except Block.DoesNotExist:
            blocks = Block.objects.filter(block_document=pk)
            newest_block = blocks.aggregate(Max('block_order'))['block_order__max']
            document.block_set.create(
                block_order = (newest_block + 1),
                block_content = request.body.decode()
            )
            return Response(status=201)
   
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
