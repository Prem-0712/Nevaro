from django.contrib import admin
from .models import CustomerModel, ProfileModel
from account.models import CustomUserModel


@admin.register(CustomerModel)
class CustomerAdmin(admin.ModelAdmin):

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUserModel.objects.filter(
                is_customer=True, is_seller=False
            )
            pass
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    list_display = ["user", "birth_date"]


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
