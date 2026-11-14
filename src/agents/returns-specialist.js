import { Agent } from '@openai/agents';
import { loadReturnsInstruction, loadHandoffDescription } from '../instructions.js';
import { SupportReplySchema } from '../schemas.js';
import { getOrderTool } from '../tools/account.js';
import { searchHelpArticlesTool } from '../tools/help.js';

export async function createReturnsSpecialistAgent(model) {
  return new Agent({
    name: 'returns_specialist',
    model,
    instructions: loadReturnsInstruction,
    handoffDescription: await loadHandoffDescription('returns-specialist'),
    tools: [getOrderTool, searchHelpArticlesTool],
    outputType: SupportReplySchema,
  });
}
