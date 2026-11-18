import { defineTool } from 'eve/tools';
import { ReleaseIdInputSchema, EvidencePacketSchema } from '../lib/contracts.ts';
import { getRelease } from '../lib/catalog.ts';
import { buildEvidencePacket } from '../lib/readiness.ts';

export function executeGetReleaseEvidence(input: { releaseId: string }) {
  return buildEvidencePacket(getRelease(input.releaseId), new Date().toISOString());
}

export const getReleaseEvidenceTool = defineTool({
  description: 'Read a release evidence packet, including changes, checks, dependencies, and computed readiness gates.',
  inputSchema: ReleaseIdInputSchema,
  outputSchema: EvidencePacketSchema,
  execute: executeGetReleaseEvidence,
});
export default getReleaseEvidenceTool;
