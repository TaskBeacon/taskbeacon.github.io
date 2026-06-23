# Anti-Reach Task

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Anti-Reach Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000046-anti-reach-task |
| Short Description | Browser companion for the canonical anti-reach task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000046-anti-reach-task`. Participants use `F` and `J` to report a left or right reach goal based on eye/hand layout, cue side, and pro/anti context rules.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Conditions | Preserves the 16 `std/gen x layout x pro/anti x cue` condition tokens. |
| Trial spec | Preserves deterministic jitter sampling and spatial coordinate derivation from canonical settings. |
| Trial flow | Fixation, context cue, memory hold, go cue, reach response, feedback, and ITI. |
| Response semantics | Correct key is the goal side relative to hand position; anti trials invert the cue side. |
| Data | Reduced output is one logical trial per row with setup, layout, rule, cue/eye/hand/goal sides, response key, RT, correctness, and timeout. |

## Browser Notes

Fullscreen, cursor hiding, force quit, preflight, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000046-anti-reach-task`
