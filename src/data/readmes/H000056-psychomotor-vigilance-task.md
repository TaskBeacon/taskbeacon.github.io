# Psychomotor Vigilance Task (Web)

Browser companion for canonical task `T000056-psychomotor-vigilance-task`.

The web task preserves the unpredictable 2-10 second wait, red five-digit millisecond counter, Space response, 65 second timeout, 500 ms RT feedback, and the same false-start/lapse/no-response classifications. It uses 12 events as a shorter browser preview; the canonical Python task uses 90.

## Structure

- `main.ts`: explicit task orchestration and standard BlockUnit scheduling.
- `config/config.yaml`: participant-facing text, timing, keys, triggers, and dynamic counter declaration.
- `src/run_trial.ts`: thin ISI, target, feedback state machine and reduced outcome fields.
- `src/utils.ts`: PVT completion summary only.

## Shared Runner

Run through `psyflow-web` with task id `H000056-psychomotor-vigilance-task`. The task repository contains no app shell, bundled dependencies, or direct jsPsych imports.

## Dispatch Workflow

`.github/workflows/notify-psyflow-web.yml` notifies the shared runner after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained PAT must include `TaskBeacon/psyflow-web` with `Contents: Read and write`, and organization approval may also be required.

