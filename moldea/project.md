# Launch Room

Launch Room helps product delivery teams assess a release and prepare a reviewed brief for the release manager. It brings versioned release facts, change-validation evidence, operational checks, and dependency readiness into one evidence packet. Specialist analysis explains impact and open questions; application rules preserve the minimum readiness decision.

The root release coordinator serves release managers and engineering leads through Eve's conversation and HTTP session interface. A change analyst examines the evidence packet, then a readiness reviewer checks that analysis and drafts the release communication. The workflow saves a versioned local brief only after both stages complete and their structured outputs validate.

The application reads its release catalog from Git and writes generated briefs under the local application's var/briefs directory. It does not contact source-control systems, deploy software, change release records, send announcements, or grant release-manager sign-off.

## Context and architecture

- [Release operations](context/release-operations.md): scope, catalog, sessions, and saved artifacts.
- [Readiness policy](context/readiness-policy.md): minimum decisions enforced by application code.
- [Evidence policy](context/evidence-policy.md): snapshot meaning, reference integrity, and uncertainty.
- [Communication policy](context/communication-policy.md): internal and customer-facing writing.
- [Architecture](../docs/architecture.md): domain layers, durable workflow, and persistence.
- [Usage](../docs/usage.md): representative requests and the HTTP session interface.
- [Eve integration](context/eve-integration.md): discovery, canonical instruction compilation, and SDK connections.
- [Enforced readiness decisions](decisions/1795012487000-enforce-readiness-in-application-code.md).
- [Versioned local briefs](decisions/1795012487001-save-reviewed-briefs-as-versioned-artifacts.md).
- [Release-readiness procedure](../agent/skills/release-readiness/SKILL.md).

## Responsibilities

- [Release coordinator](agents/release-coordinator/description.md): request scope, conversation, and reviewed-brief delivery.
- [Change analyst](agents/change-analyst/description.md): change impact and evidence findings.
- [Readiness reviewer](agents/readiness-reviewer/description.md): independent readiness review and release communication.
