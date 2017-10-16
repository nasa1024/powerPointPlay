from django.shortcuts import render

def paint_board(request):
    return render(request, 'paintBoard.html')

def pdf_play(request):
    return render(request, 'viewer.html')

def list_pdf(request):
    return render(request,'demo2.html')
