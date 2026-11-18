import { defineInstructions } from 'eve/instructions';
import { loadCoordinatorInstruction } from './lib/prompts.ts';

export const coordinatorInstructions = defineInstructions({
  role: 'system',
  content: loadCoordinatorInstruction(),
});
export default coordinatorInstructions;
