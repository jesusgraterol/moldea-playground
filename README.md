# Release Brief

Turn release notes into concise updates for product and engineering teams.

## Getting started

Requires Node.js 22.17 or newer. Install dependencies with `npm ci`.

The OpenAI SDK reads its credentials from `OPENAI_API_KEY` in the environment.

Run `npm start -- "Checkout latency dropped after adding a cache. Next, improve mobile navigation."` to summarize a release note.

## Project structure

- `src/index.js`: command-line input and output.
- `src/summary-agent.js`: note summarization through the OpenAI Responses API.
- `src/instructions.js`: loads the summarizer's canonical instruction for each request.
- `moldea/`: project foundation and agent instructions.

The runtime reads `moldea/agents/note-summarizer/instruction.md` for every summary and passes its contents as the Responses API's `instructions`. Changes to that file apply on the next invocation.

Use `npm run moldea:validate` to validate project structure and `npm run moldea:inspect` to inspect agents and binding coverage.

<!-- moldea:start -->

This project uses [moldea](https://skill.moldea.ai) to keep project knowledge in Git and bring relevant context into coding-agent work.
Start at [the project overview](moldea/project.md); [the manifest](moldea/moldea.yaml) maps context and implementation relationships.
<!-- moldea:end -->
