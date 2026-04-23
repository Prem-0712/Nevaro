from django.contrib.auth.tokens import default_token_generator
from django.core.validators import RegexValidator
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers

from .models import CustomUserModel

password_validator = RegexValidator(
    regex=r"^(?=(?:.*[A-Za-z]){4,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$",
    message=(
        "Password must be at least 9 characters long and contain at least "
        "4 letters, 1 uppercase letter, 1 number, and 1 symbol."
    ),
)


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )
    password2 = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )

    user_role = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUserModel
        fields = ["email", "name", "password", "password2", "user_role"]

    def validate_name(self, value):
        return value.strip().lower()

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match!!!"
            )
        return attrs

    def create(self, validate_data):
        validate_data.pop("password2", None)
        role = validate_data.pop("user_role", "customer")

        if role == "customer":
            validate_data["is_customer"] = True
            validate_data["is_seller"] = False

        if role == "seller":
            validate_data["is_seller"] = True
            validate_data["is_customer"] = False

        return CustomUserModel.objects.create_user(**validate_data)


class ActivateSerializer(serializers.Serializer):

    uid = serializers.CharField()
    token = serializers.CharField()

    def validate(self, attrs):

        uid = attrs.get("uid")
        token = attrs.get("token")

        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = CustomUserModel.objects.get(id=id)
        except:
            raise serializers.ValidationError("Invalid UID")

        if not (default_token_generator.check_token(user, token)):
            raise serializers.ValidationError("Invalid or Expired Token")

        attrs["user"] = user

        return attrs


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = CustomUserModel
        fields = ["email", "password"]

    def validate(self, attrs):
        email = attrs.get("email")

        if not (CustomUserModel.objects.filter(email=email).first()):
            raise serializers.ValidationError("Email does not exist")
        return attrs


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUserModel
        fields = [
            "email",
            "name",
            "is_active",
            "is_customer",
            "is_seller",
            "is_superuser",
        ]


class ChangePasswordSerializer(serializers.ModelSerializer):

    current_password = serializers.CharField(
        style={"input_style": "password"}, write_only=True
    )
    password = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )
    password2 = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )

    class Meta:
        model = CustomUserModel
        fields = ["current_password", "password", "password2"]

    def validate(self, attrs):

        user = self.context["request"].user
        current_password = attrs.get("current_password")
        new_password = attrs.get("password")
        confirm_new_password = attrs.get("password2")

        if not (user.check_password(current_password)):
            raise serializers.ValidationError("Current Password is incorrect !!")

        if new_password != confirm_new_password:
            raise serializers.ValidationError("Both passwords should match !!")

        return attrs


class SendResetPasswordEmailSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()

    class Meta:
        model = CustomUserModel
        fields = ["email"]

    def validate(self, attrs):

        email = attrs.get("email")

        if not (CustomUserModel.objects.filter(email=email).first()):
            raise serializers.ValidationError(
                "Email Does not exist, register first !!!"
            )
        return attrs


class ResetPasswordSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )
    password2 = serializers.CharField(
        style={"input_style": "password"},
        write_only=True,
        validators=[password_validator],
    )

    class Meta:
        model = CustomUserModel
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match!!!"
            )
        return attrs
