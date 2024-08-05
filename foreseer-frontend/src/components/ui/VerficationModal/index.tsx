import { Button } from "@/components/atoms/Button";
import { useForesightUser } from "@/context/User";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

export const VerificationModal = () => {
  const { verificationModalOpen, setVerificationModalOpen } =
    useForesightUser();

  const onSuccess = (result: ISuccessResult) => {
    console.log({ result });
    setVerificationModalOpen(false);
  };

  const handleVerify = async (result: ISuccessResult) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({
        proof: result.proof,
        signal: result.nullifier_hash,
      }),
    });
    const data = await res.json();
    console.log({ data });
  };

  if (!verificationModalOpen) return null;

  return (
    <div>
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`} // obtained from the Developer Portal
        action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID as string} // this is your action id from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
      </IDKitWidget>
    </div>
  );
};
