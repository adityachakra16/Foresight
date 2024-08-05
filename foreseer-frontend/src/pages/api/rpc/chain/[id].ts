import type { NextApiRequest, NextApiResponse } from "next";
import { getChain } from "@alchemy/aa-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;
  const chainId = Array.isArray(id) ? id[0] : id;

  const chain = getChain(parseInt(chainId as string));
  if (!chain) {
    return res.status(404).json({ error: `Chain not found: ${chainId}` });
  }

  const rpcUrl = chain.rpcUrls.alchemy.http[0];

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ALCHEMY_API_KEY is not set" });
  }

  const body = req.body; // Already parsed in Pages Router

  try {
    const apiResponse = await fetch(`${rpcUrl}/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorResult = await apiResponse
        .json()
        .catch(() => ({ message: "Failed to fetch data" }));
      return res.status(apiResponse.status).json(errorResult);
    }

    const result = await apiResponse.json();
    console.log({ result });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error occurred" });
  }
}
