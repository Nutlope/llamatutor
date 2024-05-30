import Together from "together-ai";

let togetherai = new Together();

export default async function POST(request: Request) {
  const stream = await togetherai.chat.completions.create({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{ role: "user", content: "Tell me fun things to do in NYC" }],
    stream: true,
  });

  return new Response("hi");
  // return new Response(stream as ReadableStream);
}

export const config = { runtime: "edge" };
