# H000117 · Structured Visuomotor Graph Learning

Browser companion for the canonical Python task [`T000117-structured-visuomotor-graph-learning`](../T000117-structured-visuomotor-graph-learning). It is a source-only `psyflow-web` task: the shared runner supplies registration, browser lifecycle controls, rendering, and export.

## Task design

Participants first complete an eight-key positional motor baseline, then learn three animal-to-key associations with binary feedback, and finally learn eight visual stimulus–response mappings. Each learning stimulus combines color (red/purple), shape (square/circle), and pattern (dots/stripes). The between-participant `mapping_structure` choice either aligns feature changes with nested motor distances or permutes the same eight mappings to break that hierarchy.

## Task flow

![Task Flow](task_flow.png)

## Canonical alignment

- The eight learning stimuli, structured and structure-breaking mappings, valid keys, 2.5-second learning deadline, and 750-ms feedback are exact copies of T000117.
- The positional baseline retains all 64 ordered key transitions once in the Web preview; Python uses four repetitions.
- Practice and learning retain balanced stimulus scheduling at preview length.
- Transition fields (`previous_stimulus_id`, feature changes, and graph distance 0/2/4/6) retain the same meaning.
- Every behavioral trial exports one reduced row; lifecycle screens remain raw-only.

The browser preview contains 104 behavioral rows: 66 motor-baseline, 6 practice, and 32 learning trials. The canonical Python experiment contains 717 rows. See [`transfer_node.md`](transfer_node.md) for the explicit boundary and one static-runtime retry safeguard.

## Data fields

Reduced fields include `phase`, `condition_id`, `mapping_structure`, `stimulus_id`, `correct_key`, `response_key`, `response_rt_s`, `response_correct`, `timed_out`, `first_response_correct`, `attempt_count`, `previous_stimulus_id`, `previous_correct_key`, `feature_change_count`, `graph_path_distance`, `shape`, `color`, and `pattern`.

## Validation

From `E:/Taskbeacon/psyflow-web`:

```powershell
npm run generate:tasks
npm run typecheck
npm test
npm run build:site
```

The source repo intentionally contains no app shell, `node_modules`, Vite configuration, or build output.

## Runner refresh

`.github/workflows/notify-psyflow-web.yml` sends `html-task-updated` on pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained PAT needs access to `TaskBeacon/psyflow-web` with **Contents: Read and write** and may require organization approval.

## License

MIT.
