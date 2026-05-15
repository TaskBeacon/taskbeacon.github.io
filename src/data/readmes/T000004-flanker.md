# Flanker Task

![Maturity: smoke_tested](https://img.shields.io/badge/Maturity-smoke_tested-d97706?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Eriksen Flanker Task |
| Version | v1.2.0 |
| URL / Repository | https://github.com/TaskBeacon/T000004-flanker |
| Short Description | Arrow-based Flanker task for selective attention and interference control (behavior/EEG). |
| Created By | Zhipeng Cao (zhipeng30@foxmail.com) |
| Date Updated | 2026-03-02 |
| PsyFlow Version | 0.1.9 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior/EEG |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural |

## 1. Task Overview

Participants judge the direction of the center arrow while ignoring flankers.
The task includes congruent and incongruent conditions and measures RT/accuracy interference effects.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

- Load config, runtime mode, triggers, window, and stimuli.
- Show instruction screen.
- Run block/trial loops with condition scheduling from `BlockUnit.generate_conditions()`.
- Show block summary screen and continue prompt.
- Save outputs and close runtime resources.

### Trial-Level Flow

- `pre_stim_fixation`: fixation cross.
- `flanker_response`: flanker string display with response capture.
- `inter_trial_interval`: blank ITI before next trial.

### Controller Logic

- Condition generation uses config-defined `task.conditions` with built-in balanced scheduling.
- Correct key is inferred from condition token suffix (`left`/`right`).
- No trial-level reward controller; block-level accuracy is computed from `stimulus_hit`.

### Runtime Context Phases

| Phase Label | Meaning |
|---|---|
| `pre_stim_fixation` | Fixation stage responder context in `src/run_trial.py`. |
| `flanker_response` | Response stage responder context in `src/run_trial.py`. |

## Runtime Modes

- Human (default): `python main.py`
- QA: `python main.py qa --config config/config_qa.yaml`
- Scripted sim: `python main.py sim --config config/config_scripted_sim.yaml`
- Sampler sim: `python main.py sim --config config/config_sampler_sim.yaml`

## 3. Configuration Summary

- `config/config.yaml`: base human profile
- `config/config_qa.yaml`: QA profile
- `config/config_scripted_sim.yaml`: scripted sim profile
- `config/config_sampler_sim.yaml`: sampler sim profile

### a. Subject Info

| Field | Type | Constraints |
|---|---|---|
| `subject_id` | int | 3 digits, 101-999 |
| `subname` | string | free text |
| `age` | int | 5-60 |
| `gender` | choice | `Male`, `Female` |

### b. Window Settings

| Key | Value |
|---|---|
| `size` | `[1920, 1080]` |
| `units` | `deg` |
| `screen` | `1` |
| `bg_color` | `gray` |
| `fullscreen` | `true` |
| `monitor_width_cm` | `60` |
| `monitor_distance_cm` | `72` |

### c. Stimuli

| Stimulus ID | Type | Role |
|---|---|---|
| `fixation` | `text` | fixation cross (`+`) |
| `congruent_left` | `text` | `<<<<<` |
| `congruent_right` | `text` | `>>>>>` |
| `incongruent_left` | `text` | `>><>>` |
| `incongruent_right` | `text` | `<<><<` |
| `instruction_text` | `textbox` | participant instructions |
| `block_break` | `text` | inter-block summary |
| `good_bye` | `text` | closing message |

### d. Timing

| Timing Key | Human Config |
|---|---|
| `fixation_duration` | `0.5` |
| `stim_duration` | `1.0` |
| `iti_duration` | `[0.8, 1.2]` |

### e. Triggers

| Event | Code |
|---|---|
| `exp_onset` | 98 |
| `exp_end` | 99 |
| `block_onset` | 100 |
| `block_end` | 101 |
| `fixation_onset` | 1 |
| `congruent_stim_onset` | 10 |
| `incongruent_stim_onset` | 20 |
| `left_key_press` | 30 |
| `right_key_press` | 31 |
| `response_timeout` | 32 |

## 4. Methods (for academic publication)

Participants performed an Eriksen Flanker paradigm in which the center arrow direction was reported while flanker arrows were ignored. Each trial included a fixation period, followed by a flanker display with a bounded response window, then a jittered inter-trial interval. Conditions included congruent (`<<<<<`, `>>>>>`) and incongruent (`>><>>`, `<<><<`) displays with left/right target directions. Interference effects are quantified from reaction time and accuracy differences between congruent and incongruent conditions.

## 5. References

1. Eriksen, B. A., & Eriksen, C. W. (1974). Effects of noise letters upon the identification of a target letter in a nonsearch task. *Perception & Psychophysics*, 16(1), 143-149.
2. Ridderinkhof, K. R., van der Molen, M. W., Band, G. P., & Bashore, T. R. (1997). Sources of interference from irrelevant information: A developmental study. *Journal of Experimental Child Psychology*, 65(3), 315-341.
3. Botvinick, M. M., Braver, T. S., Barch, D. M., Carter, C. S., & Cohen, J. D. (2001). Conflict monitoring and cognitive control. *Psychological Review*, 108(3), 624-652.
4. Fan, J., McCandliss, B. D., Sommer, T., Raz, A., & Posner, M. I. (2002). Testing the efficiency and independence of attentional networks. *Journal of Cognitive Neuroscience*, 14(3), 340-347.
