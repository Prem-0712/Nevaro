from customer.models import CustomerModel
from django.dispatch import Signal, receiver
from django.utils.encoding import smart_str
from seller.models import SellerModel

from .models import CustomUserModel

# CREATING SIGNAL

Role = Signal()


@receiver(Role)
def migrating_user(sender, **kwargs):
    user = kwargs.get("user")

    if (user.is_customer == True) and (user.is_seller == False):
        CustomerModel.objects.create(user=user)

    if (user.is_seller == True) and (user.is_customer == False):
        SellerModel.objects.create(user=user)
