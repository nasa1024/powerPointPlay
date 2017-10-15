# coding: utf-8

from django.conf.urls import url, include
from django.contrib import admin
from upload.views import upload_file


urlpatterns = [
    url(r'^upload/$', upload_file),
]


