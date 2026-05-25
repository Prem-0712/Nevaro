from django.db import models
from django.utils.text import slugify
from seller.models import SellerModel


class CategoryModel(models.Model):

    class Meta:
        db_table = "category"
        managed = True
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="sub_categories",
    )

    def __str__(self) -> str:
        return f"Category NAME = {self.name}"


class ProductModel(models.Model):

    class Meta:
        db_table = "product"
        managed = True
        verbose_name = "Product"
        verbose_name_plural = "Products"

    seller = models.ForeignKey(
        SellerModel, on_delete=models.CASCADE, related_name="products"
    )

    name = models.CharField(max_length=255)
    categories = models.ManyToManyField(CategoryModel, related_name="products")
    small_description = models.CharField(max_length=255)
    large_description = models.TextField()

    slug = models.SlugField(unique=True, blank=True)

    image = models.ImageField(
        verbose_name="Product Image", upload_to="products/", blank=True, null=True
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    stock = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"Product NAME = {self.name}"
