# Wason Selection Task (Web)

Browser-native companion to `T000098-wason-selection-task`. The Python task is canonical. This repository preserves four visible cards in fixed logical roles (`P`, `not_P`, `Q`, `not_Q`), abstract and social-contract rules, iterative unordered card selection, no trial feedback, and the normative `P + not_Q` solution.

The shared `TaskBeacon/psyflow-web` runner loads this source-only task. No task-local app shell, dependencies, build output, or direct `jsPsych` import is included.

## Alignment

- Identity: `H000098` pairs with canonical `T000098` and keeps slug `wason-selection-task`.
- Structure: one eight-trial block; each of four rule conditions appears twice.
- Procedure: instruction -> 500 ms fixation -> four-card selection -> 500 ms blank interval -> completion.
- Response: number keys 1–4 add cards to an unordered set; Return submits; duplicate attempts are retained in audit data but not duplicated in the selected set.
- Timing: each selection action has the canonical 30-second ceiling and at most five action stages.
- Feedback: no correctness or answer feedback is shown.
- Scoring: exact `P + not_Q` is normative; matching `P + Q`, `P` only, no-card, and other sets are classified separately.
- Data: reduced output contains eight logical rows with selections, card roles, decision history, timing, timeout, and classification.

## Intentional browser differences

- Registration, fullscreen request, force quit, and downloads belong to the shared runner.
- Card centers use ±390/±130 px rather than the canonical ±450/±150 px so all four unchanged 230 px cards fit the shared runner's narrower experiment canvas at 1280 × 720.
- Browser Enter is normalized to canonical `return`.
- Hardware trigger delivery is absent; trigger codes remain in compiled stage metadata for audit.

## Run URL

`https://taskbeacon.github.io/psyflow-web/?task=H000098-wason-selection-task`

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends `html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN` with write access to `TaskBeacon/psyflow-web` contents.
