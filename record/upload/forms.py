# coding: utf-8

from django.forms import forms


class FileUploadForms(forms.Form):
    my_file = forms.FileField()


