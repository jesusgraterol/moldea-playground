import catalog from '../../data/releases.json' with { type: 'json' };
import { ReleaseSchema, readContract, type Release } from './contracts.ts';

const releases = readContract(ReleaseSchema.array(), catalog, 'Release catalog');

export function listReleases() {
  return releases.map(({ id, title, owner, targetDate, services }) => ({
    id, title, owner, targetDate, services,
  }));
}

export function getRelease(releaseId: string): Release {
  const release = releases.find((entry) => entry.id === releaseId);
  if (!release) throw new Error('Release not found. Use list_releases to choose a catalog release.');
  return structuredClone(release);
}
