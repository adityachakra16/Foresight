import { sendRequest } from "@/services/Request";
import { UseUserResult } from "@alchemy/aa-alchemy/react";

export const createVerifiedUser = async (
  ethAddress: string,
  email: string,
  proof: any
) => {
  const res = await sendRequest(`/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethAddress, email, verification_proof: proof }),
  });

  if (res) {
    return res.data;
  } else return false;
};

export const fetchUserProfile = async (user: UseUserResult) => {
  const res = await sendRequest(`/user?email=${user?.email}`, {
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

  // return [
  //   {
  //     market: {
  //       name: "Will Bitcoin reach $100,000 by 2022?",
  //       id: "6",
  //       description: "Will Bitcoin reach $100,000 by 2022?",
  //       totalAmount: 1000,
  //       expiration: new Date().toISOString(),
  //     },
  //     shares: 100,
  //     outcome: "yes" as "yes",
  //     avgPrice: 100,
  //     currentValue: 100,
  //     returns: 10,
  //   },
  //   {
  //     market: {
  //       name: "Will Ethereum reach $10,000 by 2022?",
  //       id: "6",
  //       description: "Will Ethereum reach $10,000 by 2022?",
  //       totalAmount: 1000,
  //       expiration: new Date().toISOString(),
  //     },
  //     shares: 100,
  //     outcome: "no" as "no",
  //     avgPrice: 100,
  //     currentValue: 100,
  //     returns: -10,
  //   },
  // ];
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
