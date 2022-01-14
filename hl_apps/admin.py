from django.contrib import admin

# Register your models here.
from quotes.models import Quote, QuoteConfiguration, QuoteTags

class QuoteAdmin(admin.ModelAdmin):
	list_display = ['url', 'quote', 'date', 'link_to_user']
	def link_to_user(self, obj):
		return obj.user

admin.site.register(Quote, QuoteAdmin)
admin.site.register(QuoteConfiguration)
admin.site.register(QuoteTags)