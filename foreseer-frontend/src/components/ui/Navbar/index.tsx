import { Button } from "@/components/atoms/Button";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { Search } from "@/components/ui/Search";
import { useGlobal } from "@/context/Global";
import { useForesightUser } from "@/context/User";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { WorldcoinVerificationButton } from "../WorldcoinVerificationButton";

const { Heading, Text } = Typography;

interface NavbarProps {}

export const Navbar = () => {
  const router = useRouter();
  const { markets, setFilteredMarkets } = useGlobal();
  const { currentUser, setLoginModalOpen } = useForesightUser();

  return (
    <Flex
      gap="small"
      justify="space-between"
      align="center"
      style={{
        padding: "1.6rem",
      }}
    >
      <Flex gap="large" align="center">
        <Image
          src={"/logoTransparentBgFull.svg"}
          alt="Logo"
          width={124}
          height={124}
        />
        <Flex gap="large" align="center">
          <Flex gap="small" align="center">
            <Link href="/markets">
              <Button type="transparent" icon={<MdOutlineExplore size={24} />}>
                Markets
              </Button>
            </Link>
            <Link href="/feed">
              {" "}
              <Button type="transparent" icon={<LuActivity size={24} />}>
                Feed
              </Button>
            </Link>
          </Flex>
          <Flex
            align="center"
            style={{
              width: "100%",
            }}
          >
            <Search
              items={markets}
              onSearchComplete={(items) => setFilteredMarkets(items)}
            />{" "}
            <Button
              type="secondary"
              icon={<FaPlus />}
              onClick={() => {
                if (!currentUser?.ethAddress) {
                  setLoginModalOpen(true);
                  return;
                } else router.push("/markets/create");
              }}
            >
              Create Market
            </Button>
            {/* <WorldcoinVerificationButton /> */}
          </Flex>
        </Flex>{" "}
      </Flex>

      <Flex gap="small" align="center">
        <ProfileDropdown />
      </Flex>
    </Flex>
  );
};
