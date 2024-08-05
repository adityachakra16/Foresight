import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiUrl = "https://api.g.alchemy.com";
  const apiKey = process.env.ALCHEMY_API_KEY;

  if (apiKey == null) {
    return res.status(500).json({ error: "ALCHEMY_API_KEY is not set" });
  }

  const body = req.body; // In Pages Router, req.body is already parsed

  const routes = req.query.routes as string[];
  const path = Array.isArray(routes) ? routes.join("/") : "";

  try {
    const response = await fetch(apiUrl + `/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log({ data });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
