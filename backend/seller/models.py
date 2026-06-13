from django.conf import settings
from django.db import models
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField


class SellerModel(models.Model):

    class Meta:
        db_table = "seller"
        managed = True
        verbose_name = "Seller"
        verbose_name_plural = "Sellers"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="seller_name"
    )

    phone_number = PhoneNumberField(unique=True, null=True, blank=True)
    business_name = models.CharField(max_length=25, null=True, blank=True)
    business_email = models.EmailField(unique=True, null=True, blank=True)

    address_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_line_2 = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=25, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state_region = models.CharField(max_length=100, null=True, blank=True)
    country = CountryField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return (
            f"Seller/User NAME = {self.user.name} Business NAME = {self.business_name}"
        )
