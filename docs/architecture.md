# Workflow architecture

Harbor Desk runs one support request at a time. The caller supplies the customer account, optional order, channel, and message. The workflow validates this input and verifies that the account and supplied order exist before any model request.

## Draft and review

The support concierge starts the draft run. It can answer general questions, transfer fulfillment questions to the order specialist, or transfer return questions to the returns specialist. Handoffs transfer the conversation within the same SDK run. Specialists produce a structured draft; they do not send it to a customer.

A second SDK run invokes the reply reviewer with the original message and proposed reply. The reviewer receives the same account context and can independently read the account catalog and help articles. Only the reviewed result is returned to the caller. Missing output, malformed output, provider failures, or exhausted turn limits fail the workflow instead of returning an unchecked draft.

## Runtime boundaries

- Agent definitions use `@openai/agents`; the workflow uses one `Runner` for both stages.
- Each `instructions` callback reads its canonical instruction and selected policy documents at runtime.
- The application passes a shared context object containing customer ID, optional order ID, request ID, current UTC date, and channel. The SDK does not automatically expose context fields to the model; the instruction loader serializes these selected fields.
- Tools resolve account scope from SDK context. No tool accepts a customer ID from the model.
- All agents attach `SupportReplySchema` through `outputType`. The workflow validates both completed stages against that same contract.
- One 120-second deadline covers draft and review, with turn limits of ten and eight respectively.
- Provider tracing is disabled. There is no conversation persistence or outbound messaging integration.

The account adapter reads the JSON catalog under `data/` on demand. Its exported queries filter orders by customer before returning them. This deployment uses that local catalog as its record source; it has no commerce write adapter.

See the decisions on [specialist handoffs and final review](../moldea/decisions/1794692368000-specialist-handoffs-and-review.md) and [read-only account tools](../moldea/decisions/1794692368001-read-only-account-tools.md).
