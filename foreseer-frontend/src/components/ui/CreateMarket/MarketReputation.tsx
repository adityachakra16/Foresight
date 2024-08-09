import Card from "@/components/atoms/Card";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { CreateMarketDto } from "@/dtos";

const { Heading, Text } = Typography;

interface MarketReputationProps {
  market?: CreateMarketDto;
}

export const MarketReputation = ({ market }: MarketReputationProps) => {
  return (
    <Card>
      <Flex vertical>
        <Text
          style={{
            color: "gray",
          }}
        >
          Reputation Stats
        </Text>
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Points from market
          </Text>
          <Heading>100</Heading>
        </Flex>{" "}
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Points from market
          </Text>
          <Heading>100</Heading>
        </Flex>{" "}
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Your current score
          </Text>
          <Heading>100</Heading>
        </Flex>{" "}
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Score after market creation
          </Text>
          <Heading>100</Heading>
        </Flex>
      </Flex>
    </Card>
  );
};
