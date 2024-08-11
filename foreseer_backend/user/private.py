from django.contrib.auth.models import User
from market.private import get_user_position_in_market
from user.models import UserDetails
import requests
from web3 import Web3
from web3.middleware import geth_poa_middleware
from django.conf import settings

import environ

env = environ.Env()
environ.Env.read_env()

REPUTATION_TOKEN_ABI = [
    # ... (include other existing functions)
    {
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "mint",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "hasReputationToken",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserToken",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
]


def get_web3_instance():
    w3 = Web3(Web3.HTTPProvider(env("RPC_URL")))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    return w3


def get_reputation_token_contract():
    w3 = get_web3_instance()
    return w3.eth.contract(
        address=settings.REPUTATION_TOKEN_ADDRESS, abi=REPUTATION_TOKEN_ABI
    )


def has_reputation_token(address):
    contract = get_reputation_token_contract()
    return contract.functions.hasReputationToken(address).call()


def get_user_token(address):
    contract = get_reputation_token_contract()
    return contract.functions.getUserToken(address).call()


def mint_reputation_token(user_address):
    w3 = get_web3_instance()
    contract = get_reputation_token_contract()

    account = w3.eth.account.from_key(env("PRIVATE_KEY"))

    # Estimate gas
    gas_estimate = contract.functions.mint(user_address).estimate_gas(
        {"from": account.address}
    )

    # Build transaction
    transaction = contract.functions.mint(user_address).build_transaction(
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

    if tx_receipt.status == 1:
        # Transaction was successful, get the token ID
        token_id = get_user_token(user_address)
        return token_id
    else:
        return None


def create_user(email, ethAddress, verification_proof):
    # verify worldcoin account
    if not verification_proof:
        return None
    print({"ethAddress": ethAddress})
    proof_verification_result = requests.post(
        f"https://developer.worldcoin.org/api/v2/verify/{env('WORLDCOIN_APP_ID')}",
        json={**verification_proof, "action": "create-market-on-foresight"},
    )
    print({"worldcoin_verification_result": proof_verification_result.json()})
    if not proof_verification_result.json().get("success"):
        return None

    if not has_reputation_token(
        ethAddress
    ):  # Assuming you have an ethereum_address field for the user
        token_id = mint_reputation_token(ethAddress)

        if not token_id:
            return None

    user = User.objects.filter(email=email).first()
    if not user:
        user = User.objects.create_user(email=email, username=email)
        UserDetails.objects.create(
            user=user,
            ethAddress=ethAddress,
            markets_created=[],
            markets_participated=[],
        )

    return {
        "email": user.email,
        "ethAddress": ethAddress,
        "markets_created": [],
        "markets_participated": [],
        "verified": True,
    }


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
        "is_verified": user_details.is_verified,
    }


def get_user_positions(email, market_id=None):
    user = User.objects.filter(email=email).first()
    if not user:
        return None

    user_details = UserDetails.objects.filter(user=user).first()
    position = get_user_position_in_market(
        market_id,
        user_details.ethAddress,
    )

    return position
