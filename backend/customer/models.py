from django.db import models
from django.conf import settings

STATUS_CHOICE = (
    ("KA", "Karnataka"),
    ("AP", "Andhra Pradesh"),
    ("KL", "Kerala"),
    ("TN", "Tamil Nadu"),
    ("MH", "Maharashtra"),
    ("UP", "Uttar Pradesh"),
    ("GA", "Goa"),
    ("GJ", "Gujarat"),
    ("RJ", "Rajasthan"),
    ("HP", "Himachal Pradesh"),
    ("TG", "Telangana"),
    ("AR", "Arunachal Pradesh"),
    ("AS", "Assam"),
    ("BR", "Bihar"),
    ("CT", "Chhattisgarh"),
    ("HR", "Haryana"),
    ("JH", "Jharkhand"),
    ("MP", "Madhya Pradesh"),
    ("MN", "Manipur"),
    ("ML", "Meghalaya"),
    ("MZ", "Mizoram"),
    ("NL", "Nagaland"),
    ("OR", "Odisha"),
    ("PB", "Punjab"),
    ("SK", "Sikkim"),
    ("TR", "Tripura"),
    ("UT", "Uttarakhand"),
    ("WB", "West Bengal"),
    ("AN", "Andaman and Nicobar Islands"),
    ("CH", "Chandigarh"),
    ("DH", "Dadra and Nagar Haveli and Daman and Diu"),
    ("DL", "Delhi"),
    ("JK", "Jammu and Kashmir"),
    ("LD", "Lakshadweep"),
    ("LA", "Ladakh"),
    ("PY", "Puducherry")
)

class CustomerModel(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete= models.CASCADE,
        related_name='customer_name'
    )
    birth_date = models.DateField(null= True, blank= True)

    def __str__(self):
        return self.user.name

class ProfileModel(models.Model):
    user = models.ForeignKey(
        CustomerModel,
        on_delete=models.CASCADE,
        related_name='customer_profile'
    )
    pincode = models.IntegerField()
    state = models.CharField(max_length=2, choices= STATUS_CHOICE)
    district = models.CharField(max_length=25)
    city = models.CharField(max_length=25)

    def __str__(self):
        return (self.user.user.name)