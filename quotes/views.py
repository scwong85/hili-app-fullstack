from django.shortcuts import render
from .models import Quote, QuoteConfiguration, QuoteTags
from rest_framework import viewsets, permissions, status
from .serializers import QuoteSerializer, QuoteConfigurationSerializer, QuoteTagsSerializer

from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .ner import ner_tagging
from .sentiment import sentiment_analyzer

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

class QuoteNERView(APIView):

	def get(self, request, format=None):
		quotes = Quote.objects.all()
		serializer = QuoteSerializer(quotes, many=True)
		return Response(serializer.data)

class QuoteNERViewDetail(APIView):

	def get_object(self, pk):
		try:
			return Quote.objects.get(pk=pk)
		except Quote.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		quote = self.get_object(pk)
		serializer = QuoteSerializer(quote)
		#return Response(serializer.data)
		result = ner_tagging(quote)
		if result != 0:
			return_data = {}
			for entity in result:
				return_data[entity.text] = entity.label_
			return Response(return_data)
		else:
			return Response({})


class QuoteSentimentDetail(APIView):

	def get_object(self, pk):
		try:
			return Quote.objects.get(pk=pk)
		except Quote.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		quote = self.get_object(pk)
		serializer = QuoteSerializer(quote)
		#return Response(serializer.data)
		result, overall = sentiment_analyzer(quote)
		return Response({'data': result, 'overall': overall})
