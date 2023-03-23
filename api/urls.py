from django.urls import path
from .views import (check_document_blocks, DocumentList, document_view,
                    BlockView, add_documents, document_block_view)

app_name = 'api'

urlpatterns = [
    path('document/', DocumentList.as_view(), name='get_documents'),
    path('document/<int:pk>', document_view, name='document_view'),
    path('document/<int:pk>/<int:bo>', document_block_view, name='document_block_view'),
    path('block/<int:pk>', BlockView.as_view(), name='block'),
    path('check/document/<int:pk>', check_document_blocks, name='check_document_blocks'),
    path('documents/', add_documents, name='add_documents')
]
