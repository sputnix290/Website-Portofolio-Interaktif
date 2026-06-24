from rest_framework import generics
# 1. Tambahkan model Experience dan Certification di bagian import
from .models import Profile, Project, Skill, Experience, Certification
# 2. Tambahkan serializer Experience dan Certification di bagian import
from .serializers import ProfileSerializer, ProjectSerializer, SkillSerializer, ExperienceSerializer, CertificationSerializer

# Class ProfileDetail (Tetap sama)
class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()
    
    def get_serializer_context(self):
        """Include request context for building absolute URLs"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# Class ProjectList (Tetap sama)
class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Class SkillList (Tetap sama)
class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

# 4. View untuk List Experience
class ExperienceList(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

# 5. View untuk List Certification
class CertificationList(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer