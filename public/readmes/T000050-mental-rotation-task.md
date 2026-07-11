# Mental Rotation Task

| Field | Value |
|---|---|
| Name | Mental Rotation Task |
| Version | v0.1.0-dev |
| URL / Repository | `E:\Taskbeacon\T000050-mental-rotation-task` |
| Short Description | Same/different mental-rotation judgment with 3D object-pair JPG stimuli |
| Created By | TaskBeacon build pipeline |
| Date Updated | 2026-07-11 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | English |

## 1. Task Overview

This task implements a 3D object-pair mental rotation paradigm in PsychoPy/PsyFlow. Participants view two objects and decide whether they are the same object rotated in depth or different mirror-image objects.

The canonical human profile presents 12 practice trials followed by two scored blocks of 48 trials. Scored trials cross angular disparity (`0`, `50`, `100`, `150` degrees) with same/different trial type. Responses use `B` for Same and `N` for Different.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Read the mode-specific config and task metadata. |
| Collect Subject Info | Collect subject ID in human mode or inject deterministic IDs in QA/sim. |
| Initialize Runtime | Create the PsychoPy window, keyboard, triggers, and stimulus bank. |
| Show Instructions | Present the Mental Rotation instructions and key mapping. |
| Run Practice | Present practice trials using reserved baseline objects and show correctness feedback. |
| Run Scored Blocks | Present two balanced scored blocks without trial feedback. |
| Show Block Summaries | Display block accuracy, mean correct RT, and timeout count after scored blocks. |
| Save Outputs | Write CSV data and the settings JSON to the mode output folder. |
| Finish | Present the final summary, send the end trigger, and quit PsychoPy. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Blank Screen | Show a black blank screen for 0.25 s before stimulus onset. |
| Response Window | Show one mental-rotation object-pair JPG for up to 7.5 s. |
| Practice Feedback | Show correct / incorrect / timeout feedback only for practice trials. |
| Advance | Scored trials advance directly to the next trial or block summary. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition Scheduling | `src/utils.py` builds a deterministic practice plus scored session plan because label-level scheduling cannot represent the required baseline/angle/trial-type balance. |
| Determinism | Scored block ordering is derived from `overall_seed`, block index, and angle index. |
| Trial Context | Every participant-visible phase in `src/run_trial.py` calls `set_trial_context(...)` before display or response capture. |
| Scoring | Correctness is based on matching the selected response key to the trial type: `B` for same, `N` for different. |
| Simulation | The scripted responder exercises a fixed key path; the sampler responder varies accuracy, RT, and timeout probability by angular disparity and practice status. |

## 3. Configuration Summary

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier. |

### b. Window Settings

| Parameter | Value |
|---|---|
| `window.size` | `[1280, 720]` |
| `window.units` | `pix` |
| `window.bg_color` | `black` |
| `window.fullscreen` | `false` |
| `window.screen` | `0` |

### c. Stimuli

| Stimulus ID | Purpose |
|---|---|
| `instruction_text` | Intro screen explaining same/different judgment and response keys. |
| `blank_screen` | Pre-stimulus black blank screen. |
| `stimulus_image` | Rebuilt per trial to show the selected mental-rotation JPG. |
| `practice_feedback_correct` / `practice_feedback_incorrect` / `practice_feedback_timeout` | Practice-only feedback screens. |
| `practice_break` | Transition from practice to scored blocks. |
| `block_break` | Scored block summary with accuracy, mean RT, and timeouts. |
| `good_bye` | Final task summary and exit screen. |

### d. Timing

| Parameter | Value |
|---|---|
| `timing.blank_duration` | `0.25` s |
| `timing.response_deadline` | `7.5` s |
| `timing.practice_feedback_duration` | `0.8` s |

### e. Triggers

| Trigger | Code |
|---|---|
| `exp_onset` / `exp_end` | `1` / `2` |
| `block_onset` / `block_end` | `10` / `11` |
| `blank_onset` | `21` |
| `stimulus_onset` | `30` |
| `response_b` / `response_n` | `41` / `42` |
| `response_timeout` | `45` |
| `practice_feedback_onset` | `50` |
| `block_break_onset` | `55` |

## 4. Methods (for academic publication)

Participants completed a same/different mental rotation task implemented in PsychoPy/PsyFlow. Each trial presented one JPG stimulus showing a pair of three-dimensional objects. Participants judged whether the pair represented the same object rotated in depth or different mirror-image objects by pressing `B` for Same or `N` for Different.

The human profile included 12 practice trials followed by two scored blocks of 48 trials. Scored trials balanced angular disparity across 0, 50, 100, and 150 degrees and balanced same versus different trial type. Practice trials used baseline objects not used in the scored blocks and provided correctness feedback; scored trials did not provide trial-level feedback. The main dependent measures are accuracy, response time, timeout rate, and angle-by-trial-type performance.
