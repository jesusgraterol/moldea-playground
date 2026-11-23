# Launch Room: PR Assurance experiments

Reference branch: `test/005-sdk-eve-typescript/base`. Make selected changes on `test/005-sdk-eve-typescript/candidate`, then compare candidate into base. Both were created at `ead4cae`; accepted test PRs may subsequently advance base. None of the mutations below was prepared in the starting project.

The application is a correct starting point with explicit policy-to-code relationships. Most suggestions below can preserve TypeScript compilation and structural Moldea validity while changing behavior. They give PR Assurance concrete semantic discrepancies to inspect. The expected concerns are hypotheses for the developer's run, not observed Cloud results or a guarantee of particular wording or severity.

## Suggested mutations

| Change to introduce later | Implementation location | Expected concern and existing authority |
| --- | --- | --- |
| Let the reviewer recommendation directly determine readiness, ignoring computed gates and analyst blockers. | `agent/lib/briefs.ts`, `decideReadiness` | A model can promote a blocked packet. Conflicts with readiness policy and the decision to enforce readiness in application code. |
| Treat a required check with empty or missing supporting evidence as passed, or accept a change supported only by a runbook. | `agent/lib/readiness.ts`, `evidenceStatus` / `computeReadinessGates` | Missing validation is mistaken for passing evidence. Readiness policy requires recorded support and change validation. |
| Remove the readiness-reviewer invocation and construct its required review fields locally before saving. | `agent/tools/assess_release.ts` | The brief is saved without the declared independent review. Conflicts with release operations, workflow architecture, agent responsibilities, and the artifact decision. |
| Remove `outputSchema` from one specialist's actual `.send(...)` while leaving the schema export and manifest binding intact. | `agent/tools/assess_release.ts` | The binding still exists, but the SDK no longer receives the declared structured-output contract. Later parsing does not restore the missing provider contract. |
| Stop rejecting evidence IDs outside the captured packet. | `agent/lib/briefs.ts`, `validateAnalysis` / `validateReview` | Unsupported or cross-release references can enter saved findings. Conflicts with evidence policy and the specialist instruction contracts. |
| Omit readiness or evidence context from a specialist's compiled instruction composition without updating canonical relationships. | `agent/lib/prompts.ts` | The specialist loses declared operating context at its real runtime instruction boundary. The compiled Eve artifact can confirm the missing text. |
| Derive saved brief IDs only from release ID, dropping workflow call ID. | `agent/lib/assessment.ts`, `persistAssessment` | A fresh assessment reuses an older artifact instead of creating a new snapshot. Conflicts with versioned-brief policy and the accepted persistence decision. |
| Return a newly selected release from the tool but stop updating the Eve state slot. | `agent/tools/select_release.ts`, `executeSelectRelease` | The tool reports one selection while subsequent dynamic context retains another. Conflicts with release operations and coordinator follow-up behavior. |

Start with one mutation per PR when comparing findings. Keep canonical policy unchanged when the purpose is to measure detection of implementation drift. Merge changes the developer wants to retain; otherwise close the PR without merging. After either outcome, follow the README's test-completion workflow to reset local and remote candidate to the freshly fetched `origin/test/005-sdk-eve-typescript/base`. Do not reset a pending test or undo an approved base merge.

## Control cases

- **Harmless change:** correct ordinary prose in `docs/usage.md` without changing behavior or canonical managed regions. Expect no invented agent-behavior discrepancy from that edit alone.
- **Aligned change:** deliberately change a product rule together with its canonical owner, executable rule, affected instructions, and documentation. This distinguishes an authorized coherent policy change from accidental drift.
- **Structural failure:** rename a bound exported loader, update its TypeScript imports, and deliberately leave the manifest symbol stale. Moldea validation should report the missing export; this exercises a different path from semantically wrong but structurally valid code.

Do not infer that PR Assurance ran from a local `validate` result. The baseline was typechecked, compiled with Eve, inspected for real instruction/schema/skill wiring, and validated by the local Moldea CLI. Cloud behavior and the exact findings for future changes require the developer's chosen PR Assurance run.

## Fresh-session prompt

```text
Before editing this Moldea mock, read the canonical repository guidance with
`git show main:AGENTS.md` and `git show main:README.md`.
Apply those mock-only rules and the explicit requirements for this scenario.
Preserve its intentional defects and omissions. If either canonical document
is unavailable, report the prerequisite instead of guessing the rules or
adding guidance files to the fixture.
```
