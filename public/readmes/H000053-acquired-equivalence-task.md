# H000053 Acquired Equivalence Task

Browser companion for the canonical `T000053-acquired-equivalence-task`.

## Contract

- Runtime: `psyflow-web`
- Variant: `html`
- TAPS contract: `v0.2.0`
- Canonical source: `T000053-acquired-equivalence-task`

## Preserved Flow

Face/fish image choices, staged training, transfer probes, feedback, response scoring, pair-level summaries, and final transfer-test summary are preserved.

## Runtime Note

The Python version can repeat training stages until a consecutive-correct criterion is reached. The compiled web task graph is static, so this H version presents each stage once and reports the criterion state after the stage.

## Development

Run shared runtime checks from `../psyflow-web`:

```bash
npm run typecheck
```
