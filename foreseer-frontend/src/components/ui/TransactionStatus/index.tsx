import { SendUserOperationResult } from "@alchemy/aa-core";
import { chain } from "@/config";
import { Loader } from "@/components/atoms/Loader";

export const TransactionStatus = ({
  sendUserOperationResult,
  isSendingUserOperation,
  isSendUserOperationError,
}: {
  sendUserOperationResult: SendUserOperationResult | undefined;
  isSendingUserOperation: boolean;
  isSendUserOperationError: Error | null;
}) => {
  if (isSendUserOperationError) {
    return <div className="text-center">An error occurred. Try again!</div>;
  }

  if (isSendingUserOperation) {
    return <Loader />;
  }

  if (sendUserOperationResult) {
    return (
      <a
        href={`https://base-sepolia.blockscout.com/tx/${sendUserOperationResult.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-[#363FF9] hover:underline dark:text-white"
      >
        View transaction details
      </a>
    );
  }

  return <div className="invisible">placeholder</div>;
};
