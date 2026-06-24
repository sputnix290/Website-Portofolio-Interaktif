from django.db import models

class Profile(models.Model):
    nama = models.CharField(max_length=100)
    bio_singkat = models.TextField()
    pendidikan_terakhir = models.CharField(max_length=255, default="S1 Informatika UPJ")
    foto = models.ImageField(upload_to='profile/')
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True)

    def __str__(self):
        return self.nama

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('language', 'Language'),
        ('framework', 'Framework'),
        ('tool', 'Tool/Other'),
    ]
    nama = models.CharField(max_length=50)
    kategori = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    def __str__(self):
        return self.nama

class Project(models.Model):
    judul = models.CharField(max_length=200)
    deskripsi = models.TextField()
    github_link = models.URLField(blank=True)
    skills_learned = models.ManyToManyField(Skill)
    gambar = models.ImageField(upload_to='projects/')
    # Menambahkan null=True dan blank=True di sini
    skills_raw = models.TextField(null=True, blank=True, help_text="Pisahkan dengan koma, contoh: Python,Django,Next.js")

    def __str__(self):
        return self.judul

class Experience(models.Model):
    judul_kegiatan = models.CharField(max_length=200)
    penjelasan = models.TextField()
    # pelajaran_didapat = models.TextField()
    # gambar_kegiatan = models.ImageField(upload_to='experience/')

    def __str__(self):
        return self.judul_kegiatan

class Certification(models.Model):
    nama_sertifikasi = models.CharField(max_length=200)
    deskripsi_singkat = models.TextField()
    gambar_sertifikat = models.ImageField(upload_to='certs/')

    def __str__(self):
        return self.nama_sertifikasi