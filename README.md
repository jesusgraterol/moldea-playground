# Release Brief

Turn release notes into concise updates for product and engineering teams.

## Getting started

Requires Node.js 22 or newer. Install dependencies with `npm ci`.

The OpenAI SDK reads its credentials from `OPENAI_API_KEY` in the environment.

Run `npm start -- "Checkout latency dropped after adding a cache. Next, improve mobile navigation."` to summarize a release note.

## Project structure

- `src/index.js`: command-line input and output.
- `src/summary-agent.js`: note summarization through the OpenAI Responses API.
- `moldea/`: project foundation and agent instructions.
