from django.db import models

# Create your models here.
from django.contrib.auth.models import User

# Create your models here.
class Quote(models.Model):
	url = models.CharField(max_length=1000)
	quote = models.CharField(max_length=10000)
	tag = models.CharField(max_length=20, default="whiteTag")
	user_tags = models.CharField(max_length=10000, default='', null=True, blank=True)
	date = models.CharField(max_length=100)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	notes = models.CharField(max_length=10000, default='', null=True, blank=True)

	def __str__(self):
		return self.quote


class QuoteConfiguration(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	quote_order = models.CharField(max_length=10000, default='', null=True, blank=True)

	def __str__(self):
		return self.user.username


class QuoteTags(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	quote_tags = models.CharField(max_length=20000, default='', null=True, blank=True)

	def __str__(self):
		return self.user.username