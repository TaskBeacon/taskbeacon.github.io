# H000118 · Method-of-Loci Context Binding Task

Browser companion for the canonical Python task [`T000118-method-of-loci-context-binding-task`](../T000118-method-of-loci-context-binding-task). This is a source-only `psyflow-web` task package; the shared runner supplies the browser shell, participant form, execution engine, raw event stream, and CSV export.

## Task design

Participants confirm or edit 20 familiar loci in a fixed route, review that route, and then bind each successive locus to one concrete English noun through a vivid interactive image. Each word is shown for 12 seconds and followed by 1 second of fixation. During encoding the locus name is intentionally not displayed: participants advance internally along the route. Retrieval presents the loci in their original order and collects a typed word plus a typed description of the imagined interaction, with a 60-second safety ceiling on each input screen.

The exact 20-word W4D2 set released with Huang et al. (2026) is preserved. Strict scoring requires the target word at its original locus. The separate sequence score recognizes list words, removes repeated responses, and checks whether recognized encoding positions increase across retrieval.

## Canonical alignment

- Task identity, 20 editable suggested loci, 20 released words, item order, and animacy labels match T000118.
- Instruction meaning, phase order, 12-second word display, 1-second fixation, and two 60-second retrieval inputs match T000118.
- Trigger names and numeric codes match the Python configuration; the browser uses the `browser_event` driver.
- Reduced retrieval rows preserve strict locus accuracy, recognized serial position, duplicate handling, serial-order correctness, response category, association completion, and timing fields.
- Encoding shows only position, word, and imagery reminder; it never reveals the current locus.

## Validation

From `E:/Taskbeacon`:

```powershell
psyflow-web/node_modules/.bin/tsc --noEmit -p H000118-method-of-loci-context-binding-task/tsconfig.json
psyflow-web/node_modules/.bin/vitest run --root H000118-method-of-loci-context-binding-task --config vitest.config.js
```

See [`transfer_node.md`](transfer_node.md) for the explicit T→H alignment matrix and accepted browser-only differences.

## Evidence

Huang et al. (2026), “Hippocampal representations of schemas and item-context associations during memory encoding and retrieval,” *Nature Communications*. DOI: [10.1038/s41467-026-71428-6](https://doi.org/10.1038/s41467-026-71428-6).

## License

MIT.
