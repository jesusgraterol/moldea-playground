# Launch Room

Launch Room gives product delivery teams one place to review a release before rollout. It gathers changes, validation evidence, service dependencies, and operational checklists; specialist agents assess the evidence and prepare a release brief with explicit blockers and next actions.

The application is built in TypeScript on Eve. Its local release catalog is the system of record for release facts. Reviewed briefs are saved as versioned local artifacts for a release manager to inspect. Launch Room does not deploy software, change source-control status, or publish announcements.

## Development

Use Node.js 24.15 or newer and npm. Install with `npm ci`, then start Eve with `npm run dev`. Eve provides the interactive conversation and HTTP session interface. Configure model access through Eve's normal provider configuration.

The primary workflow is: identify a release, gather its evidence, run specialist review, and save a reviewed brief. Begin with: “Review the Atlas 2.8 release and prepare a readiness brief for the release manager.”

Project context, operating policies, and runtime connections are documented under `moldea/`. The application includes typed domain contracts, catalog queries, readiness rules, evidence references, specialist orchestration, and report persistence.

## Application workflow

The release coordinator identifies a catalog release and keeps that selection across conversation turns. The `assess_release` workflow captures an evidence snapshot, asks the change analyst for structured findings, and passes the accepted analysis and the same evidence to the readiness reviewer. Application code enforces the final decision before saving the brief.

Every required check and dependency needs passing evidence, and every change needs recorded validation. Failed work blocks readiness; pending or missing evidence requires review. Specialist findings can add a hold. They cannot waive those rules. Even `ready_for_signoff` still requires a release-manager decision outside the application.

Saved briefs contain the decision, evidence gates, findings, proposed owner actions, customer-facing draft copy, and rendered Markdown. They are versioned snapshots under `var/briefs/`; a fresh assessment creates another brief.

| Tool                   | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `list_releases`        | Find releases and their owners, dates, and services.      |
| `select_release`       | Retain the conversation's release focus.                  |
| `get_release_evidence` | Read source evidence and computed readiness gates.        |
| `assess_release`       | Run the specialists and save an enforced, reviewed brief. |
| `list_briefs`          | Find saved briefs for a release.                          |
| `read_brief`           | Retrieve a saved brief and its Markdown.                  |

The catalog includes shared dashboards in `atlas-2-8`, export reliability in `atlas-2-7-3`, and notification preferences in `meridian-1-6`. Their different recorded evidence states give the application meaningful readiness decisions to explain.

## Commands and documentation

- `npm run dev:app` starts development with Eve's bundled self-modification extensions disabled.
- `npm run typecheck` checks TypeScript contracts.
- `npm run build` builds the application; `npm start` serves that build.
- `npm run inspect` shows Eve's discovered instructions, tools, skill, subagents, and channels.
- `npm run moldea:validate` checks canonical structure and implementation bindings.

See [usage and HTTP sessions](docs/usage.md), [architecture](docs/architecture.md), [project context](moldea/project.md), and [Eve runtime integration](moldea/runtimes/eve.md). The root owns the [release-readiness procedure](agent/skills/release-readiness/SKILL.md).

Canonical agent instructions and selected context documents are the source of Eve's compiled system instructions. Rebuild or use development reload after changing them. The source catalog is tracked in Git; generated runtime data and saved briefs remain local to the application instance.

<!-- moldea:start -->

This project uses [moldea](https://skill.moldea.ai) to keep project knowledge in Git and bring relevant context into coding-agent work.
Start at [the project overview](moldea/project.md); [the manifest](moldea/moldea.yaml) maps context and implementation relationships.

<!-- moldea:end -->

Launch room can help your team achieve amazing things!
