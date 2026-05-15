# Game of Dice Task (HTML Companion)

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Game of Dice Task |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000037-game-of-dice |
| Short Description | Browser companion for the Chinese explicit-risk dice gambling task with four known-probability options and cumulative capital feedback |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the canonical local `T000037-game-of-dice` task. Participants choose among four explicit-risk gambles on each trial, with known win probabilities and fixed win/loss magnitudes. The browser port keeps the same stage order, response mapping, capital update rule, and reduced-data semantics while using the shared `psyflow-web` runner.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load the browser preview config and stimulus bank. |
| Collect Subject Info | The shared runner collects `subject_id` before the task starts. |
| Show Instructions | Present the Chinese instruction text and optional browser speech voice. |
| Countdown | Show a three-second countdown before the block begins. |
| Run Trials | Present fixation, choice screen, outcome reveal, feedback, and ITI for each condition. |
| Show Block Break | Display a block summary if the task is ever configured for multiple blocks. |
| Finalize | Display the final capital and export data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Show a central fixation cross. |
| Choice Screen | Show the current capital, prompt, and four gamble cards; capture keys `1`-`4`. |
| Outcome Reveal | If a valid response was made, reveal the deterministic die roll and the selected option label. |
| Feedback | If a valid response was made, show win/loss feedback and the updated capital. |
| Timeout Branch | If the response window expires, log `timeout=true`, skip outcome/feedback, and keep capital unchanged. |
| ITI | Show the fixation cross again before the next trial. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition scheduling | Uses `BlockUnit.generate_conditions(...)` with the single `gdt_standard` label. |
| Capital tracking | The current capital is derived from prior reduced rows and updated after each valid outcome. |
| Response contract | Keys `1`-`4` select the four gamble options. |
| Adaptive control | None. This is a static explicit-risk task, not a staircase or reversal task. |

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
| `capital_banner` | Current total capital shown at the top of the choice screen. |
| `choice_prompt` | Prompt asking the participant to choose one of the four risk cards. |
| `option_1` / `option_2` / `option_3` / `option_4` | Four explicit-risk gamble cards with 1/6, 2/6, 3/6, and 4/6 probabilities. |
| `outcome_text` | Die-roll reveal and selected option label. |
| `feedback_win` / `feedback_loss` | Win/loss feedback with the updated capital. |
| `block_break` | Optional block summary screen. |
| `end_summary` | Final total capital shown at task completion. |

### c. Timing

| Parameter | Meaning |
|---|---|
| `timing.fixation_duration` | Duration of the fixation screen. |
| `timing.choice_duration` | Duration of the choice window. |
| `timing.outcome_duration` | Duration of the outcome reveal. |
| `timing.feedback_duration` | Duration of the feedback screen. |
| `timing.iti_duration` | Inter-trial interval duration. |

### d. Triggers

| Parameter | Meaning |
|---|---|
| `exp_onset` / `exp_end` | Experiment start/end. |
| `block_onset` / `block_end` | Block start/end. |
| `fixation_onset` | Fixation screen onset. |
| `choice_onset` | Choice screen onset. |
| `choice_response_key` | Choice keypress trigger metadata. |
| `choice_timeout` | Choice window timeout trigger metadata. |
| `outcome_onset` | Outcome reveal onset. |
| `feedback_onset` | Feedback onset. |
| `iti_onset` | ITI onset. |

### e. Browser Notes

| Parameter | Meaning |
|---|---|
| `task.save_path` | Browser output target; the shared runner downloads results instead of writing to a desktop output directory. |
| `task.voice_enabled` | Enables browser speech synthesis for the instruction text. |
| `task.voice_name` | Voice hint passed to the browser speech synthesis bridge. |

## 4. Methods

Participants completed a browser-based explicit-risk gambling task implemented with the shared `psyflow-web` runtime. On each trial, they chose one of four gambles with known success probabilities and fixed win/loss magnitudes. The choice screen displayed the current capital, the four gamble cards, and a single response prompt, while the subsequent outcome screen revealed the deterministic die roll and the selected option.

The task operationalizes risk preference through repeated choice behavior and capital accumulation. A valid choice triggers a seeded six-sided die roll, followed by win/loss feedback and an updated capital display. If no response is made within the choice window, the trial is logged as a timeout and the capital remains unchanged, preserving the one-trial-one-row analysis contract without fabricating an outcome.

All participant-facing wording is defined in YAML stimulus templates so the same trial logic can be reused across browser preview and future variants without code edits.

## Run

1. Open `psyflow-web` in the shared workspace.
2. Run `npm install` if dependencies are not installed yet.
3. Start the runner with `npm run dev`.
4. Open `http://127.0.0.1:4173/?task=H000037-game-of-dice`.

## Notes

- The browser companion keeps the canonical 18-trial single-block structure intact.
- The local trigger codes are preserved in config for traceability, but the browser runtime does not emit serial triggers.
- Pushes to `main` can refresh the shared runner through `.github/workflows/notify-psyflow-web.yml` when `TASKBEACON_ORG_DISPATCH_TOKEN` is configured.
