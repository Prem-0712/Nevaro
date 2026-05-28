from rest_framework.views import APIView
from rest_framework.response import Response
from account.CustomPermissions import UserRole
from account.renderers import CustomRenderer
from rest_framework.permissions import IsAuthenticated
from . import serializers
from rest_framework import status


class BaseSellerView(APIView):
    renderer_classes = [CustomRenderer]
    permission_classes = [IsAuthenticated, UserRole]

    required_role = "seller"


class SellerProfileView(BaseSellerView):

    def post(self, request, format=None):

        serializer = serializers.SellerProfileSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)

        return Response(
            {"msg": "Profile Created Successfully"},
            status=status.HTTP_201_CREATED,
        )
