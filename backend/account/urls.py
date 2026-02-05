from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),

    path('activate/<uid>/<token>/', views.ActivateView.as_view(), name='activate'), 

    path('login/', views.LoginView.as_view(), name='login'),

    path('profile/', views.ProfileView.as_view(), name='profile'),

    path('changepass/', views.ChangePasswordView.as_view(), name='changepass'),

    path('sendresetpass/', views.SendResetPasswordEmailView.as_view(), name='sendresetpass'),

    path('password_reset/<uid>/<token>/', views.ResetPasswordView.as_view(), name='password_reset')
]
