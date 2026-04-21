from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, name, password = None, password2 = None, **extra_fields):
        
        if (not(email)):
            raise ValueError('User must provide an Email!!!!')
        
        user = self.model(
            email = self.normalize_email(email),
            name = name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using = self._db)
        
        return user
    
    def create_superuser(self, email, name, password = None, password2 = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if (extra_fields.get('is_staff') is not True):
            raise ValueError('Superuser must have staff status as TRUE')
        
        if (extra_fields.get('is_superuser') is not True):
            raise ValueError('Superuser must have superuser status as TRUE')
        
        user = self.create_user(email = email, name = name, password= password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using = self._db)
        return user
        

class CustomUserModel(AbstractBaseUser, PermissionsMixin):

    class Meta:
        db_table = 'user'
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    email = models.EmailField(unique=True, verbose_name='Email')
    name = models.CharField(max_length=100, verbose_name='Name')
    is_customer = models.BooleanField(default=True)
    is_seller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    objects = CustomUserManager()
    
    def __str__(self):
        return (f'{self.name}')

    def has_perm(self, perm, obj = None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser