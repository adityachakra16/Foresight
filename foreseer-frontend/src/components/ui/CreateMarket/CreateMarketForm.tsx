import Datepicker from "@/components/atoms/Datepicker";
import Dropdown from "@/components/atoms/Dropdown";
import { Flex } from "@/components/atoms/Flex";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/Input/TextArea";
import { Typography } from "@/components/atoms/Typography";
import { useEffect, useState } from "react";
import { MdPriceCheck } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineBlock } from "react-icons/ai";
import { Button } from "@/components/atoms/Button";
import { useContractActions } from "@/services/ContractActions";
import { TransactionStatus } from "../TransactionStatus";
import { CreateMarketDto } from "@/dtos";
import { FaShare } from "react-icons/fa";
import { useRouter } from "next/router";
import { MarketReputation } from "./MarketReputation";
import { createMarket } from "@/services/Market";
import { useForesightUser } from "@/context/User";
const { Text, Heading } = Typography;

interface CreateMarketFormProps {}

const ResolutionOracleFeedOptions = [
  {
    label: (
      <Flex vertical gap={0.2}>
        <Flex gap="small" justify="flex-start" align="flex-start">
          <MdPriceCheck size={24} />
          <Text>Price Feed</Text>
        </Flex>

        <Text
          style={{
            color: "gray",
            fontSize: "0.8rem",
          }}
        >
          Price feed from a oracle network will be used to resolve the market.
        </Text>
      </Flex>
    ),
    value: "price_feed",
  },
  {
    label: (
      <Flex vertical gap={0.2}>
        <Flex gap="small" justify="flex-start" align="flex-start">
          <CgWebsite size={24} />
          <Text>Data from Website</Text>
        </Flex>

        <Text
          style={{
            color: "gray",
            fontSize: "0.8rem",
          }}
        >
          Data from a website will be pulled, parsed and understood to resolve
          the market.
        </Text>
      </Flex>
    ),
    value: "data_from_website",
  },
  {
    label: (
      <Flex vertical gap={0.2}>
        <Flex gap="small" justify="flex-start" align="flex-start">
          <AiOutlineBlock size={24} />
          <Text>On-chain Data</Text>
        </Flex>

        <Text
          style={{
            color: "gray",
            fontSize: "0.8rem",
          }}
        >
          Data from any on-chain address will be used to resolve the market.
        </Text>
      </Flex>
    ),
    value: "on_chain_data",
  },
];

const PriceFeedOptions = [
  {
    label: "BTC/USD",
    value: "btc_usd",
  },
  {
    label: "ETH/USD",
    value: "eth_usd",
  },
  {
    label: "SOL/USD",
    value: "sol_usd",
  },
  {
    label: "LINK/USD",
    value: "link_usd",
  },
  {
    label: "ADA/USD",
    value: "ada_usd",
  },
  {
    label: "DOGE/USD",
    value: "doge_usd",
  },
  {
    label: "XRP/USD",
    value: "xrp_usd",
  },
  {
    label: "LTC/USD",
    value: "ltc_usd",
  },
  {
    label: "DOT/USD",
    value: "dot_usd",
  },
  {
    label: "UNI/USD",
    value: "uni_usd",
  },
  {
    label: "BNB/USD",
    value: "bnb_usd",
  },
  {
    label: "AAVE/USD",
    value: "aave_usd",
  },
  {
    label: "YFI/USD",
    value: "yfi_usd",
  },
  {
    label: "SNX/USD",
    value: "snx_usd",
  },
  {
    label: "COMP/USD",
    value: "comp_usd",
  },
  {
    label: "MKR/USD",
    value: "mkr_usd",
  },
];

interface CreateMarketFormProps {}

export const CreateMarketForm = ({}: CreateMarketFormProps) => {
  const router = useRouter();
  const { currentUser } = useForesightUser();
  const [name, setName] = useState("");
  const [currentReputationScore, setCurrentReputationScore] = useState(10);
  const [description, setDescription] = useState("");
  const [expiration, setExpiration] = useState<Date | null>(null);
  const [resolutionOracleFeedType, setResolutionOracleFeedType] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [priceFeedAddress, setPriceFeedAddress] = useState("");
  const [createdMarket, setCreatedMarket] = useState<MarketType | null>(null);
  const {
    createMarket: publishMarket,
    sendUserOperationResult,
    isSendingUserOperation,
    isSendUserOperationError,
    addLiquidty,
    insufficientBalance,
  } = useContractActions();
  const [tokenApprovalRequired, setTokenApprovalRequired] = useState(false);
  const [fundingRequired, setFundingRequired] = useState(false);

  const [liquidity, setLiquidity] = useState("");
  const [formStage, setFormStage] = useState<
    "form" | "liquidity" | "completed"
  >("form");

  useEffect(() => {
    console.log({
      sendUserOperationResult,
    });
    if (sendUserOperationResult && formStage === "form") {
      setFormStage("liquidity");
    } else if (sendUserOperationResult && formStage === "liquidity") {
      setFormStage("completed");
    }
  }, [sendUserOperationResult]);

  // useEffect(() => {
  //   setCreatedMarket({
  //     id: 7,
  //     name: "Will CPI inflation cross 4% in 2024?",
  //     description:
  //       "Add description about the market, when its going to resolve and details about the resolution...",
  //     expiration: "2024-12-31T00:00:00.000Z",
  //     totalAmount: 0,
  //   });
  //   setFormStage("completed");
  // }, []);

  return (
    <Flex
      gap="large"
      vertical
      style={{
        width: "100%",
      }}
    >
      {formStage === "form" && (
        <Flex
          gap="large"
          style={{
            width: "100%",
          }}
        >
          <Flex
            vertical
            gap="large"
            style={{
              width: "100%",
            }}
          >
            <Flex vertical>
              <Flex gap="small" vertical>
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Market Name
                </Text>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Will CPI inflation cross 4% in 2024?"
                />
              </Flex>
              <Flex gap="small" vertical>
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Rules
                </Text>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description about the market, when its going to resolve and details about the resolution..."
                  style={{
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                  containerstyle={{
                    width: "100%",
                    padding: "0rem",
                    minHeight: "5rem",
                  }}
                />
              </Flex>
              <Flex gap="small" vertical>
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Resolution
                </Text>
                <Flex>
                  <Dropdown
                    options={ResolutionOracleFeedOptions as any}
                    onChange={(option) =>
                      setResolutionOracleFeedType(option.value)
                    }
                    placeholder="Select resolution oracle feed..."
                  />
                </Flex>
              </Flex>
              {resolutionOracleFeedType === "data_from_website" && (
                <Flex gap="small" vertical>
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    Website URL
                  </Text>
                  <Input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </Flex>
              )}
              {resolutionOracleFeedType === "price_feed" && (
                <Flex gap="small" vertical>
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    Price Feed
                  </Text>
                  <Dropdown
                    options={PriceFeedOptions as any}
                    onChange={(option) => setPriceFeedAddress(option.value)}
                    menuStyles={{
                      height: "36rem",
                    }}
                    placeholder="Pick a price feed..."
                  />
                </Flex>
              )}
              {resolutionOracleFeedType === "on_chain_data" && (
                <Flex gap="small" vertical>
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    On-chain Address
                  </Text>
                  <Input
                    type="text"
                    value={priceFeedAddress}
                    onChange={(e) => setPriceFeedAddress(e.target.value)}
                    placeholder="0x1234..."
                  />
                </Flex>
              )}
              <Flex gap="small" vertical>
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Expiration
                </Text>
                <Datepicker
                  selectedDate={expiration}
                  onChange={(date) => setExpiration(date)}
                  placeholder="Select a date..."
                  showTimeSelect
                />
              </Flex>
            </Flex>
            <Flex
              style={{
                width: "100%",
              }}
            >
              <Button
                type={currentReputationScore < 0 ? "secondary" : "primary"}
                style={{
                  width: "100%",
                }}
                onClick={async () => {
                  console.log("Create Market");
                  try {
                    const market = await createMarket({
                      name,
                      description,
                      expiration: expiration?.getTime() || 0,
                      resolutionOracleFeedType,
                      websiteUrl,
                      priceFeedAddress,
                    });
                    setCreatedMarket(market);
                    publishMarket(market);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                loading={isSendingUserOperation}
                // disabled={currentReputationScore < 0}
              >
                Create Market
              </Button>
            </Flex>
          </Flex>{" "}
          <MarketReputation
            market={{
              name,
              description,
              expiration: expiration?.getTime() || 0,
              resolutionOracleFeedType,
              websiteUrl,
              priceFeedAddress,
            }}
            currentScore={currentReputationScore}
            setCurrentScore={setCurrentReputationScore}
          />
        </Flex>
      )}
      {formStage === "liquidity" && (
        <Flex
          vertical
          gap="large"
          style={{
            width: "60%",
          }}
        >
          <Flex gap="small" align="center">
            <Heading level={6}>Market created successfully!</Heading>

            <TransactionStatus
              sendUserOperationResult={sendUserOperationResult}
              isSendingUserOperation={isSendingUserOperation}
              isSendUserOperationError={isSendUserOperationError}
            />
          </Flex>
          <Flex gap="small" vertical>
            <Heading level={6}>
              Lets add some liquidity to bring it to life.
            </Heading>
            <Input
              type="text"
              placeholder="Enter amount..."
              value={liquidity}
              onChange={(e) => setLiquidity(e.target.value)}
              endcomponent={<Text>USDC</Text>}
              onBlur={async () => {
                const fundingRequired = await insufficientBalance(
                  parseInt(liquidity)
                );
                setFundingRequired(fundingRequired);
              }}
            />
            <Button
              style={{
                width: "100%",
              }}
              onClick={() => {
                addLiquidty(createdMarket?.id || 0, parseInt(liquidity));
              }}
              loading={isSendingUserOperation}
              disabled={fundingRequired}
            >
              {fundingRequired ? "Insufficient Balance" : "Add Liquidity"}
            </Button>
          </Flex>
        </Flex>
      )}
      {formStage === "completed" && (
        <Flex
          vertical
          gap="large"
          style={{
            width: "60%",
          }}
        >
          <Flex gap="large" vertical>
            <Flex gap="small" align="center">
              <Heading level={5}>Market is live and liquid!</Heading>

              <TransactionStatus
                sendUserOperationResult={sendUserOperationResult}
                isSendingUserOperation={isSendingUserOperation}
                isSendUserOperationError={isSendUserOperationError}
              />
            </Flex>
            <Flex gap="small">
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => {}}
                icon={<FaShare />}
                type="transparent"
              >
                Share Market
              </Button>
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  createdMarket && router.push(`/markets/${createdMarket.id}`);
                }}
              >
                Go to Market
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
