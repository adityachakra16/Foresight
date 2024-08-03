import { Button } from "@/components/atoms/Button";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { Search } from "@/components/ui/Search";
import { useGlobal } from "@/context/Global";
import Image from "next/image";
import Link from "next/link";
import { LuActivity } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";

const { Heading } = Typography;

interface NavbarProps {}

export const Navbar = () => {
  const { markets, setFilteredMarkets } = useGlobal();

  return (
    <Flex
      gap="small"
      justify="space-between"
      align="center"
      style={{
        width: "100%",
        padding: "1.6rem",
      }}
    >
      <Flex
        gap="large"
        align="center"
        style={{
          width: "100%",
        }}
      >
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
            gap="small"
            align="center"
            style={{
              width: "100%",
            }}
          >
            <Search
              items={markets}
              onSearchComplete={(items) => setFilteredMarkets(items)}
            />
          </Flex>
        </Flex>{" "}
      </Flex>

      <Flex gap="large" align="center">
        <ProfileDropdown />
      </Flex>
    </Flex>
  );
};
