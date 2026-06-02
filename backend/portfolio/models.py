from django.db import models


# =========================
# PROJECT MODEL
# =========================



class Project(models.Model):

    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('data analysis', 'Data Analysis'),
        ('predictive modeling', 'Predictive Modeling'),
        ('machine learning', 'Machine Learning'),
        ('deep learning', 'Deep Learning'),
        ('computer vision', 'Computer Vision'),
        ('clustering', 'Clustering / Unsupervised Learning'),
        ('web development', 'Web Development'),
        ('others', 'Others'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='others'
    )

    tools = models.TextField(blank=True, null=True)

    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)

    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# =========================
# SKILL MODEL
# =========================
class Skill(models.Model):

    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    name = models.CharField(max_length=100)

    level = models.CharField(
        max_length=50,
        choices=LEVEL_CHOICES
    )

    def __str__(self):
        return f"{self.name} ({self.level})"


# =========================
# ABOUT MODEL
# =========================

class About(models.Model):

    full_name = models.CharField(max_length=200)

    title = models.CharField(max_length=200)

    bio = models.TextField()

    email = models.EmailField()

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    location = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    header_image = models.ImageField(
        upload_to='about/',
        blank=True,
        null=True
    )

    profile_image = models.ImageField(
        upload_to='about/',
        blank=True,
        null=True
    )

    about_image = models.ImageField(
        upload_to='about/',
        blank=True,
        null=True
    )

    # =========================
    # NEW FIELD: RESUME / CV
    # =========================
    resume = models.FileField(
        upload_to='resume/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # FIXED HERE 👇
    def __str__(self):
        return self.full_name


# =========================
# CERTIFICATE MODEL
# =========================
class Certificate(models.Model):

    MODE_CHOICES = [
        ('Online', 'Online'),
        ('Offline', 'Offline'),
        ('Hybrid', 'Hybrid'),
    ]

    name = models.CharField(max_length=255)

    source = models.CharField(max_length=255)

    year = models.IntegerField()

    mode = models.CharField(
        max_length=50,
        choices=MODE_CHOICES,
        default='Online'
    )

    def __str__(self):
        return self.name


# =========================
# TOOL MODEL
# =========================
class Tool(models.Model):

    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label


# =========================
# EDUCATION MODEL
# =========================
class Education(models.Model):

    institution = models.CharField(max_length=255)

    course = models.CharField(max_length=255)

    start_year = models.IntegerField()

    end_year = models.IntegerField(
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.institution


# =========================
# EXPERIENCE MODEL
# =========================
class Experience(models.Model):

    company = models.CharField(max_length=255)

    role = models.CharField(max_length=255)

    start_year = models.IntegerField()

    end_year = models.IntegerField(
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.company} - {self.role}"
    




class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)