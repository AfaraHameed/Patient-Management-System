from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required # Login required to access private pagas
from django.views.decorators.cache import cache_control # Prevent back button (destroy the last section)
from .models import Patient
from django.contrib import messages
from django.db.models import Q
from django.core.paginator import Paginator
# Frontend
def frontend(request):
    return render(request, "frontend.html")

# Backend
@login_required(login_url="login")
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def backend(request):
    if 'q' in request.GET:
        q = request.GET['q']
        all_patient_list = Patient.objects.filter(
            Q(name__icontains=q) | Q(email=q) | Q(phone=q) | Q(age=q) | Q(note=q)
        ).order_by('-created_at')
    else:
        all_patient_list = Patient.objects.all().order_by('-created_at')

    paginator = Paginator(all_patient_list , 2)
    page  = request.GET.get('page')
    all_patient = paginator.get_page(page)  

    return render(request,'backend.html',{'patients':all_patient})                                                                                                                                                                                                                                                                                                                                                                                  
def add_patient(request):
    if request.method == 'POST':
        if request.POST.get('name') and request.POST.get('email') and request.POST.get('phone') and request.POST.get('age') and request.POST.get('gender') or request.POST.get('note'):
            patient = Patient()
            patient.name = request.POST.get('name')
            patient.email = request.POST.get('email')
            patient.phone = request.POST.get('phone')
            patient.age = request.POST.get('age')
            patient.gender = request.POST.get('gender')
            patient.note = request.POST.get('note')
            patient.save()
            messages.success(request, 'Patient added successfully!')
            return HttpResponseRedirect('/backend')
    else:
        return render(request, 'add.html')
    