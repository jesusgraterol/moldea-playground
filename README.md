# moldea-playground

Mock projects for exploring Moldea initialization, SDK integrations, Navigator artifacts, and PR Assurance. Each scenario has its own base and candidate branches. Projects can be intentionally incomplete or incorrect.

## Guide

| Reference | Purpose |
| --- | --- |
| [Agent instructions](AGENTS.md) | Rules for building and preserving mocks. |
| [Delivery procedure](docs/delivery.md) | Local review, operators, and completion evidence. |
| [Planning and local records](#planning) | Optional setup tooling and local planning files. |

## Branch convention

Keep `main` for conventions, the scenario index, and planning tooling. Each scenario uses two branches:

```text
test/<NNN>-<descriptive-slug>/base
test/<NNN>-<descriptive-slug>/candidate
```

Use a unique three-digit ID starting at `001`; never reuse an ID. Choose a lowercase kebab-case slug that describes the behavior, adding the SDK or complexity when useful. Categories are flexible.

Examples only; these scenarios have not been created:

| Scenario | Branch prefix (append `/base` or `/candidate`) |
| --- | --- |
| Missing initialization | `test/001-init-missing` |
| Incorrect initialization | `test/002-init-invalid` |
| Simple OpenAI project | `test/003-sdk-openai-simple` |
| All Navigator artifacts | `test/004-navigator-all-artifacts` |

**Base is the starting state**, including intentional defects or missing initialization. Candidate begins at the completed base and adds the changes to evaluate. PR Assurance PRs go **from candidate into its matching base**.

Once ready for comparison, keep base stable. Use a new scenario ID for a different baseline. Inspection-only pairs can initially share a commit; a PR comparison needs a deliberate difference. Preserve scenario branches independently of `main`.

## Creating a scenario

1. Read the canonical guidance on `main`. Confirm `AGENTS.md` and this README are committed there before creating scenarios. If they are unavailable, report the prerequisite; do not automatically commit unfinished setup or switch away from it.
2. Check the index and local and remote branches for an unused ID and prefix. Stop on a collision; do not replace existing branches.
3. Prefer a fresh worktree or clone for each independent scenario, leaving the main checkout available for guidance and index updates. If reusing a checkout, first inspect tracked, untracked, and ignored files with `git status --short --untracked-files=all --ignored`. Ignored dependencies and generated output survive branch switches. If unrelated leftovers make isolation uncertain, use a fresh workspace. Preserve existing files; do not automatically clean, delete, stash, or overwrite them.
4. Start the scenario's base branch from `main`. Put the mock project at the repository root and use the stack, package manager, complexity, and artifacts requested for that scenario.
5. Prepare and commit the starting fixture on base, then create candidate from that completed base. Add only the intended comparison changes to candidate.
6. Record the purpose, intentional defects or omissions, and expected base/candidate behavior in the index on `main` or the PR description. Keep the index current when scenarios are created. Create a candidate-to-base PR when requested for PR Assurance; keep mock projects out of `main`.

### Fixture contents

Include only files appropriate to the requested scenario. Shared documentation, agent instructions, planning files, and tooling manifests can be replaced or omitted on scenario branches when they affect detection or conflict with the mock. A scenario does not need a metadata file or template. Missing Moldea initialization still retains Git history for comparisons.

Preserve deliberate mistakes. Use canned data or dummy values when sufficient. Tests, CI, live API calls, secret infrastructure, and production hardening are unnecessary unless explicitly requested. For an all-artifacts scenario, establish Moldea's actual artifact contracts when creating it rather than assuming a fixed list here.

### Starting a session on a fixture branch

A stripped fixture may have no usable README or `AGENTS.md`; those instructions cannot load automatically. Use this startup prompt for a fresh session when guidance is absent or replaced, and include it in handoffs:

```text
Before editing this Moldea mock, read the canonical repository guidance with
`git show main:AGENTS.md` and `git show main:README.md`.
Apply those mock-only rules and the explicit requirements for this scenario.
Preserve its intentional defects and omissions. If either canonical document
is unavailable, report the prerequisite instead of guessing the rules or
adding guidance files to the fixture.
```

This requires the guidance to be committed on local `main`. Supply the prompt outside the mock; no instruction loader or stub file is required.

## Scenario index

No scenarios have been created yet. The prefix identifies both branches using the suffixes above.

| ID | Description | Branch prefix | Expected behavior | PR (optional) |
| --- | --- | --- | --- | --- |

## Planning

The setup uses the exact development dependency `jg-plans@0.6.1`. It requires Node.js 24.15.0 or newer. Use `npm ci` to install the main checkout's tooling and `./node_modules/.bin/jg-plans --version --json` to inspect the local CLI. This does not choose a runtime or package manager for mock projects.

Planning records live in the [local `jg-plans/` directory](jg-plans/). They remain unpublished unless explicitly selected for publication; this directory link is for workspace navigation and may be unavailable in a remote checkout. No planning workflow is required for an ordinary mock request unless requested.

For repository setup, inspect the documents and links, run `npm ls --depth=0`, verify the CLI version, and check `git diff --check` and `git status --short`. Inspect new files directly because ordinary diffs omit untracked files. Check a selected plan with `./node_modules/.bin/jg-plans check --directory <plan-directory> --json`. No build or automated tests are needed.
