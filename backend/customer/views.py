from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django_countries import countries

def country_list(request):
    data = {code: name for code, name in countries}
    return JsonResponse(data)