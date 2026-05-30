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

    phone_number = PhoneNumberField(unique=True)
    business_name = models.CharField(max_length=25)
    business_email = models.EmailField(unique=True)

    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=25)
    city = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    country = CountryField()

    def __str__(self):
        return (
            f"Seller/User NAME = {self.user.name} Business NAME = {self.business_name}"
        )
