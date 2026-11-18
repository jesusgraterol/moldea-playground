import { defineTool } from 'eve/tools';
import { ReleaseIdInputSchema, SelectedReleaseSchema, type Release } from '../lib/contracts.ts';
import { getRelease } from '../lib/catalog.ts';
import { releaseSession } from '../lib/session.ts';

export function executeSelectRelease(input: { releaseId: string }) {
  const release: Release = getRelease(input.releaseId);
  releaseSession.update(() => ({ selectedReleaseId: release.id }));
  return { selectedReleaseId: release.id, title: release.title, owner: release.owner };
}

export const selectReleaseTool = defineTool({
  description: 'Select an existing release as the session focus for follow-up questions.',
  inputSchema: ReleaseIdInputSchema,
  outputSchema: SelectedReleaseSchema,
  execute: executeSelectRelease,
});
export default selectReleaseTool;
