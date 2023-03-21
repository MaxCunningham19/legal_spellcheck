from django.db import IntegrityError
from django.http import HttpRequest
from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from .models import Document, Block
from rest_framework.response import Response
from rest_framework.request import Request
from django.db.models import Max, F
from .serializers import DocumentSerializer, BlockSerializer, MistakeSerializer

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DocumentDetail(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

@api_view(['GET', 'DELETE', 'PUT', 'POST'])
def document_view(request, pk):
    document = get_object_or_404(Document, id=pk)
    if request.method == 'GET':
        serializer = BlockSerializer(document.block_set.all(), many=True)
        return Response(serializer.data, status=200)
    elif request.method == 'DELETE':
        document.delete()
        return Response(status=204)
    elif request.method == 'PUT':
        try:
            document.title = request.body.decode()
            document.save()
            return Response(status=201)
        except IntegrityError:
            return Response(status=400)

@api_view(['DELETE', 'PUT', 'POST'])
def block_view(request, pk, bo):
    if request.method == 'DELETE':
        block = get_object_or_404(Block, block_document=pk, block_order=bo)
        block.delete()
        Block.objects.filter(
            block_order__gte=bo,
            block_document=pk
        ).update(
            block_order=F('block_order') - 1
        )
        return Response(status=204)
    elif request.method == 'PUT':
        block = get_object_or_404(Block, block_document=pk, block_order=bo)
        block.block_content = request.body.decode()
        block.save()
        return Response(status=204)
    elif request.method == 'POST':
        document = Document.objects.get(id=pk)
        blocks = document.block_set.filter(block_order__gte=bo).order_by('-block_order')
        for block in blocks:
            block.block_order = block.block_order + 1
            block.save(force_update=True)
        # If we get an block order that is greater than the highest
        # preceding block, we need to insert at that block order plus
        # one rather than the given block order.
        highest_preceding_block = document.block_set \
                              .filter(block_order__lt=bo) \
                              .aggregate(Max('block_order'))['block_order__max'] or -1
        document.block_set.create(
            block_order =  min(highest_preceding_block + 1, bo),
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
    for document in request.data['documents']:
        doc_object = Document.objects.create(title= document['title'])
        for order, block in enumerate (document['blocks']):
            doc_object.block_set.create(
                block_document=doc_object,
                block_content=block,
                block_order=order
            )
    return Response(status=201)
