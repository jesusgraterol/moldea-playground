# Release operations

Launch Room serves internal product delivery teams. Its catalog contains release owners, planned dates, changes, operational checks, dependencies, recorded evidence, rollout strategy, rollback approach, and monitoring ownership. Catalog facts come from versioned application data, not a live deployment or issue tracker.

The coordinator identifies the requested release before assessing it. Use stable catalog IDs rather than deriving an ID from a title. If a name could refer to several releases, ask the user to choose. select_release stores only the session's selected release ID; selecting another release replaces that focus. Every assessment still receives an explicit release ID.

assess_release captures one evidence packet, runs the change analyst, then runs the readiness reviewer with both the packet and accepted analysis. Specialists receive explicit packet data and do not inherit the coordinator's conversation or session state. They have no catalog-write or deployment tools. A failed or cancelled specialist or invalid structured result prevents saving a brief.

Generated briefs belong to the local application instance. They are JSON artifacts containing a rendered Markdown brief and structured evidence, findings, review, decision, and named next actions. list_briefs and read_brief retrieve these snapshots. Saving a brief neither approves a release nor performs a rollout. Only the release manager can sign off outside this application.
