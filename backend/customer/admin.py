from django.contrib import admin
from .models import CustomerModel, ProfileModel

@admin.register(CustomerModel)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'birth_date']

@admin.register(ProfileModel)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'pincode', 'state', 'district', 'city']