from rest_framework import serializers
from .models import CustomUserModel

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(style = {'input_style': 'password'}, write_only = True)
    password2 = serializers.CharField(style = {'input_style': 'password'}, write_only = True)

    class Meta:
        model = CustomUserModel
        fields = ['email', 'name', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password')

        if (password != password2):
            raise serializers.ValidationError("Password and Confirm Password doesn't match!!!")
        return attrs
    
    def create(self, validate_data):
        return CustomUserModel.objects.create_user(**validate_data)