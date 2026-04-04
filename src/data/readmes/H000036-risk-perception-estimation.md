# Risk Perception Estimation Task (HTML Companion)

| Field | Value |
|---|---|
| Name | Risk Perception Estimation Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000036-risk-perception-estimation |
| Canonical Source | `T000036-risk-perception-estimation` |
| Short Description | Browser companion for the Chinese health-risk judgment task with the same rating semantics as the local task |
| Created By | TaskBeacon py2js redo |
| Date Updated | 2026-04-04 |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion is a browser-native re-authoring of the local `T000036-risk-perception-estimation` task. Participants judge the perceived health risk of short everyday scenarios on a 1-7 scale. The web version preserves the same stage order, response mapping, and trial-data semantics as the local task, while using a shorter one-block preview for browser review.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Read the browser companion config and subject form. |
| Show Instructions | Present the Chinese instructions and key mapping. |
| Generate Conditions | Build a balanced schedule across `low_health_risk`, `medium_health_risk`, and `high_health_risk`. |
| Run Trials | Repeat the local `fixation -> scenario preview -> rating response -> ITI` sequence. |
| Show Block Break | Display the mean rating and mean RT for the completed block. |
| Finalize | Show the end-of-task summary and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Central fixation cross. |
| Scenario Preview | Show the condition-specific health-risk vignette. |
| Rating Response | Present the scenario question and 1-7 response scale; collect one keypress or timeout. |
| ITI | Return to fixation before the next trial. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition Scheduling | Seeded schedule generation balances the three risk labels within each block. |
| Response Mapping | Number keys `1`-`7` map directly to ordinal risk ratings. |
| Determinism | Schedule generation uses the configured overall seed and block index. |
| Adaptive Control | None. |

## 3. Configuration Summary

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Numeric participant identifier supplied by the shared runner. |

### b. Window Settings

| Parameter | Meaning |
|---|---|
| `window.size` | Browser canvas size in pixels. |
| `window.units` | Coordinate units used by the task runtime. |
| `window.bg_color` | Background color. |
| `window.fullscreen` | Fullscreen toggle for browser preview. |

### c. Stimuli

| Stimulus ID | Purpose |
|---|---|
| `instruction_text` | Chinese task instructions. |
| `fixation` | Central fixation cross. |
| `scenario_low` / `scenario_medium` / `scenario_high` | Health-risk scenario vignettes. |
| `rating_prompt` | Risk question shown during the response phase. |
| `rating_scale` | 1-7 ordinal legend. |
| `block_break` | Block summary screen. |
| `good_bye` | End-of-task summary screen. |

### d. Timing

| Parameter | Meaning |
|---|---|
| `timing.fixation_duration` | Fixation screen duration. |
| `timing.scenario_preview_duration` | Scenario-only preview duration. |
| `timing.response_window_duration` | Rating response window duration. |
| `timing.iti_duration` | Inter-trial interval duration. |

### e. Browser Companion Differences

| Parameter | Meaning |
|---|---|
| `task.total_blocks` | Shortened to 1 for browser review. |
| `task.total_trials` | Shortened to 6 for browser review. |
| `task.trial_per_block` | Shortened to 6 for browser review. |
| `task.voice_enabled` | Disabled in the browser companion. |

## 4. Methods (for academic publication)

This HTML companion preserves the local risk-perception estimation protocol in a browser-run format. Each trial presents a brief health-risk scenario, followed by a 1-7 subjective rating. The browser companion keeps the same construct, response meaning, and trial sequence as the canonical local task while shortening the run for review and shared-runner navigation.
