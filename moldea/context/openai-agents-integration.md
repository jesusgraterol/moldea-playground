# Harbor Desk Agents SDK integration

All four agents are defined with `Agent` from `@openai/agents`. Their exported factories under `src/agents/` are the registered runtime boundaries. The workflow creates a fresh agent graph for every request. The model is selected once in `src/workflow.js` and passed to every factory.

## Instructions and context

Each factory assigns a dedicated exported function from `src/instructions.js` directly to `Agent.instructions`. The callback reads the complete canonical agent instruction, appends the selected policy documents, and serializes the validated support context. There is no independently maintained inline behavior prompt. Request text remains runtime input.

Concierge reads support policy and customer data; order specialist adds order operations; returns specialist adds returns policy; reviewer reads all four. Manifest context references document those relationships; the application loader performs the actual concatenation.

## Routing metadata

Concierge registers the two specialist Agent instances in its `handoffs` list. Their SDK `handoffDescription` fields load the routing text from each specialist’s canonical `description.md`. The `instructions` callbacks load the separate canonical instructions.

Handoffs remain within the draft run and preserve the shared account context. The reviewer is invoked as a separate second run by `runSupportWorkflow`, using the original message and structured draft as input. No manifest routing graph is invented.

## Tools and schemas

Account tool exports in `src/tools/account.js` and the help tool in `src/tools/help.js` are real SDK function tools. Their parameters are attached Zod schemas. Their implementation exports perform local read-only catalog queries. Account scope comes from SDK RunContext, not model parameters.

Every Agent uses `SupportReplySchema` as `outputType`. The workflow validates the external request, shared context, completed draft, and completed reviewed reply with executable Zod schemas. Reviewer tools independently retrieve evidence; the first draft is not treated as verified truth.

The workflow's Runner disables tracing and uses a shared 120-second cancellation signal. It does not persist sessions, use provider-hosted prompts, or configure alternate API endpoints. Provider execution uses the SDK's normal environment configuration.
