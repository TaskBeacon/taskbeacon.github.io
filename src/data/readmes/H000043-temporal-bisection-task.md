# Temporal Bisection Task

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Temporal Bisection Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000043-temporal-bisection-task |
| Short Description | Browser companion for the canonical temporal bisection task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000043-temporal-bisection-task`. Participants first see short and long anchor durations, then classify probe flashes as closer to the short or long standard using the left and right arrow keys.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Schedule | Uses task-local deterministic scheduling because `stimulus_ms` is the core trial-level parameter and cannot be represented by label-only balancing. |
| Learning block | Preserves balanced short/long anchor exposure with `practice_trials`. |
| Test block | Preserves shuffled probe durations from `probe_durations_ms` and `test_trials`. |
| Trial flow | Learning: fixation, flash, label, ITI. Test: fixation, flash, response, ITI. |
| Response semantics | Left key maps to `short`; right key maps to `long`; timeout is recorded as a miss. |
| Data | Reduced output is one logical trial per row with stimulus duration, block role, response label, RT, timeout, phase sequence, and elapsed fields. |

## Browser Notes

Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000043-temporal-bisection-task`
