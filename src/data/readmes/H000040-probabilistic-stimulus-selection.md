# Probabilistic Stimulus Selection Task (HTML Preview)

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Probabilistic Stimulus Selection Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000040-probabilistic-stimulus-selection |
| Short Description | Browser companion for the kana-based probabilistic stimulus selection task with learning and transfer phases, psyflow-web trial-context stamping, and a local monotonic trial-id counter |
| Created By | TaskBeacon psyflow-web py2js port |
| Date Updated | 2026-04-04 |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the local `T000040-probabilistic-stimulus-selection` task. Participants learn three probabilistic symbol pairs during a training phase and then complete a transfer phase with no feedback. The browser port keeps the same left/right response mapping, kana symbol assignment, learning-versus-transfer logic, and score semantics while using the current psyflow-web APIs and a local monotonic trial-id counter for browser runtime stability.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config. |
| Show Instructions | Present the Chinese instruction screen. |
| Assign Symbols | Randomly assign the six kana symbols to roles A-F for the current participant. |
| Run Learning Block | Present AB, CD, and EF trials with probabilistic correctness feedback. |
| Check Criterion | Evaluate whether the learning block meets the pair-specific accuracy criteria before transfer. |
| Run Transfer Block | Present the 15 pairwise transfer combinations with no feedback. |
| Finalize | Show the final score and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Choice Display | Two kana symbols are shown side by side, one on the left and one on the right. |
| Choice Response | The participant presses the left or right response key. |
| Learning Feedback | Learning trials show `正确` or `错误` feedback. |
| Transfer Interval | Transfer trials skip feedback and proceed directly to the ITI fixation. |
| Inter-Trial Interval | A short fixation separates trials. |

### Controller Logic

| Feature | Description |
|---|---|
| Pair scheduling | The learning phase repeats AB/CD/EF pair trials with pair-specific counts and a fixed safety cap. |
| Symbol assignment | Six kana symbols are shuffled into the six roles once per participant. |
| Learning feedback | Correct-role choices are sampled against pair-specific win probabilities. |
| Transfer test | Transfer pairs are shown without feedback to measure learned preference. |
| Adaptive control | The learning block stops early only when the criterion is met. |

### Other Logic

| Feature | Description |
|---|---|
| Trial context | Every participant-visible screen emits trial context through the current psyflow-web wrapper before `show()` or `captureResponse()`. |
| Trial ids | The browser port uses a local monotonic trial-id counter instead of importing `next_trial_id` from `psyflow`. |
| Deterministic preview seeds | Block seeds keep the preview reproducible across QA and simulation runs. |
| Data semantics | Each row records pair ID, symbol roles, response key, correctness, feedback state, and score update. |

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
| `instruction_text` | text | Chinese instructions explaining the left/right symbol choice task. |
| `block_ready` | text | Brief ready screen shown before learning and transfer blocks. |
| `iti_fixation` | text | Central fixation marker shown between trials. |
| `feedback_correct` / `feedback_incorrect` | text | Learning-phase correctness cues. |
| `good_bye` | text | Final exit screen shown at task completion. |
| `kana_1` through `kana_6` | text | Hiragana symbols assigned to roles A-F. |

### d. Timing

| Phase | Duration |
|---|---|
| `timing.ready_duration` | `1.0 s` |
| `timing.response_timeout` | `2.0 s` |
| `timing.feedback_duration` | `0.5 s` |
| `timing.iti_duration` | `0.5 s` |

### e. Browser Preview Differences

| Parameter | Meaning |
|---|---|
| `task.total_blocks` | Shortened to 2 for preview. |
| `task.learning_trials_per_pair` | Shortened to 2 for preview learning. |
| `task.transfer_trials_per_pair` | Shortened to 1 for preview transfer. |
| `task.max_learning_blocks` | Set to 1 so the preview reaches transfer quickly. |
| `task.left_right_balance_policy` | Uses `random_within_block` to allow the short preview transfer block. |
| `task.total_trials` | Shortened to 21 for the compact preview. |

## 4. Methods (for academic publication)

The HTML companion presents the same probabilistic stimulus selection logic as the local PsychoPy build, but inside the shared browser runner. Participants learn three symbol pairs with different reward probabilities during the training phase and then complete a transfer phase that tests learned preferences without feedback. The preview keeps the same stage order, response mapping, score semantics, and trial-context semantics as the local task while shortening the run to one learning block and one transfer block for browser review.

## Run

Open the TaskBeacon browser runner and launch `H000040-probabilistic-stimulus-selection` to inspect the preview.
