# Goal Commitment / Fishing-Net Task — Web

Browser-native companion to the canonical [`T000110-goal-commitment-fishing-net-task`](https://github.com/TaskBeacon/T000110-goal-commitment-fishing-net-task), implemented through the shared `psyflow-web` runner.

## Alignment

The H task preserves the canonical 100-trial decision-only behavioral baseline:

- three dynamically changing crab, octopus, and fish offers;
- 2,000 ms offer preview, 1/2/3 free choice with a 30 s safety cap, and 2,400 ms net update;
- randomized top/middle/bottom offer positions;
- persistence retains accumulated progress;
- switching goods abandons old progress before applying the new offer;
- negative offers floor progress at zero;
- completing the target net awards one point and begins a new net;
- one reduced output row per logical decision with canonical outcome fields.

The browser version intentionally replaces PsychoPy window/keyboard and physical trigger drivers with shared `psyflow-web` display, input, export, fullscreen, and force-quit facilities. No task-semantic timing, scoring, or controller rule is shortened for preview.

## Source Layout

- `main.ts`: config loading, participant setup, lazy cross-trial planning, instructions, and task mounting.
- `config/config.yaml`: participant text, stimuli, timings, keys, controller parameters, and logical trigger codes.
- `src/run_trial.ts`: thin new-net → offer-preview → choice → net-update orchestration.
- `src/controller.ts`: seeded offer random walks/jumps and choice-dependent fishing-net state.
- `src/utils.ts`: participant-visible dynamic seafood/bar stimuli.

Run through the shared runner at `https://taskbeacon.github.io/psyflow-web/?task=H000110-goal-commitment-fishing-net-task` after publication.

## Shared Runner Refresh

`.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained PAT must have access to `TaskBeacon/psyflow-web` with **Contents: Read and write**. TaskBeacon organization approval may also be required when PAT approval is enforced.

## Evidence

Protocol source: Holton et al. (2024), “Goal commitment is supported by vmPFC through selective attention,” *Nature Human Behaviour*, https://doi.org/10.1038/s41562-024-01844-5.

