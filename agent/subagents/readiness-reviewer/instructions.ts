import { defineInstructions } from 'eve/instructions';
import { loadReviewerInstruction } from '../../lib/prompts.ts';

export const reviewerInstructions = defineInstructions({
  role: 'system',
  content: loadReviewerInstruction(),
});
export default reviewerInstructions;
