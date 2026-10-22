# Prisoner’s Dilemma (Web)

Browser-native companion to `T000094-prisoners-dilemma`. The canonical Python task remains the source of truth; this repository preserves its Chinese instructions, two practice rounds, 30 scored rounds, timings, F/J response mapping, timeout-as-defection rule, seeded reciprocal computer-partner policy, payoff matrix, scoring, and reduced-data meaning.

The shared `TaskBeacon/psyflow-web` runner loads this source-only task. No task-local app shell, dependencies, build output, or `jsPsych` import is included.

## Alignment

- Stage order: round cue → decision → choice reveal → partner wait → outcome → inter-round fixation.
- Partner policy: after participant cooperation, cooperate with probability 0.67; after participant defection, defect with probability 0.90.
- Payoffs: CC = 2/2, CD = 0/3, DC = 3/0, DD = 1/1.
- Timing: 2 s cue, 4 s response window, 1 s reveal, discrete 2/4/6 s partner wait, 4 s outcome, discrete 2/4/6 s fixation.
- Browser-only differences are limited to the shared runner, browser rendering, export shell, fullscreen/cursor behavior, and unavailable hardware trigger transmission.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects the `TASKBEACON_ORG_DISPATCH_TOKEN` secret. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.
