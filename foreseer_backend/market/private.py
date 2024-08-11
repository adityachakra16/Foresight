import datetime
from django.conf import settings

from web3 import Web3
from market.models import Market
from django.utils import timezone
from datetime import datetime
from django.utils import timezone
from market.abis.condiitonal_token import conditional_token_abi

import environ

env = environ.Env()
environ.Env.read_env()
w3 = Web3(Web3.HTTPProvider(env("RPC_URL")))


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
    market = Market.objects.get(id=market_id)

    return {
        "name": market.name,
        "rules": market.rules,
        "expiration": market.expiration,
        "active": market.active,
        "created_at": market.created_at,
        "updated_at": market.updated_at,
        "id": market.id,
        "amm_address": market.amm_address,
    }


def get_market_liquidity(market_id):
    market = Market.objects.get(id=market_id)
    print(market)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address("0x" + amm_address[2:]), abi=settings.MM_ABI
    )

    # Call balanceOf function
    try:
        balance = contract.functions.funding().call()
        return balance

    except Exception as e:
        print(f"Error calling balanceOf: {e}")
        return None


def calculate_market_costs(market_id, outcome_index=0, shares=1, buy_sell="buy"):
    market = Market.objects.get(id=market_id)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address("0x" + amm_address[2:]), abi=settings.MM_ABI
    )
    print({"outcome_index": outcome_index, "shares": shares, "buy_sell": buy_sell})
    outcome_token_amounts = [0, 0]
    if buy_sell == "buy":
        outcome_token_amounts[int(outcome_index)] = int(shares)
    else:
        outcome_token_amounts[int(outcome_index)] = -int(shares)
    try:
        print(outcome_token_amounts)

        net_cost = contract.functions.calcNetCost(outcome_token_amounts).call()

        print({"net_cost": net_cost})
        return net_cost
    except Exception as e:
        print(f"Error calling calcNetCost: {e}")
        return None


def calculate_costs_of_one_share(market_id, buy_sell="buy"):

    print({"market_id": market_id, "buy_sell": buy_sell})
    yes_cost = calculate_market_costs(market_id, 0, 1000000000000000000, buy_sell)
    no_cost = calculate_market_costs(market_id, 1, 1000000000000000000, buy_sell)

    return [yes_cost, no_cost]


def calculate_market_marginal_price(market_id):
    market = Market.objects.get(id=market_id)
    amm_address = market.amm_address
    if not amm_address:
        return None
    contract = w3.eth.contract(
        address=Web3.to_checksum_address(amm_address), abi=settings.MM_ABI
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


def calculate_marginal_prices_of_markets(market_ids):
    markets = Market.objects.filter(id__in=market_ids)
    return {market.id: calculate_market_marginal_price(market.id) for market in markets}


def number_to_bytes32(num: int) -> str:
    # Convert the number to a hexadecimal string and remove the '0x' prefix
    hex_string = hex(num)[2:]

    # Pad the string to 64 characters (32 bytes)
    padded_hex_string = hex_string.zfill(64)

    # Add the '0x' prefix
    return "0x" + padded_hex_string


def resolve_market(market_id, correct_outcome_index):
    market = Market.objects.get(id=market_id)
    contract = w3.eth.contract(
        address=settings.CONDITIONAL_TOKEN_ADDRESS, abi=settings.CONDITIONAL_TOKEN_ABI
    )

    outcome = [0, 0]
    outcome[correct_outcome_index] = 1

    question_id = number_to_bytes32(market.id)
    try:

        account = w3.eth.account.from_key(env("PRIVATE_KEY"))

        # Estimate gas
        gas_estimate = contract.functions.reportPayouts(
            question_id, outcome
        ).estimate_gas({"from": account.address})

        # Build transaction
        transaction = contract.functions.reportPayouts(
            question_id, outcome
        ).build_transaction(
            {
                "from": account.address,
                "gas": gas_estimate,
                "nonce": w3.eth.get_transaction_count(account.address),
            }
        )

        # Sign transaction
        signed_txn = account.sign_transaction(transaction)

        # Send transaction
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        # Wait for transaction receipt
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print({"tx_receipt": tx_receipt})
        market.active = False
        market.save()

        return tx_receipt

    except Exception as e:
        print(f"Error calling reportPayouts: {e}")
        return None


def get_user_position_in_market(market_id, user_address):
    market = Market.objects.get(id=market_id)

    contract = w3.eth.contract(
        address=settings.CONDITIONAL_TOKEN_ADDRESS,
        abi=conditional_token_abi,
    )

    condition_id = contract.functions.getConditionId(
        settings.MARKET_RESOLVER_ORACLE_ADDRESS, number_to_bytes32(market.id), 2
    ).call()

    index_set = [1, 2]
    yes_collection_id = contract.functions.getCollectionId(
        number_to_bytes32(0), condition_id, index_set[0]
    ).call()
    print(f"Collection ID: {yes_collection_id}")

    no_collection_id = contract.functions.getCollectionId(
        number_to_bytes32(0), condition_id, index_set[1]
    ).call()
    yes_position_id = contract.functions.getPositionId(
        settings.COLLATERAL_TOKEN_ADDRESS, yes_collection_id
    ).call()

    no_position_id = contract.functions.getPositionId(
        settings.COLLATERAL_TOKEN_ADDRESS, no_collection_id
    ).call()

    yes_balance = contract.functions.balanceOf(user_address, yes_position_id).call()

    no_balance = contract.functions.balanceOf(user_address, no_position_id).call()

    try:
        return [yes_balance, no_balance]
    except Exception as e:
        print(f"Error calling balanceOf: {e}")
        return None
