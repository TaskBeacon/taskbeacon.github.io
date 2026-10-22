# Temporal Order and Simultaneity Judgment Task (Web)

`H000084` is the browser-native companion to canonical `T000084-temporal-order-simultaneity-judgment-task`.

The web preview preserves the same Chinese instructions, flash-click stimuli, 15 signed SOAs, TOJ/SJ2 response meanings, 2-s locator display, response ceiling, confirmation, ITI, trigger semantics, and one-row-per-logical-trial export. It intentionally runs one 15-trial block per rule and omits practice, instead of the canonical human profile's practice plus four scored blocks per rule. Shared registry count fields mirror the canonical protocol; the task-specific practice/block/trial fields control the actual 30-trial browser preview.

The shared `psyflow-web` runner owns registration, fullscreen/cursor behavior, force quit, browser audio priming, and CSV/JSON export. No task-local app shell or direct jsPsych import is included.

The notification workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`; TaskBeacon organization approval may also be required.
