# Navon Global-Local Task (Web)

Browser-native companion to canonical `T000063-navon-global-local-task`.

The web task preserves the two blocked target levels, six identities per level, exact quadrant balance, 500 ms fixation, 40 ms exposure, colocated 33 x 33 mask, 2000 ms response deadline, F/J mapping, practice feedback, and analysis fields. Hardware triggers are represented as browser-event metadata.

## Run

Use the shared `psyflow-web` runner with task ID `H000063-navon-global-local-task`.

## Dispatch

`.github/workflows/notify-psyflow-web.yml` refreshes the shared runner after pushes. `TASKBEACON_ORG_DISPATCH_TOKEN` must access `TaskBeacon/psyflow-web` with `Contents: Read and write`; organization approval may also be required.
