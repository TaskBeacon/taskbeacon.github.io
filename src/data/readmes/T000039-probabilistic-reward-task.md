# Probabilistic Reward Task

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Probabilistic Reward Task |
| Version | v0.1.0-dev |
| URL / Repository | E:/Taskbeacon/T000039-probabilistic-reward-task |
| Short Description | Chinese signal-detection reward task with short/long mouth discrimination and controlled 3:1 reward opportunities. |
| Created By | TaskBeacon |
| Date Updated | 2026-04-04 |
| PsyFlow Version | 0.1.9 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural |

## 1. Task Overview

This task is a Chinese adaptation of the classic probabilistic reward task. Participants view a brief cartoon face stimulus and decide whether the mouth is short or long. One stimulus type is assigned the rich reward contingency and earns three times as many reward opportunities as the lean stimulus. The task is designed to measure reward responsiveness, response bias, and anhedonia-related behavior.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| 1. Parse mode/config | `main.py` loads the runtime mode and YAML config. |
| 2. Initialize runtime | Window, keyboard, triggers, and stimulus bank are initialized. |
| 3. Determine counterbalance | Subject ID deterministically maps to response-key and rich-stimulus assignment. |
| 4. Run instructions | The participant reads the instruction page and starts with space. |
| 5. Practice | Two practice trials provide correctness feedback only. |
| 6. Execute blocks | Three experimental blocks of 100 trials are run with controlled reward schedules. |
| 7. Rest breaks | A fixed 30-second rest follows each block. |
| 8. Final summary | Final cumulative bonus is shown and data are saved. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Central `+` for 500 ms. |
| Face preview | Mouthless cartoon face appears for 500 ms. |
| Mouth flash | Short or long mouth is flashed for 100 ms. |
| Response window | The face remains visible while response is collected for up to 2.5 s. |
| Outcome feedback | Reward feedback appears only on rewarded correct trials; otherwise a neutral frame is shown. |
| Inter-trial interval | A short fixation interval precedes the next trial. |

### Controller Logic

| Component | Description |
|-----------|-------------|
| Schedule generator | `generate_prt_schedule(...)` creates balanced short/long trial orders and controlled reward-opportunity lists. |
| Rich/lean ratio | Each block uses 30 reward opportunities for the rich stimulus and 10 for the lean stimulus. |
| Deferred reward rule | Missed reward opportunities remain pending until the next correct response to the same stimulus type. |
| Counterbalancing | `subject_id mod 4` balances both key mapping and rich-stimulus assignment. |
| Reward tracking | `RewardTracker` accumulates bonus points and pending opportunities. |
| Signal detection metrics | Block summaries compute response-bias and discriminability style metrics for audit/logging. |

### Other Logic

| Component | Description |
|-----------|-------------|
| Practice trials | Two practice trials use correctness-only feedback and do not alter reward totals. |
| Rest breaks | Breaks are timed rather than key-gated to match the source protocol’s fixed 30-second rest. |
| Stimulus rendering | The face and mouth are drawn from PsychoPy primitives defined in config; no external images are required. |

## 3. Configuration Summary

All settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|-------|---------|
| `subject_id` | 3-digit participant identifier used for deterministic counterbalancing. |

### b. Window Settings

| Parameter | Value |
|-----------|-------|
| `size` | `[1280, 720]` |
| `units` | `pix` |
| `screen` | `0` |
| `bg_color` | `black` |
| `fullscreen` | `false` |
| `monitor_width_cm` | `35.5` |
| `monitor_distance_cm` | `60` |

### c. Stimuli

| Name | Type | Description |
|------|------|-------------|
| `fixation` | text | Centered `+` fixation cross. |
| `face_outline` | circle | Cartoon face outline. |
| `eye_left` / `eye_right` | circle | Eyes used in the face preview and response screen. |
| `mouth_short` / `mouth_long` | line | Short and long mouth line stimuli. |
| `practice_feedback_correct` / `practice_feedback_incorrect` | text | Practice-only correctness feedback. |
| `reward_feedback` | text | Reward feedback with running bonus. |
| `block_break` | text | Fixed-duration rest screen between blocks. |
| `good_bye` | text | Final completion screen. |

### d. Timing

| Phase | Duration |
|-------|----------|
| Practice fixation | `0.5 s` |
| Face preview | `0.5 s` |
| Mouth flash | `0.1 s` |
| Response window | `2.5 s` |
| Reward feedback | `1.75 s` |
| Practice feedback | `1.75 s` |
| ITI | `0.5 s` |
| Block break | `30 s` |

### e. Triggers

| Event | Code |
|-------|------|
| Experiment onset | `1` |
| Experiment end | `2` |
| Block onset | `10` |
| Block end | `11` |
| Practice onset | `12` |
| Practice end | `13` |
| Fixation onset | `20` |
| Face preview onset | `21` |
| Mouth flash onset | `22` |
| Response onset | `30` |
| Short response | `31` |
| Long response | `32` |
| Response timeout | `33` |
| Reward feedback onset | `40` |
| Neutral feedback onset | `41` |
| ITI onset | `50` |

### f. Adaptive Controller

| Parameter | Value |
|-----------|-------|
| `rich_reward_trials` | `30` per experimental block |
| `lean_reward_trials` | `10` per experimental block |
| `reward_win` | `5` |
| `reward_loss` | `0` |
| `counterbalance_policy` | `subject_id_mod_4` |

## 4. Methods (for academic publication)

This implementation reproduces the classic probabilistic reward task with a mouth-length signal-detection decision. On each trial, a cartoon face is shown briefly, the mouth is flashed for 100 ms, and the participant identifies whether the mouth is short or long. Reward feedback is delivered through a controlled schedule that favors one stimulus type three-to-one over the other and defers missed rewards until the next correct response to the same stimulus type.

The task yields block-wise reward totals and signal-detection style outcome measures, including reward bias and discriminability. Its main purpose is to quantify reward responsiveness and related anhedonia phenotypes while keeping the stimulus set simple, reference-aligned, and fully reproducible in PsychoPy/PsyFlow.

