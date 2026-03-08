# Attention Network Test (ANT)

![Maturity: smoke_tested](https://img.shields.io/badge/Maturity-smoke_tested-d97706?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Attention Network Test (ANT) |
| Version | v1.1.2 |
| URL / Repository | https://github.com/TaskBeacon/T000015-ant |
| Short Description | ANT implementation measuring alerting, orienting, and executive-control effects from cue and flanker manipulations. |
| Created By | Zhipeng Cao (zhipeng30@foxmail.com) |
| Date Updated | 2026-03-02 |
| PsyFlow Version | 0.1.9 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior / EEG |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural |

## Run Modes

- Human (default): `python main.py`
- QA: `python main.py qa --config config/config_qa.yaml`
- Scripted Sim: `python main.py sim --config config/config_scripted_sim.yaml`
- Sampler Sim: `python main.py sim --config config/config_sampler_sim.yaml`

## 1. Task Overview

This ANT presents a target arrow flanked by congruent or incongruent arrows, with cue manipulations (`no`, `center`, `double`, `spatial`). Participants respond to the center arrow direction. The task enables estimation of alerting, orienting, and executive-control effects from reaction time and accuracy contrasts.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Setup | Load config, initialize mode context (`human/qa/sim`), create window, preload stimuli, initialize triggers. |
| Instruction | Show `instruction_text` (voice optional in human mode). |
| Block Loop | Generate ANT conditions and run trial loop through `run_trial(...)`. |
| Block Summary | Compute block accuracy and show `block_break`. |
| Finalize | Show `good_bye`, send `exp_end`, save CSV, close trigger runtime, quit PsychoPy. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Show fixation cross (`+`) for `fixation_duration`. |
| Cue (optional) | Show center/double/spatial cue for `cue_duration` if condition requires it. |
| Flanker Response | Show 5-arrow stimulus and capture left/right response during `stim_duration`. |
| Feedback | Show correct/incorrect/no-response feedback text. |
| ITI | Blank interval sampled from `iti_duration`. |

### Controller Logic

No adaptive controller is used in this ANT baseline variant.

## 3. Configuration Summary

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Participant ID (3 digits). |
| `subname` | Participant name (pinyin). |
| `age` | Age (5-60). |
| `gender` | `Male` or `Female`. |

### b. Window Settings

| Parameter | Value |
|---|---|
| `window.size` | `[1920, 1080]` |
| `window.units` | `deg` |
| `window.fullscreen` | `true` |
| `window.bg_color` | `gray` |
| `window.monitor_width_cm` | `60` |
| `window.monitor_distance_cm` | `72` |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `fixation` | `text` | Central fixation cross. |
| `cue_center` | `text` | Center cue (`*`). |
| `cue_up`, `cue_down` | `text` | Spatial cues at upper/lower locations. |
| `congruent_*` | `text` | Congruent 5-arrow arrays. |
| `incongruent_*` | `text` | Incongruent 5-arrow arrays. |
| `correct_feedback` | `text` | Correct response message. |
| `incorrect_feedback` | `text` | Incorrect response message. |
| `no_response_feedback` | `text` | Miss/no-response message. |
| `instruction_text` | `textbox` | Chinese ANT instructions. |
| `block_break` | `text` | Inter-block summary screen. |
| `good_bye` | `text` | End-of-task message. |

### d. Timing

| Phase | Duration |
|---|---|
| `cue_duration` | `0.1 s` |
| `fixation_duration` | `0.5 s` |
| `stim_duration` | `1.0 s` |
| `feedback_duration` | `0.5 s` |
| `iti_duration` | Random in `[0.8, 1.2] s` |

### e. Triggers

| Event | Code |
|---|---:|
| `exp_onset` | 254 |
| `exp_end` | 255 |
| `block_onset` | 252 |
| `block_end` | 253 |
| `fixation_onset` | 1 |
| `center_cue_onset` | 11 |
| `double_cue_onset` | 12 |
| `spatial_cue_up_onset` | 13 |
| `spatial_cue_down_onset` | 14 |
| `stim_1111` ... `stim_4222` | 21-58 family |
| `left_key_press` | 201 |
| `right_key_press` | 202 |
| `feedback_correct_response` | 221 |
| `feedback_incorrect_response` | 222 |
| `feedback_no_response` | 223 |

## 4. Methods (for academic publication)

Participants completed an Attention Network Test combining cue manipulations with flanker congruency conflict. Each trial began with fixation, followed by an optional cue (none, center, double, or spatial), and then a five-arrow target array in which the central arrow defined the required response.

Participants responded to center-arrow direction while ignoring flankers. Congruent and incongruent flankers were used to quantify executive-control costs, while cue contrasts enabled alerting and orienting effect estimates. Feedback and jittered inter-trial intervals were included to stabilize performance and timing.

The implementation is EEG-compatible and includes explicit event markers for fixation, cue class, condition-encoded target onset, response channel, and outcome.
