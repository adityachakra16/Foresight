import { sendRequest } from "@/services/Request";

export const fetchPublicMarkets = async () => {
  // const res = await sendRequest(`/markets`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (res.success) {
  //   return res.data;
  // }
  // return false;

  return [
    {
      name: "Will Bitcoin reach $100,000 by 2022?",
      id: "1",
      description: "Will Bitcoin reach $100,000 by 2022?",
      totalAmount: 1000,

      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
    {
      name: "Will Ethereum reach $10,000 by 2022?",
      id: "2",
      description: "Will Ethereum reach $10,000 by 2022?",
      totalAmount: 1000,

      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
    {
      name: "Will Cardano reach $10 by 2022?",
      id: "3",
      description: "Will Cardano reach $10 by 2022?",
      totalAmount: 1000,

      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
    {
      name: "Will Solana reach $100 by 2022?",
      id: "4",
      description: "Will Solana reach $100 by 2022?",
      totalAmount: 1000,
      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
    {
      name: "Will Dogecoin reach $1 by 2022?",
      id: "5",
      description: "Will Dogecoin reach $1 by 2022?",
      totalAmount: 1000,
      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
    {
      name: "Will Polkadot reach $100 by 2022?",
      id: "6",
      description: "Will Polkadot reach $100 by 2022?",
      totalAmount: 1000,

      outcomes: [
        {
          id: "1",
          name: "Yes",
          description: "Yes",
          probability: 0.5,
        },
        {
          id: "2",
          name: "No",
          description: "No",
          probability: 0.5,
        },
      ],
      expiration: new Date().toISOString(),
    },
  ] as DetailedMarketType[];
};

export const fetchMarket = async (marketId: string) => {
  // const res = await sendRequest(`/markets/${marketId}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (res.success) {
  //   return res.data;
  // }
  // return false;
  return {
    name: "Will Polkadot reach $100 by 2022?",
    id: "6",
    description: "Will Polkadot reach $100 by 2022?",
    totalAmount: 1000,

    outcomes: [
      {
        id: "1",
        name: "Yes",
        description: "Yes",
        probability: 0.5,
      },
      {
        id: "2",
        name: "No",
        description: "No",
        probability: 0.5,
      },
    ],
    expiration: new Date().toISOString(),
  };
};
