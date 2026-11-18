import { defineTool } from 'eve/tools';
import { BriefIdInputSchema, BriefSchema } from '../lib/contracts.ts';
import { readBrief } from '../lib/brief-store.ts';

export async function executeReadBrief(input: { briefId: string }) {
  return readBrief(input.briefId);
}

export const readBriefTool = defineTool({
  description: 'Read one saved readiness brief, including its evidence, decision, actions, and rendered Markdown.',
  inputSchema: BriefIdInputSchema,
  outputSchema: BriefSchema,
  execute: executeReadBrief,
});
export default readBriefTool;
