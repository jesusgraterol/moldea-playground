# Harbor Desk

Harbor Desk helps customer support representatives draft accurate replies about orders, delivery, and returns. An intake concierge hands a request to the appropriate specialist; a separate reviewer checks the proposed reply against the same account records and support policies.

The application uses the OpenAI Agents SDK. Customer and order records come from the local account catalog in `data/`; tools only read those records. Harbor Desk drafts replies for a representative to review. It does not send messages, change orders, authorize returns, or issue refunds.

## Run

Use Node.js 22.17 or newer and npm:

```sh
npm ci
export OPENAI_API_KEY=your-api-key
npm start -- --customer cus_1042 --order HD-10483 --message "Can I return the linen shirt from my order?"
```

The SDK reads its normal `OPENAI_API_KEY` environment variable. `OPENAI_MODEL` optionally selects the model; the default is `gpt-4.1-mini`. A run makes model requests and prints a structured JSON draft. Provider tracing is disabled for customer support content.

Customer `cus_1042` owns orders `HD-10483` and `HD-10411`; customer `cus_1087` owns `HD-10502`. Omit `--order` when the request is general. `--channel` accepts `email` (default) or `chat`. A customer identifier is trusted account context supplied by the calling representative, never a model-selectable tool argument.

## How it works

- **Support concierge** identifies the request, reads account details and help articles, and transfers order or return questions to a specialist.
- **Order specialist** inspects the customer's orders and explains fulfillment and delivery facts.
- **Returns specialist** checks order details against the return policy and explains the next step without initiating a return.
- **Reply reviewer** rechecks facts and policy, then produces the final draft. It can request clarification or route the case for human review.

Each agent reads its complete instruction from `moldea/agents/` whenever the SDK resolves its instructions. Relevant policy documents from `moldea/context/` and the request's account scope are supplied in that same callback. Tool results are account-scoped, and all four agents share the same Zod output contract.

See [project context](moldea/project.md), [runtime integration](moldea/runtimes/openai-agents.md), and [workflow architecture](docs/architecture.md). `src/workflow.js` owns the two-stage draft/review flow; `src/agents/` owns SDK definitions; `src/tools/` owns read-only capabilities.

## Moldea

The repository includes its local CLI and skill installation. Run `npm run moldea:validate` to check canonical structure and file/export bindings, or `npm run moldea:inspect` to inspect the repository model. Application execution is separate from these commands.

<!-- moldea:start -->

This project uses [moldea](https://skill.moldea.ai) to keep project knowledge in Git and bring relevant context into coding-agent work.
Start at [the project overview](moldea/project.md); [the manifest](moldea/moldea.yaml) maps context and implementation relationships.
<!-- moldea:end -->
