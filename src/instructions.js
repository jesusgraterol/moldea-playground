import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SupportContextSchema, readContract } from './schemas.js';

const canonicalRoot = resolve(import.meta.dirname, '../moldea');

async function loadInstruction(agentId, contextFiles, runContext) {
  const context = readContract(SupportContextSchema, runContext?.context, 'Support context');
  const instruction = await readFile(resolve(canonicalRoot, 'agents', agentId, 'instruction.md'), 'utf8');
  const policies = await Promise.all(contextFiles.map(async (filename) => {
    const text = await readFile(resolve(canonicalRoot, 'context', filename), 'utf8');
    return '## /moldea/context/' + filename + '\n\n' + text;
  }));
  return [
    instruction,
    ...policies,
    '## Current support request context\n\n' + JSON.stringify(context),
  ].join('\n\n');
}

export function loadConciergeInstruction(runContext) {
  return loadInstruction('support-concierge', ['support-policy.md', 'customer-data.md'], runContext);
}

export function loadOrderInstruction(runContext) {
  return loadInstruction('order-specialist', ['support-policy.md', 'customer-data.md', 'order-operations.md'], runContext);
}

export function loadReturnsInstruction(runContext) {
  return loadInstruction('returns-specialist', ['support-policy.md', 'customer-data.md', 'returns-policy.md'], runContext);
}

export function loadReviewerInstruction(runContext) {
  return loadInstruction('reply-reviewer', [
    'support-policy.md', 'customer-data.md', 'order-operations.md', 'returns-policy.md',
  ], runContext);
}

export function loadHandoffDescription(agentId) {
  if (!['order-specialist', 'returns-specialist'].includes(agentId)) {
    throw new Error('No handoff description for this agent.');
  }
  return readFile(resolve(canonicalRoot, 'agents', agentId, 'description.md'), 'utf8');
}
