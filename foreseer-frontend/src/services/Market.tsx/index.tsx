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
  const res = await sendRequest(`/markets/${marketId}`, {
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
