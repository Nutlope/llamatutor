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

- [x] Finalize homepage as is
- [x] Remove similar topics
- [x] Move "question" to "summary"
- [x] Make it a chat where messages stay on the UI + don't refresh everything
- [x] Migrate to GPT-4o & remove restrictions on tokens
- [x] Show messages more nicely + with markdown mode + streaming
- [ ] Redesign the second screen to match the design – move sources to the right, follow ups to end, make sure chat is fixed on bottom
- [ ] Fix outline in search bar (main + dropdown)
- [ ] Make the search bar longer overall
- [ ] Make sure it works well on mobile
- [ ] Add shift enter to add new lines to the prompt
- [ ] Put in age group into react state and into the prompt
- [ ] Send it to Jamie/Rajan & #component-dx for testing

## Tasks – v2

- [ ] Complete TODOs in the repo
- [ ] Iterate on the system prompt to make sure its good
- [ ] Add last section to the landing page
- [ ] Add GitHub CTA on the header
- [ ] Add a nicer dropdown
- [ ] Go back and add small design things
- [ ] Try out the generative UI stuff from Vercel
