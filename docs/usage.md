# Using Launch Room

Run commands from the repository root with Node.js 24.15 or newer.

## Start the application

```sh
npm ci
npm run dev
```

Eve starts its local server and interactive conversation. Use its normal model login/provider configuration; the authored agents select `openai/gpt-5.4-mini` through AI Gateway. Normal gateway access can use `AI_GATEWAY_API_KEY`; Eve's `/login` also manages supported local provider connections. The project does not provision credentials.

`npm run dev:app` starts development with Eve's bundled self-modification extensions disabled, keeping the application conversation focused on release operations. `npm run build` builds the local server, and `npm start` serves that output. `npm run typecheck` checks the TypeScript source. `npm run inspect` shows Eve's discovered agents, instructions, tools, skills, and channels without starting a conversation.

## Release workflow

| Request | Application behavior |
| --- | --- |
| “Which releases are planned?” | Lists catalog releases and their owners. |
| “Select Atlas 2.8. What is still open?” | Retains the release ID and explains its captured gates and evidence. |
| “Prepare a readiness brief for Atlas 2.8.” | Runs analyst and reviewer, enforces gates, saves a versioned brief, and returns its recorded decision. |
| “Show the latest brief for that release.” | Lists saved snapshots and reads the selected artifact. |
| “Refresh the assessment.” | Creates a new assessment and brief rather than rewriting the previous snapshot. |

The catalog contains `atlas-2-8` (shared dashboards), `atlas-2-7-3` (export reliability), and `meridian-1-6` (notification preferences). Recorded evidence includes passed, pending, and failed work. Those are release facts for the application to assess; the code always applies the same readiness policy.

The final decision is one of `blocked`, `needs_review`, or `ready_for_signoff`. Even `ready_for_signoff` requires the release manager to decide outside the application. No tool deploys a release or publishes the customer-facing copy.

## HTTP sessions

The default Eve channel exposes the same conversation under `/eve/v1` on the local address printed by the server. To start a session and send the first message:

```http
POST /eve/v1/session
Content-Type: application/json

{"message":"Prepare a readiness brief for atlas-2-8."}
```

Use the returned `sessionId` to consume `GET /eve/v1/session/:sessionId/stream` as newline-delimited JSON. Send subsequent messages to `POST /eve/v1/session/:sessionId`. Authentication and session-control fields follow Eve's installed channel contract; the application adds no alternate HTTP protocol.

`GET /eve/v1/health` reports server reachability. It does not assess a release or invoke a model. Eve's conversation routes and operator-only `/eve/v1/info` retain the framework's normal access policy.

## Saved briefs

Briefs are generated under `var/briefs/<id>.json`. Each contains the source snapshot timestamp, enforced decision, computed gates, analyst findings, reviewer risks and next actions, and a rendered Markdown brief. Use `list_briefs` and `read_brief` through the conversation to retrieve them.

Generated runtime data and briefs are ignored by Git. They stay with the local application instance. The source catalog is versioned. Existing briefs remain snapshots when source data changes.

## Project context

Start at [the project overview](../moldea/project.md). The [readiness policy](../moldea/context/readiness-policy.md) owns the decision contract, and the [evidence policy](../moldea/context/evidence-policy.md) owns the interpretation of captured records. Use `npm run moldea:validate` and `npm run moldea:inspect` for canonical structure and implementation relationships.
