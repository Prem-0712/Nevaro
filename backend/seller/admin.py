from django.contrib import admin
from .models import SellerModel, ProfileModel
from account.models import CustomUserModel


@admin.register(SellerModel)
class SellerAdmin(admin.ModelAdmin):

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUserModel.objects.filter(
                is_seller=True, is_customer=False
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    list_display = ["user"]


@admin.register(ProfileModel)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "address_line_1",
        "address_line_2",
        "postal_code",
        "city",
        "state_region",
        "country",
    ]
