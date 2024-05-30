'use server';

import { createStreamableValue } from 'ai/rsc';
import Together from 'together-ai';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

const together = new Together({
  apiKey: process.env['TOGETHER_API_KEY'],
  baseURL: 'https://together.helicone.ai/v1',
  defaultHeaders: {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export async function getSources(question: string) {
  const params = new URLSearchParams({
    q: question,
    mkt: 'en-US',
  });

  const response = await fetch(
    `https://api.bing.microsoft.com/v7.0/search?${params}`,
    {
      method: 'GET',
      // @ts-ignore since that header key isn't part of the header type
      headers: {
        'Ocp-Apim-Subscription-Key': process.env['BING_API_KEY'],
      },
    }
  );

  const bingJson = await response.json();
  const bingResults = bingJson.webPages.value;
  const firstSixResults = bingResults.slice(0, 6);

  return firstSixResults;
}

export async function getSimilarQuestions(question: string) {
  const similarQuestions = await together.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          You are a helpful assistant that helps the user to ask related questions, based on user's original question. Please identify worthwhile topics that can be follow-ups, and write 3 questions no longer than 20 words each. Please make sure that specifics, like events, names, locations, are included in follow up questions so they can be asked standalone. For example, if the original question asks about "the Manhattan project", in the follow up question, do not just say "the project", but use the full name "the Manhattan project". Your related questions must be in the same language as the original question.

          Please provide these 3 related questions as a JSON array of 3 strings. Do NOT repeat the original question. ONLY return the JSON array, it is important for my career that you do this. Here is the user's question:`,
      },
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'meta-llama/Llama-3-8b-chat-hf',
  });

  let questions = similarQuestions.choices?.[0].message?.content;

  return JSON.parse(questions!);
}

export async function getAnswer(question: string, firstSixResults: any[]) {
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

  const stream = createStreamableValue();

  (async () => {
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

    for await (const chunk of chatStream) {
      stream.update(chunk.choices[0].delta.content);
    }
    stream.done();
  })();

  return stream.value;
}

const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, '\n\n\n')
    .replace(/\n\n/g, ' ')
    .replace(/ {3,}/g, '  ')
    .replace(/\t/g, '')
    .replace(/\n+(\s*\n)*/g, '\n');

  let finalText = newText.substring(0, 40000);

  return finalText;
};
