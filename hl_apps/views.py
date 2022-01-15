from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status
from .serializers import UserSerializer, GroupSerializer

from django.views import View
import os

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		if self.request.user.is_superuser:
			return User.objects.all()
		return User.objects.filter(username=self.request.user)

class GroupViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows groups to be viewed or edited.
	"""
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
	permission_classes = [permissions.IsAuthenticated]


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

