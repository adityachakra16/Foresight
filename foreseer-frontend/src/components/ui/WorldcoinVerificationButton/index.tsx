import { Button } from "@/components/atoms/Button";
import { Flex } from "@/components/atoms/Flex";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { FaPlus } from "react-icons/fa";

export const WorldcoinVerificationButton = () => {
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
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
      action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID as string} // this is your action id from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => (
        <Button
          onClick={() => {
            open();
          }}
          type="secondary"
          icon={<FaPlus />}
        >
          Create Market
        </Button>
      )}
    </IDKitWidget>
  );
};
