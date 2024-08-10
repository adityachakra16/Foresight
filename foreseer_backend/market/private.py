import datetime
from market.models import Market
from django.utils import timezone
from datetime import datetime
from django.utils import timezone


def create_market(**market):
    print(market)
    seconds = market["expiration"] / 1000
    dt = datetime.fromtimestamp(seconds)

    market = Market.objects.create(
        name=market["name"],
        rules=market["description"],
        expiration=dt,
    )

    return market


def get_market_reputation(**market):
    return 10


def get_all_markets():
    return Market.objects.all()


def get_market_by_id(market_id):
    return Market.objects.get(id=market_id)
