import { fetchPublicMarkets } from "@/services/Market.tsx";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  markets: DetailedMarketType[];
  filteredMarkets: DetailedMarketType[];
  setFilteredMarkets: (markets: DetailedMarketType[]) => void;
  onFilterMarkets: (items: DetailedMarketType[]) => void;
  screenDimensions: [number, number];
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export function useProviderGlobalContext() {
  const [markets, setMarkets] = useState<DetailedMarketType[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<DetailedMarketType[]>(
    []
  );
  const [screenDimensions, setScreenDimensions] = useState<[number, number]>([
    0, 0,
  ]);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const onFilterMarkets = (items: DetailedMarketType[]) => {
    setFilteredMarkets(items);
  };

  useEffect(() => {
    if (!firstLoad) return;
    void (async () => {
      const res = await fetchPublicMarkets();
      if (res) {
        setMarkets(res);
        setFilteredMarkets(res);
      }
    })();
  }, [firstLoad]);

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
    }
  }, []);

  return {
    filteredMarkets,
    setFilteredMarkets,
    markets,
    screenDimensions,
    onFilterMarkets,
  };
}

export const useGlobal = () => useContext(GlobalContext);
