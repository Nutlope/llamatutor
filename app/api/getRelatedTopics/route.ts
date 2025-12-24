import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic } = await request.json();
  try {
    // Create a prompt for the model to generate related topics
    const prompt = `Fill in this template with appropriate values: { "topic": "${topic}", "related_topics": [FILL_TOPIC1,FILL_TOPIC2, FILL_TOPIC3] }`;
    const model = "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo";

    // Make the call to generate topics
    const res = await fetch("https://together.helicone.ai/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({ prompt, model }),
    });

    const data = await res.json();
    const choices = data.choices;
    let topics = [];

    // Check if there are choices and extract related topics
    if (choices && choices.length > 0 && choices[0].text) {
      const text = choices[0].text;
      // Use a regular expression to find JSON-like content
      const jsonMatch = text.match(/\{[^]*\}/);
      
      if (jsonMatch) {
        try {
          const jsonContent = JSON.parse(jsonMatch[0]);
          // Ensure related_topics is an array before assigning
          if (jsonContent.related_topics && Array.isArray(jsonContent.related_topics)) {
            topics = jsonContent.related_topics.slice(0, 3); // Limit to a maximum of 3 related topics
          }
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
        }
      }
    }
    return NextResponse.json({ topics });
  } catch (e) {
    console.error(e);
    return new Response("Error. Failed to generate related topics.", {
      status: 500,
    });
  }
}