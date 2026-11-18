import { defineAgent } from 'eve';

export const releaseCoordinatorAgent = defineAgent({
  model: 'openai/gpt-5.4-mini',
  defaultTools: false,
  tool: false,
});
export default releaseCoordinatorAgent;
