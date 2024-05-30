import { createStreamableValue } from 'ai/rsc';
import Together from 'together-ai';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { cleanedText } from '@/app/utils';

const together = new Together({
  apiKey: process.env['TOGETHER_API_KEY'],
  baseURL: 'https://together.helicone.ai/v1',
  defaultHeaders: {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export async function POST(request: Request) {
  let { question, sources } = await request.json();
  let answer = await getAnswer(question, sources);

  return new Response(stream as ReadableStream, {
    headers: new Headers({
      'Cache-Control': 'no-cache',
    }),
  });

  return answer;
}

async function getAnswer(question: string, firstSixResults: any[]) {
  let finalResults = await Promise.all(
    firstSixResults.map(async (result: any) => {
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
    })
  );

  const mainAnswerPrompt = `
  Given a user question and some context, please write a clean, concise and accurate answer to the question based on the context. You will be given a set of related contexts to the question, each starting with a reference number like [[citation:x]], where x is a number. Please use the context when crafting your answer.

  Your answer must be correct, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the question, and do not repeat. Say "information is missing on" followed by the related topic, if the given context do not provide sufficient information.

  Here are the set of contexts:

  <contexts>
  ${finalResults.map(
    (result, index) => `[[citation:${index}]] ${result.fullContent} \n\n`
  )}
  </contexts>

  Remember, don't blindly repeat the contexts verbatim. It is very important for my career that you follow these instructions. Here is the user question:
    `;

  // const stream = createStreamableValue();

  // (async () => {
  const chatStream = await together.chat.completions.create({
    messages: [
      { role: 'system', content: mainAnswerPrompt },
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    stream: true,
  });

  return chatStream;

  //   for await (const chunk of chatStream) {
  //     stream.update(chunk.choices[0].delta.content);
  //   }
  //   stream.done();
  // })();

  // return stream.value;
}
