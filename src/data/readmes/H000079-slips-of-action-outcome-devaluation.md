# Slips-of-Action / Outcome Devaluation Task

Browser-native companion to canonical
`T000079-slips-of-action-outcome-devaluation`, implemented for the shared
`psyflow-web` runner.

The port preserves six counterbalanced fruit-box stimulus-response-outcome
mappings, six 12-trial training blocks, speed-based 1–5 point feedback, the
12-trial outcome-devaluation test, counterbalanced slips/baseline order, six
24-trial blocks per rapid phase, two devalued identities per block, fixed
one-second rapid response windows, and valued-go/devalued-withhold scoring.
The 12 task fruit assets are copied directly from the canonical local task.

The web runtime intentionally replaces the local serial trigger driver with
browser events. Fullscreen, participant registration, force quit, and result
downloads are provided by the shared runner.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to
`TaskBeacon/psyflow-web` with **Contents: Read and write** permission.
