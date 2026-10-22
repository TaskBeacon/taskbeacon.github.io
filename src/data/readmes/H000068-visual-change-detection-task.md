# Visual Change Detection Task (Web)

Browser-native companion to `T000068-visual-change-detection-task`, delivered by the shared `psyflow-web` runner.

## Alignment

- Exact: set sizes 2/4/6/8, balanced same/change cells, 500-ms fixation, 100-ms sample, 900-ms retention, 2000-ms response window, F/J mapping, one-color-change construction, outcomes, and Cowan K.
- Web-specific: browser event triggers replace serial hardware triggers; the shared runner owns fullscreen, keyboard handling, and data download.
- Trial count: no preview reduction in the repository config; 8 practice and 160 scored trials match the canonical task.

## Data

Reduced output contains one logical trial per row, including the sampled colors and positions, changed index, response, correctness, outcome, and phase-level fields.

## Shared Runner Refresh

`.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` after pushes to `main`. The `TASKBEACON_ORG_DISPATCH_TOKEN` fine-grained PAT must have access to `TaskBeacon/psyflow-web` with `Contents: Read and write`; TaskBeacon organization approval may also be required.
