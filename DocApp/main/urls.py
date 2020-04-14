from django.urls import path
from main import views

urlpatterns = [
    path('auth/login/',views.login,name='login'),
    path('auth/register/',views.register,name='register'),
]