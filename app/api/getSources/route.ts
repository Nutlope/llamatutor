import { NextResponse } from "next/server";

let excludedSites = ["youtube.com"];

export async function POST(request: Request) {
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
      // @ts-ignore since that header key isn't part of the header type
      headers: {
        "Ocp-Apim-Subscription-Key": process.env["BING_API_KEY"],
      },
    },
  );

  const bingJson = await response.json();
  const bingResults = bingJson.webPages.value;

  const Results = bingResults.map((result: any) => ({
    name: result.name,
    url: result.url,
  }));

  return NextResponse.json(Results);
}
