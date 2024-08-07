// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Auth} from "./mixins/Auth.sol";
import {Assets} from "./mixins/Assets.sol";
import {Hashing} from "./mixins/Hashing.sol";
import {Trading} from "./mixins/Trading.sol";
import {Registry} from "./mixins/Registry.sol";
import {Signatures} from "./mixins/Signatures.sol";
import {NonceManager} from "./mixins/NonceManager.sol";
import {AssetOperations} from "./mixins/AssetOperations.sol";
import {Order} from "./libraries/OrderStructs.sol";
import {ReentrancyGuard} from "src/common/ReentrancyGuard.sol";

contract ForesightExchange is
    Auth,
    ReentrancyGuard,
    Assets,
    AssetOperations,
    Hashing("Polymarket CTF Exchange", "1"),
    NonceManager,
    Registry,
    Signatures,
    Trading
{
    constructor(address _collateral, address _ctf) Assets(_collateral, _ctf) Signatures() {}

    /// @notice Fills an order
    /// @param order        - The order to be filled
    /// @param fillAmount   - The amount to be filled, always in terms of the maker amount
    function fillOrder(Order memory order, uint256 fillAmount) external nonReentrant onlyOperator {
        _fillOrder(order, fillAmount, msg.sender);
    }

    /// @notice Fills a set of orders
    /// @param orders       - The order to be filled
    /// @param fillAmounts  - The amounts to be filled, always in terms of the maker amount
    function fillOrders(Order[] memory orders, uint256[] memory fillAmounts) external nonReentrant onlyOperator {
        _fillOrders(orders, fillAmounts, msg.sender);
    }

    /// @notice Matches a taker order against a list of maker orders
    /// @param takerOrder       - The active order to be matched
    /// @param makerOrders      - The array of maker orders to be matched against the active order
    /// @param takerFillAmount  - The amount to fill on the taker order, always in terms of the maker amount
    /// @param makerFillAmounts - The array of amounts to fill on the maker orders, always in terms of the maker amount
    function matchOrders(
        Order memory takerOrder,
        Order[] memory makerOrders,
        uint256 takerFillAmount,
        uint256[] memory makerFillAmounts
    ) external nonReentrant onlyOperator {
        _matchOrders(takerOrder, makerOrders, takerFillAmount, makerFillAmounts);
    }

    /// @notice Registers a tokenId, its complement and its conditionId for trading on the Exchange
    /// @param token        - The tokenId being registered
    /// @param complement   - The complement of the tokenId
    /// @param conditionId  - The CTF conditionId
    function registerToken(uint256 token, uint256 complement, bytes32 conditionId) external onlyAdmin {
        _registerToken(token, complement, conditionId);
    }
}
