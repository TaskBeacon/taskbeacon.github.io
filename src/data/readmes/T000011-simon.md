# Simon Task

![Maturity: piloted](https://img.shields.io/badge/Maturity-piloted-16a34a?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Simon Task |
| Version | v1.2.0 |
| URL / Repository | https://github.com/TaskBeacon/T000011-simon |
| Short Description | A Simon conflict task measuring color-based response control under irrelevant spatial interference. |
| Created By | Zhipeng Cao (zhipeng30@foxmail.com) |
| Date Updated | 2026-03-02 |
| PsyFlow Version | 0.1.9 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior/EEG |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural |

## 1. Task Overview

Participants respond to stimulus color while ignoring stimulus position.
The task operationalizes Simon congruency effects with four condition tokens: `red_left`, `red_right`, `blue_left`, `blue_right`.

## 2. Task Flow

### Block-Level Flow

- Initialize config, triggers, window, and stimuli.
- Show instruction screen and wait for continue key.
- For each block, run generated trial sequence and show block summary.
- Show goodbye screen, save CSV output, and close runtime resources.

### Trial-Level Flow

- `pre_stim_fixation`: show fixation cross.
- `simon_response`: show lateralized colored circle and collect `f/j` response.
- `feedback`: show outcome text (`正确/错误/未反应`).
- `iti`: jittered blank interval before next trial.

### Controller Logic

- No adaptive controller is used.
- Condition generation uses built-in `BlockUnit.generate_conditions(...)`.
- Block-level accuracy is computed from trial `stimulus_hit` values.

### Runtime Context Phases

| Phase Label | Meaning |
|---|---|
| `pre_stim_fixation` | Fixation stage before target onset. |
| `simon_response` | Target response window for Simon conflict trial. |

## Runtime Modes

- Human: `python main.py`
- QA: `python main.py qa --config config/config_qa.yaml`
- Scripted sim: `python main.py sim --config config/config_scripted_sim.yaml`
- Sampler sim: `python main.py sim --config config/config_sampler_sim.yaml`

## 3. Configuration Summary

- `config/config.yaml`: base human profile.
- `config/config_qa.yaml`: QA smoke profile.
- `config/config_scripted_sim.yaml`: scripted simulation profile.
- `config/config_sampler_sim.yaml`: task-local sampler simulation profile.

### a. Subject Info

- Fields: `subject_id`, `subname`, `age`, `gender`.
- Localized field labels are defined in `subinfo_mapping`.

### b. Window Settings

- Full-screen display (`deg` units), gray background.
- Monitor geometry configured via `monitor_width_cm` and `monitor_distance_cm`.

### c. Stimuli

- Fixation: `fixation` (`+`).
- Targets: `red_left`, `red_right`, `blue_left`, `blue_right`.
- Outcome texts: `correct_feedback`, `incorrect_feedback`, `no_response_feedback`.
- Block/flow text: `instruction_text`, `block_break`, `good_bye`.

### d. Timing

- `fixation_duration`: `0.5 s`
- `stim_duration`: `1.0 s`
- `feedback_duration`: `0.5 s`
- `iti_duration`: `[0.8, 1.2] s`

### e. Triggers

| Event | Code |
|---|---:|
| exp_onset | 98 |
| exp_end | 99 |
| block_onset | 100 |
| block_end | 101 |
| fixation_onset | 1 |
| stim_onset | 10 |
| left_key_press | 30 |
| right_key_press | 31 |
| feedback_correct_response | 51 |
| feedback_incorrect_response | 52 |
| feedback_no_response | 53 |

## Outputs

- Human: `outputs/human/`
- QA: `outputs/qa/`
- Scripted sim: `outputs/sim/`
- Sampler sim: `outputs/sim_sampler/`

## 4. Methods (for academic publication)

Participants performed a Simon task where the relevant attribute was stimulus color and the irrelevant attribute was stimulus location.
Each trial started with central fixation, followed by a lateralized red/blue target requiring color-based keypress (`f` for red, `j` for blue), then brief feedback and jittered ITI.
Congruent and incongruent mappings were sampled from the four condition tokens to estimate conflict-related performance differences.