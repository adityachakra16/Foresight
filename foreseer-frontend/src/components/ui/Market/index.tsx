import { Button } from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { Flex } from "@/components/atoms/Flex";
import Input from "@/components/atoms/Input";
import Tabs from "@/components/atoms/Tabs";
import Tag from "@/components/atoms/Tag";
import { Typography } from "@/components/atoms/Typography";
import { useMarket } from "@/context/Market";
import { useForesightUser } from "@/context/User";
import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaBookmark, FaRegClock, FaShare } from "react-icons/fa";

const { Heading, Text } = Typography;

interface TabContentProps {
  onOutcomeSelected: (outcome: string) => void;
  onSharesChange: (shares: number) => void;
  onClick: () => void;
}

const TabContent = ({}) => {};

export const Market = () => {
  const { market } = useMarket();
  const { userPositions } = useForesightUser();
  const [positions, setPositions] = useState<PositionType[]>();
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");
  const [outcome, setOutcome] = useState<string>("yes");
  const [shares, setShares] = useState<number>(0);

  useEffect(() => {
    const pos = userPositions.filter(
      (position) => position.market.id === market?.id
    );
    console.log({
      pos,
      userPositions,
      market,
    });
    if (pos) {
      setPositions(pos);
    }
  }, [market, userPositions]);

  return (
    <Flex style={{ width: "100%" }} gap="large">
      <Flex
        gap="large"
        vertical
        style={{
          width: "100%",
        }}
      >
        <Flex gap="small" vertical>
          <Flex
            justify="space-between"
            style={{
              width: "100%",
            }}
          >
            <Heading level={3}>{market?.name || "Market"}</Heading>
            <Flex gap="small">
              <Button
                size="small"
                shape="circle"
                type="transparent"
                icon={
                  <FaShare
                    style={{
                      color: "gray",
                    }}
                  />
                }
              ></Button>
              <Button
                size="small"
                shape="circle"
                type="transparent"
                icon={
                  <FaBookmark
                    style={{
                      color: "gray",
                    }}
                  />
                }
              ></Button>
            </Flex>
          </Flex>
          <Flex align="center">
            <Flex gap="small">
              <Text
                style={{
                  color: "grey",
                }}
              >
                ${market?.totalAmount || "1000"} Bet
              </Text>
            </Flex>
            <Flex gap={0.2} align="center">
              <FaRegClock
                style={{
                  color: "grey",
                }}
              />

              <Text
                style={{
                  color: "grey",
                }}
              >
                {market?.expiration || ""}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {positions && positions?.length > 0 && (
          <Flex vertical gap="small">
            <Heading level={5}>Positions</Heading>
            <Card style={{ width: "100%" }}>
              <Flex
                justify="space-between"
                style={{
                  borderBottom: "1px solid #e8e9e738",
                  padding: "0.5rem 0",
                }}
              >
                <Text>Outcome</Text>
                <Text>Shares</Text>
                <Text>Avg Price</Text>
                <Text>Current Value</Text>
                <Text>Profit/Loss</Text>
              </Flex>
              {positions?.map((position) => (
                <Flex
                  key={position.market.id}
                  gap="small"
                  style={{
                    padding: "0.5rem 0",
                  }}
                  justify="space-between"
                >
                  <Tag
                    style={{
                      backgroundColor:
                        position.outcome === "yes"
                          ? "rgba(23, 188, 131, 0.1)"
                          : "rgba(255, 99, 132, 0.1)",
                      border:
                        position.outcome === "yes"
                          ? " 1px solid #0c5e41"
                          : "1px solid #58212d",
                    }}
                  >
                    {position.outcome}
                  </Tag>
                  <Text>{position.shares}</Text>
                  <Text>{position.avgPrice}</Text>
                  <Text>{position.currentValue}</Text>
                  <Text
                    style={{
                      color:
                        position.returns > 0
                          ? "rgba(23, 188, 131)"
                          : "rgba(255, 99, 132)",
                    }}
                  >
                    {position.returns}%
                  </Text>
                </Flex>
              ))}
            </Card>
          </Flex>
        )}
        <Flex vertical gap="small">
          <Heading level={5}>Rules</Heading>

          <Text>{market?.description || "Market description"}</Text>
        </Flex>
      </Flex>
      <Flex style={{ width: "40%" }} vertical gap="small">
        <Card>
          <Tabs
            tabs={[
              {
                label: "Buy",
                key: "buy",
                onClick: () => setSelectedTab("buy"),
              },
              {
                label: "Sell",
                key: "sell",
                onClick: () => setSelectedTab("sell"),
              },
            ]}
          />
          <Flex
            vertical
            style={{
              paddingTop: "2.4rem",
            }}
          >
            <Flex gap="small" vertical>
              <Text
                style={{
                  color: "grey",
                }}
              >
                Outcome
              </Text>
              <Flex
                gap="small"
                style={{
                  width: "100%",
                }}
              >
                <Button
                  type={outcome === "no" ? "outlined" : "buy"}
                  style={{ width: "50%" }}
                  onClick={() => setOutcome("yes")}
                >
                  Yes
                </Button>
                <Button
                  type={outcome === "yes" ? "outlined" : "sell"}
                  style={{ width: "50%" }}
                  onClick={() => setOutcome("no")}
                >
                  No
                </Button>
              </Flex>
            </Flex>
            <Flex gap="small" vertical>
              <Text
                style={{
                  color: "grey",
                }}
              >
                Shares
              </Text>
              <Input
                type="number"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value))}
              />
            </Flex>
          </Flex>
          <Button
            style={{
              width: "100%",
              marginTop: "2.4rem",
            }}
            type={selectedTab}
            onClick={() => {
              console.log({
                selectedTab,
                outcome,
                shares,
              });
            }}
          >
            {selectedTab === "buy" ? "Buy" : "Sell"} Shares
          </Button>
        </Card>
      </Flex>
    </Flex>
  );
};
