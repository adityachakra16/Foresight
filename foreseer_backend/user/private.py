from django.contrib.auth.models import User
from user.models import UserDetails


def create_user(email, ethAddress):
    # verify worldcoin account

    user = User.objects.filter(email=email).first()
    if not user:
        user = User.objects.create_user(email=email)
        UserDetails.objects.create(
            user=user,
            ethAddress=ethAddress,
            markets_created=[],
            markets_participated=[],
        )
    return user


def get_user_details(email):
    user = User.objects.filter(email=email).first()
    if not user:
        return None

    user_details = UserDetails.objects.filter(user=user).first()

    return {
        "email": user.email,
        "ethAddress": user_details.ethAddress,
        "markets_created": user_details.markets_created,
        "markets_participated": user_details.markets_participated,
        "verified": user,
    }
