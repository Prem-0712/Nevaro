from rest_framework import serializers
from .views import *
from .models import SellerModel


class CreateSellerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerModel
        fields = "__all__"
        read_only_fields = ["user"]

    def validate(self, attrs):

        phone_numer = attrs.get("phone_number")
        business_name = attrs.get("business_name")
        business_email = attrs.get("business_email")

        fields = [
            "phone_number",
            "business_name",
            "business_email",
            "address_line_1",
            "address_line_2",
            "postal_code",
            "city",
            "state_region",
        ]

        for field in fields:

            if isinstance(attrs.get(field), str):
                attrs[field] = attrs[field].strip().lower()

        if SellerModel.objects.filter(phone_number=phone_numer).exists():
            raise serializers.ValidationError("Phone number already exists")

        if SellerModel.objects.filter(business_email=business_email).exists():
            raise serializers.ValidationError("Email already exists")

        if SellerModel.objects.filter(business_name=business_name).exists():
            raise serializers.ValidationError("This name is already taken")

        return attrs

    def create(self, validated_data):
        return SellerModel.objects.create(**validated_data)


class GetSellerProfileSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="user.name", read_only=True)

    email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = SellerModel
        fields = [
            "name",
            "email",
            "id",
            "phone_number",
            "business_name",
            "business_email",
            "address_line_1",
            "address_line_2",
            "postal_code",
            "city",
            "state_region",
            "country",
        ]


class UpdateSellerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellerModel
        fields = "__all__"

    def validate(self, attrs):

        phone_number = attrs.get("phone_number")
        business_name = attrs.get("business_name")
        business_email = attrs.get("business_email")

        fields = [
            "phone_number",
            "business_name",
            "business_email",
            "address_line_1",
            "address_line_2",
            "postal_code",
            "city",
            "state_region",
        ]

        for field in fields:

            if isinstance(attrs.get(field), str):
                attrs[field] = attrs[field].strip().lower()

        qs = SellerModel.objects.all()

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if phone_number and qs.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError("Phone number already exists")

        if business_name and qs.filter(business_name=business_name).exists():
            raise serializers.ValidationError("This name is already taken")

        if business_email and qs.filter(business_email=business_email).exists():
            raise serializers.ValidationError("Email already exists")

        return attrs

    def update(self, instance, validated_data):

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
