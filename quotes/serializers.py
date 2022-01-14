from .models import Quote, QuoteConfiguration, QuoteTags
from rest_framework import serializers
from django.contrib.auth.models import User, Group

class QuoteSerializer(serializers.HyperlinkedModelSerializer):
	user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
	class Meta:
		model = Quote
		fields = ['id', 'date', 'url', 'quote', 'tag', 'user', 'notes', 'user_tags']

	def create(self, validated_data):
		instance_user = self.context['request'].user
		
		user = User.objects.filter(username=instance_user)[0]

		quote = Quote.objects.create(
			url=validated_data['url'],
			date=validated_data['date'],
			quote=validated_data['quote'],
			tag=validated_data['tag'],
			notes='',
			user=user,
			user_tags='',
		)

		quote.save()

		return quote

class QuoteConfigurationSerializer(serializers.ModelSerializer):
	user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
	class Meta:
		model = QuoteConfiguration
		fields = ['id', 'user', 'quote_order']

	def create(self, validated_data):
		instance_user = self.context['request'].user
		
		user = User.objects.filter(username=instance_user)[0]

		quote_config = QuoteConfiguration.objects.create(
			quote_order=validated_data['quote_order'],
			user=user
		)

		quote_config.save()

		return quote_config


class QuoteTagsSerializer(serializers.ModelSerializer):
	user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
	class Meta:
		model = QuoteTags
		fields = ['id', 'user', 'quote_tags']

	def create(self, validated_data):
		instance_user = self.context['request'].user
		
		user = User.objects.filter(username=instance_user)[0]

		quote_config = QuoteTags.objects.create(
			quote_tags=validated_data['quote_tags'],
			user=user
		)

		quote_config.save()

		return quote_config