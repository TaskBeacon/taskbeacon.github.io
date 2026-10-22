# Implicit Association Test (Web)

Browser-native companion to `T000095-implicit-association-test`. The canonical Python task remains the source of truth. This repository preserves the seven-block flower–insect valence IAT, exact five-word category pools, independent participant-stable side counterbalancing, strict target/attribute alternation in combined blocks, E/I responses, red-X error correction, 250 ms ITI, and D-score-ready reduced data.

The shared `TaskBeacon/psyflow-web` runner loads this source-only task. No task-local app shell, dependencies, build output, or direct `jsPsych` import is included.

## Alignment

- Blocks: 20, 20, 20, 40, 30, 20, and 40 trials (190 total).
- Categories: FLOWER/INSECT and PLEASANT/UNPLEASANT using the canonical English exemplars.
- Mapping: E selects the left label or category pair; I selects the right.
- Combined blocks: target and attribute trials strictly alternate; no schedule exceeds four same-key-correct trials.
- Error rule: a wrong first response retains the stimulus, adds a red X, and waits for the correct key within the original 10-second bound; latency includes correction time.
- Browser-only differences are limited to the shared runner/export shell, browser rendering, browser event triggers, and a browser-safe deterministic PRNG whose exact shuffle may differ while preserving all scientific constraints.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.
