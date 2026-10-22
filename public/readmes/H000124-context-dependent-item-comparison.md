# H000124 · Context-Dependent Item Comparison

Browser companion for the canonical Python task [`T000124-context-dependent-item-comparison`](../T000124-context-dependent-item-comparison). This is a source-only `psyflow-web` task package; the shared runner supplies participant registration, browser lifecycle controls, execution, and CSV export.

## Task design

Each trial presents one of five comparison questions, a 100–200 ms fixation, a first familiar-object image for 1,000 ms, a 200–300 ms fixation, a different second image for 1,000 ms, a 16.67-ms blank, and the `1 or 2?` decision. The question is self-paced after a 500-ms minimum. The decision prompt is visible for 200 ms before a response window of up to 300 s opens on the unchanged screen. No correctness feedback is shown.

The full task contains five 60-trial blocks. It crosses five questions with all 12 ordered non-repeating pairs from four pictures and repeats every cell five times, producing exactly 300 trials.

## Canonical alignment

- Slug, title, Chinese instructions/questions, image assets, and trigger codes match T000124.
- The same deterministic full-factorial scheduler and seed (`120120`) are used.
- Stage order, fixation jitter ranges, picture durations, answer minimum, response ceiling, key mapping, and absence of feedback are preserved.
- Each logical trial exports the same analysis fields: question, ordered pair, repetition, response key/RT, selected serial position, chosen item, and timeout status.
- The shared browser shell intentionally owns registration, responsive rendering, raw/reduced CSV download, fullscreen policy, and force quit.

## Validation

From `E:/Taskbeacon`:

```powershell
psyflow-web/node_modules/.bin/tsc --noEmit -p H000124-context-dependent-item-comparison/tsconfig.json
psyflow-web/node_modules/.bin/vitest run --root H000124-context-dependent-item-comparison --config vitest.config.js
taps-validate H000124-context-dependent-item-comparison --contracts-version v0.2.0 --contracts-root taps/contracts
```

The notification workflow expects the repository secret `TASKBEACON_ORG_DISPATCH_TOKEN`. A fine-grained PAT must have access to `TaskBeacon/psyflow-web` with `Contents: Read and write`; organization approval may also be required. `Actions: write` alone is not sufficient for `repository_dispatch`.

See [`transfer_node.md`](transfer_node.md) for the explicit Python-to-web alignment matrix and intentional browser-only differences.

## License

MIT.
