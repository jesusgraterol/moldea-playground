# moldea-playground

Mock projects for exploring Moldea initialization, SDK integrations, Navigator artifacts, and PR Assurance. Each scenario has its own base and candidate branches. Deliver correct, realistic projects; incomplete or incorrect conditions belong only to scenarios that explicitly request them.

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

**Both branches start at the same commit with identical contents.** Base is the completed project for the requested scenario, including missing or invalid initialization only when explicitly requested. Candidate starts as an unchanged copy of that baseline. The developer decides which changes to make to candidate while testing Cloud or PR Assurance; do not prepare feature changes, regressions, instruction drift, or other differences in advance. PR Assurance PRs go **from candidate into its matching base** after the developer introduces changes.

After delivery, keep base stable. Candidate remains identical until the developer changes it or explicitly asks for particular changes. Use a new scenario ID for a different baseline. Do not create an artificial difference merely to enable a PR comparison. Preserve scenario branches independently of `main`.

## Creating a scenario

1. Read the canonical guidance on `main`. Confirm `AGENTS.md` and this README are committed there before creating scenarios. If they are unavailable, report the prerequisite; do not automatically commit unfinished setup or switch away from it.
2. Check the index and local and remote branches for an unused ID and prefix. Stop on a collision; do not replace existing branches.
3. Prefer a fresh worktree or clone for each independent scenario, leaving the main checkout available for guidance and index updates. If reusing a checkout, first inspect tracked, untracked, and ignored files with `git status --short --untracked-files=all --ignored`. Ignored dependencies and generated output survive branch switches. If unrelated leftovers make isolation uncertain, use a fresh workspace. Preserve existing files; do not automatically clean, delete, stash, or overwrite them.
4. Start the scenario's base branch from `main`. Put the mock project at the repository root and use the stack, package manager, complexity, and artifacts requested for that scenario.
5. Prepare and commit the complete project on base, then create candidate at that exact commit. Verify the branch tips match and their content diff is empty. Do not add candidate-only changes unless the developer explicitly requests them.
6. Record the purpose, explicitly requested defects or omissions, and shared starting behavior in the index on `main`. Keep the index current when scenarios are created. Create a candidate-to-base PR only when requested after the developer has selected changes; keep mock projects out of `main`.
7. Use the project's local Moldea CLI to run `validate --json` and `inspect --json` before handoff. Confirm agent/runtime assignments and file/export coverage for every declared binding. Use `scope` on relevant implementation paths to confirm owner detection. Resolve unintended errors and report every remaining warning; never invent warning acceptance. Explicitly invalid scenarios must produce their expected diagnostics and retain their requested conditions.
8. Before handing off a completed scenario, release its branches from the construction worktree. When that checkout is clean, run `git switch --detach` there to retain the current commit and files while making the candidate available in the original checkout. Keep the scenario branches and worktree; report dirty or unrelated work rather than changing it. The original checkout stays on the user's selected branch.

Git permits a branch to be checked out in one worktree at a time. If the editor reports that a candidate is already checked out elsewhere, detach the clean construction checkout at its existing commit, then retry the branch switch in the original checkout.

### Fixture contents

Include only files appropriate to the requested scenario. Shared documentation, agent instructions, planning files, and tooling manifests can be replaced or omitted on scenario branches when they affect detection or conflict with the mock. A scenario does not need a metadata file or template. Missing Moldea initialization still retains Git history for comparisons.

Preserve explicitly requested invalid conditions; otherwise deliver a correct, coherent project. Fixture contents should look like normal applications: use realistic product names, ordinary SDK integrations, product documentation, and natural commit messages. Keep scenario labels, intentional-defect explanations, and PR Assurance expectations in descriptive branch names, the index on `main`, or PR descriptions. Do not name application files or components "mock", "dummy", or similar labels that disclose the exercise.

Realistic sample inputs are fine. Use the SDK's normal integration code rather than adding fake endpoints, dummy-key client configuration, or canned response transports to make the application offline. Creating a fixture does not require configuring credentials or executing its API calls. Tests, CI, live API calls, secret infrastructure, and production hardening are unnecessary unless explicitly requested. For an all-artifacts scenario, establish Moldea's actual artifact contracts when creating it rather than assuming a fixed list here.

Canonical agent instructions must feed the actual SDK invocation. Load the instruction file at runtime and declare its real instruction-loader binding; do not maintain a parallel hard-coded prompt. Trace the loaded text into the SDK's instruction field as well as checking binding discovery. Moldea CLI validation and inspection are required structural checks, independent of the policy against adding application test suites. Initialized SDK projects declare the CLI as a local development dependency; negative initialization cases may use a non-persisted project-local installation to preserve their tracked starting state.

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
| `001` | Missing Moldea initialization in a minimal Node.js project | `test/001-init-missing` | Identical branches with initialization intentionally absent. | — |
| `002` | Invalid Moldea initialization in a minimal Node.js project | `test/002-init-invalid` | Identical branches with foundation files present and the manifest version deliberately using the wrong type. | — |
| `003` | Release Brief: release-note summaries powered by the OpenAI SDK | `test/003-sdk-openai-simple` | Identical branches with the runtime prompt aligned to the saved one-sentence rule. | — |

### 001: Missing initialization

Both branches print `Hello, world!` and point to the same commit. They contain only the package manifest, source, license, and ignore rules: no Moldea initialization, shared guidance, planning files, or external dependencies.

CLI `13.0.4` validation confirms the intended `MOLDEA_MANIFEST_MISSING` and `MOLDEA_PROJECT_FILE_MISSING` errors.

Run either branch with `npm start`. No dependency installation is needed. The developer chooses later changes to `test/001-init-missing/candidate` and compares them against `test/001-init-missing/base`. Use the startup prompt above for fresh sessions on these stripped fixtures.

### 002: Invalid initialization

Both branches contain `moldea/moldea.yaml` and a non-empty `moldea/project.md`. The manifest deliberately declares `version: "1"` as a string. Repository Format v1 requires the integer `version: 1`, so the intended condition is present foundation files with invalid canonical configuration. Preserve that field type when working on this scenario.

CLI `13.0.4` validation confirms the intended `MOLDEA_MANIFEST_VERSION_INVALID` error.

Both branches print `Hello, world!`, point to the same commit, and contain the same invalid manifest and project foundation. Run either branch with `npm start`; no dependency installation is needed.

The intended comparison is `test/002-init-invalid/candidate` into `test/002-init-invalid/base`. Shared guidance and planning tooling are omitted from these fixtures. Use the startup prompt above for fresh sessions.

### 003: Release Brief

Release Brief is a Node.js CLI using `openai@7.57.0` and the Responses API. Its Moldea foundation registers `note-summarizer` with runtime `openai`, binds `summarizeNote` in `/src/summary-agent.js` as its execution boundary, and binds `loadInstruction` in `/src/instructions.js` as its instruction loader.

Both branches request exactly one concise plain-text sentence, matching the canonical agent instruction and project foundation. They point to the same commit and contain no prepared instruction-code drift. The developer chooses candidate changes during Cloud and PR Assurance testing.

Each invocation reads `/moldea/agents/note-summarizer/instruction.md` and passes its complete text into the Responses API's `instructions` field. The canonical instruction includes its required agent identity. CLI `13.0.4` with Core `9.2.1` reports zero errors, detects one `openai` agent, and passes both file and export checks for both bindings. `scope` maps each implementation path to `note-summarizer`.

Use Node.js 22.17 or newer and `npm ci`. The application's README documents `npm start -- "Release note"`, the SDK's standard environment configuration, and `npm run moldea:validate` / `npm run moldea:inspect`. The CLI is pinned as a local development dependency. It contains ordinary SDK code, with no fake transport, canned response implementation, or provisioned credentials. No API calls or application test suites were run during creation; the instruction loader was invoked locally and its returned text inspected.

All three scenarios currently report the unaccepted `MOLDEA_INTEGRATION_BLOCK_MISSING` warning because the managed AGENTS.md coding-agent skill integration is not installed. This warning remains visible; the SDK project's canonical structure is valid, and the first two scenarios retain only their intended structural errors.

The intended comparison is `test/003-sdk-openai-simple/candidate` into `test/003-sdk-openai-simple/base`. Use the startup prompt above for fresh sessions; shared playground instructions and planning tooling are omitted from the application branches.

## Planning

The setup uses the exact development dependency `jg-plans@0.6.1`. It requires Node.js 24.15.0 or newer. Use `npm ci` to install the main checkout's tooling and `./node_modules/.bin/jg-plans --version --json` to inspect the local CLI. This does not choose a runtime or package manager for mock projects.

Planning records live in the [local `jg-plans/` directory](jg-plans/). They remain unpublished unless explicitly selected for publication; this directory link is for workspace navigation and may be unavailable in a remote checkout. No planning workflow is required for an ordinary mock request unless requested.

For repository setup, inspect the documents and links, run `npm ls --depth=0`, verify the CLI version, and check `git diff --check` and `git status --short`. Inspect new files directly because ordinary diffs omit untracked files. Check a selected plan with `./node_modules/.bin/jg-plans check --directory <plan-directory> --json`. No build or automated tests are needed.
