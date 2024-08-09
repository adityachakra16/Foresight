// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Auth} from "./mixins/Auth.sol";
import {IConditionalTokens} from "./interfaces/IConditionalTokens.sol";
import {console2} from "forge-std/Test.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";

struct MarketResolver {
    uint8 resolverType;
    bytes32 resolverId;
    uint256 value;
    uint256 expiration;
}

contract MarketResolutionOracleAdapter is Auth {
    IPyth pyth;
    IConditionalTokens ctf;
    // address public ctf = "0x910D34cF7Af63Aa72378DED2E4B947cbd2AEBC01"; // base

    mapping(bytes32 => MarketResolver) public marketResolvers;

    constructor(address _pyth, address _ctf) {
        pyth = IPyth(_pyth);
        ctf = IConditionalTokens(_ctf);
    }

    function createResolver(bytes32 marketId, uint8 resolverType, bytes32 resolverId, uint256 expiration, uint256 value)
        external
        onlyOperator
    {
        marketResolvers[marketId] = MarketResolver(resolverType, resolverId, expiration, value);
    }

    function resolveMarket(bytes32 marketId) external onlyOperator {
        MarketResolver memory resolver = marketResolvers[marketId];
        require(resolver.expiration < block.timestamp, "Market has not expired");

        if (resolver.resolverType == 1) {
            // Pyth resolver
            PythStructs.Price memory price = pyth.getPriceNoOlderThan(resolver.resolverId, 30);

            uint256 price18Decimals =
                (uint256(uint64(price.price)) * (10 ** 18)) / (10 ** uint8(uint32(-1 * price.expo)));

            if (price18Decimals > resolver.value) {
                // market resolved as true

                uint256[] memory payouts = new uint256[](2);
                payouts[0] = 1;
                payouts[1] = 0;
                ctf.reportPayouts(marketId, payouts);
            } else {
                // market resolved as false
                uint256[] memory payouts = new uint256[](2);
                payouts[0] = 0;
                payouts[1] = 1;
                ctf.reportPayouts(marketId, payouts);
            }
        }
    }
}
