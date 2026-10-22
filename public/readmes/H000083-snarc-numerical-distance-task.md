# SNARC and Numerical Distance Task (Web)

| Field | Value |
|---|---|
| Name | SNARC and Numerical Distance Task |
| Task ID | `H000083` |
| Canonical Source | `T000083-snarc-numerical-distance-task` |
| Variant | Browser companion |
| Version | `v0.1.0` |
| Date Updated | 2026-08-01 |
| PsyFlow Web | Shared local runtime |
| Contract | TAPS `v0.2.0` |
| Language | Chinese instructions; Arabic numeral stimuli |

## Overview

This is the browser-derived companion to the canonical Python task. It preserves the two reversed parity mappings used to estimate the SNARC effect and the two reversed comparisons to reference number 65 used to estimate the numerical distance effect.

The task contains four complete blocks and 484 trials, including practice trials. It does not shorten the canonical task for the browser.

## Task Flow

- Parity: empty frame (300 ms) → digit/response (1300 ms) → blank ITI (1500 ms).
- Magnitude: attention rectangle (200 ms) → blank delay (1800 ms) → number (200 ms) → blank response continuation to a 1500 ms deadline → blank ITI (1500 ms).
- `F` and `J` category mappings reverse once for each judgment.

## Running in the shared runner

From `psyflow-web`:

```bash
npm run dev
```

Then open the task with `?task=H000083-snarc-numerical-distance-task`.

## Outputs

The shared runner exports one reduced row per logical trial plus raw stage/event data. Primary fields include judgment, target number, mapping, practice status, distance and bin, response key and side, response time, correctness, and outcome.

See [transfer_node.md](transfer_node.md) for the canonical-to-web alignment audit.
