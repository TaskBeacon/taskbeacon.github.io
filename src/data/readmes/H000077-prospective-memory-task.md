# Prospective Memory Task

Browser-native companion to canonical `T000077-prospective-memory-task`, implemented for the shared `psyflow-web` runner.

The port preserves the practice phase, 105-trial baseline block, focal and nonfocal prospective-memory blocks, participant-parity counterbalancing, 2-minute embedded-figures delay, target positions 25/50/75/100, and the two-step target action (`/`, then `SPACE`). Ongoing lexical decisions use `F = nonword` and `J = word`.

The focal target is `PACKET`. The nonfocal targets are `DOCTOR`, `FACTOR`, `PASTOR`, and `TRACTOR`. All lexical strings, filler sampling, word/nonword balance, fixed-seed ordering, response windows, scoring fields, and summary metrics match the canonical Python task. The serial trigger driver is replaced by browser events.

## Task sequence

1. Instructions and 10 baseline practice trials
2. 105-trial baseline lexical-decision block
3. Focal and nonfocal blocks in participant-parity order
4. Before each prospective-memory block: intention instruction and 120-second embedded-figures delay
5. Final lexical-decision and prospective-memory summary

## Data contract

Each logical lexical-decision trial produces one reduced row. Core fields include `stimulus`, `lexicality`, `block_type`, `pm_target`, `cue_type`, `lexical_response_key`, `lexical_rt`, `ongoing_correct`, `waiting_response_key`, `waiting_rt`, `pm_required`, `pm_hit`, `pm_miss`, `pm_false_alarm`, and `outcome`.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web` with **Contents: Read and write** permission. TaskBeacon organization approval may also be required.
