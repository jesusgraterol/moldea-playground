import { randomUUID } from 'node:crypto';
import { Runner } from '@openai/agents';
import { findCustomer, findCustomerOrder } from './catalog.js';
import { SupportRequestSchema, SupportContextSchema, SupportReplySchema, readContract } from './schemas.js';
import { createConciergeAgent } from './agents/concierge.js';
import { createReplyReviewerAgent } from './agents/reply-reviewer.js';

export async function runSupportWorkflow(input) {
  const request = readContract(SupportRequestSchema, input, 'Support request');
  const customer = await findCustomer(request.customerId);
  if (!customer) throw new Error('Customer account was not found.');
  if (request.orderId && !await findCustomerOrder(request.customerId, request.orderId)) {
    throw new Error('Order is unavailable in the current account.');
  }

  const context = readContract(SupportContextSchema, {
    customerId: request.customerId,
    orderId: request.orderId,
    requestId: randomUUID(),
    currentDate: new Date().toISOString().slice(0, 10),
    channel: request.channel,
  }, 'Support context');
  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4.1-mini';
  const concierge = await createConciergeAgent(model);
  const reviewer = createReplyReviewerAgent(model);
  const runner = new Runner({ tracingDisabled: true });
  const signal = AbortSignal.timeout(120_000);

  const draftRun = await runner.run(concierge, request.message, { context, maxTurns: 10, signal });
  const draft = readContract(SupportReplySchema, draftRun.finalOutput, 'Support draft');
  const reviewRun = await runner.run(reviewer, JSON.stringify({
    customerMessage: request.message,
    proposedReply: draft,
  }), { context, maxTurns: 8, signal });
  const reply = readContract(SupportReplySchema, reviewRun.finalOutput, 'Reviewed reply');

  return { schemaVersion: 1, requestId: context.requestId, draftedBy: draftRun.lastAgent?.name ?? concierge.name, ...reply };
}
