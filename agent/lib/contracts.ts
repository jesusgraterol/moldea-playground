import { z } from 'zod';

export const ReleaseIdInputSchema = z.strictObject({
  releaseId: z.string().meta({ description: 'Stable release ID from list_releases, such as atlas-2-8.' }),
});
export const EmptyInputSchema = z.strictObject({});
export const BriefIdInputSchema = z.strictObject({
  briefId: z.string().meta({ description: 'Saved brief ID returned by assess_release or list_briefs.' }),
});
export const FindingSchema = z.strictObject({
  id: z.string(),
  level: z.enum(['info', 'warning', 'blocker']),
  message: z.string(),
  evidenceIds: z.array(z.string()),
});
export const ChangeAnalysisSchema = z.strictObject({
  summary: z.string(),
  findings: z.array(FindingSchema),
});
export const ReadinessReviewSchema = z.strictObject({
  recommendation: z.enum(['ready_for_signoff', 'needs_review', 'blocked']),
  summary: z.string(),
  risks: z.array(FindingSchema),
  nextActions: z.array(z.strictObject({
    owner: z.string(),
    action: z.string(),
    evidenceIds: z.array(z.string()),
  })),
  customerBrief: z.string(),
});
export const ReleaseSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  owner: z.string(),
  targetDate: z.iso.date(),
  audience: z.string(),
  services: z.array(z.string()),
  changes: z.array(z.strictObject({
    id: z.string(),
    title: z.string(),
    service: z.string(),
    kind: z.enum(['feature', 'fix', 'migration']),
    customerImpact: z.string(),
    evidenceIds: z.array(z.string()),
  })),
  checks: z.array(z.strictObject({
    id: z.string(),
    title: z.string(),
    owner: z.string(),
    required: z.boolean(),
    status: z.enum(['passed', 'pending', 'failed']),
    evidenceIds: z.array(z.string()),
  })),
  dependencies: z.array(z.strictObject({
    id: z.string(),
    service: z.string(),
    owner: z.string(),
    status: z.enum(['ready', 'pending', 'blocked']),
    note: z.string(),
    evidenceIds: z.array(z.string()),
  })),
  evidence: z.array(z.strictObject({
    id: z.string(),
    kind: z.enum(['validation', 'review', 'runbook']),
    status: z.enum(['passed', 'pending', 'failed']),
    recordedAt: z.iso.datetime(),
    summary: z.string(),
  })),
  rollout: z.strictObject({
    strategy: z.string(),
    rollback: z.string(),
    monitoringOwner: z.string(),
  }),
});
export const GateSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  status: z.enum(['passed', 'needs_review', 'blocked']),
  reason: z.string(),
  evidenceIds: z.array(z.string()),
});
export const EvidencePacketSchema = z.strictObject({
  schemaVersion: z.literal(1),
  asOf: z.iso.datetime(),
  release: ReleaseSchema,
  gates: z.array(GateSchema),
  referenceIds: z.array(z.string()),
});
export const ChangeAnalysisInputSchema = z.strictObject({ packet: EvidencePacketSchema });
export const ReadinessReviewInputSchema = z.strictObject({
  packet: EvidencePacketSchema,
  analysis: ChangeAnalysisSchema,
});
export const ReleaseListSchema = z.strictObject({
  releases: z.array(ReleaseSchema.pick({ id: true, title: true, owner: true, targetDate: true, services: true })),
});
export const SelectedReleaseSchema = z.strictObject({
  selectedReleaseId: z.string(), title: z.string(), owner: z.string(),
});
export const BriefSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: z.string().regex(/^[a-f0-9]{64}$/),
  releaseId: z.string(),
  title: z.string(),
  generatedAt: z.iso.datetime(),
  decision: z.enum(['ready_for_signoff', 'needs_review', 'blocked']),
  gates: z.array(GateSchema),
  analysis: ChangeAnalysisSchema,
  review: ReadinessReviewSchema,
  markdown: z.string(),
});
export const BriefSummarySchema = BriefSchema.pick({
  id: true, releaseId: true, title: true, generatedAt: true, decision: true,
});
export const BriefListSchema = z.strictObject({ briefs: z.array(BriefSummarySchema) });

export type Release = z.infer<typeof ReleaseSchema>;
export type Gate = z.infer<typeof GateSchema>;
export type EvidencePacket = z.infer<typeof EvidencePacketSchema>;
export type ChangeAnalysis = z.infer<typeof ChangeAnalysisSchema>;
export type ReadinessReview = z.infer<typeof ReadinessReviewSchema>;
export type Brief = z.infer<typeof BriefSchema>;
export type BriefSummary = z.infer<typeof BriefSummarySchema>;
export type Decision = Brief['decision'];

export function readContract<T>(schema: z.ZodType<T>, value: unknown, label: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join('.') || 'value'))];
    throw new Error(label + ' is invalid (' + fields.join(', ') + ').');
  }
  return result.data;
}
