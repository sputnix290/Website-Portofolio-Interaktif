from rest_framework import serializers
from .models import Profile, Skill, Project, Experience, Certification

class ProfileSerializer(serializers.ModelSerializer):
    foto = serializers.SerializerMethodField()
    cv_file = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_foto(self, obj):
        """Return absolute URL for foto"""
        if obj.foto:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.foto.url)
            # Fallback kalau tidak ada request context
            return f"http://127.0.0.1:8000{obj.foto.url}"
        return None
    
    def get_cv_file(self, obj):
        """Return absolute URL for cv_file"""
        if obj.cv_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cv_file.url)
            # Fallback kalau tidak ada request context
            return f"http://127.0.0.1:8000{obj.cv_file.url}"
        return None

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    # Kita tambahkan ini agar data skill yang muncul bukan cuma ID, tapi detailnya
    skills_learned = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'