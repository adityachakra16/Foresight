import MetaHead from "@/common/seo/MetaHead";
import DesktopLayout from "@/components/layouts/DesktopLayout";

export default function FeedPage() {
  return (
    <>
      <MetaHead
        title={"Foresight | Permissionless prediction markets"}
        description={
          "Create local prediction markets, place bets on your beliefs and earn rewards."
        }
        image="https://ik.imagekit.io/brandamp/asset_2.png?updatedAt=1701169481656"
      />
      <DesktopLayout></DesktopLayout>
    </>
  );
}
