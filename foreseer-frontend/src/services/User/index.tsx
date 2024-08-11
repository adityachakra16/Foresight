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
  // const res = await sendRequest(`/user/positions`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (res.success) {
  //   return res.data;
  // }
  return false;
};

export const fetchUserPosition = async (
  marketId: number,
  ethAddress: `0x${string}`
) => {
  console.log({ marketId, ethAddress });
  if (!marketId || !ethAddress) return false;
  const res = await sendRequest(
    `/user/positions?market_id=${marketId}&eth_address=${ethAddress}`,
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
