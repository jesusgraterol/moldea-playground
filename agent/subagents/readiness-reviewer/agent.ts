import { defineAgent } from 'eve';
import { loadReviewerRoutingDescription } from '../../lib/prompts.ts';

export const readinessReviewerAgent = defineAgent({
  model: 'openai/gpt-5.4-mini',
  description: loadReviewerRoutingDescription(),
  defaultTools: false,
  tool: false,
});
export default readinessReviewerAgent;
