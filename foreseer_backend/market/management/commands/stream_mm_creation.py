# File: your_app/management/commands/listen_for_events.py

import asyncio
from django.core.management.base import BaseCommand
from django.conf import settings
from web3 import Web3
import environ
from market.models import Market

env = environ.Env()
environ.Env.read_env()


class Command(BaseCommand):
    help = "Listens for LMSRMarketMakerCreation events and updates the database"

    def handle_market_maker_creation(self, event):
        condition_ids = event["args"]["conditionIds"]
        amm_address = event["args"]["lmsrMarketMaker"]
        condition_id = condition_ids[0].hex()

        try:
            market = Market.objects.get(condition_id=condition_id)
            market.amm_address = amm_address
            market.save()
            self.stdout.write(
                self.style.SUCCESS(
                    f"Updated Market {market.id} with AMM address: {amm_address}"
                )
            )
        except Market.DoesNotExist:
            self.stdout.write(
                self.style.WARNING(
                    f"No matching market found for condition ID: {condition_id}"
                )
            )

    async def listen_for_events(self):
        w3 = Web3(Web3.WebsocketProvider(env("WEBSOCKET_URL")))
        contract_address = settings.AMM_FACTORY_ADDRESS
        contract_abi = settings.AMM_FACTORY_ABI

        contract = w3.eth.contract(address=contract_address, abi=contract_abi)
        self.stdout.write(self.style.SUCCESS("Connected to the contract"))
        print(contract.functions)

        event_filter = contract.events.LMSRMarketMakerCreation.create_filter(
            fromBlock="latest"
        )

        print(event_filter)

        while True:
            for event in event_filter.get_new_entries():
                self.stdout.write(self.style.SUCCESS(f"New event received: {event}"))
                self.handle_market_maker_creation(event)
            await asyncio.sleep(10)

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting event listener..."))
        asyncio.run(self.listen_for_events())
