import { Button } from "@/components/atoms/Button";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { useState } from "react";

const { Heading, Text } = Typography;

const LiquidityOptions = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

const ExpirationOptions = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

const TopicOptions = [
  {
    label: "US Politics",
    value: "uspolitics",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "Finance",
    value: "finance",
  },
  {
    label: "Technology",
    value: "technology",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "Crypto",
    value: "crypto",
  },
  {
    label: "Olympics",
    value: "olympics",
  },
  {
    label: "Podcasts",
    value: "podcasts",
  },
  {
    label: "F1",
    value: "f1",
  },
];

export const Sidebar = () => {
  const [liquidity, setLiquidity] = useState<string>();
  const [expiration, setExpiration] = useState<string>();
  const [topic, setTopic] = useState<string>();
  return (
    <Flex
      gap="large"
      style={{
        borderRight: "1px solid #e8e9e738",
        marginRight: "2.8rem",
        paddingRight: "4rem",
        width: "36%",
        overflowY: "auto",
        height: "calc(100vh - 12rem)",
      }}
      vertical
    >
      <Flex gap="small" vertical wrap="wrap">
        <Text
          style={{
            color: "gray",
          }}
        >
          Liquidity
        </Text>
        <Flex gap="small" wrap="wrap">
          {LiquidityOptions.map((option) => (
            <Button
              type={liquidity === option.value ? "secondary" : "outlined"}
              key={option.value}
              style={{ width: "45%" }}
              onClick={() => setLiquidity(option.value)}
            >
              <Text>{option.label}</Text>
            </Button>
          ))}
        </Flex>
      </Flex>

      <Flex gap="small" vertical>
        <Text
          style={{
            color: "gray",
          }}
        >
          Expiration
        </Text>
        <Flex gap="small" wrap="wrap">
          {ExpirationOptions.map((option) => (
            <Button
              type={expiration === option.value ? "secondary" : "outlined"}
              key={option.value}
              style={{ width: "45%" }}
              onClick={() => setTopic(option.value)}
            >
              <Text>{option.label}</Text>
            </Button>
          ))}
        </Flex>
      </Flex>
      <Flex gap="small" vertical>
        <Text
          style={{
            color: "gray",
          }}
        >
          Topics
        </Text>
        <Flex gap="small" wrap="wrap">
          {TopicOptions.map((option) => (
            <Button
              type={expiration === option.value ? "secondary" : "outlined"}
              key={option.value}
              style={{ width: "100%" }}
              onClick={() => setExpiration(option.value)}
            >
              <Text>{option.label}</Text>
            </Button>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
