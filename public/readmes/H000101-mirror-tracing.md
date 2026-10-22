# Mirror Tracing (Web)

Browser companion to canonical [`T000101-mirror-tracing`](https://github.com/TaskBeacon/T000101-mirror-tracing). It preserves one unscored veridical familiarization trial, 3 blocks × 10 scored horizontal mirror-feedback trials, the continuous six-point-star path, 60-s trace deadline, 1.5-s feedback, 0.75-s ITI, and trial-wise speed/error learning measures.

## Task flow

Participants press and hold the primary pointer button at the green top marker, trace clockwise through the gray star corridor, and return to the start. During scored trials the displayed cursor uses `x_display = -x_physical` while vertical feedback remains unchanged. The cursor turns red outside the corridor. A trial completes only after at least 95% path progress and return within 0.38° of the start.

The browser port uses the shared `psyflow-web` `capturePointerTrace()` primitive. The primitive owns pointer sampling, coordinate transformation, corridor geometry, completion, timeout, triggers, trajectory logging, and metrics; task code only supplies canonical configuration and scoring labels.

## Outcomes

One reduced row is produced per logical trial. Primary fields are `movement_time`, `error_excursions`, `off_path_duration`, `off_path_proportion`, `rms_path_error`, `pointer_lifts`, `max_progress`, `sample_count`, `completed`, `timed_out`, and `outcome`. Raw stage output retains physical/display trajectories and sample times for audit.

## Run in the shared runner

From `TaskBeacon/psyflow-web`, generate the task manifest and start Vite, then select `H000101-mirror-tracing` in the runner. The task repository remains source-only and imports runtime behavior from `psyflow-web`.

## Runtime dispatch

The dispatch workflow requires the repository secret `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained token must have access to `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.

## Canonical alignment

See [`references/alignment_audit.md`](references/alignment_audit.md) for the parity matrix and [`references/transfer_notes.md`](references/transfer_notes.md) for the transfer boundary. Evidence, inferred digital geometry, and parameter provenance remain canonical in the Python repository.
