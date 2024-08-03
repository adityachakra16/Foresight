import Image from "next/image";
import { Inter } from "next/font/google";
import MetaHead from "@/common/seo/MetaHead";
import DesktopLayout from "@/components/layouts/DesktopLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MetaHead
        title="Foresight | Permissionless prediction markets"
        description="Create local prediction markets, place bets on your beliefs and earn rewards."
        image="https://ik.imagekit.io/brandamp/asset_2.png?updatedAt=1701169481656"
      />
      <DesktopLayout showSearch={false}></DesktopLayout>
    </>
  );
}
