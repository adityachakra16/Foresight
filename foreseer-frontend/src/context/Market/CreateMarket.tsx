import { fetchMarket, fetchPublicMarkets } from "@/services/Market";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface CreateMarketContextType {
  market: DetailedMarketType;
}

export const CreateMarketContext = createContext<CreateMarketContextType>(
  {} as CreateMarketContextType
);

export function useProviderCreateMarketContext() {
  const router = useRouter();
  const { slug } = router.query;
  const [market, setMarket] = useState<DetailedMarketType>();

  useEffect(() => {
    if (slug) {
      void (async () => {
        const res = await fetchMarket(slug as string);
        if (res) {
          setMarket(res);
        }
      })();
    }
  }, [slug]);

  return {
    market,
  };
}

export const useCreateMarket = () => useContext(CreateMarketContext);
