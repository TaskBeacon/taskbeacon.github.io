# H000049 Matrix Reasoning

Browser companion for the canonical `T000049-matrix-reasoning` task.

## Contract

- Runtime: `psyflow-web`
- Variant: `html`
- TAPS contract: `v0.2.0`
- Canonical source: `T000049-matrix-reasoning`

## Preserved Flow

1. Instruction screen with optional browser speech support for the instruction text.
2. One sequential block of 15 Matrix Reasoning items.
3. Each item presents fixation, blank screen, 3x3 matrix, four numbered options, open response window, optional clock-warning response window, practice feedback, and ITI.
4. Block and goodbye screens summarize accuracy, mean correct RT, and timeouts.

## Notes

- Matrix panels and answer options are generated from the canonical shape/count/rotation rule bank in `src/utils.ts`; this mirrors the local PsychoPy generator and does not require image assets.
- Response RT for warning-window answers includes the elapsed open-response duration, preserving the Python task's downstream timing field.
- Conditions are scheduled in config order to match the canonical sequential `BlockUnit.generate_conditions(... order="sequential")` call.

## Development

Run shared runtime checks from `../psyflow-web`:

```bash
npm run typecheck
```
