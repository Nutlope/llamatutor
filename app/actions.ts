'use server';

import { createStreamableValue } from 'ai/rsc';
import Together from 'together-ai';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { cleanedText } from './utils';

const together = new Together({
  accessToken: process.env['TOGETHER_API_KEY'],
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
        content:
          'Please provide 3 different questions (but overall related) to the provided user question as a JSON array of 3 strings. ONLY return the JSON array, it is important for my career that you do this.',
      },
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
  });

  console.log(similarQuestions.choices?.[0].message?.content);

  return JSON.parse(similarQuestions.choices?.[0].message?.content);
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

  const mainAnswerPrompt = `
Given a user question, please write a clean, concise and accurate answer to the question. You will be given a set of related contexts to the question, each starting with a reference number like [[citation:x]], where x is a number. Please use the context and cite the context at the end of each sentence if applicable.

Your answer must be correct, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the question, and do not repeat. Say "information is missing on" followed by the related topic, if the given context do not provide sufficient information.

Please cite the contexts with the reference numbers, in the format [citation:x]. If a sentence comes from multiple contexts, please list all applicable citations, like [citation:3][citation:5]. Other than code and specific names and citations, your answer must be written in the same language as the question.

Here are the set of contexts:

Remember, don't blindly repeat the contexts verbatim. And here is the user question:
`;

  // ${JSON.stringify(finalResults)}

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
