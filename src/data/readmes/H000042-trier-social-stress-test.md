# Trier Social Stress Test

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Trier Social Stress Test |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000042-trier-social-stress-test |
| Short Description | Browser companion for the canonical Trier Social Stress Test. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000042-trier-social-stress-test`. It presents the instruction, baseline acclimation, speech preparation, speech delivery, mental arithmetic, recovery, and goodbye phases as one logical TSST trial.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Condition | Preserves the single `tsst` condition. |
| Stage order | Preserves `instruction -> baseline_acclimation -> speech_preparation -> speech_delivery -> mental_arithmetic -> recovery -> good_bye`. |
| Timing | Uses canonical long durations from `config/config.yaml`; no preview shortening is applied. |
| Social-evaluation display | Reuses the panel backdrop, two judges, camera light, REC label, and phase-specific prompts from config. |
| Data | Reduced output is one TSST row with elapsed seconds for each phase, total elapsed time, phase sequence, and phase elapsed JSON. |

## Browser Notes

Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000042-trier-social-stress-test`
