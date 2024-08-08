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

  const createMarket = async (market: CreateMarketDto) => {
    if (!client) {
      console.log("Client is undefined");
      return;
    }
    const data = encodeFunctionData({
      abi: conditionalToken.abi,
      functionName: "prepareCondition",
      args: [
        "0xf4D70D2fd1DE59ff34aA0350263ba742cb94b1c8",
        numberToBytes32(123),
        2,
      ],
    });

    const uo = await sendUserOperation({
      uo: {
        target: "0x910D34cF7Af63Aa72378DED2E4B947cbd2AEBC01",
        data: data,
      },
    });
  };

  const addLiquidty = async (marketId: string, amount: number) => {};

  const buyShares = async (
    marketId: string,
    outcomeId: string,
    amount: number
  ) => {};

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
  };
};
