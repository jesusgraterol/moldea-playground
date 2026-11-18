import {
  BriefSchema, ChangeAnalysisSchema, ReadinessReviewSchema, readContract,
  type Brief, type BriefSummary, type ChangeAnalysis, type Decision, type EvidencePacket, type ReadinessReview,
} from './contracts.ts';

export function validateAnalysis(value: unknown, packet: EvidencePacket): ChangeAnalysis {
  const analysis = readContract(ChangeAnalysisSchema, value, 'Change analysis');
  verifyReferences(analysis.findings.flatMap((finding) => finding.evidenceIds), packet);
  return analysis;
}

export function validateReview(value: unknown, packet: EvidencePacket): ReadinessReview {
  const review = readContract(ReadinessReviewSchema, value, 'Readiness review');
  verifyReferences([
    ...review.risks.flatMap((risk) => risk.evidenceIds),
    ...review.nextActions.flatMap((action) => action.evidenceIds),
  ], packet);
  return review;
}

function verifyReferences(ids: string[], packet: EvidencePacket): void {
  const known = new Set(packet.referenceIds);
  if (ids.some((id) => !known.has(id))) throw new Error('Specialist output cites an unknown evidence reference.');
}

export function decideReadiness(
  packet: EvidencePacket, analysis: ChangeAnalysis, review: ReadinessReview,
): Decision {
  const gates = packet.gates.map((gate) => gate.status);
  const findings = [...analysis.findings, ...review.risks];
  if (gates.includes('blocked') || findings.some((finding) => finding.level === 'blocker') || review.recommendation === 'blocked') {
    return 'blocked';
  }
  if (gates.includes('needs_review') || findings.some((finding) => finding.level === 'warning') || review.recommendation === 'needs_review') {
    return 'needs_review';
  }
  return 'ready_for_signoff';
}

export function createBrief(
  id: string, packet: EvidencePacket, analysis: ChangeAnalysis, review: ReadinessReview,
): Brief {
  const decision = decideReadiness(packet, analysis, review);
  const sections = [
    '# ' + packet.release.title,
    'Decision: ' + decision + '\nEvidence captured: ' + packet.asOf,
    '## Summary\n' + review.summary,
    '## Changes\n' + analysis.summary,
    '## Readiness gates\n' + packet.gates.map((gate) =>
      '- ' + gate.title + ': ' + gate.status + ' — ' + gate.reason + ' [' + gate.evidenceIds.join(', ') + ']',
    ).join('\n'),
    '## Findings\n' + [...analysis.findings, ...review.risks].map((finding) =>
      '- ' + finding.level + ': ' + finding.message + ' [' + finding.evidenceIds.join(', ') + ']',
    ).join('\n'),
    '## Next actions\n' + review.nextActions.map((action) =>
      '- ' + action.owner + ': ' + action.action + ' [' + action.evidenceIds.join(', ') + ']',
    ).join('\n'),
    '## Customer-facing brief\n' + review.customerBrief,
    '## Rollout\n' + packet.release.rollout.strategy,
    '## Rollback\n' + packet.release.rollout.rollback,
    'Release-manager sign-off is still required. This brief does not approve or perform a deployment.',
  ];
  return readContract(BriefSchema, {
    schemaVersion: 1, id, releaseId: packet.release.id, title: packet.release.title,
    generatedAt: packet.asOf, decision, gates: packet.gates, analysis, review,
    markdown: sections.join('\n\n') + '\n',
  }, 'Release brief');
}

export function summarizeBrief(brief: Brief): BriefSummary {
  const { id, releaseId, title, generatedAt, decision } = brief;
  return { id, releaseId, title, generatedAt, decision };
}
