from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),

    path('activate/<uid>/<token>/', views.ActivateView.as_view(), name='activate'), 

    
]
