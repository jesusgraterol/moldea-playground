import { Agent } from '@openai/agents';
import { loadReviewerInstruction } from '../instructions.js';
import { SupportReplySchema } from '../schemas.js';
import { lookupCustomerTool, listCustomerOrdersTool, getOrderTool } from '../tools/account.js';
import { searchHelpArticlesTool } from '../tools/help.js';

export function createReplyReviewerAgent(model) {
  return new Agent({
    name: 'reply_reviewer',
    model,
    instructions: loadReviewerInstruction,
    tools: [lookupCustomerTool, listCustomerOrdersTool, getOrderTool, searchHelpArticlesTool],
    outputType: SupportReplySchema,
  });
}
