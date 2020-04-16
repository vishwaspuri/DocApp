from django.urls import path
from main.views import auth, fb_content

urlpatterns = [
    path('auth/login/', auth.login, name='login'),
    path('auth/register/', auth.register, name='register'),

    path('api/highriskplaces', fb_content.get_highriskplaces, name='get-highriskplaces'),
    path('api/profiles/', fb_content.get_all_profile, name='get-profiles'),
    path('api/profiles/<str:id>/', fb_content.get_profile, name='get-profile'),
    path('api/update_status/<str:id>/', fb_content.update_status, name='update-status'),
]

