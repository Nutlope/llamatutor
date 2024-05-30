# Turboseek.io

Open source perplexity.

## Tech stack

- Next.js app router with Tailwind
- Vercel AI SDK with server actions
- Together AI for LLM inference
- Llama-3 for the LLM
- Bing for the search API

### How it works

1. Take in a user's question
2. Make a request to the bing search API to look up 6 sources then display them
3. Get all the text from the 6 sources bing sent back and store it in a context variable
4. Make a request to Mixtral-7x8B with the question + context to come up with 3 related questions
5. Make the main request to Llama-3-8B with the question + context & stream it back to the user

## Tasks

- [x] Add helicone for observability
- [x] Make sure to restrict answer to 32k total tokens
- [x] Make sure similar topics shows up well in 3 items
- [x] Improve all prompts
- [ ] Make sure similar topics works when you click on it
- [ ] Add the right favicon
- [ ] Add OG image and info
- [ ] Add loading state for similar topics
- [ ] Replace all icons with SVGs
- [ ] Fix mobile mode to look good

## Future tasks

- [ ] Make sure the answer correctly cites all the sources in the text & number the citations in the UI
- [ ] Add input validation with retries to make sure similar topics is always an array of 3
- [ ] Fix hard refresh in header and footer
- [ ] Add upstash redis for caching & rate limiting
- [ ] Add in more advanced RAG techniques like keyword search & question rephrasing
- [ ] Add authentication with Clerk
- [ ] Add postgres/prisma to save the user's prompts

## Inspiration

- Perplexity
- You.com
- Lepton search
