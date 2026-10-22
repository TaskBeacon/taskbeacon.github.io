# Random-Dot Motion + Confidence Task

Browser-native companion to canonical `T000076-random-dot-motion-confidence-task`, implemented for the shared `psyflow-web` runner.

The port preserves the eight direction × coherence × confidence-orientation conditions, two-block structure, 500-ms fixation, 1.2-s `F`/`J` motion decision, remaining-motion plus 1.5-4.0-s blank, 3-s nine-point confidence response, orientation-dependent canonical confidence coding, timeout behavior, and reduced analysis fields.

The browser task preserves the canonical human profile's 128 trials (64 per block). Single-trial timing, response semantics, scoring, and data meaning are unchanged. The serial trigger driver is replaced by browser events.

Random dots are rendered by the shared runtime's `random_dot_motion` canvas primitive with the canonical 150-dot, 0.1°, four-frame lifetime, 6°/s, 6°-aperture parameters. Browser animation uses a deterministic browser PRNG, so dot microstructure is reproducible within the web task but is not pixel-identical to NumPy/PsychoPy.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web` with **Contents: Read and write** permission. TaskBeacon organization approval may also be required.
