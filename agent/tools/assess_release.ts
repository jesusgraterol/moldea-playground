import { defineWorkflowTool, type WorkflowToolContext } from 'eve/tools';
import {
  ReleaseIdInputSchema, ChangeAnalysisSchema, ReadinessReviewSchema, BriefSummarySchema,
  ChangeAnalysisInputSchema, ReadinessReviewInputSchema, readContract,
} from '../lib/contracts.ts';
import { captureEvidence, acceptAnalysis, acceptReview, persistAssessment } from '../lib/assessment.ts';
import { FatalError } from 'eve/workflow';

export async function executeAssessRelease(input: { releaseId: string }, ctx: WorkflowToolContext) {
  'use workflow';
  const packet = await captureEvidence(input.releaseId);
  const analysisInput = readContract(ChangeAnalysisInputSchema, { packet }, 'Change analysis input');
  const analysisResponse = await ctx.agent('change-analyst').send(JSON.stringify(analysisInput), {
    outputSchema: ChangeAnalysisSchema, signal: ctx.abortSignal,
  });
  const analysisResult = await analysisResponse.result();
  if (analysisResult.status !== 'completed') throw new FatalError('Change analysis did not complete.');
  const analysis = await acceptAnalysis(analysisResult.data, packet);

  const reviewInput = readContract(ReadinessReviewInputSchema, { packet, analysis }, 'Readiness review input');
  const reviewResponse = await ctx.agent('readiness-reviewer').send(JSON.stringify(reviewInput), {
    outputSchema: ReadinessReviewSchema, signal: ctx.abortSignal,
  });
  const reviewResult = await reviewResponse.result();
  if (reviewResult.status !== 'completed') throw new FatalError('Readiness review did not complete.');
  const review = await acceptReview(reviewResult.data, packet);
  return await persistAssessment(ctx.callId, packet, analysis, review);
}

export const assessReleaseTool = defineWorkflowTool({
  description: 'Assess release evidence with a change analyst and readiness reviewer, then save a brief with enforced readiness gates.',
  inputSchema: ReleaseIdInputSchema,
  outputSchema: BriefSummarySchema,
  execute: executeAssessRelease,
});
export default assessReleaseTool;
