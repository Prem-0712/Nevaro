from customer.models import CustomerModel
from django.dispatch import Signal, receiver
from django.db.models.signals import post_save
from django.utils.encoding import smart_str
from seller.models import SellerModel

from .models import CustomUserModel

# CREATING SIGNAL

# Role = Signal()


# @receiver(Role)
# def migrating_user(sender, **kwargs):
#     user = kwargs.get("user")

#     if (user.is_customer == True) and (user.is_seller == False):
#         CustomerModel.objects.create(user=user)

#     if (user.is_seller == True) and (user.is_customer == False):
#         SellerModel.objects.create(user=user)


@receiver(post_save, sender=CustomUserModel)
def create_role(sender, instance, created, **kwargs):
    if not created:
        return

    if instance.is_customer:
        CustomerModel.objects.create(user=instance)

    if instance.is_seller:
        SellerModel.objects.create(user=instance)
