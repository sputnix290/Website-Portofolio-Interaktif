from django.contrib import admin
from .models import Profile, Skill, Project, Experience, Certification

# Daftarkan model supaya muncul di halaman admin yang tadi kamu buka
admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Experience)
admin.site.register(Certification)