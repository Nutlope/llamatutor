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

## Tasks - v0.5

- [x] Finalize homepage as is
- [x] Remove similar topics
- [x] Move "question" to "summary"
- [x] Make it a chat where messages stay on the UI + don't refresh everything
- [x] Migrate to GPT-4o & remove restrictions on tokens
- [x] Show messages more nicely + with markdown mode + streaming
- [x] Redesign the second screen to match the design – move sources to the right & make chat fixed on bottom
- [x] Add shift enter to add new lines to the prompt
- [x] Fix outline in search bar (main + dropdown)
- [x] Put in age group into react state and into the prompt
- [x] Make the search bar longer overall
- [x] Complete TODOs in the repo
- [x] Remove all unused images

## Tasks – v0.75

- [ ] Add last section to the landing page, review PR from Youssef
- [ ] Refactor code in all components
- [ ] Update the favicon
- [ ] Make new final input & disable after someone sends + clear it
- [ ] Fix the loading state of the main screen
- [ ] Make chat fixed on the bottom and no scrolling overall

## Tasks – v1

- [ ] Add slight design changes on chat: LlamaTutor icon + user messages blue
- [ ] Make sure it works well on mobile
- [ ] Iterate on the system prompt to make sure its good
- [ ] Add GitHub CTA & Together logo on the header
- [ ] Update CTA to say 405B on the main screen
- [ ] Switch from GPT-4o to Llama 405B and do testing

## Future Tasks

- [ ] Add potential follow up questions + new chat at the end of chat page
- [ ] Add nice hamburger menu on mobile
- [ ] Try out the generative UI stuff from Vercel
- [ ] Add a nicer dropdown overall
