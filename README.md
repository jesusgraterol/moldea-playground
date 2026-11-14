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

Naming examples; the scenario index below records which scenarios exist:

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

Preserve deliberate mistakes. Fixture contents should look like normal applications: use realistic product names, ordinary SDK integrations, product documentation, and natural commit messages. Keep scenario labels, intentional-defect explanations, and PR Assurance expectations in descriptive branch names, the index on `main`, or PR descriptions. Do not name application files or components "mock", "dummy", or similar labels that disclose the exercise.

Realistic sample inputs are fine. Use the SDK's normal integration code rather than adding fake endpoints, dummy-key client configuration, or canned response transports to make the application offline. Creating a fixture does not require configuring credentials or executing its API calls. Tests, CI, live API calls, secret infrastructure, and production hardening are unnecessary unless explicitly requested. For an all-artifacts scenario, establish Moldea's actual artifact contracts when creating it rather than assuming a fixed list here.

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

The prefix identifies both branches using the suffixes above.

| ID | Description | Branch prefix | Expected behavior | PR (optional) |
| --- | --- | --- | --- | --- |
| `001` | Missing Moldea initialization in a minimal Node.js project | `test/001-init-missing` | Both branches remain uninitialized; candidate adds an optional `--name` greeting. | — |
| `002` | Invalid Moldea initialization in a minimal Node.js project | `test/002-init-invalid` | Foundation files exist, but the manifest version has the wrong type on both branches; candidate adds an optional `--name` greeting. | — |
| `003` | Release Brief: release-note summaries powered by the OpenAI SDK | `test/003-sdk-openai-simple` | Base follows the saved one-sentence rule; candidate requests three bullet points without updating canonical instructions. | — |

### 001: Missing initialization

Base prints `Hello, world!`. Candidate preserves that default and adds a `--name` option. Both contain only the package manifest, source, license, and ignore rules: no Moldea initialization, shared guidance, planning files, or external dependencies.

Run either branch with `npm start`; candidate also supports `npm start -- --name Moldea`. No dependency installation is needed. The intended comparison is `test/001-init-missing/candidate` into `test/001-init-missing/base`, with initialization missing on both sides. Use the startup prompt above for fresh sessions on these stripped fixtures.

### 002: Invalid initialization

Both branches contain `moldea/moldea.yaml` and a non-empty `moldea/project.md`. The manifest deliberately declares `version: "1"` as a string. Repository Format v1 requires the integer `version: 1`, so the intended condition is present foundation files with invalid canonical configuration. Preserve that field type when working on this scenario.

Base prints `Hello, world!`; candidate adds the same optional `--name` greeting as scenario `001`. Only `src/index.js` changes between base and candidate, leaving the invalid manifest and project foundation intact. Run either branch with `npm start`, or use `npm start -- --name Moldea` on candidate; no dependency installation is needed.

The intended comparison is `test/002-init-invalid/candidate` into `test/002-init-invalid/base`. Shared guidance and planning tooling are omitted from these fixtures. Use the startup prompt above for fresh sessions.

### 003: Release Brief

Release Brief is a Node.js CLI using `openai@7.57.0` and the Responses API. Its Moldea foundation registers `note-summarizer` with runtime `openai` and binds `summarizeNote` in `/src/summary-agent.js` as its execution boundary.

Base requests exactly one concise plain-text sentence, matching the canonical agent instruction. Candidate changes only the runtime prompt to request three Markdown bullet points; the saved instruction and project foundation retain the one-sentence rule. This intentional instruction-code drift is the PR Assurance focus and is documented only here, outside the application branches.

Use Node.js 22 or newer and `npm ci`. The application's README documents `npm start -- "Release note"` and the SDK's standard environment configuration. It contains ordinary SDK code, with no fake transport, canned response implementation, or provisioned credentials. No API calls or automated tests were run during creation.

The intended comparison is `test/003-sdk-openai-simple/candidate` into `test/003-sdk-openai-simple/base`. Use the startup prompt above for fresh sessions; shared playground instructions and planning tooling are omitted from the application branches.

## Planning

The setup uses the exact development dependency `jg-plans@0.6.1`. It requires Node.js 24.15.0 or newer. Use `npm ci` to install the main checkout's tooling and `./node_modules/.bin/jg-plans --version --json` to inspect the local CLI. This does not choose a runtime or package manager for mock projects.

Planning records live in the [local `jg-plans/` directory](jg-plans/). They remain unpublished unless explicitly selected for publication; this directory link is for workspace navigation and may be unavailable in a remote checkout. No planning workflow is required for an ordinary mock request unless requested.

For repository setup, inspect the documents and links, run `npm ls --depth=0`, verify the CLI version, and check `git diff --check` and `git status --short`. Inspect new files directly because ordinary diffs omit untracked files. Check a selected plan with `./node_modules/.bin/jg-plans check --directory <plan-directory> --json`. No build or automated tests are needed.
