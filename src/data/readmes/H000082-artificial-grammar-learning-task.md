# Artificial Grammar Learning Task (Web)

| Field | Value |
|---|---|
| Name | Artificial Grammar Learning Task |
| Task ID | H000082 |
| Canonical source | T000082-artificial-grammar-learning-task |
| Version | v0.1.0 |
| Runtime | psyflow-web shared runner |
| Language | Chinese instructions; Latin-letter stimuli |

## Overview

This browser-native companion preserves the classic Reber artificial grammar learning procedure in canonical T000082. Participants incidentally memorize and reproduce 16 grammatical strings in two independently shuffled passes. After a five-minute interval, they classify 16 novel grammatical and 16 paired one-position-violation strings using `F = conforms` and `J = does not conform` without trial-level feedback.

## Procedure

| Phase | Canonical behavior |
|---|---|
| Training | 32 logical trials: each string appears for 3.0 s, followed by typed reproduction using P/T/S/X/V, Backspace, and Enter. Incorrect reproductions may be re-presented up to three attempts. |
| Interval | A fixation remains visible for 300 s between acquisition and classification. |
| Test | 32 logical trials balanced 16/16 grammatical/nongrammatical; F/J response ceiling is 10.0 s. |
| Feedback | No grammaticality or correctness feedback is shown during classification. |
| ITI | 0.5-s neutral fixation follows every scored trial. |

## Task logic

- `main.ts` loads config, creates the deterministic two-block schedule, and mounts the shared TaskBeacon app shell.
- `src/run_trial.ts` orchestrates participant-visible stages, contexts, triggers, and reduced trial fields.
- `src/utils.ts` contains the finite-state grammar validator, fixed-pool schedule validation, typed-response reconstruction, and final summary metrics.
- `config/config.yaml` is the participant-facing and parameter source of truth for the web version.

The reduced export contains one analysis row for every scored training/test trial, identified by `phase`. Support screens and trigger markers carry distinct non-scored conditions and can be excluded from analysis with `phase in {training, test}`.

## Integration

The task is loaded by the shared `psyflow-web` runner; it does not contain a per-task app shell or dependency bundle. `.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` after pushes to `main`. The repository secret `TASKBEACON_ORG_DISPATCH_TOKEN` must have access to `TaskBeacon/psyflow-web` with `Contents: Read and write`.

## Evidence

- Knowlton & Squire (1994), <https://doi.org/10.1037/0278-7393.20.1.79>
- Knowlton & Squire (1996), <https://doi.org/10.1037/0278-7393.22.1.169>
- Forkstam et al. (2006), <https://doi.org/10.1016/j.neuroimage.2006.03.057>

