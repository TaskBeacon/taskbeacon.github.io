# Game of Dice Task (HTML Preview)

| Field | Value |
|---|---|
| Name | Game of Dice Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000037-game-of-dice |
| Short Description | Browser companion for the Chinese explicit-risk dice gambling task with four known-probability options, cumulative capital feedback, and psyflow-web trial-context stamping |
| Created By | TaskBeacon py2js port |
| Date Updated | 2026-04-04 |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the local `T000037-game-of-dice` task. Participants make explicit-risk gambling choices on each trial by selecting one of four options with known win probabilities and fixed win/loss magnitudes. The browser companion keeps the same trial stages, scoring meaning, response mapping, and deterministic die-roll logic as the local task, while shortening the run to a smaller 8-trial preview block for fast review in the shared runner. Participant-visible phases now stamp trial context through the psyflow-web unit API so the browser preview stays aligned with the shared runner contract.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config. |
| Show Instructions | Present the Chinese instruction screen. |
| Initialize Capital | Start the running total at 1000 points. |
| Generate Conditions | Repeat the single `gdt_standard` condition across the preview block. |
| Run Trials | Execute the same fixation -> choice -> outcome -> feedback -> ITI flow as the local task with `set_trial_context(...)` annotations on each visible phase. |
| Save Data | Export preview data through the shared runner. |
| Finalize | Close the session through the browser task shell. |

The default preview uses one block, so the optional block-break screen is defined but skipped.

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | A central fixation cross is shown briefly. |
| Choice screen | The current total, prompt, and four risk cards are shown; the participant presses `1`-`4`. |
| Outcome reveal | If a valid response was made, the sampled die roll and selected option are shown. |
| Feedback | If a valid response was made, the win/loss message and updated capital are shown. |
| Timeout branch | If the response window expires, the trial logs `timeout=true`, skips outcome/feedback, and keeps capital unchanged. |
| ITI | A short fixation interval separates trials. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition scheduling | A single repeated `gdt_standard` label is scheduled by block generation, matching the canonical trial contract. |
| Capital tracking | `current_capital` and `total_score` are updated after each valid outcome. |
| Response contract | Keys `1`-`4` select the four gamble options; the same keys are used in preview mode. |
| Trial context | Each displayed unit stamps `trial_context` metadata through the shared psyflow-web API. |
| Adaptive control | None. This is a static explicit-risk task, not a staircase or reversal task. |

### Other Logic

| Feature | Description |
|---|---|
| Deterministic roll | `trialSeed(...)` combines the block seed, block index, and trial id to produce a reproducible six-sided roll. |
| Outcome evaluation | `computeChoiceOutcome(...)` maps the selected option to win/loss magnitude, reward sign, and capital update. |
| Advantageous choice flag | Options with 3 or 4 die faces are marked as advantageous choices for summary reporting. |
| Trial summary | `summarizeGdtTrials(...)` computes win rate, advantageous-choice rate, timeout count, RT, and final capital. |
| Browser API alignment | `main.ts`, `run_trial.ts`, and `utils.ts` now follow the current `psyflow-web` unit/context pattern used by newer TaskBeacon H tasks. |

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
| `instruction_text` | text | Chinese instructions describing the four dice betting options and the 1000-point starting capital. |
| `fixation` | text | Central fixation cross shown before choice and during ITI. |
| `capital_banner` | text | Current total capital shown at the top of the choice screen. |
| `choice_prompt` | text | Prompt asking the participant to choose one of the four options. |
| `option_1` / `option_2` / `option_3` / `option_4` | text | Four explicit-risk gamble cards with 1/6, 2/6, 3/6, and 4/6 probabilities. |
| `outcome_text` | text | Die roll reveal and selected option label. |
| `feedback_win` | text | Win feedback with the point gain and updated capital. |
| `feedback_loss` | text | Loss feedback with the point loss and updated capital. |
| `block_break` | text | Optional block summary for multi-block runs. |
| `end_summary` | text | Final total capital shown at task completion. |

### d. Timing

| Phase | Duration |
|---|---|
| `timing.fixation_duration` | `0.5 s` |
| `timing.choice_duration` | `10.0 s` |
| `timing.outcome_duration` | `0.9 s` |
| `timing.feedback_duration` | `1.0 s` |
| `timing.iti_duration` | `0.8 s` |

### e. Browser Preview Differences

| Parameter | Meaning |
|---|---|
| `task.total_blocks` | Shortened to 1 for preview. |
| `task.total_trials` | Shortened to 8 for preview. |
| `task.voice_enabled` | Disabled in the browser preview. |

## 4. Methods (for academic publication)

The HTML companion presents the same explicit-risk dice gambling task as the local PsychoPy build, but inside the shared browser runner. On each trial, the participant chooses one of four gambles with known probabilities and fixed win/loss magnitudes. The preview keeps the condition semantics, response mapping, scoring meaning, and timeout behavior aligned with the local task while shortening the overall run length for browser testing and gallery navigation.
