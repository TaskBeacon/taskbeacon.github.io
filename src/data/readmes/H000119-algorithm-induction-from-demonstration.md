# H000119 · Algorithm Induction from Demonstration

Browser companion for the canonical Python task [`T000119-algorithm-induction-from-demonstration`](../T000119-algorithm-induction-from-demonstration). This is a source-only `psyflow-web` task package; the shared runner supplies the browser shell, participant form, event engine, and CSV downloads.

## Task flow

![Task flow](task_flow.png)

The task has two fixed blocks. The first presents four steps from each of three ball-placement algorithms—Sort, Double, and Hitch—then asks the participant to continue for eight pointer selections. The second crosses six sequence patterns with Copy, Translate, Integrate, and Extend, producing 24 persistent-sample trials. No trial gives correctness feedback.

## Canonical alignment

- Three action trials and twenty-four pattern trials preserve the Python source order.
- Demonstration count (4), action continuation length (8), Extend length (12), pattern codes, stimulus alphabets, and scoring match T000119.
- Timings remain 1.0 seconds per action demonstration, 50 seconds for action continuation, 60 seconds for pattern response, and 0.5 seconds for the blank ITI.
- All responses use ordered pointer-sequence capture; completion occurs only after the prescribed number of selections.
- Trigger names and numeric codes match the canonical configuration, with browser events replacing the serial loopback driver.
- Instruction and goodbye screens are lifecycle trials excluded from reduced logical-trial output.

## Data fields

Each of the 27 logical rows includes `task_family`, `condition`, `condition_id`, `pattern_name`, `sample_code`, `response_code`, `response_length`, `expected_response`, `selected_sequence`, `response_times`, `response_positions`, `first_response_latency`, `completion_latency`, `timed_out`, `exact_match`, `position_accuracy`, `edit_distance`, and `used_all_symbols`. Action rows also retain their demonstration and counterbalance assignment.

## Validation

From `E:/Taskbeacon`:

```powershell
psyflow-web/node_modules/.bin/tsc --noEmit -p H000119-algorithm-induction-from-demonstration/tsconfig.json
psyflow-web/node_modules/.bin/vitest run --root H000119-algorithm-induction-from-demonstration --config vitest.config.js
```

From `E:/Taskbeacon/psyflow-web`:

```powershell
npm run generate:tasks
npm run build:site
```

See [`transfer_node.md`](transfer_node.md) and [`references/web_port_validation.md`](references/web_port_validation.md) for the explicit T→H mapping and validation record.

## Evidence

The implementation follows the open-access Nature Communications report, “Children use algorithm induction to discover patterns in data” (2026): <https://doi.org/10.1038/s41467-026-73029-9>.

## License

MIT.
