from django.contrib import admin
from .models import SellerModel
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
