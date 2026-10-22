# Gaze Cueing Task

Browser-native companion to canonical
`T000073-gaze-cueing-task`, implemented for the shared `psyflow-web` runner.

The port preserves the six validity-by-SOA conditions, six practice trials,
48 scored trials, nonpredictive gaze balance, H/SPACE letter mapping, all
phase timings, feedback, trigger meanings, and cueing-effect summaries.

The web runtime intentionally replaces the local serial trigger driver with
browser events. The checked-in SVG source and PNG runtime assets are identical
to the canonical task. The notify workflow expects
`TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web`
with Contents read/write permission.
