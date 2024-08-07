import { Button } from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { Flex } from "@/components/atoms/Flex";
import { Typography } from "@/components/atoms/Typography";
import { useGlobal } from "@/context/Global";
import { trimLargeString } from "@/utils";
import { useRouter } from "next/router";
import { FaBookmark, FaShare } from "react-icons/fa";

const { Heading, Text } = Typography;

export const Marketplace = () => {
  const router = useRouter();
  const { markets } = useGlobal();
  return (
    <Flex
      gap="large"
      style={{
        height: "calc(100vh - 12rem)",
        overflowY: "auto",
      }}
      align="flex-start"
    >
      <Flex wrap="wrap" justify="center">
        {markets.map((market) => (
          <Card
            key={market.id}
            style={{
              width: "31%",
              height: "12rem",
              overflow: "hidden",
              padding: "1.2rem",
            }}
          >
            <Flex
              vertical
              justify="space-between"
              style={{
                height: "100%",
              }}
            >
              <Flex
                gap="small"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`/markets/${market.id}`);
                }}
              >
                <Heading level={6}>{trimLargeString(market.name, 40)}</Heading>
              </Flex>
              <Flex vertical gap="small">
                <Flex
                  style={{
                    width: "100%",
                  }}
                  gap="small"
                >
                  <Button type="buy" style={{ width: "100%" }}>
                    Buy Yes
                  </Button>
                  <Button type="sell" style={{ width: "100%" }}>
                    Buy No
                  </Button>
                </Flex>
                <Flex justify="space-between">
                  <Text style={{ color: "gray" }}>
                    ${market.totalAmount} Bet
                  </Text>
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
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
