import { cleanedText, fetchWithTimeout } from "@/utils/utils";
import { Readability } from "@mozilla/readability";
import jsdom, { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export const maxDuration = 30;

type Source = {
  url: string;
  name: string;
}

export async function POST(request: Request) {
  const { sources } = await request.json();

  console.log("[getAnswer] Fetching text from source URLS");
  const finalResults = await Promise.all(
    sources.map(async (result: Source) => {
      try {
        // Fetch the source URL, or abort if it's been 3 seconds
        const response = await fetchWithTimeout(result.url);
        const html = await response.text();
        const virtualConsole = new jsdom.VirtualConsole();
        const dom = new JSDOM(html, { virtualConsole });

        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();
        const parsedContent = parsed
          ? cleanedText(parsed.textContent)
          : "Nothing found";

        return {
          ...result,
          fullContent: parsedContent,
        };
      } catch (e) {
        console.log(`error parsing ${result.name}, error: ${e}`);
        return {
          ...result,
          fullContent: "not available",
        };
      }
    }),
  );

  return NextResponse.json(finalResults);
}
