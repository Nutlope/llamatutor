import { NextResponse } from "next/server";
import { z } from "zod";

const excludedSites = ["youtube.com"];
const searchEngine: "bing" | "serper" = "serper";

export async function POST(request: Request) {
  const { question } = await request.json();

  const finalQuestion = `what is ${question}`;

  if (searchEngine === "bing") {
    const BING_API_KEY = process.env.BING_API_KEY;
    if (!BING_API_KEY) {
      throw new Error("BING_API_KEY is required");
    }

    const params = new URLSearchParams({
      q: `${finalQuestion} ${excludedSites.map((site) => `-site:${site}`).join(" ")}`,
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

    const results = data.webPages.value.map((result) => ({
      name: result.name,
      url: result.url,
    }));

    return NextResponse.json(results);
    // TODO: Figure out a way to remove certain results like YT
  }
  
  if (searchEngine === "serper") {
    const SERPER_API_KEY = process.env.SERPER_API_KEY;
    if (!SERPER_API_KEY) {
      throw new Error("SERPER_API_KEY is required");
    }

    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: finalQuestion,
        num: 9,
      }),
    });

    const rawJSON = await response.json();

    const SerperJSONSchema = z.object({
      organic: z.array(z.object({ title: z.string(), link: z.string() })),
    });

    const data = SerperJSONSchema.parse(rawJSON);

    const results = data.organic.map((result) => ({
      name: result.title,
      url: result.link,
    }));

    return NextResponse.json(results);
  }
}
