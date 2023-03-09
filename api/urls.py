from django.urls import path
from .views import (get_document_blocks, check_document_blocks, DocumentList,put_document_blocks,delete_document_blocks)

app_name = 'api'

urlpatterns = [
    path('document/', DocumentList.as_view(), name='get_documents'),
    path('document/', DocumentList.as_view(), name='post_documents'),
    path('document/<int:pk>', get_document_blocks, name='get_document_blocks'),
    path('document/<int:pk>', put_document_blocks, name='put_document_blocks'),
    path('document/<int:pk>', delete_document_blocks, name='delete_document_blocks'),
    path('check/document/<int:pk>', check_document_blocks, name='check_document_blocks')
]
