# H000111 · RLWM Set-Size Learning Task

Browser companion for the canonical Python task [`T000111-rlwm-set-size-learning-task`](../T000111-rlwm-set-size-learning-task), implemented as a source-only `psyflow-web` package.

## Task design

Participants learn fixed mappings from colored geometric stimuli to the adjacent `F`, `G`, and `H` keys. Each block contains 2–6 stimuli. All stimuli are previewed at block onset, then interleaved for 15 presentations each. Feedback is deterministic and truthful: correct responses earn `+1`; incorrect responses and timeouts earn `0`.

The 18-block schedule contains four blocks each at set sizes 2, 3, and 4 and three blocks each at set sizes 5 and 6. A participant-derived rotation and reversal counterbalance the block order. Within each block, mappings and trial order come from the same FNV-1a/LCG implementation as the Python canonical task.

## Canonical alignment

- Same 18-block set-size multiset, 15 presentations per stimulus, and 1,035 logical trials.
- Same subject-specific block ordering, colored shapes, independent three-key mappings, and interleaving order.
- Same 1.5-second response window, 0.75-second feedback, and 0.5-second ITI.
- Same trigger codes, condition labels, task factors, and reduced response fields.
- Browser-only differences are limited to rendering, participant-form ownership, and CSV download.

## Validation

From `E:/Taskbeacon`:

```powershell
psyflow-web/node_modules/.bin/tsc --noEmit -p H000111-rlwm-set-size-learning-task/tsconfig.json
psyflow-web/node_modules/.bin/vitest run --root H000111-rlwm-set-size-learning-task --config vitest.config.js
```

From `E:/Taskbeacon/psyflow-web`:

```powershell
npm run typecheck
npm test
npm run build:site
```

See [`transfer_node.md`](transfer_node.md) for the explicit alignment record.

## Evidence

The task is based on the open-access RLWM analysis in [Nature Human Behaviour (2025)](https://doi.org/10.1038/s41562-025-02340-0), with the original paradigm and supporting replications documented in the canonical task references.

## License

MIT.

