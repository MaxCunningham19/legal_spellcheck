from django.shortcuts import render

# Create your views here.
def serve_app(request):
    return render(request, 'client/app.html', {})
