# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from upload.forms import FileUploadForms
from django.shortcuts import render_to_response
from django.shortcuts import render
# from django.template import RequestContext
import os
from django.core.urlresolvers import reverse
from django.shortcuts import redirect




# Create your views here.
def upload_file(request):
    '''
    文件接收
    :param request:
    :return:
    '''

    if request.method == 'POST':
        my_form = FileUploadForms(request.POST, request.FILES)
        if my_form.is_valid():
            f = my_form.cleaned_data['my_file']
            handle_uploaded_file(f)
            return HttpResponse('success')
    else:
        my_form = FileUploadForms()
        return render(request, 'index.html', {'form': my_form})


def handle_uploaded_file(f):
    print(f.name)
    with open('../' + f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def paint_board(request):
    return render(request, 'paintBoard.html')

