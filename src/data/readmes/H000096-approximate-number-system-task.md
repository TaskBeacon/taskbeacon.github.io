# Approximate Number System (Web)

Browser-native companion to `T000096-approximate-number-system-task`. The canonical Python task remains the source of truth. This repository preserves the two-block design, 10 practice and 40 test trials per block, four numerical ratios, color and visual-control balancing, deterministic non-overlapping dot arrays, 200 ms display, four-second total response window, F/J responses, practice-only feedback, and one-row-per-trial reduced data.

The shared `TaskBeacon/psyflow-web` runner loads this source-only task. No task-local app shell, dependency tree, build output, or direct `jsPsych` import is included.

## Alignment

- Blocks: two blocks of 50 trials, each beginning with 10 practice trials and continuing with 40 formal trials.
- Ratios: 1:2, 3:4, 5:6, and 7:8, with all formal ratio × more-color × visual-control cells balanced across the session.
- Visual controls: equal average dot size or equal total colored area, using the same diameter equations as the Python task.
- Display: spatially intermixed, deterministic, non-overlapping blue and yellow circles inside a seven-degree aperture.
- Timing: 500 ms fixation, 200 ms visible dot array, up to 3.8 additional seconds on a blank field, 500 ms practice feedback, and 500 ms ITI.
- Mapping: F means yellow is more numerous; J means blue is more numerous.
- Data: reduced output stores the ratio, counts, visual control, correct answer, response stage, response time, accuracy, timeout, and outcome for each logical trial.
- Browser-only differences are limited to the shared runner/export shell, browser rendering and event triggers, and a deterministic browser PRNG whose exact shuffle and spatial coordinates may differ while preserving all scientific constraints.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.
