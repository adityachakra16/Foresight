from market.models import Market


def create_market(**market):
    market = Market.objects.create(
        name=market["name"],
        rules=market["rules"],
        expiration=market["expiration"],
    )

    return market


def get_market_reputation(**market):
    return 10


def get_all_markets():
    return Market.objects.all()


def get_market_by_id(market_id):
    return Market.objects.get(id=market_id)
