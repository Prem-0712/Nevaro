from rest_framework.views import APIView
from rest_framework.response import Response
from account.CustomPermissions import UserRole
from account.renderers import CustomRenderer
from rest_framework.permissions import IsAuthenticated
from . import serializers
from .models import SellerModel
from rest_framework import status
from account.models import CustomUserModel


class BaseSellerView(APIView):
    renderer_classes = [CustomRenderer]
    permission_classes = [IsAuthenticated, UserRole]

    required_role = "seller"


class CreateSellerProfileView(BaseSellerView):

    def post(self, request, format=None):

        serializer = serializers.CreateSellerProfileSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)

        return Response(
            {"msg": "Profile Created Successfully"},
            status=status.HTTP_201_CREATED,
        )


class GetSellerProfileView(BaseSellerView):

    def get(self, request, format=None):

        try:
            seller = SellerModel.objects.select_related("user").get(user=request.user)

            serializer = serializers.GetSellerProfileSerializer(seller)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except SellerModel.DoesNotExist:
            return Response(
                {"msg": "Youre profile is empty for now"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UpdateSellerProfileView(BaseSellerView):

    def patch(self, request, format=None):

        seller = SellerModel.objects.get(user=request.user)

        serializer = serializers.UpdateSellerProfileSerializer(
            seller, data=request.data, partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {"msg": "Profile has been updated successfully"}, status=status.HTTP_200_OK
        )


class DeleteSellerView(BaseSellerView):

    def delete(self, request, format=None):

        user = request.user

        try:
            print("WORKING BEFORE")
            user = CustomUserModel.objects.get(id=user.id)
            print("WORKING AFTER")

        except SellerModel.DoesNotExist:
            return Response(
                {"msg": "Seller not found"}, status=status.HTTP_404_NOT_FOUND
            )

        else:
            user.delete()

        return Response(
            {"msg": "Your account has been deleted successfully"},
            status=status.HTTP_200_OK,
        )
