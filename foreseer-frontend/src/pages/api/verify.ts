import { type IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { proof, signal } = req.body;
  const appId = process.env.APP_ID as string;
  const action = process.env.ACTION_ID as string;
  const verifyRes = (await verifyCloudProof(
    proof,
    appId as `app_${string}`,
    action,
    signal
  )) as IVerifyResponse;

  console.log({ verifyRes });
  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    res.status(200).send(verifyRes);
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    res.status(400).send(verifyRes);
  }
}
