from django.urls import path, include
from user import views

urlpatterns = [
    path(
        "api/user",
        views.VerifiedUserView.as_view(),
        name="user",
    ),
]
