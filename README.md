<a href="https://www.llamatutor.com">
  <img alt="Llama Tutor" src="./public/og-image.png">
  <h1 align="center">Llama Tutor</h1>
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

## Tasks - v0.5 (working version)

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
- [x] Update the favicon
- [x] Refactor code in all components

## Tasks – v0.75 (final UI changes)

- [x] Fix the loading state of the main screen
- [x] Make new final input & disable after someone sends + clear it
- [x] Make chat fixed on the bottom and no scrolling overall
- [x] Make sure it works well on mobile pt.1
- [x] Fix mobile overall pt.2
- [x] Iterate on the system prompt to make sure its good
- [x] Make the main chat page autoscroll by default
- [x] Add the together domains and test them out
- [x] Add password and send to team
- [x] Fix issue with icons not loading & loading state
- [ ] Add GitHub CTA & Together logo on the header

## Tasks – v1 (after endpoint access)

- [ ] Switch all the names to Llama-Tutor (site, repo, ect...)
- [ ] Switch from GPT-4o to Llama 405B and do testing
- [ ] Update CTA to say 405B on the main screen
- [ ] Write copy for tweet / linkedin + record demo vid with nice zoomins

## Future Tasks

- [ ] Add slight design changes on chat: LlamaTutor icon + user messages blue
- [ ] Split the page into two pages and add back the footer
- [ ] Move all my icons into their own typescript file (transform.tools)
- [ ] Add a share & copy buttons that folks can click on after convos are generated
- [ ] Add potential follow up questions + new chat at the end of chat page
- [ ] Add a more detailed landing page with a nice section with the GitHub link
- [ ] Add nice hamburger menu on mobile
- [ ] Try out the generative UI stuff from Vercel
- [ ] Add a nicer dropdown overall
