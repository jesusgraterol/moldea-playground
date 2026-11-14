# Agent instructions

This repository contains Moldea mocks. Read [README.md](README.md) for the branch convention, scenario workflow, index, and session startup prompt, and [docs/delivery.md](docs/delivery.md) for delivery.

## Mock scope

- Deliver a correct, realistic project for the requested Moldea scenario. Choose its stack and artifacts from the request; explicit user requirements override repository defaults.
- Make fixture-facing product names, files, documentation, and commit messages look like a normal application. Keep scenario labels and intentional-defect explanations in branch names, the main index, or PR descriptions. Do not label application components "mock", "dummy", or similar terms that could influence PR Assurance.
- Missing initialization, malformed configuration, incomplete artifacts, and other defects belong only to scenarios that explicitly request them. Preserve those requested conditions on both branches; do not invent additional defects or instruction drift.
- Use ordinary SDK integration code and realistic sample inputs. Do not add fake endpoints, dummy-key client setup, or canned response transports merely to avoid configuring credentials. Credentials do not need to be provisioned and API calls do not need to be executed while creating the fixture.
- Do not add or run automated tests, CI, live API calls, secret infrastructure, or production hardening unless requested.
- Do not apply production conventions that defeat the mock. Do not invent Moldea's artifact contracts; establish the relevant contracts when the scenario requires them.

## Scenario handling

- Keep naming and workflow definitions in the README rather than maintaining another copy here. Keep mock projects out of `main`.
- Deliver base and candidate at the exact same commit with identical contents. The developer decides later candidate changes for Cloud and PR Assurance. Do not prepare feature changes, regressions, or alignment issues unless explicitly requested. Verify matching tips and an empty branch diff before handoff.
- Prefer a fresh workspace for each independent scenario. Inspect tracked, untracked, and ignored files before reusing a checkout; preserve existing files and use a fresh workspace if isolation is uncertain. Never automatically clean, delete, stash, or overwrite unrelated work.
- Before handing off a completed scenario, detach its clean construction worktree at the current commit so its branches can be selected in the original checkout. Preserve the worktree, files, and scenario branches, and leave the user's original checkout on their selected branch. Report dirty or unrelated work instead of altering it.
- Include only files appropriate to the fixture. Shared instructions and tooling may be omitted or replaced when required; keep intent and expected behavior in the main index or PR description.
- Before creating scenarios, confirm canonical guidance is committed on local `main`. Report missing prerequisites rather than automatically committing unfinished setup.
- For fresh sessions on fixtures with absent or replaced guidance, use the README's startup prompt to read `main:AGENTS.md` and `main:README.md` through `git show`. Include the prompt in handoffs outside the fixture. If guidance is unavailable, report it instead of adding files to the mock.

## Checks and delivery

For documentation or setup changes, perform the checks relevant to the changed files and selected plan. Do not create fixtures or automated tests solely to verify repository guidance. Follow the delivery procedure and the current invocation's authorization for commits, pushes, or PRs.
