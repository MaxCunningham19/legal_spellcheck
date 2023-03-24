from django.db import IntegrityError
from django.http import HttpRequest
from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Document, Block
from rest_framework.response import Response
from rest_framework.request import Request
from django.db.models import Max, F
from .serializers import (DocumentSerializer, BlockSerializer,
                          MistakeSerializer, PutDocumentSerializer,
                          PutBlockSerializer, PostBlockSerializer)
from django.db import transaction

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
        document = Document.objects.get(id=pk)
        serializer = PutDocumentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        # We want to be able to catch exceptions made by us and only us
        class BadRequest(Exception):
            pass
        try:
            # We will temporarily violate the uniqueness of block
            # document and block order in reconstructing the
            # blocks of the document from the request, so we need
            # to declare the follwing block as a transaction after
            # which constraints will be satisfied again.
            with transaction.atomic():
                if serializer.data.get('title'):
                    document.title = serializer.data['title']
                    document.save()
                if serializer.data.get('blocks') is not None:
                    # We delete all requests that are not present in
                    # the request from the database
                    blocks_in_request = [block['id'] for block in serializer.data['blocks'] \
                                         if block.get('id') is not None]
                    document.block_set.exclude(pk__in=blocks_in_request).delete()
                    # Now, we reconstruct the document
                    sorted_request_blocks = sorted(serializer.data['blocks'],
                                                   key=lambda block: block['block_order'])
                    blocks_to_create = []
                    for block_order, request_block in enumerate(sorted_request_blocks):
                        if block_order != request_block['block_order']:
                            raise BadRequest("Block indices to not start at zero and increase one by one")
                        if request_block.get('id'):
                            # If the block exists in the database,
                            # simply change its order. This may cause two
                            # elements to have the same block order, but
                            # this is fine as by the end of the for loop
                            # there will be no duplicates. This is further
                            # enforced by the database.
                            block = get_object_or_404(Block, pk=request_block['id'])
                            block.block_order = block_order
                            block.block_content = request_block['block_content']
                            block.save()
                        else:
                            # Otherwise, we schedule the creation of a
                            # new block with the correct block order.
                            blocks_to_create.append(
                                Block(
                                    block_document=document,
                                    block_order=block_order,
                                    block_content=request_block['block_content']
                                )
                            )
                    # Here we create all necessary new blocks.
                    Block.objects.bulk_create(blocks_to_create)
        except Block.DoesNotExist as e:
            return Response(str(e), status=404)
        except BadRequest as e:
            # Simply return our error type converted to a string
            return Response(str(e), status=400)
        return Response(DocumentSerializer(document).data, status=201)

class BlockView(APIView):
    def get(self, request: HttpRequest, pk: int):
        block = get_object_or_404(Block, pk=pk)
        return Response(BlockSerializer(block).data, status=200)
    
    def delete(self, request: HttpRequest, pk: int):
        get_object_or_404(Block, pk=pk).delete()
        return Response(status=204)
    
    def put(self, request: HttpRequest, pk: int):
        serializer = PutBlockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        block = get_object_or_404(Block, pk=pk)
        block.block_content = serializer.data['block_content']
        block.save()
        return Response(BlockSerializer(block).data, status=200)

class AddBlockView(APIView):
    def post(self, request: HttpRequest):
        serializer = PostBlockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        block = serializer.save() # Main logic is in serializer class
        return Response(BlockSerializer(block).data, status=201)
    
@api_view(['DELETE', 'PUT', 'POST'])
def document_block_view(request, pk, bo):
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
        serializer = PostBlockSerializer(data=dict(block_document=pk,
                                                   block_content=request.body.decode(),
                                                   block_order=bo))
        serializer.is_valid(raise_exception=True)
        block = serializer.save()
        return Response(BlockSerializer(block).data, status=201)
   
@api_view()
def check_document_blocks(request, pk):
    mistakes = [dict(block_order=block.block_order,
                     mistakes=MistakeSerializer(block.spellcheck(), many=True).data) \
                for block in Block.objects.filter(block_document=pk)]
    return Response(mistakes, status=200)

@api_view(['POST'])
def add_documents(request: HttpRequest):
    documents = [Document(title=document['title']) \
                 for document in request.data['documents']]
    blocks = [Block(block_document=documents[i],
                    block_content=block_content,
                    block_order=block_order) \
              for i, document in enumerate(request.data['documents']) \
              for block_order, block_content in enumerate(document['blocks'])]
    Document.objects.bulk_create(documents)
    Block.objects.bulk_create(blocks)
    return Response({'documents':DocumentSerializer(documents, many=True).data},
                    status=201)
