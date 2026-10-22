# Muller-Lyer Illusion Task (Web)

Browser-native companion to `T000108-muller-lyer-illusion-task`, which remains the canonical source. Participants adjust the right outward-fin shaft with the Left and Right arrow keys until it appears equal to the fixed left inward-fin reference, then press Space to confirm.

## Alignment

- One randomized block contains 20 trials: 10 `start_short` and 10 `start_long`.
- Every trial preserves fixation (500 ms), bidirectional adjustment (15 s total maximum), and blank ITI (500 ms).
- Reference length (8.0 deg), comparison bounds (4.0-12.0 deg), 0.10-deg steps, fin length (2.0 deg), and fin angle (30 deg) match the Python task.
- No response is correct or incorrect and no trial feedback is displayed.
- Reduced data remain one logical row per trial and preserve starting length, confirmed length, adjustment time/count, timeout state, PSE-compatible values, and illusion magnitude.

## Browser realization

The two figures are rendered from browser-native vector rectangles. The 4-px PsychoPy line setting is represented by a 0.10-deg browser line thickness so the geometry remains visible across device pixel densities. Fullscreen, cursor handling, force quit, export, and browser event delivery are owned by the shared `psyflow-web` runner.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.

