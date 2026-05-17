from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.urls import reverse
from django.utils.encoding import force_bytes, smart_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from . import serializers
from .models import CustomUserModel
from .renderers import CustomRenderer
from .signals import Role
from .utils import send_activation_email, send_password_reset_email


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class RegisterView(APIView):
    """
    Docstring for RegisterView:
    This API is used for registering user
    """

    renderer_classes = [CustomRenderer]

    def post(self, request, format=None):
        serializer = serializers.RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = default_token_generator.make_token(user)

            activation_url = f"{settings.FRONTEND_DOMAIN}/activate/{uid}/{token}"

            send_activation_email(user.email, activation_url)

            return Response(
                {
                    "msg": "Registration Successful! Please check your email to activate your account."
                },
                status=status.HTTP_201_CREATED,
            )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateView(APIView):
    renderer_classes = [CustomRenderer]
    """
    Docstring for ActivateView
    This API is used to activate user
    """

    def get(self, request, format=None):

        serializer = serializers.ActivateSerializer(data=request.query_params)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        if user.is_active:
            return Response(
                {"msg": "User is already activated"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_active = True
        user.save()
        Role.send(sender=ActivateView, user=user)

        return Response(
            {"msg": "User is successfully activated"},
            status=status.HTTP_200_OK,
        )


class LoginView(APIView):
    renderer_classes = [CustomRenderer]

    def post(self, request, format=None):

        serializer = serializers.LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get("email")
            password = serializer.data.get("password")

            user = authenticate(request, email=email, password=password)

            if user:

                if user.is_customer and not (user.is_seller):
                    user_role = "customer"

                elif user.is_seller and not user.is_customer:
                    user_role = "seller"

                elif user.is_superuser:
                    user_role = "admin"

                jwt_token = get_token_for_user(user)

                return Response(
                    {
                        "msg": "Login Successfully done",
                        "user_role": user_role,
                        "jwt_token": jwt_token,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"non_field_errors": ["Email or password is invalid"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    renderer_classes = [CustomRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = serializers.ProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    renderer_classes = [CustomRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = serializers.ChangePasswordSerializer(
            data=request.data, context={"user": request.user}
        )

        if serializer.is_valid():

            user = request.user
            password = serializer.validated_data["password"]

            user.set_password(password)
            user.save()

            return Response(
                {"msg": "Password changed successfully"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendResetPasswordEmailView(APIView):
    renderer_classes = [CustomRenderer]

    def post(self, request, format=None):
        serializer = serializers.SendResetPasswordEmailSerializer(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data["email"]
            user = CustomUserModel.objects.get(email=email)

            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            password_reset_link = reverse(
                "password_reset", kwargs={"uid": uid, "token": token}
            )
            password_reset_url = f"{settings.SITE_DOMAIN}{password_reset_link}"

            try:
                send_password_reset_email(email, password_reset_url)

            except Exception as e:
                return Response({"error": str(e)})

            return Response(
                {
                    "msg": "Password Reset Link has been successfully sent to the registered email"
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    renderer_classes = [CustomRenderer]

    def post(self, request, uid, token, format=None):
        serializer = serializers.ResetPasswordSerializer(data=request.data)

        id = smart_str(urlsafe_base64_decode(uid))
        user = CustomUserModel.objects.get(id=id)

        if PasswordResetTokenGenerator().check_token(user, token):

            if serializer.is_valid():
                password = serializer.validated_data["password"]

                user.set_password(password)
                user.save()

                return Response(
                    {"msg": "Your password has been reset successfully, try login"},
                    status=status.HTTP_200_OK,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
