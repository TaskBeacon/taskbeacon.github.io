# False-Belief / Unexpected Transfer Task (Web)

`H000106` is the browser-native companion to canonical `T000106-false-belief-task`.

The web task preserves the eight conditions crossing first-/second-order belief, true/false belief, and initial left/right location; the fixation → setup → perspective → transfer → return → belief question → reality control → memory control → ITI procedure; F/J spatial responses; 4-second human response ceilings; practice feedback; and control-qualified belief scoring. All story elements remain original geometric primitives.

The shared `psyflow-web` runner owns participant registration, fullscreen/cursor policy, force quit, raw event capture, reduction, and CSV/JSON export. This task repo contains no app shell and does not import jsPsych directly.

See `transfer_node.md` for the explicit Python-to-Web alignment matrix and validation record.

## Repository dispatch token

The update workflow requires the repository secret `TASKBEACON_ORG_DISPATCH_TOKEN`. Use an organization-authorized fine-grained token with access to `TaskBeacon/psyflow-web` and **Contents: Read and write** permission. `Actions: write` alone is not sufficient for `repository_dispatch`; organization approval may also be required.
