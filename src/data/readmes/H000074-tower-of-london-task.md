# Tower of London Task

Browser-native companion to canonical
`T000074-tower-of-london-task`, implemented for the shared `psyflow-web`
runner.

The port preserves the mental minimum-move judgment variant, four practice
problems, 24 scored problems, 2/3/4/5-move conditions, goal-only preview,
self-paced planning response, move-count choice, practice-only feedback,
timings, trigger meanings, outcome fields, and summary metrics. The problem
CSV and SVG/PNG boards are copied directly from the canonical local task.

The web runtime intentionally replaces the local serial trigger driver with
browser events. The notify workflow expects
`TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web`
with Contents read/write permission.

