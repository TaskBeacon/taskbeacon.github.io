# Intentional Binding Task (Web)

| Field | Value |
|---|---|
| ID | H000085 |
| Canonical source | T000085-intentional-binding-task |
| Version | v0.1.0 |
| Runtime | psyflow-web / jsPsych |
| Language | Chinese |

## Overview

Browser-native port of the canonical four-condition Intentional Binding Task. Participants watch a 60-position Libet clock whose red hand rotates once every 2.5 seconds, make or observe an event, and click the clock position at which they perceived the judged action or tone.

## Conditions

| Condition | Action | Tone | Judged event |
|---|---:|---:|---|
| `baseline_action` | voluntary space press | no | action |
| `baseline_tone` | no | computer tone | tone |
| `operant_action` | voluntary space press | 200 ms later | action |
| `operant_tone` | voluntary space press | 200 ms later | tone |

Each condition contains 6 practice and 30 scored trials. Block order is deterministically shuffled per participant. The canonical 1.0 s warning, 0.5 s fixation, 0.5 s stationary clock, 6.0 s action ceiling, 0.2-2.0 s baseline-tone latency, 1000 Hz / 100 ms tone, 2.0 s post-critical-event clock interval, 15 s pointer report, and 0.5 s ITI are retained.

## Web implementation

- `main.ts` owns participant-seeded block order, practice/scored orchestration, and the final summary.
- `src/run_trial.ts` mirrors the canonical warning-to-ITI trial lifecycle and emits one reduced logical row.
- `src/utils.ts` owns condition decoding, deterministic nuisance sampling, the continuous animated SVG clock, circular errors, and summary metrics.
- `config/config.yaml` is synchronized from T000085; only web asset paths, font fallbacks, and the browser trigger driver differ.
- Pointer targets are 60 transparent circles aligned to the 0-59 clock positions.

## Measures

Each logical trial exports condition, block/practice status, action response and RT, tone/critical-event elapsed time, actual and reported clock position, shortest signed circular error, error in milliseconds, and validity. One clock unit equals 41.667 ms.

## Run and validation

Run through the shared `psyflow-web` application:

```powershell
cd ..\psyflow-web
npm run dev
```

Open `/?task=H000085-intentional-binding-task`.

Task-local typecheck:

```powershell
npx tsc --noEmit -p ..\H000085-intentional-binding-task\tsconfig.json
```

See `transfer_node.md` and `references/task_py2js_alignment.md` for the transfer audit.

