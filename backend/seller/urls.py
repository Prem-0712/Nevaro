from django.urls import path
from .views import *

urlpatterns = [

    path("create-profile/", CreateSellerProfileView.as_view(), name="profile-create"),

    path("get-profile/", GetSellerProfileView.as_view(), name="get-profile"),

    path("update-profile/", UpdateSellerProfileView.as_view(), name="update-profile"),

    path('delete-seller/', DeleteSellerView.as_view(), name='delete-seller')

]
