import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from "@/utils/TogetherAIStream";

export const maxDuration = 60;

export async function POST(request: Request) {
  let { messages } = await request.json();

  try {
    console.log("[getChat] Fetching answer stream from Together API");
    const payload: TogetherAIStreamPayload = {
      // model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      messages,
      stream: true,
    };
    const stream = await TogetherAIStream(payload);

    return new Response(stream, {
      headers: new Headers({
        "Cache-Control": "no-cache",
      }),
    });
  } catch (e) {
    return new Response("Error. Answer stream failed.", { status: 202 });
  }
}
