from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel

class CustomUserAdmin(UserAdmin):

    model = CustomUserModel
    list_display = ["email","name", 'is_customer', 'is_seller', "is_active", "is_staff", "is_superuser"]

    list_filter = ("email", "is_active", "is_staff", "is_superuser")

    filter_horizontal = ()

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ('is_customer', 'is_seller',"is_active", "is_staff", "is_superuser",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2",'is_customer', 'is_seller', "is_active", "is_staff", "is_superuser"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(CustomUserModel, CustomUserAdmin)