# Tapping Synchronization Task

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Tapping Synchronization Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000044-tapping-synchronization-task |
| Short Description | Browser companion for the canonical tapping synchronization task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000044-tapping-synchronization-task`. Participants tap the spacebar along with a metronome, then continue tapping at the same tempo after the tone stops.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Schedule | Preserves one practice trial at `practice_600` and six shuffled test trials across `tempo_450`, `tempo_600`, and `tempo_750`. |
| Trial flow | Ready prompt, sync tapping, continuation tapping, then practice break or test ITI. |
| Timing | Uses canonical tempo, sync beat count, continuation beat count, ready duration, break duration, and ITI duration. |
| Data | Reduced output is one logical tapping trial per row with tap counts, expected taps, sync asynchrony, continuation ITI, CV, miss count, and first tap RT. |
| Web runtime note | The local PsychoPy task records a continuous stream of taps inside each phase. Current `psyflow-web` captures one response per stage, so this port represents each expected beat as a separate capture stage and summarizes the same downstream fields. |

## Browser Notes

The metronome WAV is preserved in `assets/`. Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000044-tapping-synchronization-task`
