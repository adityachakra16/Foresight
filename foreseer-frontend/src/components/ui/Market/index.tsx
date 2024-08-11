import { Button } from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { Flex } from "@/components/atoms/Flex";
import Input from "@/components/atoms/Input";
import Tabs from "@/components/atoms/Tabs";
import Tag from "@/components/atoms/Tag";
import { Typography } from "@/components/atoms/Typography";
import { useMarket } from "@/context/Market";
import { useForesightUser } from "@/context/User";
import { useContractActions } from "@/services/ContractActions";
import { convertBigNumberToNumber } from "@/utils";
import { sign } from "crypto";
import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaBookmark, FaRegClock, FaShare } from "react-icons/fa";
import { TransactionStatus } from "../TransactionStatus";
import { fetchUserPosition } from "@/services/User";

const { Heading, Text } = Typography;

interface TabContentProps {
  onOutcomeSelected: (outcome: string) => void;
  onSharesChange: (shares: number) => void;
  onClick: () => void;
}

const TabContent = ({}) => {};

export const Market = () => {
  const {
    market,
    shares,
    setShares,
    liquidity,
    marginalPrice,
    cost,

    outcome,
    setOutcome,
    selectedTab,
    setSelectedTab,
    refreshCost,
  } = useMarket();
  const { userPositions } = useForesightUser();
  const {
    buyShares,
    sellShares,
    sendUserOperationResult,
    isSendingUserOperation,
    isSendUserOperationError,
    address,
    redeemShares,
  } = useContractActions();

  const [positions, setPositions] = useState<
    {
      outcome: string;
      shares: number;
      currentValue?: number;
    }[]
  >();

  useEffect(() => {
    void (async () => {
      console.log({ market, address });

      if (market?.id && address) {
        const positions = await fetchUserPosition(
          market.id,
          address as `0x${string}`
        );
        console.log({ positions });
        setPositions([
          {
            outcome: "yes",
            shares: positions[0] / 10 ** 18,
          },
          {
            outcome: "no",
            shares: positions[1] / 10 ** 18,
          },
        ]);
      }
    })();
  }, [market, sendUserOperationResult, address]);

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
                ${liquidity / 10 ** 18 || "1000"} Bet
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
        {positions &&
          positions?.filter((position) => position.shares > 0)?.length > 0 && (
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
                </Flex>
                {positions?.map((position, index) => {
                  if (position.shares > 0)
                    return (
                      <Flex
                        key={index}
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
                        {position.currentValue && (
                          <Text>{position.currentValue}</Text>
                        )}
                      </Flex>
                    );
                })}
              </Card>
            </Flex>
          )}
        <Flex vertical gap="small">
          <Heading level={5}>Rules</Heading>

          <Text>{market?.rules || "Market description"}</Text>
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
                  {`Yes ${marginalPrice[0].toFixed(2)}`}
                </Button>
                <Button
                  type={outcome === "yes" ? "outlined" : "sell"}
                  style={{ width: "50%" }}
                  onClick={() => setOutcome("no")}
                >
                  {`No ${marginalPrice[1].toFixed(2)}`}
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
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                onBlur={refreshCost}
              />
            </Flex>
          </Flex>
          {market?.active && (
            <Flex
              gap="small"
              style={{ width: "100%", marginTop: "2.4rem" }}
              vertical
              align="center"
            >
              <Flex
                style={{ width: "100%" }}
                gap="small"
                justify="space-between"
              >
                <Text
                  style={{
                    color: "grey",
                  }}
                >
                  Cost
                </Text>
                <Text>${(cost / 10 ** 18).toFixed(2)}</Text>
              </Flex>
              <Button
                style={{
                  width: "100%",
                }}
                type={selectedTab}
                onClick={() => {
                  console.log({
                    selectedTab,
                    outcome,
                    shares,
                  });
                  let tokenAmounts = [0, 0];
                  let signedShares = 0;
                  if (selectedTab === "buy") {
                    signedShares = parseInt(shares);
                  }
                  if (selectedTab === "sell") {
                    signedShares = -parseInt(shares);
                  }

                  if (outcome === "yes") {
                    tokenAmounts = [signedShares, 0];
                  }
                  if (outcome === "no") {
                    tokenAmounts = [0, signedShares];
                  }

                  if (selectedTab === "buy") {
                    buyShares(market as MarketType, tokenAmounts, cost);
                  } else {
                    sellShares(market as MarketType, tokenAmounts, cost);
                  }
                }}
                loading={isSendingUserOperation}
              >
                {selectedTab === "buy" ? "Buy" : "Sell"} Shares
              </Button>

              <TransactionStatus
                sendUserOperationResult={sendUserOperationResult}
                isSendingUserOperation={isSendingUserOperation}
                isSendUserOperationError={isSendUserOperationError}
              />
            </Flex>
          )}
          {!market?.active && (
            <Flex
              gap="small"
              style={{ width: "100%", marginTop: "2.4rem" }}
              vertical
              align="center"
            >
              <Flex
                style={{ width: "100%" }}
                gap="small"
                justify="space-between"
              >
                <Text
                  style={{
                    color: "grey",
                  }}
                >
                  Market has expired
                </Text>
              </Flex>
              <Button
                style={{
                  width: "100%",
                }}
                type={selectedTab}
                onClick={() => {
                  redeemShares(market as MarketType);
                }}
                loading={isSendingUserOperation}
              >
                Redeem Shares
              </Button>

              <TransactionStatus
                sendUserOperationResult={sendUserOperationResult}
                isSendingUserOperation={isSendingUserOperation}
                isSendUserOperationError={isSendUserOperationError}
              />
            </Flex>
          )}
        </Card>
      </Flex>
    </Flex>
  );
};
