import { Button } from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import { useForesightUser } from "@/context/User";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Flex } from "@/components/atoms/Flex";
import Card from "@/components/atoms/Card";
import { GiMoonOrbit } from "react-icons/gi";
import { FaMobile } from "react-icons/fa";

const { Heading, Text } = Typography;

interface IdentityVerificationProps {}

export const IdentityVerification = ({}: IdentityVerificationProps) => {
  const [selected, setSelected] = useState<"device" | "orb">("device");

  const onSuccess = (result: ISuccessResult) => {
    console.log({ result });
  };

  const handleVerify = async (result: ISuccessResult) => {
    console.log({ result });
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({
        proof: result,
      }),
    });
    const data = await res.json();
    console.log({ data });
  };

  return (
    <Flex gap="large" vertical>
      <Flex gap="small" vertical>
        <Text
          style={{
            color: "gray",
          }}
        >
          Please verify your identity to create a prediction market on
          Foresight.
        </Text>
      </Flex>
      <Flex gap="small" wrap="wrap">
        <Card
          style={{
            width: "48%",
            cursor: "pointer",
            backgroundColor:
              selected === "device" ? "rgba(23,188,131,0.1)" : "transparent",
            border:
              selected === "device" ? "1px solid #17BC83" : "1px solid #ccc",
            boxShadow: "none",
          }}
          onClick={() => setSelected("device")}
        >
          <Flex vertical gap="small" align="center">
            <FaMobile size={48} />

            <Heading level={5}>World App</Heading>
            <Text
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "gray",
              }}
            >
              For those that have used the World App to prove humanness
            </Text>
          </Flex>
        </Card>
        <Card
          style={{
            width: "48%",
            cursor: "pointer",
            backgroundColor:
              selected === "orb" ? "rgba(23,188,131,0.1)" : "transparent",
            border: selected === "orb" ? "1px solid #17BC83" : "1px solid #ccc",
            boxShadow: "none",
          }}
          onClick={() => setSelected("orb")}
        >
          <Flex vertical gap="small" align="center">
            <GiMoonOrbit size={48} />

            <Heading level={5}>Worldcoin Orb</Heading>
            <Text
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "gray",
              }}
            >
              For those that have used the Orb to prove humanness
            </Text>
          </Flex>
        </Card>
      </Flex>
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
        action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID as string} // this is your action id from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <Flex
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              style={{
                width: "100%",
              }}
              onClick={() => {
                open();
              }}
            >
              Verify with World ID
            </Button>
          </Flex>
        )}
      </IDKitWidget>
    </Flex>
  );
};
