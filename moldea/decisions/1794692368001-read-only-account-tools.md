---
status: accepted
createdAt: '2026-11-14T21:39:28.001Z'
---
# Keep account capabilities read-only and scoped by caller context

Harbor Desk's role is to draft support replies. Register only account lookup, customer order listing, single-order lookup, and help-article search. These capabilities read the local catalog; no tool mutates commerce records or sends messages.

Resolve customer scope from the representative-provided SDK context. A model may select an order reference but cannot select a customer account through tool parameters. Filter account orders before returning a result, and treat another account's order as unavailable.

This boundary keeps the tool contract aligned with a representative review workflow. Supporting refunds, return authorization, or outbound messaging would require an explicit change to both the implementation and governing policy.
