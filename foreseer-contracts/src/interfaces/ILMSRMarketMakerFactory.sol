// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IConditionalTokens {}

interface IERC20 {}

interface ILMSRMarketMaker {}

interface IWhitelist {}

interface ILMSRMarketMakerFactory {
    event LMSRMarketMakerCreation(
        address indexed creator,
        ILMSRMarketMaker lmsrMarketMaker,
        IConditionalTokens pmSystem,
        IERC20 collateralToken,
        bytes32[] conditionIds,
        uint64 fee,
        uint256 funding
    );

    function implementationMaster() external view returns (ILMSRMarketMaker);

    function cloneConstructor(bytes calldata consData) external;

    function createLMSRMarketMaker(
        IConditionalTokens pmSystem,
        IERC20 collateralToken,
        bytes32[] calldata conditionIds,
        uint64 fee,
        IWhitelist whitelist,
        uint256 funding
    ) external returns (ILMSRMarketMaker lmsrMarketMaker);
}
