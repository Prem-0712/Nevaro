from rest_framework import serializers
from .views import *
from .models import SellerModel


class SellerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerModel
        fields = "__all__"
        read_only_fields = ["user"]

    def validate_business_name(self, value):
        return value.strip().lower()

    def validate(self, attrs):

        phone_number = attrs.get("phone_number")
        business_name = attrs.get("business_name")
        business_email = attrs.get("business_email")

        if SellerModel.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError("Phone number already exists")

        if SellerModel.objects.filter(business_email=business_email).exists():
            raise serializers.ValidationError("Email already exists")

        if SellerModel.objects.filter(business_name=business_name).exists():
            raise serializers.ValidationError("This name is already taken")

        return attrs

    def create(self, validated_data):
        return SellerModel.objects.create(**validated_data)
