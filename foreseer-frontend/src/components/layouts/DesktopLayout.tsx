import { Typography } from "@/components/atoms/Typography";
import { Flex } from "@/components/atoms/Flex";
import { FC } from "react";
import { Navbar } from "@/components/ui/Navbar";
const { Text, Heading } = Typography;

interface SidebarProps {
  children?: React.ReactNode;
  showLogo?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
}
export const DesktopLayout: FC<SidebarProps> = ({
  children,
  showLogo = true,
  showSearch = true,
  showProfile = true,
}) => {
  return (
    <Flex
      style={{
        backgroundColor: "#1A1B20",
      }}
      vertical
    >
      <Navbar />

      <Flex
        vertical
        style={{
          padding: "4rem",
          paddingTop: "1.2rem",
          width: "100%",
          overflow: "auto",
        }}
        gap={2.8}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default DesktopLayout;
