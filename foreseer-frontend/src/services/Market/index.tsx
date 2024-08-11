import { CreateMarketDto, UpdateMarketDto } from "@/dtos";
import { sendRequest } from "@/services/Request";

export const fetchPublicMarkets = async () => {
  const res = await sendRequest(`/markets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.success) {
    return res.data;
  }
  return false;
};

export const fetchMarket = async (marketId: string) => {
  const res = await sendRequest(`/market?id=${marketId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.success) {
    return res.data;
  }
  return false;
};

export const createMarket = async (marketData: CreateMarketDto) => {
  const res = await sendRequest(`/market`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marketData),
  });
  if (res.success) {
    return res.data;
  }
  return false;
};

export const updateMarket = async (
  marketId: string,
  marketData: UpdateMarketDto
) => {
  const res = await sendRequest(`/market?id=${marketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marketData),
  });
  if (res.success) {
    return res.data;
  }
  return false;
};

export const fetchMarketLiquidity = async (marketIds: string[]) => {
  const res = await sendRequest(`/markets/liquidity?market_ids=${marketIds}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.success) {
    return res.data;
  }
  return false;
};

export const fetchMarketCost = async (
  marketId: number,
  outcomeIdx: number,
  shares: bigint,
  buySell: string
) => {
  const res = await sendRequest(
    `/markets/cost?market_id=${marketId}&outcome_index=${outcomeIdx}&shares=${shares}&buy_sell=${buySell}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.success) {
    return res.data;
  }
  return false;
};

export const fetchMarketMarginalPrice = async (marketId: string) => {
  const res = await sendRequest(`/markets/margin?market_id=${marketId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.success) {
    return res.data;
  }
  return false;
};
