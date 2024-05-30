export async function POST(request: Request) {
  let { question } = await request.json();
  let sources = await getSources(question);
  return Response.json(sources);
}

async function getSources(question: string) {
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
