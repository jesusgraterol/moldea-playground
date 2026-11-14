# Agent instructions

This repository contains Moldea mocks. Read [README.md](README.md) for the branch convention, scenario workflow, index, and session startup prompt, and [docs/delivery.md](docs/delivery.md) for delivery.

## Mock scope

- Build only enough to demonstrate the requested Moldea behavior. Choose the stack and artifacts for that scenario; explicit user requirements override repository defaults.
- Missing initialization, malformed configuration, incomplete artifacts, and other defects can be intentional. Preserve them unless the request specifically changes them.
- Use canned data and dummy values when sufficient. Do not add or run automated tests, CI, live API calls, secret infrastructure, or production hardening unless requested.
- Do not apply production conventions that defeat the mock. Do not invent Moldea's artifact contracts; establish the relevant contracts when the scenario requires them.

## Scenario handling

- Keep naming and workflow definitions in the README rather than maintaining another copy here. Keep mock projects out of `main`.
- Prefer a fresh workspace for each independent scenario. Inspect tracked, untracked, and ignored files before reusing a checkout; preserve existing files and use a fresh workspace if isolation is uncertain. Never automatically clean, delete, stash, or overwrite unrelated work.
- Include only files appropriate to the fixture. Shared instructions and tooling may be omitted or replaced when required; keep intent and expected behavior in the main index or PR description.
- Before creating scenarios, confirm canonical guidance is committed on local `main`. Report missing prerequisites rather than automatically committing unfinished setup.
- For fresh sessions on fixtures with absent or replaced guidance, use the README's startup prompt to read `main:AGENTS.md` and `main:README.md` through `git show`. Include the prompt in handoffs outside the fixture. If guidance is unavailable, report it instead of adding files to the mock.

## Checks and delivery

For documentation or setup changes, perform the checks relevant to the changed files and selected plan. Do not create fixtures or automated tests solely to verify repository guidance. Follow the delivery procedure and the current invocation's authorization for commits, pushes, or PRs.
