from django.urls import path
from .views import *

urlpatterns = [
    path("profile-create/", SellerProfileView.as_view(), name="profile-create"),
]
