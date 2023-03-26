from django.urls import re_path
from .views import serve_app

app_name = 'client'

urlpatterns = [
    re_path('', serve_app),
]
