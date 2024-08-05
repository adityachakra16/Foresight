import { sendRequest } from "@/services/Request";
import { UseUserResult } from "@alchemy/aa-alchemy/react";

export const fetchUserProfile = async (user: UseUserResult) => {
  // const res = await sendRequest(`/user/me`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const res = {
    ethAddress: user?.address,
    email: user?.email,
    id: user?.userId,
    isVerified: false,
    portfolioValue: 10,
  };

  return res;
};

export const fetchUserPositions = async () => {
  const res = await sendRequest(`/user/positions`, {
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

export const fetchUserTrades = async () => {
  const res = await sendRequest(`/user/trades`, {
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

export const fetchUserCreatedMarkets = async () => {
  const res = await sendRequest(`/user/markets`, {
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
