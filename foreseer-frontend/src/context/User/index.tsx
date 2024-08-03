import {
  fetchUserCreatedMarkets,
  fetchUserPositions,
  fetchUserProfile,
  fetchUserTrades,
} from "@/services/User";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  currentUser: UserType | null | undefined;
  setCurrentUser: (user: UserType) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  refreshUserProfile: () => void;
  loadingUser: boolean;
  userPositions: PositionType[];
  userCreatedMarkets: MarketType[];
  userTrades: TradesType[];
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function useProviderUserContext() {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType | null | undefined>(
    undefined
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userPositions, setUserPositions] = useState<PositionType[]>([]);
  const [userTrades, setUserTrades] = useState<TradesType[]>([]);
  const [userCreatedMarkets, setUserCreatedMarkets] = useState<MarketType[]>(
    []
  );

  const refreshUserProfile = async () => {
    setLoadingUser(true);
    const user = await fetchUserProfile();
    if (!user) {
      setCurrentUser(null);
      setLoadingUser(false);
      return;
    }
    setCurrentUser(user as UserType);
    setLoadingUser(false);
  };

  const refreshMarkets = async () => {
    const markets = await fetchUserCreatedMarkets();
    if (!markets) return;
    setUserCreatedMarkets(markets);
  };

  const refreshTrades = async () => {
    const trades = await fetchUserTrades();
    if (!trades) return;
    setUserTrades(trades);
  };

  const refreshPositions = async () => {
    const positions = await fetchUserPositions();
    if (!positions) return;
    setUserPositions(positions);
  };

  useEffect(() => {
    if (currentUser) {
      void (async () => {
        await refreshMarkets();
        await refreshTrades();
        await refreshPositions();
      })();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser || !firstLoad) return;
    void (async () => {
      refreshUserProfile();
    })();
  }, [firstLoad]);

  useEffect(() => {
    if (currentUser?.isVerified) {
      setLoginModalOpen(false);
    }
  }, [currentUser?.isVerified]);

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
    }
  }, []);

  return {
    currentUser,
    setCurrentUser,
    loginModalOpen,
    setLoginModalOpen,
    refreshUserProfile,
    loadingUser,
    userPositions,
    userCreatedMarkets,
    userTrades,
  };
}

export const useUser = () => useContext(UserContext);
