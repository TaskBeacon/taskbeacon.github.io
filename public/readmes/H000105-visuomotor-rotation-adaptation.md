# Visuomotor Rotation Adaptation (Web)

Browser companion to canonical [`T000105-visuomotor-rotation-adaptation`](https://github.com/TaskBeacon/T000105-visuomotor-rotation-adaptation). It preserves the one-target protocol reported by Tsay et al. (2024): 30 veridical-feedback baseline reaches, 54 reaches with a participant-counterbalanced 45° cursor rotation, and six direct no-feedback reaches measuring the aftereffect.

## Task flow

Participants move the pointer into a central white annulus and hold for 500 ms. A blue target then appears 6° from centre. They make a rapid, click-free centre-out movement; the reach ends when the physical pointer crosses the 6° radius. Baseline cursor feedback is veridical, adaptation feedback is rotated clockwise or counterclockwise by 45°, and aftereffect feedback disappears outside the start. Movements exceeding 500 ms after onset produce a 750-ms red “too slow” message.

One fixed target is selected from eight equally spaced directions. Target and rotation direction use the same portable participant/session hash in Python and TypeScript. Early adaptation is the first ten rotation trials, late adaptation the final ten, and aftereffect all six no-feedback trials.

The browser port uses the shared `psyflow-web` `capturePointerReach()` primitive. It owns pointer sampling, 500-ms homing hold, click-free movement onset, rotation geometry, endpoint freeze, timeout, hit detection, triggers, and raw physical/display trajectories. Task code supplies canonical parameters and analysis labels.

## Outcomes

Each logical reach produces one reduced row with search, reaction, and movement times; physical hand and displayed cursor angles; cursor error and hit; completion/timeout; physical/display endpoints; sample count; outlier status; compensation angle; and baseline-corrected angle. The final screen reports early adaptation, late adaptation, and aftereffect.

## Run in the shared runner

From `TaskBeacon/psyflow-web`, generate the task manifest and start Vite, then select `H000105-visuomotor-rotation-adaptation`. The H repository is derived output and imports runtime behavior from `psyflow-web`; scientific evidence and provenance remain canonical in T000105.

## Canonical alignment

See [`references/alignment_audit.md`](references/alignment_audit.md) for the parity matrix and [`references/transfer_notes.md`](references/transfer_notes.md) for the transfer boundary.
