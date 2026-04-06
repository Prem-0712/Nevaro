from django.db import models
from django.conf import settings
from django_countries.fields import CountryField


class CustomerModel(models.Model):

    class Meta:
        db_table = "customer"
        managed = True
        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="customer_name"
    )
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.name


class ProfileModel(models.Model):

    class Meta:
        db_table = "customerprofile"
        managed = True
        verbose_name = "CustomerProfile"
        verbose_name_plural = "CustomerProfiles"

    user = models.ForeignKey(
        CustomerModel, on_delete=models.CASCADE, related_name="customer_profile"
    )

    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=25)
    city = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    country = CountryField()

    def __str__(self):
        return self.user.user.name
