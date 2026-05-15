# Risk Perception Estimation Task (HTML Companion)

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Risk Perception Estimation Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000036-risk-perception-estimation |
| Short Description | Browser companion for the Chinese health-risk judgment task with three scenario levels and 1-7 ordinal ratings |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the canonical local `T000036-risk-perception-estimation` task. Participants judge the perceived risk of three everyday health scenarios using a discrete 1-7 scale. The browser port keeps the same stage order, condition semantics, block structure, and summary logic while using the shared `psyflow-web` runner.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config and stimulus bank. |
| Collect Subject Info | The shared runner collects `subject_id` before the task starts. |
| Show Instructions | Present the Chinese instruction text and optional browser speech voice. |
| Countdown | Show a three-second countdown before each block. |
| Run Trials | Present fixation, scenario preview, rating response, and ITI for each condition. |
| Show Block Break | Display the block mean rating and mean RT. |
| Finalize | Display the overall mean rating and mean RT and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Show a central fixation cross. |
| Scenario Preview | Show the condition-specific health-risk scenario text alone. |
| Rating Response | Show the same scenario with the question and 1-7 scale, then capture one keypress or timeout. |
| ITI | Show the fixation cross again before the next trial. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition scheduling | Uses `BlockUnit.generate_conditions(...)` with the three configured risk labels. |
| Determinism | Block seeds come from `TaskSettings`, so the browser preview stays reproducible. |
| Adaptive control | None. This task does not adapt difficulty or reward. |

## 3. Configuration Summary

Settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Numeric participant identifier supplied by the shared runner. |

### b. Stimuli

| Stimulus ID | Purpose |
|---|---|
| `instruction_text` | Chinese task instructions. |
| `fixation` | Central fixation cross. |
| `scenario_low` / `scenario_medium` / `scenario_high` | Condition-specific health-risk scenarios. |
| `rating_prompt` | Risk question shown during the response window. |
| `rating_scale` | 1-7 ordinal rating legend. |
| `block_break` | Block summary with mean rating and mean RT. |
| `good_bye` | Final summary screen. |

### c. Timing

| Parameter | Meaning |
|---|---|
| `timing.fixation_duration` | Duration of the fixation screen. |
| `timing.scenario_preview_duration` | Duration of the scenario-only preview screen. |
| `timing.response_window_duration` | Duration of the rating response window. |
| `timing.iti_duration` | Inter-trial interval duration. |

### d. Triggers

| Parameter | Meaning |
|---|---|
| `exp_onset` / `exp_end` | Experiment start/end. |
| `block_onset` / `block_end` | Block start/end. |
| `fixation_onset` | Fixation screen onset. |
| `scenario_preview_onset` | Scenario preview onset. |
| `rating_response_onset` | Rating screen onset. |
| `rating_response_key` | Rating keypress trigger metadata. |
| `rating_response_timeout` | Rating window timeout trigger metadata. |
| `iti_onset` | ITI onset. |

### e. Browser Notes

| Parameter | Meaning |
|---|---|
| `task.save_path` | Browser output target; the shared runner downloads results instead of writing to a desktop output directory. |
| `task.voice_enabled` | Enables browser speech synthesis for the instruction text. |
| `task.voice_name` | Voice hint passed to the browser speech synthesis bridge. |

## 4. Methods

Participants completed a browser-based health-risk judgment task implemented with the shared `psyflow-web` runtime. Each trial presented a brief scenario, followed by a discrete 1-7 subjective risk rating. Trials were organized into three scenario levels corresponding to low, medium, and high perceived risk. The task measured ordinal risk judgments and response latency, with no binary correctness or reward contingency. Trial stimuli, timings, and response mapping remain config-defined for auditability and localization.

## Run

1. Open `psyflow-web` in the shared workspace.
2. Run `npm install` if dependencies are not installed yet.
3. Start the runner with `npm run dev`.
4. Open `http://127.0.0.1:4173/?task=H000036-risk-perception-estimation`.

## Notes

- The browser companion keeps the canonical three blocks and 36 rating trials intact.
- The local trigger codes are preserved in config for traceability, but the browser runtime does not emit serial triggers.
- Pushes to `main` can refresh the shared runner through `.github/workflows/notify-psyflow-web.yml` when `TASKBEACON_ORG_DISPATCH_TOKEN` is configured.
