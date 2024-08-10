import {
  useSendUserOperation,
  useSmartAccountClient,
} from "@alchemy/aa-alchemy/react";
import {
  chain,
  accountType,
  gasManagerConfig,
  accountClientOptions as opts,
} from "../../config";
import { encodeFunctionData } from "viem";
import { CreateMarketDto } from "@/dtos";
import { numberToBytes32 } from "@/utils";
import conditionalToken from "@/abis/ConditionalToken.json";
import marketMakerFactory from "@/abis/MarketMakerFactory.json";
import erc20 from "@/abis/ERC20.json";
import { parseUnits, formatUnits } from "ethers";

export const useContractActions = () => {
  const { client } = useSmartAccountClient({
    type: accountType,
    gasManagerConfig,
    opts,
  });

  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError,
  } = useSendUserOperation({ client, waitForTxn: true });

  const createMarket = async (market: MarketType) => {
    if (!client) {
      console.log("Client is undefined");
      return;
    }
    const data = encodeFunctionData({
      abi: conditionalToken.abi,
      functionName: "prepareCondition",
      args: [
        process.env.NEXT_PUBLIC_MARKET_RESOLVER_ADDRESS,
        numberToBytes32(market.id),
        2,
      ],
    });

    const uo = await sendUserOperation({
      uo: {
        target: process.env.NEXT_PUBLIC_CONDITIONAL_TOKEN_ADDRESS as "0x",
        data: data,
      },
    });
  };

  const insufficientBalance = async (funding: number) => {
    if (!client) {
      console.log("Client is undefined");
      return false;
    }
    const ethAddress = client.getAddress();
    console.log({ ethAddress });
    const balance = await client.readContract({
      abi: erc20.abi,
      address: process.env.NEXT_PUBLIC_COLLATERAL_TOKEN_ADDRESS as "0x",
      functionName: "balanceOf",
      args: [ethAddress],
    });

    const fundingBigInt = parseUnits(funding.toString(), 6);

    console.log({ balance, ethAddress });
    if (balance < fundingBigInt) {
      return true;
    }

    return false;
  };

  const addLiquidty = async (marketId: number, funding: number) => {
    if (!client) {
      console.log("Client is undefined");
      return false;
    }

    const conditionId = await client.readContract({
      abi: conditionalToken.abi,
      address: process.env.NEXT_PUBLIC_CONDITIONAL_TOKEN_ADDRESS as "0x",
      functionName: "getConditionId",
      args: [
        process.env.NEXT_PUBLIC_MARKET_RESOLVER_ADDRESS,
        numberToBytes32(marketId),
        2,
      ],
    });

    const fundingBigInt = parseUnits(funding.toString(), 6);

    const approvalData = encodeFunctionData({
      abi: erc20.abi,
      functionName: "approve",
      args: [
        process.env.NEXT_PUBLIC_AMM_FACTORY_ADDRESS,
        /// Max Uint256
        BigInt(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ),
      ],
    });

    console.log({ fundingBigInt });

    const data = encodeFunctionData({
      abi: marketMakerFactory.abi,
      functionName: "createLMSRMarketMaker",
      args: [
        process.env.NEXT_PUBLIC_CONDITIONAL_TOKEN_ADDRESS,
        process.env.NEXT_PUBLIC_COLLATERAL_TOKEN_ADDRESS,
        [conditionId],
        0,
        "0x0000000000000000000000000000000000000000",
        fundingBigInt,
      ],
    });

    console.log({ data });

    const uo = await sendUserOperation({
      uo: [
        {
          target: process.env.NEXT_PUBLIC_COLLATERAL_TOKEN_ADDRESS as "0x",
          data: approvalData,
        },
        {
          target: process.env.NEXT_PUBLIC_AMM_FACTORY_ADDRESS as "0x",
          data: data,
        },
      ],
    });
  };

  const buyShares = async (
    marketId: number,
    tokenAmounts: number[],
    from: string
  ) => {
    if (!client) {
      console.log("Client is undefined");
      return;
    }

    const ammAddress = "0x";
    const cost = 0;
    const uo = await sendUserOperation({
      uo: {
        target: ammAddress as "0x",
        data: encodeFunctionData({
          abi: marketMakerFactory.abi,
          functionName: "trade",
          args: [tokenAmounts, cost, from],
        }),
      },
    });
  };

  const sellShares = async (
    marketId: string,
    outcomeId: string,
    amount: number
  ) => {};

  return {
    createMarket,
    addLiquidty,
    buyShares,
    sellShares,
    sendUserOperationResult,
    isSendingUserOperation,
    isSendUserOperationError,

    insufficientBalance,
  };
};
