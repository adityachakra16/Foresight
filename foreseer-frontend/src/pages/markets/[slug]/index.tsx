import MetaHead from "@/common/seo/MetaHead";
import DesktopLayout from "@/components/layouts/DesktopLayout";
import { MarketContext, useProviderMarketContext } from "@/context/Market";

export default function MarketPage() {
  const marketContext = useProviderMarketContext();
  return (
    <>
      <MetaHead
        title={
          marketContext.market?.name ||
          "Foresight | Permissionless prediction markets"
        }
        description={
          marketContext.market?.description ||
          "Create local prediction markets, place bets on your beliefs and earn rewards."
        }
        image="https://ik.imagekit.io/brandamp/asset_2.png?updatedAt=1701169481656"
      />
      <DesktopLayout>
        <MarketContext.Provider value={marketContext}></MarketContext.Provider>
      </DesktopLayout>
    </>
  );
}
