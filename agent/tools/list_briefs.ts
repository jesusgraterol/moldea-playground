import { defineTool } from 'eve/tools';
import { ReleaseIdInputSchema, BriefListSchema } from '../lib/contracts.ts';
import { getRelease } from '../lib/catalog.ts';
import { listBriefs } from '../lib/brief-store.ts';

export async function executeListBriefs(input: { releaseId: string }) {
  getRelease(input.releaseId);
  return { briefs: await listBriefs(input.releaseId) };
}

export const listBriefsTool = defineTool({
  description: 'List saved readiness briefs for a release, newest first.',
  inputSchema: ReleaseIdInputSchema,
  outputSchema: BriefListSchema,
  execute: executeListBriefs,
});
export default listBriefsTool;
