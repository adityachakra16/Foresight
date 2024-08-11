import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { ButtonProps } from "@/components/atoms/Button/Button";
import { Flex } from "@/components/atoms/Flex";
import Menu from "@/components/atoms/Menu";
import Popover from "@/components/atoms/Popover";
import { useForesightUser } from "@/context/User";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { Typography } from "@/components/atoms/Typography";
import { AiOutlineLogin } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";

const { Text } = Typography;
interface ProfileDropdownInterface {
  loginButtonType?: ButtonProps["type"];
}

export const ProfileDropdown = ({
  loginButtonType,
}: ProfileDropdownInterface) => {
  const router = useRouter();
  const { setLoginModalOpen, currentUser, logoutUser } = useForesightUser();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const ProfileDropdownOptions = [
    {
      label: "Profile",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push("/settings");
      },
    },
  ];

  const ProfileDropdownBottomOptions = [
    {
      label: "Logout",
      onClick: () => {
        setProfileDropdownOpen(false);
        logoutUser();
      },
    },
  ];

  const ProfileDropdownTopOptions = [
    {
      label: "Address",
      onClick: () => {
        setProfileDropdownOpen(false);
      },
    },
  ];

  return (
    <Flex align="center">
      {currentUser?.email ? (
        <Flex align="center">
          {/* <Flex gap="small" align="center">
     
            <Button type="transparent" icon={<BsCashStack />}>
              <Text>{currentUser?.portfolioValue || 0.0}</Text>
            </Button>
          </Flex> */}
          <Popover
            isOpen={profileDropdownOpen}
            setIsOpen={setProfileDropdownOpen}
            placement="bottom-right"
            trigger={
              <Flex align="center">
                <Avatar
                  icon={
                    <Image
                      src={`https://api.dicebear.com/8.x/initials/svg?seed=${currentUser?.email}&backgroundColor=transparent`}
                      alt="avatar"
                      width={80}
                      height={80}
                    />
                  }
                  size={"medium"}
                  glassy
                  onClick={() => {
                    setProfileDropdownOpen(true);
                  }}
                />
              </Flex>
            }
            content={
              <Flex vertical gap={"small"}>
                <Flex
                  gap={"small"}
                  style={{
                    borderBottom: "1px solid grey",
                    paddingBottom: "0.8rem",
                  }}
                >
                  <Menu items={ProfileDropdownTopOptions} />
                </Flex>{" "}
                <Flex
                  gap={"small"}
                  style={{
                    borderBottom: "1px solid grey",
                    paddingBottom: "0.8rem",
                  }}
                >
                  <Menu items={ProfileDropdownOptions} />
                </Flex>{" "}
                <Flex gap={"small"} style={{}}>
                  <Menu items={ProfileDropdownBottomOptions} />
                </Flex>
              </Flex>
            }
          />
        </Flex>
      ) : (
        <Button
          type={loginButtonType || "primary"}
          onClick={() => {
            setLoginModalOpen(true);
          }}
          icon={<AiOutlineLogin />}
          disableAnimation
        >
          Login
        </Button>
      )}
    </Flex>
  );
};
