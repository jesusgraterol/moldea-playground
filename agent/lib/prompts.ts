import coordinator from '../../moldea/agents/release-coordinator/instruction.md?raw';
import analyst from '../../moldea/agents/change-analyst/instruction.md?raw';
import reviewer from '../../moldea/agents/readiness-reviewer/instruction.md?raw';
import analystRouting from '../../moldea/agents/change-analyst/description.md?raw';
import reviewerRouting from '../../moldea/agents/readiness-reviewer/description.md?raw';
import operations from '../../moldea/context/release-operations.md?raw';
import readiness from '../../moldea/context/readiness-policy.md?raw';
import evidence from '../../moldea/context/evidence-policy.md?raw';
import communication from '../../moldea/context/communication-policy.md?raw';

function compose(instruction: string, contexts: [string, string][]): string {
  return [instruction, ...contexts.map(([path, content]) => '## ' + path + '\n\n' + content)].join('\n\n');
}

export function loadCoordinatorInstruction(): string {
  return compose(coordinator, [
    ['/moldea/context/release-operations.md', operations],
    ['/moldea/context/readiness-policy.md', readiness],
    ['/moldea/context/evidence-policy.md', evidence],
    ['/moldea/context/communication-policy.md', communication],
  ]);
}

export function loadAnalystInstruction(): string {
  return compose(analyst, [
    ['/moldea/context/release-operations.md', operations],
    ['/moldea/context/readiness-policy.md', readiness],
    ['/moldea/context/evidence-policy.md', evidence],
  ]);
}

export function loadReviewerInstruction(): string {
  return compose(reviewer, [
    ['/moldea/context/release-operations.md', operations],
    ['/moldea/context/readiness-policy.md', readiness],
    ['/moldea/context/evidence-policy.md', evidence],
    ['/moldea/context/communication-policy.md', communication],
  ]);
}

export function loadAnalystRoutingDescription(): string {
  return analystRouting.trim();
}

export function loadReviewerRoutingDescription(): string {
  return reviewerRouting.trim();
}
