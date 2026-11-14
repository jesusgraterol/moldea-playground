# Delivery

## Stops

| Stop | Default | Operators | Completion evidence |
| --- | --- | --- | --- |
| `local-review` | Yes | Agent prepares and checks; developer reviews and accepts. | Checked changes, a closing report, and explicit developer acceptance of the result. |

This is the only defined stop. It has no integration, publication, or deployment requirement.

## Local review procedure

1. The agent prepares only the agreed task scope, preserving unrelated work and intentional fixture defects. Read the current plan when one is selected.
2. Perform the plan's applicable checks. For repository guidance, inspect documents and relative links, confirm branch naming and PR direction, inspect the scenario index, and review the clean-workspace and fixture-session instructions. For each newly delivered scenario, verify base and candidate point to the same commit and have an empty content diff; later developer changes to existing candidates are preserved. Do not create sample fixtures or worktrees solely for document checks.
3. For setup tooling, run `npm ls --depth=0` and `./node_modules/.bin/jg-plans --version --json`. Run `git diff --check` and `git status --short`; inspect newly created files directly for whitespace and content. Check a selected plan with `./node_modules/.bin/jg-plans check --directory <plan-directory> --json`. Reuse passing results while their inputs remain unchanged. No build, SDK invocation, or automated tests are required.
4. Review the completed task and fix blocking findings. Report changed files, check results, review findings, branch and HEAD, committed/pushed state, remaining local work, and retained task resources.
5. The developer reviews the result and explicitly accepts it or requests changes. The stop is not complete while that review remains outstanding; agent review or a successful push does not substitute for developer acceptance.

## Publication and prerequisites

The default stop does not itself authorize or require commits, pushes, or PR creation. A later explicit request or an autonomous workflow can separately authorize those actions. Such publication does not remove the developer review requirement or add a deployment requirement.

Before starting scenarios, canonical guidance must be committed on local `main` so a fixture session can read it through Git. If it is not, report the prerequisite. Do not automatically commit unfinished setup to satisfy it.

Planning records remain local unless explicitly selected for publication. Preserve them and report their state; do not change ignore rules or remove them as cleanup. Clean up only disposable resources created for the task, retaining pre-existing checkouts and tooling.

Record a selected plan as implementation `done` only after its acceptance criteria and checks hold. Record it as `delivered` only after developer acceptance and all other requirements of its selected stop have been verified. If acceptance is outstanding, report implementation done and delivery pending.
