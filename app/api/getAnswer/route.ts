import Together from "together-ai";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

let togetherai = new Together();

export async function POST(request: Request) {
  let { question, sources } = await request.json();

  let finalResults = await Promise.all(
    sources.map(async (result: any) => {
      try {
        const response = await fetch(result.url);
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();

        if (parsed) {
          let parsedContent = cleanedText(parsed.textContent);
          return {
            ...result,
            fullContent: parsedContent,
          };
        }
      } catch (e) {
        console.log(e);
        return;
      }
    }),
  );

  const mainAnswerPrompt = `
  Given a user question and some context, please write a clean, concise and accurate answer to the question based on the context. You will be given a set of related contexts to the question, each starting with a reference number like [[citation:x]], where x is a number. Please use the context when crafting your answer.

  Your answer must be correct, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the question, and do not repeat. Say "information is missing on" followed by the related topic, if the given context do not provide sufficient information.

  Here are the set of contexts:

  <contexts>
  ${finalResults.map(
    (result, index) => `[[citation:${index}]] ${result.fullContent} \n\n`,
  )}
  </contexts>

  Remember, don't blindly repeat the contexts verbatim. It is very important for my career that you follow these instructions. Here is the user question:
    `;

  // const res = await togetherai.chat.completions.create({
  //   model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  //   messages: [{ role: "user", content: question }],
  //   stream: true,
  // });
  const res = await togetherai.chat.completions.create({
    messages: [
      { role: "system", content: mainAnswerPrompt },
      {
        role: "user",
        content: question,
      },
    ],
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    stream: true,
  });

  return new Response(res.toReadableStream());
}

export const config = { runtime: "edge" };

const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");

  let finalText = newText.substring(0, 40000);

  return finalText;
};
