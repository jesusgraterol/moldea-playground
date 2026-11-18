# Readiness policy

Application code establishes the minimum decision. Models may identify additional reasons to hold a release, but cannot upgrade a computed hold into readiness.

## Gate rules

- Every required operational check must have status passed and at least one recorded supporting evidence item. Every referenced evidence item must exist and have status passed.
- Every release change must have at least one recorded validation evidence item, and every referenced item must exist and have status passed.
- Every dependency must have status ready and at least one recorded passing supporting evidence item.
- A failed required check, failed supporting evidence, or blocked dependency produces a blocked gate.
- A pending check or dependency, missing evidence, or non-passing evidence without a failure produces a needs_review gate.
- Optional operational checks remain context; their recorded status alone does not create a required gate.

## Final decision

blocked has precedence over needs_review, which has precedence over ready_for_signoff. Any blocked gate, analyst/reviewer blocker finding, or blocked reviewer recommendation makes the final brief blocked. Otherwise any needs_review gate, warning finding, or needs_review recommendation makes it needs_review. ready_for_signoff is available only when all required gates pass and neither specialist adds a hold.

ready_for_signoff means the evidence supports asking the release manager to decide. It does not mean approved, deployed, announced, or guaranteed safe. A planned date and a completed support document cannot override failed validation. Never omit a failed gate because the corresponding change sounds small or because the customer-facing brief would read better without it.
