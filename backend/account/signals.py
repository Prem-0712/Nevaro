from django.dispatch import Signal, receiver
from customer.models import CustomerModel
from .models import CustomUserModel
from django.utils.encoding import smart_str

# CREATING SIGNAL

Customer = Signal()

@receiver(Customer)
def create_customer(sender, **kwargs):
    user_id = kwargs.get('user')
    user = CustomUserModel.objects.get(id = user_id)
    if (user.is_active):

        if (user.is_customer == True) and (user.is_seller == False):

            CustomerModel.objects.create(user = user)