from django.urls import path
from .views import (get_document_blocks, check_document_blocks, DocumentList)

app_name = 'api'

urlpatterns = [
    path('document/', DocumentList.as_view(), name='get_documents'),
    path('document/<int:pk>', get_document_blocks, name='get_document_blocks'),
    path('check/document/<int:pk>', check_document_blocks, name='check_document_blocks')
]