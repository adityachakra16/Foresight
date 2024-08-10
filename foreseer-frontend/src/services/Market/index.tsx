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
  const res = await sendRequest(`/market/${marketId}`, {
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
