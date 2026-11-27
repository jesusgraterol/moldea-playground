# Harbor Desk

Harbor Desk is a support drafting application for representatives handling retail order, delivery, and return questions. It aims to produce concise replies grounded in account records and published support policy, with a separate editorial and factual review before a draft reaches the representative.

The application uses the OpenAI Agents SDK with a support concierge, order specialist, returns specialist, and reply reviewer. It reads a local customer/order catalog and help articles. The caller supplies trusted account scope. The application returns structured drafts; representatives decide what to send and handle any order changes, exceptions, return authorization, or refunds.

## Working context

- [Support policy](context/support-policy.md): response contract, escalation, and evidence.
- [Customer data](context/customer-data.md): caller-supplied account scope and data handling.
- [Order operations](context/order-operations.md): fulfillment records and delivery explanations.
- [Returns policy](context/returns-policy.md): eligibility questions and representative review.
- [Workflow architecture](../docs/architecture.md): request flow and executable boundaries.
- [Agents SDK integration](context/openai-agents-integration.md): instruction callbacks, context, schemas, and routing.
- [Specialist handoffs and review](decisions/1794692368000-specialist-handoffs-and-review.md): active orchestration rationale.
- [Read-only account tools](decisions/1794692368001-read-only-account-tools.md): active capability boundary.

## Agents

- [Support concierge](agents/support-concierge/description.md) owns intake and general help.
- [Order specialist](agents/order-specialist/description.md) owns fulfillment and delivery explanations.
- [Returns specialist](agents/returns-specialist/description.md) owns return-policy guidance.
- [Reply reviewer](agents/reply-reviewer/description.md) owns the final checked draft.

Canonical instructions and focused context are read directly by the runtime. There are no generated instruction mirrors or project-authored Agent Skills.
