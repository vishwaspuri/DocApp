from django.urls import path
from main.views import auth, fb_content

urlpatterns = [
    path('auth/login/', auth.login, name='login'),
    path('auth/register/', auth.register, name='register'),

    path('api/highriskplaces', fb_content.get_highriskplaces, name='get-highriskplaces'),
]

