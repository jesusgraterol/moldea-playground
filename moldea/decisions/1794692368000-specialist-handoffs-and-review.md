---
status: accepted
createdAt: '2026-11-14T21:39:28.000Z'
---
# Use specialist handoffs followed by independent reply review

Support requests span general help, fulfillment, and returns. Keep intake with one concierge and transfer purchase-specific work to a specialist with focused policy context. Use SDK handoffs to preserve the conversation and account context during drafting.

Run a separate reply reviewer after the draft completes. It receives the original customer message, the proposed structured reply, and read-only evidence tools. Return only its reviewed output. This adds a second model stage but gives the final reply one explicit owner and prevents the application from silently returning an unchecked first draft.

All agents share the same structured reply schema. The workflow fails on missing or invalid stage output. Representatives remain responsible for sending replies and carrying out account actions.
