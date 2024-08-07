import MetaHead from "@/common/seo/MetaHead";
import { Flex } from "@/components/atoms/Flex";
import DesktopLayout from "@/components/layouts/DesktopLayout";
import { Marketplace } from "@/components/ui/Marketplace";
import { Sidebar } from "@/components/ui/Sidebar";

export default function MarketplacePage() {
  return (
    <>
      <MetaHead
        title={"Foresight | Permissionless prediction markets"}
        description={
          "Create local prediction markets, place bets on your beliefs and earn rewards."
        }
        image="https://ik.imagekit.io/brandamp/asset_2.png?updatedAt=1701169481656"
      />
      <DesktopLayout>
        <Flex style={{ width: "100%" }} gap="large" align="flex-start">
          <Sidebar />
          <Marketplace />
        </Flex>
      </DesktopLayout>
    </>
  );
}
