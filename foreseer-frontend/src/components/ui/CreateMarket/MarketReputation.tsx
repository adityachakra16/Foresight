import { Button } from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { CreateMarketDto } from "@/dtos";
import { FaSync } from "react-icons/fa";
import { fetchMarketReputation } from "@/services/Market";
import React from "react";

const { Heading, Text } = Typography;

interface MarketReputationProps {
  market?: CreateMarketDto;
  currentScore: number;
  setCurrentScore: (score: number) => void;
}

export const MarketReputation = ({
  market,
  currentScore,
  setCurrentScore,
}: MarketReputationProps) => {
  const [score, setScore] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const refreshScores = async () => {
    if (!market) return;
    setLoading(true);
    const reputation = await fetchMarketReputation(market);
    setLoading(false);
    setScore(reputation);
    setCurrentScore(currentScore + reputation);
  };

  return (
    <Card
      style={{
        width: "40%",
      }}
    >
      <Flex vertical>
        <Heading
          level={5}
          style={{
            color: "gray",
          }}
        >
          Reputation Stats
        </Heading>
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Points from market
          </Text>
          <Heading>{score}</Heading>
        </Flex>{" "}
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Your current score
          </Text>
          <Heading>{currentScore + score}</Heading>
        </Flex>{" "}
        <Flex vertical gap="small">
          <Text
            style={{
              color: "gray",
            }}
          >
            Score after market creation
          </Text>
          <Heading>{currentScore + score}</Heading>
        </Flex>
        <Button
          type="transparent"
          onClick={() => {
            refreshScores();
          }}
          icon={<FaSync />}
          loading={loading}
        >
          Refresh Scores
        </Button>
      </Flex>
    </Card>
  );
};
