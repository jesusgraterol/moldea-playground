import { defineTool } from 'eve/tools';
import { EmptyInputSchema, ReleaseListSchema } from '../lib/contracts.ts';
import { listReleases } from '../lib/catalog.ts';

export function executeListReleases() {
  return { releases: listReleases() };
}

export const listReleasesTool = defineTool({
  description: 'List available releases with their owners, target dates, and services.',
  inputSchema: EmptyInputSchema,
  outputSchema: ReleaseListSchema,
  execute: executeListReleases,
});
export default listReleasesTool;
