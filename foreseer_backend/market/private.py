import datetime
from django.conf import settings

from web3 import Web3
from market.models import Market
from django.utils import timezone
from datetime import datetime
from django.utils import timezone

import environ

env = environ.Env()
environ.Env.read_env()
w3 = Web3(Web3.HTTPProvider(env("RPC_URL")))


mm_abi = [
    {
        "constant": True,
        "inputs": [{"name": "outcomeTokenAmounts", "type": "int256[]"}],
        "name": "calcNetCost",
        "outputs": [{"name": "netCost", "type": "int256"}],
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [{"name": "outcomeTokenIndex", "type": "uint8"}],
        "name": "calcMarginalPrice",
        "outputs": [{"name": "price", "type": "int256"}],
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "funding",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function",
        "stateMutability": "view",
    },
]


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


def get_market_liquidity(market_id):
    market = Market.objects.get(id=market_id)
    print(market)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address("0x" + amm_address[2:]), abi=mm_abi
    )

    # Call balanceOf function
    try:
        balance = contract.functions.funding().call()
        return balance

    except Exception as e:
        print(f"Error calling balanceOf: {e}")
        return None


def calculate_market_costs(market_id):
    market = Market.objects.get(id=market_id)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address("0x" + amm_address[2:]), abi=mm_abi
    )
    outcome_token_amounts = [1, 0]
    try:
        net_cost = contract.functions.calcNetCost(outcome_token_amounts).call()
        return net_cost
    except Exception as e:
        print(f"Error calling calcNetCost: {e}")
        return None


def calculate_market_marginal_price(market_id):
    market = Market.objects.get(id=market_id)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address(amm_address), abi=mm_abi
    )
    try:
        yes_price = contract.functions.calcMarginalPrice(0).call()
        no_price = contract.functions.calcMarginalPrice(1).call()
        return [yes_price, no_price]
    except Exception as e:
        print(f"Error calling calcNetCost: {e}")
        return None


def get_liquidity_of_markets(market_ids):
    markets = Market.objects.filter(id__in=market_ids)
    return {market.id: get_market_liquidity(market.id) for market in markets}


def calculate_costs_of_markets(market_ids):
    markets = Market.objects.filter(id__in=market_ids)
    return {market.id: calculate_market_costs(market.id) for market in markets}


def calculate_marginal_prices_of_markets(market_ids):
    markets = Market.objects.filter(id__in=market_ids)
    return {market.id: calculate_market_marginal_price(market.id) for market in markets}
