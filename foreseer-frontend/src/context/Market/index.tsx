import { fetchMarket, fetchPublicMarkets } from "@/services/Market.tsx";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface MarketContextType {
  market: DetailedMarketType;
}

export const MarketContext = createContext<MarketContextType>(
  {} as MarketContextType
);

export function useProviderMarketContext() {
  const router = useRouter();
  const { slug } = router.query;
  const [market, setMarket] = useState<DetailedMarketType>();

  useEffect(() => {
    if (slug)
      void (async () => {
        const res = await fetchMarket(slug as string);
        if (res) {
          setMarket(res);
        }
      })();
  }, [slug]);

  return {
    market,
  };
}

export const useMarket = () => useContext(MarketContext);
