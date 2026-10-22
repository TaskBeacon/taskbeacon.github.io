# Judgment of Learning (Web)

Browser-native companion to `T000102-judgment-of-learning`, which remains the canonical source. This source-only repository preserves the paired-associate materials, two 30-pair study blocks, balanced immediate and delayed cue-only judgments, six-point 0-100% response scale, 10-minute parity retention interval, typed final cued recall, first-three-letter scoring, calibration, Brier, and Goodman-Kruskal gamma semantics.

The shared `TaskBeacon/psyflow-web` runner loads this task. No task-local app shell, dependencies, build output, or direct `jsPsych` import is included.

## Alignment

- Materials: the exact 6 practice and 60 scored unrelated English noun pairs from T000102.
- Schedule: two 30-pair blocks, 15 immediate and 15 delayed JOL items per block, with no timing run longer than three.
- Delayed judgments: grouped after intervening study/JOL activity, preserving the canonical randomized-thirds policy.
- JOL: cue only, keys 1-6 map to 0%, 20%, 40%, 60%, 80%, and 100%, with an 8-second maximum.
- Retention interval: 120 parity trials at 5 seconds each (F odd, J even), totaling 10 minutes.
- Recall: typed response plus Enter, 12-second maximum, scored by the first three normalized English letters.
- Data: the separated study/JOL/recall presentations reuse a pair ID in the shared recorder, so reduced export contains exactly one logical row per scored pair.
- Analysis: item calibration error, Brier component, condition recall/calibration summaries, and Goodman-Kruskal gamma use the same meanings as the Python task.

## Intentional web-only differences

- Serial trigger transport is replaced by browser events.
- Registration, fullscreen/operator controls, and export are provided by the shared runner.
- CJK fallback fonts and browser-native editable text input replace PsychoPy widgets.
- The browser uses `psyflow-web`'s Python-compatible deterministic random helper; scientific balance and spacing constraints are preserved even if a future runtime changes exact draw order.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends `event_type: html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.

