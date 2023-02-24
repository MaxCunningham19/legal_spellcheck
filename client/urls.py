from django.urls import path
from .views import serve_app

app_name = 'client'

urlpatterns = [
    path('', serve_app, name='serve_app')
]
