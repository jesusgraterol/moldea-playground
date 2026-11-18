import { defineAgent } from 'eve';
import { loadAnalystRoutingDescription } from '../../lib/prompts.ts';

export const changeAnalystAgent = defineAgent({
  model: 'openai/gpt-5.4-mini',
  description: loadAnalystRoutingDescription(),
  defaultTools: false,
  tool: false,
});
export default changeAnalystAgent;
