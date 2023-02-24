from django.urls import path, include
from api import views

urlpatterns = [
    path('api/', include('api.urls')),
    path('', include('client.urls'))
]
