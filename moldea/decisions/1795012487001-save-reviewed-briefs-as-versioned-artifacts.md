---
status: accepted
createdAt: '2026-11-18T14:34:47.001Z'
---
# Save reviewed briefs as versioned local artifacts

Keep source release facts in the versioned catalog and generated assessments in the local application's var/briefs directory. Capture evidence once per assessment so both specialists review the same snapshot.

Save only after both specialist turns complete and their outputs validate. Include the structured findings and review, enforced decision, snapshot timestamp, and rendered Markdown in one JSON artifact. Derive the artifact ID from release ID and workflow call ID so a repeated persistence step returns the same saved brief.

A new assessment creates a new brief rather than editing an older one. The application can list and read saved briefs but has no mutation or publication tool. This store is appropriate to the local application workflow; a hosted shared-store deployment is a separate implementation choice.
