# Adaptive Mentalization Game — Web

| Metadata | Value |
|---|---|
| Name | Adaptive Mentalization Game — Web |
| TaskBeacon ID | H000123 |
| Version | 0.1.0 |
| Date Updated | 2026-08-30 |
| Runtime | psyflow-web shared runner |
| Derived From | T000123-adaptive-mentalization-game |
| Modality | Visual number choice / keyboard response |
| Language | Chinese |

## Overview

This source-only web task is the browser-native companion to canonical `T000123-adaptive-mentalization-game`. It preserves the three-action cyclic game, six 40-round matches, hidden k=0/k=1/k=2 opponent manipulation, source-derived timing, feedback/scoring rules, and calibrated artificial-opponent policy.

![Task Flow](task_flow.png)

## Alignment

| Contract area | Web behavior |
|---|---|
| Identity | Same slug/title and matching numeric ID |
| Block schedule | Six matches; each level twice; no adjacent repeats; not starting with k=2 |
| Trial stages | Fixation → private number choice → joint feedback |
| Response | Keys 1/2/3; identical timeout semantics |
| Timing | 1–3 s fixation, 3–5 s response window, 2 s feedback |
| Controller | Same α=0.9 attractions, k-specific recursion, beta/noise policy, and block reset |
| Score | +1/0/−1 and shared cumulative total across matches |
| Reduced data | One row per logical round with aligned field names and meanings |

Browser-only differences are limited to the shared application shell, fullscreen/export handling, browser event triggers, and web rendering. There is no direct jsPsych import or per-task application shell.

## Shared runner

The task is loaded by `psyflow-web` through `main.ts`. The task repository intentionally contains no `node_modules`, `dist`, Vite app shell, or direct jsPsych dependency.

## Repository dispatch

`.github/workflows/notify-psyflow-web.yml` sends `html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained PAT needs access to `TaskBeacon/psyflow-web` with **Contents: Read and write**, and may require TaskBeacon organization approval.

## Reference

Buergi, N., Aydogan, G., Konovalov, A., et al. (2026). A neural signature of adaptive mentalization. *Nature Neuroscience, 29*, 934–944. https://doi.org/10.1038/s41593-026-02219-x

