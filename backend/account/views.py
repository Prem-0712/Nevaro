from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, smart_str
from django.contrib.auth.tokens import default_token_generator, PasswordResetTokenGenerator
from .utils import send_activation_email
from django.urls import reverse
from django.conf import settings

class RegisterView(APIView):

    def post(self, request, format = None):
        serializer = RegisterSerializer(data = request.data)

        if (serializer.is_valid()):
            user = serializer.save()

            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = default_token_generator.make_token(user)

            activation_link = reverse('activate', kwargs={'uid': uid, 'token': token})
            activation_url = f'{settings.SITE_DOMAIN}{activation_link}'

            send_activation_email(user.email, activation_url)

            return Response({'msg': 'Registration Successful! Please check your email to activate your account.'}, status = status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)