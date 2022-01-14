from django.shortcuts import render
from .models import Quote, QuoteConfiguration, QuoteTags
from rest_framework import viewsets, permissions, status
from .serializers import QuoteSerializer, QuoteConfigurationSerializer, QuoteTagsSerializer

from django.views import View
import os
# Create your views here.

class QuoteViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows quotes to be viewed or edited.
	"""
	serializer_class = QuoteSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		if self.request.user.is_superuser:
			return Quote.objects.all()
		return Quote.objects.filter(user=self.request.user)


class QuoteConfigurationViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows quotes to be viewed or edited.
	"""
	serializer_class = QuoteConfigurationSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		if self.request.user.is_superuser:
			return QuoteConfiguration.objects.all()
		return QuoteConfiguration.objects.filter(user=self.request.user)


class QuoteTagsViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows quotes to be viewed or edited.
	"""
	serializer_class = QuoteTagsSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		if self.request.user.is_superuser:
			return QuoteTags.objects.all()
		return QuoteTags.objects.filter(user=self.request.user)

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()