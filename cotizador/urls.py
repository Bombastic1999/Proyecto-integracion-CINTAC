from django.urls import path
from . import views

urlpatterns = [
    path('cotizar/', views.cotizar_flete, name='cotizar_flete'),
]