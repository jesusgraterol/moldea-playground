# Launch Room Eve integration

The root definition is agent/agent.ts. The two specialist directories are agent/subagents/change-analyst and agent/subagents/readiness-reviewer. All three export actual defineAgent results and use the eve runtime. The specialists set tool: false: the root model cannot call them as standalone tools. The authored assess_release workflow is their actual invocation path.

## Canonical instruction provenance

agent/lib/prompts.ts imports complete canonical instruction.md files and selected context documents with Eve's supported ?raw asset imports. Dedicated exported loader functions compose the canonical text without maintaining a second policy prompt. Each agent's instructions.ts calls its loader and exports defineInstructions with role system.

These static modules run during Eve compilation. Eve embeds the resulting full system instructions in its compiled agent artifacts, which the runtime uses for model calls. Canonical edits take effect after Eve rebuilds or development reloads. They are not filesystem reads on every model invocation. The build includes assets outside agent/ through the package's supported raw-import mechanism.

The coordinator and reviewer receive all four focused contexts; the analyst receives operations, readiness, and evidence policy. agent/instructions/session.ts is a separate dynamic system instruction that supplies only the current selected release ID from defineState. It owns no reusable policy.

## Specialist calls and schemas

The root's assess_release file exports a real defineWorkflowTool. Its executeAssessRelease function begins with use workflow. It calls captureEvidence in a use step helper, then ctx.agent('change-analyst').send with ChangeAnalysisSchema as outputSchema. After completed status and step-backed schema/reference validation, it calls readiness-reviewer with ReadinessReviewSchema and the same captured packet. No implicit conversation or session inheritance is assumed.

Subagent description fields are routing-facing framework metadata. They load the target-owned handoff-description.md content, not the general description.md. The workflow's specialist targets are explicit. Routing remains in Eve code rather than an invented manifest graph.

Persistence runs in a use step helper after both validated stages. decideReadiness enforces the application decision before saveBrief writes the result. The assess_release tool attaches BriefSummarySchema as its outputSchema. Specialist response schemas are attached at their actual workflow sends, not merely declared in Moldea.

## Tools, skill, and state

Each file under agent/tools is the runtime registration for its path-derived tool name. Its exported execute function is the implementation binding, its exported tool definition is the registration binding, and its attached Zod schemas are executable contracts.

The root owns one project-authored skill at agent/skills/release-readiness/SKILL.md. Eve discovers it by path and exposes its content through eve__skill. Loading it adds a procedure, not new tools. Specialist agents do not inherit that skill.

defaultTools is false and tool is false on every agent. The app authors no shell, generic filesystem, provider-hosted search, external connection, deployment, or messaging tool. Eve may still supply catalog/task tools as required by its runtime. Local Eve development can add its own self-modification extension; production compilation omits that development feature.

The default Eve channel supplies HTTP sessions and streaming; no custom channel or authentication implementation is added. Start the application from the repository root. The local brief store resolves var/briefs from that working directory and is scoped to the local instance, not a hosted shared storage service.
