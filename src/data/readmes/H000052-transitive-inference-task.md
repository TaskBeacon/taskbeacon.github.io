# H000052 Transitive Inference Task

Browser companion for the canonical `T000052-transitive-inference-task`.

## Contract

- Runtime: `psyflow-web`
- Variant: `html`
- TAPS contract: `v0.2.0`
- Canonical source: `T000052-transitive-inference-task`

## Preserved Flow

Training and final-test pair patterns are generated from the canonical config. Each trial preserves fixation, pair choice, training feedback, ITI, response scoring, selected symbol, pair kind, and condition IDs.

## Runtime Note

The Python version can repeat a training block until a criterion is met. The current compiled `psyflow-web` task graph is static, so this H version presents each configured training block once and reports the same criterion summary message after the block.

## Development

Run shared runtime checks from `../psyflow-web`:

```bash
npm run typecheck
```
