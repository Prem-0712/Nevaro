import json
from typing import Any
from django.core.management.base import BaseCommand

from account.models import CustomUserModel


class Command(BaseCommand):

    def handle(self, *args: Any, **options: Any) -> str | None:

        with open("account/test_users.json", "r") as f:
            users = json.load(f)

        for user in users:

            extra_fields = {}

            if user["user_role"] == "seller":
                extra_fields["is_seller"] = True
                extra_fields["is_customer"] = False

            elif user["user_role"] == "customer":
                extra_fields["is_seller"] = False
                extra_fields["is_customer"] = True

            CustomUserModel.objects.create_user(
                email=user["email"],
                name=user["name"],
                password=user["password"],
                **extra_fields,
            )
            self.stdout.write(
                self.style.SUCCESS(f"{len(users)} users seeded successfully")
            )
