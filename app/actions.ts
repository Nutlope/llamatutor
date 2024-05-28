'use server';

import { createStreamableValue } from 'ai/rsc';
import Together from 'together-ai';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { cleanedText } from './utils';

const together = new Together({
  accessToken: process.env['TOGETHER_API_KEY'],
});

export async function getBingResults(question: string) {
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

  let finalResults = await Promise.all(
    firstSixResults.map(async (result: any) => {
      try {
        const response = await fetch(result.url);
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();

        if (parsed) {
          return {
            ...result,
            fullContent: cleanedText(parsed.textContent),
          };
        }
      } catch (e) {
        console.log(e);
        return;
      }
    })
  );

  return finalResults;
}

export async function getCompletion(question: string) {
  const stream = createStreamableValue();

  (async () => {
    const chatStream = await together.chat.completions.create({
      messages: [
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
