<a href="https://www.llamatutor.com">
  <img alt="Llama Tutor" src="./public/og-image.png">
  <h1 align="center">Llama Tutor</h1>
</a>

<p align="center">
  An open source AI personal tutor. Powered by Llama 3 70B & Together.ai
</p>

## Tech stack

- Llama 3.1 70B from Meta for the LLM
- Together AI for LLM inference
- Next.js app router with Tailwind
- Serper for the search API
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Fork or clone the repo
2. Create an account at [Together AI](https://togetherai.link) for the LLM
3. Create an account at [SERP API](https://serper.dev/) or with Azure ([Bing Search API](https://www.microsoft.com/en-us/bing/apis/bing-web-search-api))
4. Create an account at [Helicone](https://www.helicone.ai/) for observability
5. Create a `.env` (use the `.example.env` for reference) and replace the API keys
6. Run `npm install` and `npm run dev` to install dependencies and run locally

## Deploying on Vercel

1. Create an account at [Vercel](https://vercel.com/)
2. Install the Vercel CLI by running `npm i -g vercel`
3. Run `vercel` in the project directory and follow the prompts to deploy

## Using Openrouter API

1. Create an account at [Openrouter](https://openrouter.ai/)
2. Obtain your Openrouter API key from the Openrouter dashboard
3. Add the Openrouter API key to your `.env` file as `OPENROUTER_API_KEY`
4. Update the TogetherAIStream function in `utils/TogetherAIStream.ts` to use the Openrouter API endpoint and key
5. Update the `POST` function in `app/api/getChat/route.ts` to use the new TogetherAIStream function

## Future Tasks

- [ ] Add a share & copy buttons that folks can click on after convos are generated
- [ ] Add potential follow up questions + new chat at the end of chat page
- [ ] Split the page into two pages and add back the footer
- [ ] Move all my icons into their own typescript file (transform.tools)
- [ ] Add a more detailed landing page with a nice section with the GitHub link
- [ ] Add nice hamburger menu on mobile
- [ ] Try out the generative UI stuff from Vercel
- [ ] Add a nicer dropdown overall
