# from django.db import models
# from django.conf import settings

# class CategoryModel(models.Model):

#     name = models.CharField(max_length=25, unique=True)
#     slug = models.SlugField(unique=True)

# class SellerModel(models.Model):

#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, 
#         on_delete=models.CASCADE,
#         related_name='seller_name'
#     )
#     store_name = models.CharField(max_length=25)
#     pincode = models.IntegerField(max_length=6)
#     state = 
#     district = 
#     city = 
    