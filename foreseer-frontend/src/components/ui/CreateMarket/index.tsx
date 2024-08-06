import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { useForesightUser } from "@/context/User";
import { useRouter } from "next/router";
import { CreateMarketForm } from "./CreateMarketForm";
import { IdentityVerification } from "../VerficationModal";

const { Heading, Text } = Typography;

export const CreateMarket = () => {
  const router = useRouter();
  const { currentUser } = useForesightUser();

  return (
    <Flex
      gap="large"
      vertical
      style={{
        width: "60%",
      }}
    >
      <Flex gap={0.2} vertical>
        <Heading level={3}>Create Market</Heading>
        <Text style={{ color: "gray" }}>
          Markets on Foresight can be created by any verified user.
        </Text>
      </Flex>{" "}
      <CreateMarketForm />
      {/* {currentUser?.isVerified ? (
        <CreateMarketForm />
      ) : (
        <IdentityVerification />
      )} */}
    </Flex>
  );
};
