import { NextResponse } from "next/server";
import { Exa } from "exa-js";

let excludedSites = ["youtube.com"];

export async function POST(request: Request) {
  let { question } = await request.json();

  const finalQuestion = `what is ${question}`;

  const EXA_API_KEY = process.env["EXA_API_KEY"];
  if (!EXA_API_KEY) {
    throw new Error("EXA_API_KEY is required");
  }

  const exa = new Exa(EXA_API_KEY);

  const results = await exa.searchAndContents(finalQuestion, {
    numResults: 9,
    excludeDomains: excludedSites,
    text: { maxCharacters: 10000 },
  });

  let mappedResults = results.results.map((result) => ({
    name: result.title,
    url: result.url,
    content: result.text,
  }));

  return NextResponse.json(mappedResults);
}
