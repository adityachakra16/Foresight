from django.urls import path, include
from user import views

urlpatterns = [
    path(
        "api/user",
        views.VerifiedUserView.as_view(),
        name="user",
    ),
    path(
        "api/user/markets",
        views.VerifiedUserView.as_view(),
        name="user_markets",
    ),
    path(
        "api/user/positions",
        views.get_user_position,
        name="user_positions",
    ),
]
