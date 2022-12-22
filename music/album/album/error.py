from django.shortcuts import render


def page_not_found_404(request, *args, **kwargs):
    return render(request, '404_error.html')
