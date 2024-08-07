interface UserType {
  id: string;
  email: string;
  ethAddress: string;
  isVerified: boolean;
  ethAddress: string;
  portfolioValue: number;
}

interface MarketCollectionType {
  name: string;
  description: string;
  totalAmount: number;
  expiration: number;
  markets: MarketType[];
}

interface OutcomeType {
  id: string;
  name: string;
  description: string;
  probability: number;
}

interface OrderType {
  id: string;
  amount: number;
  price: number;
  type: "buy" | "sell";
}

interface OrderbookType {
  yes: OrderType[];
  no: OrderType[];
}

interface MarketType {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  expiration: string;
}

interface DetailedMarketType extends MarketType {
  outcomes: OutcomeType[];
  orderbook?: OrderbookType;
  rewards?: number;
}

type PositionType = {
  market: MarketType;
  amount: number;
  outcome: "yes" | "no";
};

type TradesType = {
  market: MarketType;
  amount: number;
  outcome: "yes" | "no";
  price: number;
};
