# Probabilistic Reward Task (HTML Preview)

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Probabilistic Reward Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000039-probabilistic-reward-task |
| Short Description | Browser companion for the Chinese probabilistic reward task with short-vs-long mouth discrimination, deferred reward carryover, and psyflow-web trial-context stamping |
| Created By | TaskBeacon psyflow-web py2js port |
| Date Updated | 2026-04-04 |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the local `T000039-probabilistic-reward-task` task. Participants view a cartoon face, decide whether the mouth is short or long, and receive probabilistic reward feedback when correct responses land on scheduled reward-opportunity trials. The browser preview preserves the local stage order, counterbalanced key mapping, and reward carryover logic while using the current psyflow-web unit/context APIs, a local monotonic trial-id counter, and a shortened 2-block, 24-trial preview for fast review in the shared runner.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config. |
| Show Instructions | Present the Chinese instruction screen. |
| Initialize Reward Tracker | Start cumulative reward at 0 points. |
| Generate Conditions | Expand each block into a balanced short/long schedule with reward opportunities assigned at a 3:1 rich-to-lean ratio. |
| Run Practice | Execute 2 practice trials with correctness-only feedback. |
| Run Experimental Blocks | Execute the same fixation -> preview -> flash -> response -> feedback -> ITI flow as the local task. |
| Block Break | Show the timed 30-second rest screen between blocks. |
| Finalize | Show the final total score and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | A central `+` fixation cross is shown briefly. |
| Face Preview | The face outline and eyes appear first without a mouth. |
| Mouth Flash | The short or long mouth is flashed briefly over the same face. |
| Response | Participants press the counterbalanced short-key or long-key response. |
| Feedback | Practice trials show correctness feedback; experimental trials show reward feedback or a neutral fixation screen. |
| Inter-trial Interval | A short fixation interval separates trials. |

### Controller Logic

| Feature | Description |
|---|---|
| Counterbalancing | `subject_id mod 4` assigns short/long key order and rich-stimulus assignment. |
| Condition scheduling | Each block contains a balanced short/long mouth schedule. |
| Reward sampling | Reward opportunities are placed at a 3:1 ratio for rich vs lean stimulus. |
| Reward carryover | Missed reward opportunities remain pending until the next correct response of the same stimulus type. |
| No-response fallback | If the response deadline expires, a configurable fallback choice is imputed for logging and downstream scoring. |
| Adaptive control | None. This is a static probabilistic reward task, not a staircase or reversal task. |

### Other Logic

| Feature | Description |
|---|---|
| Trial context | Every participant-visible screen emits trial context through the current psyflow-web wrapper before `show()` or `captureResponse()`. |
| Trial ids | The browser port uses a local monotonic trial-id counter instead of importing `next_trial_id` from `psyflow`. |
| Deterministic QA seed | Preview sampling uses the configured block seeds for reproducible browser QA runs. |
| Summary metrics | Block and final summaries report accuracy, discriminability, response bias, and total reward. |

## 3. Configuration Summary

Settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Numeric participant identifier supplied by the shared runner. |

### b. Window Settings

| Parameter | Value |
|---|---|
| `window.size` | `[1280, 720]` |
| `window.units` | `pix` |
| `window.screen` | `0` |
| `window.bg_color` | `black` |
| `window.fullscreen` | `false` |
| `window.monitor_width_cm` | `35.5` |
| `window.monitor_distance_cm` | `60` |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `instruction_text` | text | Chinese instructions describing the short-vs-long mouth judgment task. |
| `fixation` | text | Central fixation marker shown before each trial and during the ITI. |
| `face_outline` | circle | Face outline shown in preview, flash, and response screens. |
| `eye_left` / `eye_right` | circle | Eye markers that stay visible across face screens. |
| `mouth_short` / `mouth_long` | line | Short and long mouth lines used to define the discrimination. |
| `practice_feedback_correct` / `practice_feedback_incorrect` | text | Practice-only correctness feedback. |
| `reward_feedback` | text | Positive reward message with the current total score. |
| `block_break` | text | Timed block rest screen showing block number and current score. |
| `good_bye` | text | Final total score shown at task completion. |

### d. Timing

| Phase | Duration |
|---|---|
| `timing.pre_face_duration` | `0.5 s` |
| `timing.mouth_flash_duration` | `0.1 s` |
| `timing.response_duration` | `2.5 s` |
| `timing.reward_feedback_duration` | `1.75 s` |
| `timing.practice_feedback_duration` | `1.75 s` |
| `timing.iti_duration` | `0.5 s` |
| `timing.block_break_duration` | `30.0 s` |

### e. Browser Preview Differences

| Parameter | Meaning |
|---|---|
| `task.total_blocks` | Shortened to 2 for preview. |
| `task.trial_per_block` | Shortened to 12 for preview. |
| `task.total_trials` | Shortened to 24 for preview. |
| `task.block_seed` | Uses the first two block seeds from the full local task. |

## 4. Methods

The HTML companion presents the same probabilistic reward task as the local PsychoPy build, but inside the shared browser runner. On each trial, participants discriminate whether the mouth is short or long, receive probabilistic reward feedback on scheduled reward-opportunity trials, and accumulate score across correct rewarded responses. The preview keeps the same stage order, scoring meaning, timeout fallback behavior, and counterbalancing logic as the local task while using the current psyflow-web APIs and shortening the run length for browser testing and gallery navigation.

## Run

Open the TaskBeacon browser runner and launch `H000039-probabilistic-reward-task` to inspect the preview.
