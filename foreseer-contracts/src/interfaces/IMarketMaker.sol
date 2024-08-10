pragma solidity ^0.8.1;

interface Ownable {}

interface ERC1155TokenReceiver {}

interface ConditionalTokens {}

interface IERC20 {}

interface Whitelist {}

interface IMarketMaker is Ownable, ERC1155TokenReceiver {
    enum Stage {
        Running,
        Paused,
        Closed
    }

    event AMMCreated(uint256 initialFunding);
    event AMMPaused();
    event AMMResumed();
    event AMMClosed();
    event AMMFundingChanged(int256 fundingChange);
    event AMMFeeChanged(uint64 newFee);
    event AMMFeeWithdrawal(uint256 fees);
    event AMMOutcomeTokenTrade(
        address indexed transactor, int256[] outcomeTokenAmounts, int256 outcomeTokenNetCost, uint256 marketFees
    );

    function FEE_RANGE() external pure returns (uint64);
    function pmSystem() external view returns (ConditionalTokens);
    function collateralToken() external view returns (IERC20);
    function conditionIds(uint256 index) external view returns (bytes32);
    function atomicOutcomeSlotCount() external view returns (uint256);
    function fee() external view returns (uint64);
    function funding() external view returns (uint256);
    function stage() external view returns (Stage);
    function whitelist() external view returns (Whitelist);

    function calcNetCost(int256[] calldata outcomeTokenAmounts) external view returns (int256 netCost);
    function changeFunding(int256 fundingChange) external;
    function pause() external;
    function resume() external;
    function changeFee(uint64 _fee) external;
    function close() external;
    function withdrawFees() external returns (uint256 fees);
    function trade(int256[] calldata outcomeTokenAmounts, int256 collateralLimit) external returns (int256 netCost);
    function calcMarketFee(uint256 outcomeTokenCost) external view returns (uint256);
}
