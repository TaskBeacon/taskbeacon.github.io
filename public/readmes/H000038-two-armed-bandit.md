# Two-Armed Bandit Task (HTML Preview)

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Two-Armed Bandit Task |
| Version | html (v0.2.3-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000038-two-armed-bandit |
| Short Description | Browser preview of the two-choice probabilistic reward learning task with block-wise contingencies |
| Created By | TaskBeacon py2js port |
| Date Updated | 2026-04-03 |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the local `T000038-two-armed-bandit` task. Participants repeatedly choose between a left and a right machine, receive stochastic reward feedback, and learn which side is better within each block. The browser preview preserves the local trial contract and response mapping, while shortening the run to a 2-block, 12-trial preview for fast review in the shared runner.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config. |
| Show Instructions | Present the Chinese instruction screen. |
| Initialize Reward Tracker | Start cumulative reward at 0 points. |
| Generate Conditions | Expand the block-wise left/right reward probabilities into repeated trial conditions. |
| Run Trials | Execute the same fixation -> choice -> confirmation -> feedback -> ITI flow as the local task. |
| Block Summary | Show per-block response and reward summary when more than one block remains. |
| Finalize | Show the final total score and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Pre-choice fixation | A central fixation cross is shown briefly. |
| Bandit choice | Left and right machines are shown; the participant presses `F` or `J`. |
| Choice confirmation | The selected machine is highlighted briefly. |
| Outcome feedback | Win/no-win feedback and running total are shown. |
| Inter-trial interval | A short fixation interval separates trials. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition scheduling | A block-specific `(p_left, p_right)` schedule is repeated across trials. |
| Reward sampling | The chosen side is sampled with Bernoulli reward using the configured probability. |
| No-response fallback | If the response deadline expires, a configurable fallback choice is imputed. |
| State tracking | A cumulative reward tracker updates the running score after every trial. |
| Adaptive control | None. This is a static probabilistic learning task, not a staircase or reversal task. |

### Other Logic

| Feature | Description |
|---|---|
| Trial context | Every participant-visible screen emits trial context before `show()` or `captureResponse()`. |
| Deterministic QA seed | Preview sampling uses the configured block seeds for reproducible browser QA runs. |
| Summary metrics | Block and final summaries report left-choice rate, win rate, response rate, and total score. |

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
| `instruction_text` | text | Chinese instructions describing the left/right machine choice task. |
| `fixation` | text | Central fixation marker shown before choice and during ITI. |
| `machine_left` / `machine_right` | rect | Left/right machine panels. |
| `machine_left_label` / `machine_right_label` | text | Left/right machine labels. |
| `highlight_left` / `highlight_right` | rect | Selected-machine highlight overlays. |
| `choice_prompt` | text | Prompt asking the participant to choose a machine. |
| `target_prompt` | text | Brief confirmation of the selected machine. |
| `feedback_win` / `feedback_loss` | text | Reward outcome feedback with the updated score. |
| `block_break` | text | Optional block summary for multi-block preview runs. |
| `good_bye` | text | Final total score shown at task completion. |

### d. Timing

| Phase | Duration |
|---|---|
| `timing.pre_choice_fixation_duration` | `0.5 s` |
| `timing.bandit_choice_duration` | `2.5 s` |
| `timing.choice_confirmation_duration` | `0.4 s` |
| `timing.outcome_feedback_duration` | `0.8 s` |
| `timing.iti_duration` | `0.6 s` |

### e. Browser Preview Differences

| Parameter | Meaning |
|---|---|
| `task.total_blocks` | Shortened to 2 for preview. |
| `task.trial_per_block` | Shortened to 6 for preview. |
| `task.total_trials` | Shortened to 12 for preview. |
| `condition_generation.block_probabilities` | Uses the first two block contingencies from the full local task. |

## 4. Methods (for academic publication)

The HTML companion presents the same two-armed bandit learning task as the local PsychoPy build, but inside the shared browser runner. On each trial, participants choose one of two machines with block-specific reward probabilities, receive stochastic feedback, and update their choice strategy over time. The preview keeps the same stage order, scoring meaning, and timeout/fallback behavior as the local task while shortening the overall run length for browser testing and gallery navigation.

## Run

Open the TaskBeacon browser runner and launch `H000038-two-armed-bandit` to inspect the preview.
