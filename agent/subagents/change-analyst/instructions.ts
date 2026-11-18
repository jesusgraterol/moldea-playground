import { defineInstructions } from 'eve/instructions';
import { loadAnalystInstruction } from '../../lib/prompts.ts';

export const analystInstructions = defineInstructions({
  role: 'system',
  content: loadAnalystInstruction(),
});
export default analystInstructions;
