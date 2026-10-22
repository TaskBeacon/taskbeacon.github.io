# Binocular Rivalry (Web)

Browser-native companion to `T000103-binocular-rivalry`, which remains the canonical source. The task presents incompatible red and cyan sinusoidal gratings through anaglyph glasses while participants continuously report left-tilt dominance with F, right-tilt dominance with J, and mixed perception with Space.

## Alignment

- Two blocks contain both color-to-orientation mappings once each in randomized order.
- Each analyzed trial retains 2 s alignment, 120 s fixed-window reporting, and a 2 s ITI.
- The physical display remains unchanged while every percept-change report and timestamp is retained.
- Reduced output preserves raw sequences, cleaned state transitions, complete dominance intervals, predominance fractions, median durations, and alternations per minute.
- No response is treated as correct or incorrect, and no performance feedback is presented.

## Hardware and calibration

Use red-cyan anaglyph glasses with the red filter over the left eye and cyan filter over the right eye. Browser rendering cannot calibrate monitor/filter transmission automatically; verify channel separation and document the display-specific red and cyan gains before inferential data collection.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must include `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.
