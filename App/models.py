from django.db import models

# Create your models here.

class Patient(models.Model):
    GENDER = (
        ('Male', 'Male'),
        ('Female','Female'),
    )
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=30)
    email = models.CharField(max_length=100,default='null')
    age = models.CharField(max_length=10)
    gender = models.CharField(max_length=10, choices=GENDER , null=True)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name