import { createHash } from 'node:crypto';
import { FatalError } from 'eve/workflow';
import {
  ReleaseIdInputSchema, readContract, type EvidencePacket, type ChangeAnalysis, type ReadinessReview,
} from './contracts.ts';
import { getRelease } from './catalog.ts';
import { buildEvidencePacket } from './readiness.ts';
import { validateAnalysis, validateReview, createBrief } from './briefs.ts';
import { saveBrief } from './brief-store.ts';

export async function captureEvidence(releaseId: string): Promise<EvidencePacket> {
  'use step';
  try {
    const input = readContract(ReleaseIdInputSchema, { releaseId }, 'Assessment input');
    return buildEvidencePacket(getRelease(input.releaseId), new Date().toISOString());
  } catch (error) {
    throw new FatalError(error instanceof Error ? error.message : 'Unable to capture release evidence.');
  }
}

export async function acceptAnalysis(value: unknown, packet: EvidencePacket): Promise<ChangeAnalysis> {
  'use step';
  try {
    return validateAnalysis(value, packet);
  } catch (error) {
    throw new FatalError(error instanceof Error ? error.message : 'Invalid change analysis.');
  }
}

export async function acceptReview(value: unknown, packet: EvidencePacket): Promise<ReadinessReview> {
  'use step';
  try {
    return validateReview(value, packet);
  } catch (error) {
    throw new FatalError(error instanceof Error ? error.message : 'Invalid readiness review.');
  }
}

export async function persistAssessment(
  callId: string, packet: EvidencePacket, analysis: ChangeAnalysis, review: ReadinessReview,
) {
  'use step';
  const id = createHash('sha256').update(packet.release.id + ':' + callId).digest('hex');
  return saveBrief(createBrief(id, packet, analysis, review));
}
