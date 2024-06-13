import { NextResponse } from "next/server";
import { z } from "zod";

let excludedSites = ["youtube.com"];

export async function POST(request: Request) {
  const BING_API_KEY = process.env["BING_API_KEY"];
  if (!BING_API_KEY) {
    throw new Error("BING_API_KEY is required");
  }

  let { question } = await request.json();
  const params = new URLSearchParams({
    q: `${question} ${excludedSites.map((site) => `-site:${site}`).join(" ")}`,
    mkt: "en-US",
    count: "6",
    safeSearch: "Strict",
  });

  const response = await fetch(
    `https://api.bing.microsoft.com/v7.0/search?${params}`,
    {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": BING_API_KEY,
      },
    },
  );

  const BingJSONSchema = z.object({
    webPages: z.object({
      value: z.array(z.object({ name: z.string(), url: z.string() })),
    }),
  });

  const rawJSON = await response.json();
  const data = BingJSONSchema.parse(rawJSON);

  let results = data.webPages.value.map((result) => ({
    name: result.name,
    url: result.url,
  }));

  return NextResponse.json(results);
}
