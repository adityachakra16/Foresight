import {
  fetchMarket,
  fetchMarketCost,
  fetchMarketLiquidity,
  fetchMarketMarginalPrice,
  fetchPublicMarkets,
} from "@/services/Market";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useForesightUser } from "../User";
import { parseUnits } from "ethers";

interface MarketContextType {
  market: DetailedMarketType | undefined;
  liquidity: number;
  marginalPrice: [number, number];
  cost: number;
  shares: string;
  setShares: (shares: string) => void;
  selectedTab: "buy" | "sell";
  setSelectedTab: (tab: "buy" | "sell") => void;
  refreshCost: () => void;
  outcome: string;
  setOutcome: (outcome: string) => void;
}

export const MarketContext = createContext<MarketContextType>(
  {} as MarketContextType
);

export function useProviderMarketContext() {
  const router = useRouter();
  const { currentUser, userPositions } = useForesightUser();
  const { slug } = router.query;
  const [market, setMarket] = useState<DetailedMarketType>();
  const [liquidity, setLiquidity] = useState<number>(0);
  const [marginalPrice, setMarginalPrice] = useState<[number, number]>([0, 0]);
  const [cost, setCost] = useState<number>(0);
  const [shares, setShares] = useState<string>("0");
  const [outcome, setOutcome] = useState<string>("yes");
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");

  useEffect(() => {
    if (slug)
      void (async () => {
        const res = await fetchMarket(slug as string);
        if (res) {
          setMarket(res);
        }

        const liquidity = await fetchMarketLiquidity([slug as string]);

        if (liquidity) {
          setLiquidity(liquidity[slug as string]);
        }

        const marginalPrice = await fetchMarketMarginalPrice([slug as string]);

        if (marginalPrice) {
          const [yes, no] = [
            marginalPrice[slug as string][0] / 10 ** 18,
            marginalPrice[slug as string][1] / 10 ** 18,
          ];
          setMarginalPrice([yes, no]);
        }
      })();
  }, [slug]);

  const refreshCost = async () => {
    if (!market) return;
    const res = await fetchMarketCost(
      market.id,
      outcome === "yes" ? 0 : 1,
      parseUnits(shares.toString(), 18),
      selectedTab
    );
    if (res) {
      setCost(res);
    }
  };

  return {
    market,
    liquidity,
    marginalPrice,
    cost,
    shares,
    setShares,
    selectedTab,
    setSelectedTab,
    refreshCost,
    outcome,
    setOutcome,
  };
}

export const useMarket = () => useContext(MarketContext);
