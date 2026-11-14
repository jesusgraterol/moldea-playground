import { Agent } from '@openai/agents';
import { loadOrderInstruction, loadHandoffDescription } from '../instructions.js';
import { SupportReplySchema } from '../schemas.js';
import { lookupCustomerTool, listCustomerOrdersTool, getOrderTool } from '../tools/account.js';

export async function createOrderSpecialistAgent(model) {
  return new Agent({
    name: 'order_specialist',
    model,
    instructions: loadOrderInstruction,
    handoffDescription: await loadHandoffDescription('order-specialist'),
    tools: [lookupCustomerTool, listCustomerOrdersTool, getOrderTool],
    outputType: SupportReplySchema,
  });
}
