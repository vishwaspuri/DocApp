from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

from firebase_admin import initialize_app, firestore, credentials

# For this to work, make sure that environment variable GOOGLE_APPLICATION_CREDENTIALS is set properly. 

fb_app = initialize_app(name='covidhack')
store = firestore.client(app=fb_app)


@api_view(["GET"])
def get_highriskplaces(request):
    places = store.collection(u"HighRiskPlaces").get()
    payload = []
    for place in places:
        data = place.to_dict()
        location = data['location']
        name = data['name']
        data_dict = {
            "name": name,
            "latitude": location.latitude,
            "longitude": location.longitude,
        }
        payload.append(data_dict)
    return Response(payload, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_all_profile(request):
    profiles = store.collection(u"Profile").get()
    payload = []
    for profile in profiles:
        data = profile.to_dict()
        payload.append(data)

    
    return Response(payload, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_profile(request, id):
    profile = store.collection(u"Profile").document(id).get()

    if profile is None:
        return Response({"error": "Invalid user id."},status=status.HTTP_404_NOT_FOUND)

    timestamp_loc = "Profile/" + user_id +"/TimeStamps" 
    timestamps = store.collection(timestamp_loc).get()

    timestamps_list = []

    for timestamp in timestamps:
        timestamps_list.append(timestamp.to_dict())
    
    profile_dict = profile.to_dict()

    profile_dict.update({"timestamps":timestamps_list})
    
    return Response(profile_dict,status=status.HTTP_200_OK)

@api_view(["PUT"])
def update_status(request, id):
    profile = store.collection(u"Profile").document(id)

    if profile.get() is None:
        return Response({"error": "Invalid user id."},status=status.HTTP_404_NOT_FOUND)
        
    isPos = request.data["isPos"]
    profile.update({"isPos": isPos})
    return Response(profile.get().to_dict(), status=status.HTTP_200_OK)

