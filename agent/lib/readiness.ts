import {
  EvidencePacketSchema, readContract, type Release, type Gate, type EvidencePacket,
} from './contracts.ts';

function evidenceStatus(release: Release, ids: string[], requireValidation = false): 'passed' | 'needs_review' | 'blocked' {
  const evidence = ids.map((id) => release.evidence.find((entry) => entry.id === id));
  if (evidence.some((entry) => entry?.status === 'failed')) return 'blocked';
  if (ids.length === 0 || evidence.some((entry) => !entry || entry.status !== 'passed')) return 'needs_review';
  if (requireValidation && !evidence.some((entry) => entry?.kind === 'validation')) return 'needs_review';
  return 'passed';
}

export function computeReadinessGates(release: Release): Gate[] {
  const checks = release.checks.filter((check) => check.required).map((check): Gate => {
    const supportingStatus = evidenceStatus(release, check.evidenceIds);
    const status = check.status === 'failed' || supportingStatus === 'blocked'
      ? 'blocked' : check.status === 'pending' || supportingStatus === 'needs_review' ? 'needs_review' : 'passed';
    return {
      id: check.id, title: check.title, status, evidenceIds: check.evidenceIds,
      reason: status === 'passed' ? 'Required check and supporting evidence passed.'
        : status === 'blocked' ? 'Required check or supporting evidence failed.'
          : 'Required check is pending or lacks complete passing evidence.',
    };
  });
  const changes = release.changes.map((change): Gate => ({
    id: change.id, title: change.title,
    status: evidenceStatus(release, change.evidenceIds, true),
    reason: 'Every change needs recorded passing validation evidence.',
    evidenceIds: change.evidenceIds,
  }));
  const dependencies = release.dependencies.map((dependency): Gate => {
    const supportingStatus = evidenceStatus(release, dependency.evidenceIds);
    return {
      id: dependency.id, title: dependency.service + ' dependency',
      status: dependency.status === 'blocked' || supportingStatus === 'blocked'
        ? 'blocked' : dependency.status === 'pending' || supportingStatus === 'needs_review' ? 'needs_review' : 'passed',
      reason: dependency.note, evidenceIds: dependency.evidenceIds,
    };
  });
  return [...checks, ...changes, ...dependencies];
}

export function buildEvidencePacket(release: Release, asOf: string): EvidencePacket {
  return readContract(EvidencePacketSchema, {
    schemaVersion: 1, asOf, release, gates: computeReadinessGates(release),
    referenceIds: [
      release.id, ...release.changes.map((entry) => entry.id),
      ...release.checks.map((entry) => entry.id), ...release.dependencies.map((entry) => entry.id),
      ...release.evidence.map((entry) => entry.id),
    ],
  }, 'Evidence packet');
}
