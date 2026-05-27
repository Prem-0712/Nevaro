from rest_framework.permissions import BasePermission


class UserRole(BasePermission):

    ROLE_MAP = {
        "customer": "is_customer",
        "seller": "is_seller",
        "admin": "is_superuser",
    }

    def has_permission(self, request, view):

        required_role = getattr(view, "required_role", None)

        if required_role is None:
            return False

        role_attr = self.ROLE_MAP.get(required_role)

        if role_attr is None:
            return False

        return getattr(request.user, role_attr, False)
