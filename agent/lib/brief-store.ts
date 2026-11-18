import { mkdir, readFile, readdir, rename, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { BriefSchema, readContract, type Brief, type BriefSummary } from './contracts.ts';
import { summarizeBrief } from './briefs.ts';

// Eve is started from the application root. Generated briefs belong to this local application instance.
const briefRoot = resolve(process.cwd(), 'var', 'briefs');

function briefPath(id: string): string {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error('Invalid brief identifier.');
  return resolve(briefRoot, id + '.json');
}

export async function readBrief(id: string): Promise<Brief> {
  const text = await readFile(briefPath(id), 'utf8');
  return readContract(BriefSchema, JSON.parse(text), 'Saved brief');
}

export async function saveBrief(brief: Brief): Promise<BriefSummary> {
  const verified = readContract(BriefSchema, brief, 'Release brief');
  await mkdir(briefRoot, { recursive: true });
  const destination = briefPath(verified.id);
  try {
    return summarizeBrief(await readBrief(verified.id));
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error;
  }
  const temporary = resolve(briefRoot, randomUUID() + '.tmp');
  try {
    await writeFile(temporary, JSON.stringify(verified, null, 2) + '\n', { flag: 'wx' });
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
  return summarizeBrief(verified);
}

export async function listBriefs(releaseId: string): Promise<BriefSummary[]> {
  let filenames: string[];
  try {
    filenames = await readdir(briefRoot);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
    throw error;
  }
  const briefs = await Promise.all(filenames.filter((name) => /^[a-f0-9]{64}\.json$/.test(name))
    .map((name) => readBrief(name.slice(0, -5))));
  return briefs.filter((brief) => brief.releaseId === releaseId)
    .map(summarizeBrief).sort((left, right) => right.generatedAt.localeCompare(left.generatedAt));
}
