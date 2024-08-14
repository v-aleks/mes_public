from django.contrib import admin
from .models import *


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1


class FeedbackAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]


class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]


admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)


