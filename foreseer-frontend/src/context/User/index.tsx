import { accountType } from "@/config";
import {
  fetchUserCreatedMarkets,
  fetchUserPositions,
  fetchUserProfile,
  fetchUserTrades,
} from "@/services/User";
import {
  useAccount,
  useLogout,
  useSignerStatus,
  useUser,
} from "@alchemy/aa-alchemy/react";
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
  handleLogout: () => void;
  verificationModalOpen: boolean;
  setVerificationModalOpen: (open: boolean) => void;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function useProviderUserContext() {
  const [currentUser, setCurrentUser] = useState<UserType | null | undefined>(
    undefined
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [userPositions, setUserPositions] = useState<PositionType[]>([]);
  const [userTrades, setUserTrades] = useState<TradesType[]>([]);
  const [userCreatedMarkets, setUserCreatedMarkets] = useState<MarketType[]>(
    []
  );
  const user = useUser();
  const { address } = useAccount({ type: accountType });
  const { logout } = useLogout();

  const refreshUserProfile = async () => {
    setLoadingUser(true);
    const u = await fetchUserProfile(user);
    if (!u) {
      setCurrentUser(null);
      setLoadingUser(false);
      return;
    }
    setCurrentUser(u as UserType);
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
    if (currentUser?.ethAddress) {
      void (async () => {
        await refreshMarkets();
        await refreshTrades();
        await refreshPositions();
      })();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log({ user });
    if (!user?.address) return;
    void (async () => {
      refreshUserProfile();
    })();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

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
    handleLogout,
    verificationModalOpen,
    setVerificationModalOpen,
  };
}

export const useForesightUser = () => useContext(UserContext);
