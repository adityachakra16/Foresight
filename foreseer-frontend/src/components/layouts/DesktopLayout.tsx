import { Typography } from "@/components/atoms/Typography";
import { Flex } from "@/components/atoms/Flex";
import { FC } from "react";
import { Navbar } from "@/components/ui/Navbar";
const { Text, Heading } = Typography;

interface SidebarProps {
  children?: React.ReactNode;
}
export const DesktopLayout: FC<SidebarProps> = ({ children }) => {
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
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default DesktopLayout;
