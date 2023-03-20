from django.urls import path, include, re_path
from api import views

urlpatterns = [
    path('api/', include('api.urls')),
    re_path('.*', include('client.urls'))
]
