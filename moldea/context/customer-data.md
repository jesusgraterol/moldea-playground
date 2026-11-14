# Customer account context

The representative supplies the current customer ID and optional order ID. The workflow verifies these against the local catalog before calling a model. This command-line entry point assumes a trusted representative; it does not establish customer identity or provide a public authentication endpoint.

The shared SDK context contains customerId, orderId, requestId, currentDate in UTC, and channel. The instruction callbacks explicitly supply these fields to the model. Model-provided tool parameters never select customer scope.

Account tools read only the selected customer's name, membership, orders, items, delivery dates, and tracking details. A lookup outside that account returns the same unavailable result as a missing order. It must not confirm another customer's purchase. Customer name and membership alone establish no return-policy exception.

Use only the minimum account facts needed to answer the question. If an order cannot be verified in the current account, do not expose or infer details about another account. Ask the representative to verify the reference or choose human_review.

Provider tracing is disabled for both workflow stages. The application keeps no conversation history on disk; the CLI prints the reviewed draft to its caller. Model requests still transmit the supplied request, selected context, and relevant tool results to the model provider.
