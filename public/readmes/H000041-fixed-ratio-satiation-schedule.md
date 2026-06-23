# Fixed-ratio Satiation Schedule

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Fixed-ratio Satiation Schedule |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000041-fixed-ratio-satiation-schedule |
| Short Description | Browser companion for the canonical fixed-ratio satiation task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000041-fixed-ratio-satiation-schedule`. Participants complete fixed-ratio press trials under `fr5`, `fr10`, and `fr20` conditions. A trial delivers one token only when all required spacebar presses are completed before their per-press timeout; token totals update the displayed satiety fraction.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Conditions | Preserves `fr5`, `fr10`, `fr20` and the canonical `ratio_requirements`. |
| Block logic | Uses the same `total_blocks`, `trial_per_block`, weights, and block seeds through `BlockUnit`. |
| Trial flow | `work_preview -> work_press_## loop -> reward_delivery/satiation_pause or timeout_feedback -> iti`. |
| Response window | Each required press has the canonical `press_timeout` and valid `space` key. |
| Scoring | One token is awarded only after completing the full fixed ratio. |
| Data | Reduced output remains one logical fixed-ratio trial per row with press counts, timeout, token, satiety, RT, and press trace fields. |

## Browser Notes

Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The per-task repo stays source-only and includes `.github/workflows/notify-psyflow-web.yml`, which expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write` for repository dispatch refreshes.

## Run

Open through the shared runner with:

`?task=H000041-fixed-ratio-satiation-schedule`
