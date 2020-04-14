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
