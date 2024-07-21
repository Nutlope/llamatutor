<a href="https://www.LlamaTeacher.com">
  <img alt="Llama teacher" src="./public/og-image.png">
  <h1 align="center">Llama Teacher</h1>
</a>

<p align="center">
  An open source AI personal tutor. Powered by Llama 3 70B & Together.ai.
</p>

## Tech stack

- Llama 3 from Meta for the LLM
- Together AI for LLM inference
- Next.js app router with Tailwind
- Serper for the search API
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Fork or clone the repo
2. Create an account at [Together AI](https://dub.sh/together-ai) for the LLM
3. Create an account at [SERP API](https://serper.dev/) or with Azure ([Bing Search API](https://www.microsoft.com/en-us/bing/apis/bing-web-search-api))
4. Create an account at [Helicone](https://www.helicone.ai/) for observability
5. Create a `.env` (use the `.example.env` for reference) and replace the API keys
6. Run `npm install` and `npm run dev` to install dependencies and run locally

## Tasks - v1

- [ ] Finalize homepage as is
- [ ] Remove similar topics
- [ ] Remove restriction on tokens
- [ ] Migrate to GPT-4o
- [ ] Move "question" to "summary"
- [ ] Think about whether to include a report or generative UI with the vercel SDK? Or generate a quiz? Quiz after a few questions?
- [ ] Finalize the next screen
- [ ] Make sure it works with GPT-4o and a good system prompt

## Tasks – v2

- [ ] Make sure it works well on mobile
- [ ] Implement full landing page
- [ ] Go back and add small design things
- [ ] Try out the generative UI stuff from Vercel
- [ ] Send it in #component-dx for testing
