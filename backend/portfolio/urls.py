from django.urls import path
from .views import (
    ProjectListView,
    SkillListView,
    AboutListView,
    CertificateListView,
    ToolListView,
    EducationListView,
    ExperienceListView,
    send_message,
    get_messages,
    stats_view   # ✅ ADD THIS
)

urlpatterns = [

    # =========================
    # MAIN API ENDPOINTS
    # =========================
    path('projects/', ProjectListView.as_view()),
    path('skills/', SkillListView.as_view()),
    path('about/', AboutListView.as_view()),
    path('certificates/', CertificateListView.as_view()),
    path('tools/', ToolListView.as_view()),
    path('education/', EducationListView.as_view()),
    path('experience/', ExperienceListView.as_view()),

    # =========================
    # STATS API 🚀
    # =========================
    path('stats/', stats_view),

    # =========================
    # CONTACT API
    # =========================

    # send message (POST)
    path('contact/send/', send_message),

    # get messages (GET)
    path('contact/messages/', get_messages),
]