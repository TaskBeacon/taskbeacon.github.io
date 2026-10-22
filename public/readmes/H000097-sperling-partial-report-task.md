# Sperling Partial Report Task (Web)

Browser-native companion to canonical `T000097-sperling-partial-report-task`. It preserves the 3 × 4 letter matrix, 50 ms exposure, whole report, row-cued partial report, 0/150/300/500/1000 ms cue delays, high/middle/low row tones, positional scoring, and estimated-letters-available outcome.

The shared `TaskBeacon/psyflow-web` runner loads this source-only task. This repository intentionally contains no task-local application shell, dependencies, generated bundle, or direct `jsPsych` import.

## Scientific alignment

- Two blocks of 36 trials; 72 trials total.
- Whole report has weight 3; each of the 15 delay × row partial-report cells has weight 1.
- Each trial samples 12 nonrepeating letters deterministically from A–Z.
- Whole report accepts 12 ordered letters for at most 8 seconds.
- Partial report accepts 4 ordered letters for at most 4 seconds after a high (top), middle (middle), or low (bottom) 500 ms tone.
- Accuracy is positional; partial-report accuracy is multiplied by 12 to estimate letters available.

## Intentional web-only differences

- Serial trigger transport becomes `browser_event`.
- The shared runner owns registration, fullscreen/operator controls, result display, and downloads.
- Browser fonts use CJK- and monospace-safe fallback stacks.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN` with `TaskBeacon/psyflow-web` access and **Contents: Read and write**.
