from django.shortcuts import render

def paint_board(request):

    return render(request, 'paintBoard.html')
