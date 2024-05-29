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

- [ ] Optimize the answer prompt
- [ ] Fix answer to show the right citations in the right way

- [ ] Add loading state for similar topics
- [ ] Replace all icons with SVGs
- [ ] Make sure similar topics shows up well in 3 items
- [ ] Add helicone for observability

- [ ] Fix mobile mode to look good
- [ ] Fix hard refresh in header and footer

## Future tasks

- [ ] Add upstash redis for caching & rate limiting
- [ ] Add in more advanced RAG techniques like keyword search & question rephrasing
- [ ] Add authentication with Clerk
- [ ] Add postgres/prisma to save the user's prompts
