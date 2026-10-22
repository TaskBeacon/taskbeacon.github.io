# Two-Step Sequential Decision Task

Browser-native companion to canonical
`T000075-two-step-sequential-decision-task`, implemented for the shared
`psyflow-web` runner.

The port preserves 50 practice trials with distinct symbols, three scored
blocks of 67, two timed F/J choices, participant-parity transition
counterbalancing, 70/30 common/rare transitions, four independent drifting
reward probabilities, reflecting 0.25-0.75 bounds, coin/zero outcomes,
timeout semantics, and previous-trial stay-analysis fields. The generated SVG
and PNG task assets are copied directly from the canonical local task.

The web runtime intentionally replaces the local serial trigger driver with
browser events. The notify workflow expects
`TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web`
with Contents read/write permission.
