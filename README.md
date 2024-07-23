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

## Tasks – v1

- [ ] Add GitHub CTA & Together logo on the header
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
