from django.urls import path
from .views import ProfileDetail, ProjectList, SkillList, ExperienceList, CertificationList

urlpatterns = [
    path('profile/', ProfileDetail.as_view(), name='profile-detail'),
    path('projects/', ProjectList.as_view(), name='project-list'),
    path('skills/', SkillList.as_view(), name='skill-list'),
    path('experiences/', ExperienceList.as_view(), name='experience-list'),
    path('certifications/', CertificationList.as_view(), name='certification-list'),
]