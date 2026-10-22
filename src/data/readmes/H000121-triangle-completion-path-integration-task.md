# Triangle Completion / Path Integration Task — Web

| Field | Value |
|---|---|
| Task ID | `H000121` |
| Canonical local task | `T000121-triangle-completion-path-integration-task` |
| Variant | HTML / browser |
| Version | `v0.1.0` |
| Language | Chinese |
| Runtime | `psyflow-web` |
| Primary source | Kessler et al., Nature Communications (2024) |

This source-only web companion preserves the canonical task's four cue conditions, participant-seeded 40-trial plan, three-goal outbound sequence, 20-second hidden interval, endpoint-grid response, ±15° landmark conflicts, neutral selection acknowledgement, and endpoint/heading analyses.

The browser version intentionally replaces room-scale/HMD walking with top-down pointer navigation, matching the canonical desktop adaptation. It does not claim vestibular equivalence to physical walking.

## Structure

- `main.ts`: explicit instruction, block, trial, summary, and trigger orchestration.
- `config/config.yaml`: participant-visible text, source-mapped geometry, timings, conditions, and stimuli.
- `src/run_trial.ts`: thin phase-by-phase `TrialBuilder` orchestration.
- `src/utils.ts`: deterministic plan generation, coordinate transforms, landmark rotation, endpoint grid, and analysis helpers.
- `references/transfer_notes.md`: local/web alignment record.

## Shared runner

This task is loaded by `TaskBeacon/psyflow-web`; it intentionally contains no app shell, build output, or per-task dependency bundle.

Pushes to `main` run `.github/workflows/notify-psyflow-web.yml`, which sends the `html-task-updated` repository dispatch. The repository secret `TASKBEACON_ORG_DISPATCH_TOKEN` must be able to access `TaskBeacon/psyflow-web`; a fine-grained PAT requires `Contents: Read and write`, and may require TaskBeacon organization approval.

