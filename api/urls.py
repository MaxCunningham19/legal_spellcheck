from django.urls import path
from .views import (check_document_blocks, DocumentList, document_view, block_view, add_documents)

app_name = 'api'

urlpatterns = [
    path('document/', DocumentList.as_view(), name='get_documents'),
    path('document/<int:pk>', document_view, name='document_view'),
    path('document/<int:pk>/<int:bo>', block_view, name='block_view'),
    path('check/document/<int:pk>', check_document_blocks, name='check_document_blocks'),
    path('documents/', add_documents, name='add_documents')
]
