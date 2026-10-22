# Semantic Priming Task (Web)

Browser companion to canonical `T000072-semantic-priming-task`. It preserves
the 200-ms prime-target SOA, 6 practice and 48 scored trials, A/B item
counterbalancing, F/J lexical-decision mapping, practice-only feedback, and
semantic-priming RT contrast. Browser events replace PsychoPy hardware
triggers. Deterministic browser shuffling may produce a different presentation
order while preserving the same item set and condition counts.

The notify workflow dispatches `html-task-updated`.
`TASKBEACON_ORG_DISPATCH_TOKEN` requires access to `TaskBeacon/psyflow-web`
with Contents read/write permission and may require TaskBeacon organization
approval.
