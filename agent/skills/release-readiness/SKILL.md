---
name: release-readiness
description: Prepare or refresh a reviewed release-readiness brief from a catalog release; use for readiness assessments and launch brief requests.
---
# Release readiness

Use this procedure when a user asks whether a release is ready or asks for a reviewed launch brief. A catalog listing, a saved-brief lookup, or a general explanation needs only the corresponding tool.

1. Identify the catalog release with list_releases. Ask the user to choose when the request could refer to more than one release.
2. Use select_release to retain that release as the session focus.
3. Read get_release_evidence when explaining the current facts or clarifying scope. Apply the readiness and evidence policies already supplied in your system context.
4. For a new readiness assessment, call assess_release with the explicit release ID. It runs both specialists in order and saves only their validated result with enforced gates.
5. Read the returned brief with read_brief. Present its recorded decision, the evidence behind blockers or open questions, named next actions, and the saved brief ID.

A saved brief is a snapshot. For a fresh assessment, run assess_release again rather than rewriting the prior brief. If the workflow fails, report that a reviewed brief was not produced; do not substitute an unreviewed narrative or claim the artifact exists.
