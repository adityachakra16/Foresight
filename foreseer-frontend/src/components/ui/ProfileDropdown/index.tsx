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
import { AiOutlineLogin } from "react-icons/ai";

interface ProfileDropdownInterface {
  loginButtonType?: ButtonProps["type"];
}

export const ProfileDropdown = ({
  loginButtonType,
}: ProfileDropdownInterface) => {
  const router = useRouter();
  const { setLoginModalOpen, currentUser } = useForesightUser();
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
      {currentUser?.isVerified ? (
        <Popover
          isOpen={profileDropdownOpen}
          setIsOpen={setProfileDropdownOpen}
          trigger={
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
          }
          content={
            <Flex vertical gap={"small"}>
              <Flex
                gap={"small"}
                style={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Menu items={ProfileDropdownTopOptions} />
              </Flex>{" "}
              <Flex
                gap={"small"}
                style={{
                  borderBottom: "1px solid #e0e0e0",
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
