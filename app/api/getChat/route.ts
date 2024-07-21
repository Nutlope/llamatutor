import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from "@/utils/TogetherAIStream";
import Together from "together-ai";
import OpenAI from "openai";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://together.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export const maxDuration = 40;

export async function POST(request: Request) {
  let { messages } = await request.json();

  try {
    console.log("[getChat] Fetching answer stream from Together API");
    // const payload: TogetherAIStreamPayload = {
    //   model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    //   messages,
    //   stream: true,
    // };
    // const stream = await TogetherAIStream(payload);

    const payload: OpenAIStreamPayload = {
      model: "gpt-4o",
      messages,
      stream: true,
    };
    const stream = await OpenAIStream(payload);

    // TODO: Need to add error handling here, since a non-200 status code doesn't throw.
    return new Response(stream, {
      headers: new Headers({
        "Cache-Control": "no-cache",
      }),
    });
  } catch (e) {
    console.log(
      "[getCHat] Answer stream failed. Try fetching non-stream answer.",
    );
    let answer = await together.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages,
    });

    let parsedAnswer = answer.choices![0].message?.content;
    console.log("Error is: ", e);
    return new Response(parsedAnswer, { status: 202 });
  }
}
