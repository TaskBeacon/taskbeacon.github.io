# Director Visual Perspective-Taking Task (Web)

`H000087` is the browser-native companion to canonical `T000087-director-visual-perspective-taking-task`.

The web task preserves the two counterbalanced Director/Rule contexts, sixteen matched critical/control scenes per context, a 4 x 4 shelf with five gray-backed cells and eight objects, the 5.0-second study period, prerecorded 2.8-second movement instruction, ordered object-then-destination pointer response with a 5.0-second ceiling, practice feedback, and trial-level accuracy/latency/privileged-error fields.

The shared `psyflow-web` runner owns participant registration, fullscreen policy, browser audio priming, force quit, event reduction, and CSV/JSON export. The local task folder remains derived from the Python source and contains no task-local app shell or direct jsPsych import.

See `transfer_node.md` for the Python-to-Web alignment matrix and intentional browser differences.

## Repository dispatch token

The update workflow requires the repository secret `TASKBEACON_ORG_DISPATCH_TOKEN`. Use an organization-authorized GitHub token that can access `TaskBeacon/psyflow-web` and has **Contents: Read and write** permission so the workflow can send the `html-task-updated` repository dispatch event.
