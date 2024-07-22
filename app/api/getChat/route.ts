import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from "@/utils/TogetherAIStream";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

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

    return new Response(stream, {
      headers: new Headers({
        "Cache-Control": "no-cache",
      }),
    });
  } catch (e) {
    return new Response("Error. Answer stream failed.", { status: 202 });
  }
}
