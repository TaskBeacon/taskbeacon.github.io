# H000109 · Luchins Water-Jar / Einstellung Task

Browser companion for the canonical Python task [`T000109-einstellung-water-jar-task`](../T000109-einstellung-water-jar-task). It is a source-only `psyflow-web` task package: the shared runner supplies the browser shell, participant form, execution engine, and CSV export.

## Task design

The fixed series contains one practice item, five set-induction items, two critical items, one extinction item, and two post-extinction items. Induction items support the complex `B-A-2C` rule. Critical and post-extinction items also admit a shorter `A-C` or `A+C` rule, allowing continued use of the induced formula to index mental-set persistence. The extinction item cannot be solved by the induced rule.

Participants enter formulas such as `B-A-2C` or `A-C` and press Enter. The parser accepts only signed linear combinations of `A`, `B`, and `C`, optionally with integer multipliers and `*`; it never evaluates arbitrary JavaScript. No correctness feedback is shown.

## Canonical alignment

- Problem IDs, capacities, targets, phases, ordering, and declared solution classes match T000109 exactly.
- The 120-second response window and 0.5-second blank inter-problem interval are preserved.
- Trigger names and numeric codes match the Python configuration.
- Enter is normalized to the canonical `return` response key.
- Each problem produces one reduced CSV row plus a raw stage-event stream.
- The browser shell intentionally owns participant registration, viewport rendering, and file download.

## Data fields

Core reduced fields include `item_id`, `phase`, `solution_class`, `jar_a`, `jar_b`, `jar_c`, `target`, `response_text`, `normalized_formula`, `coefficients`, `formula_value`, `operation_cost`, `response_category`, `strategy`, `response_correct`, `response_rt`, and `timed_out`.

Strategy labels are `set`, `simple`, `other`, and `none`; response categories distinguish timeout, invalid, incorrect, correct-set, correct-simple, and correct-other responses.

## Validation

From `E:/Taskbeacon`:

```powershell
psyflow-web/node_modules/.bin/tsc --noEmit -p H000109-einstellung-water-jar-task/tsconfig.json
psyflow-web/node_modules/.bin/vitest run --root H000109-einstellung-water-jar-task --config vitest.config.js
```

From `E:/Taskbeacon/psyflow-web`:

```powershell
npm run typecheck
npm test
npm run build:site
```

See [`transfer_node.md`](transfer_node.md) for the explicit T→H alignment and accepted browser-only differences.

## Evidence note

The task is structurally grounded in the classic water-jar paradigm and later Einstellung replications. The ScienceDirect article supplied with the request concerns directed forgetting in problem solving and is retained only as adjacent conceptual evidence, not as the source of trial parameters.

## License

MIT.
