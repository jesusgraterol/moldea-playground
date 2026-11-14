import { Agent } from '@openai/agents';
import { loadConciergeInstruction } from '../instructions.js';
import { SupportReplySchema } from '../schemas.js';
import { lookupCustomerTool } from '../tools/account.js';
import { searchHelpArticlesTool } from '../tools/help.js';
import { createOrderSpecialistAgent } from './order-specialist.js';
import { createReturnsSpecialistAgent } from './returns-specialist.js';

export async function createConciergeAgent(model) {
  const [orderSpecialist, returnsSpecialist] = await Promise.all([
    createOrderSpecialistAgent(model),
    createReturnsSpecialistAgent(model),
  ]);
  return new Agent({
    name: 'support_concierge',
    model,
    instructions: loadConciergeInstruction,
    tools: [lookupCustomerTool, searchHelpArticlesTool],
    handoffs: [orderSpecialist, returnsSpecialist],
    outputType: SupportReplySchema,
  });
}
