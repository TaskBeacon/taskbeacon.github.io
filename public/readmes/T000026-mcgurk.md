# McGurk Effect Task

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | McGurk Effect Task |
| Version | v0.2.0-dev |
| URL / Repository | https://github.com/TaskBeacon/T000026-mcgurk |
| Short Description | Audiovisual speech integration task with congruent, incongruent, and audio-only trials for measuring McGurk fusion reports. |
| Created By | TaskBeacon |
| Date Updated | 2026-02-19 |
| PsyFlow Version | 0.1.9 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (instruction voice optional) |

## 1. Task Overview

This implementation presents concrete audiovisual syllable stimuli and collects 3-choice perceptual reports (`/ba/`, `/da/`, `/ga/`).

The core manipulation is condition-level audiovisual congruency:
- `congruent`: auditory and visual syllables match
- `incongruent`: canonical mismatches (`A=/ba/ + V=/ga/`, `A=/ga/ + V=/ba/`)
- `audio_only`: auditory syllable with neutral mouth cue

Primary outcome is fusion tendency in incongruent trials (`report=/da/`).

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| 1. Block schedule | `BlockUnit.generate_conditions()` yields condition sequence per block. |
| 2. Trial planning | `Controller.build_trial(condition)` samples concrete syllable pairing for the trial. |
| 3. Trial execution | `run_trial(...)` executes `fixation -> av_stimulus -> decision -> feedback -> iti`. |
| 4. Block summary | Response rate, RT, report distribution, and fusion rate are displayed. |
| 5. Final summary | Same metrics are displayed across all trials at task end. |

### Trial-Level Flow

| Phase | Description |
|---|---|
| `fixation` | Jittered fixation cross. |
| `av_stimulus` | Face primitives + viseme + audio syllable are presented together. |
| `decision` | Participant reports heard syllable (`F=/ba/`, `J=/da/`, `K=/ga/`). |
| `feedback` | Response-recorded or timeout message. |
| `iti` | Jittered inter-trial fixation. |

### Controller Logic

| Component | Description |
|---|---|
| Trial sampler | Samples condition-specific pairings (`congruent`, `incongruent`, `audio_only`). |
| Incongruent policy | Uses configured canonical pair list in `controller.incongruent_pairs`. |
| Duration jitter | Samples fixation and ITI durations from configured ranges. |
| Trial history | Stores trial-level records for block/final summaries. |

### Other Logic

| Component | Description |
|---|---|
| Report categories | `/ba/`, `/da/`, `/ga/` mapped to `F/J/K`. |
| Fusion metric | `fusion_da=true` when incongruent trial report is `/da/`. |
| No objective correctness feedback | Immediate feedback only indicates recorded vs timeout (percept report paradigm). |

## 3. Configuration Summary

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | 3-digit participant identifier. |

### b. Window Settings

| Parameter | Value |
|---|---|
| `size` | `[1280, 720]` |
| `units` | `pix` |
| `screen` | `0` |
| `bg_color` | `black` |
| `fullscreen` | `false` |
| `monitor_width_cm` | `35.5` |
| `monitor_distance_cm` | `60` |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `avatar_face`, `eye_left`, `eye_right`, `nose` | circle/polygon | Shared facial scaffold for audiovisual display. |
| `mouth_ba`, `mouth_da`, `mouth_ga`, `mouth_none` | rect/circle | Visual articulatory cues for congruent/incongruent/control trials. |
| `audio_ba`, `audio_da`, `audio_ga` | sound | Syllable audio files (`assets/audio/*.wav`). |
| `decision_prompt`, `key_hint` | text | Perceptual report question and key mapping hint. |
| `feedback_recorded`, `feedback_timeout` | text | Trial-end status feedback. |
| `block_break`, `good_bye` | text | Block/final summary metrics. |

### d. Timing

| Parameter | Value |
|---|---|
| `fixation_duration` | `[0.5, 0.8]` s |
| `av_duration` | `1.1` s |
| `decision_deadline` | `1.8` s |
| `feedback_duration` | `0.7` s |
| `iti_duration` | `[0.5, 0.9]` s |

### Triggers

| Trigger | Code |
|---|---:|
| `exp_onset`, `exp_end` | `1`, `2` |
| `block_onset`, `block_end` | `10`, `11` |
| `fixation_onset` | `20` |
| `congruent_av_onset`, `incongruent_av_onset`, `audio_only_av_onset` | `30`, `31`, `32` |
| `congruent_decision_onset`, `incongruent_decision_onset`, `audio_only_decision_onset` | `40`, `41`, `42` |
| `response_ba`, `response_da`, `response_ga` | `50`, `51`, `52` |
| `congruent_no_response`, `incongruent_no_response`, `audio_only_no_response` | `60`, `61`, `62` |
| `response_recorded_fb_onset`, `timeout_fb_onset` | `70`, `71` |
| `iti_onset` | `80` |

### Adaptive / Trial Controller

| Parameter | Value |
|---|---|
| `syllables` | `['ba', 'da', 'ga']` |
| `incongruent_pairs` | `[['ba', 'ga'], ['ga', 'ba']]` |
| `random_seed` | `null` (human), fixed in QA/sim profiles |
| `enable_logging` | `true` |

## 4. Methods (for academic publication)

Participants completed a Chinese-instruction McGurk task in which they reported perceived syllables after short audiovisual presentations. Trials manipulated audiovisual congruency to compare matched speech, mismatched speech, and auditory-only control conditions.

Each trial consisted of fixation, audiovisual presentation, forced-choice report, and short feedback/ITI. The implementation logs condition, presented auditory syllable, presented visual viseme, reported syllable, response latency, timeout status, and fusion indicator (`report=/da/` on incongruent trials).

Condition-specific onset and response triggers support synchronized behavioral/neurophysiological acquisition pipelines. QA and simulation profiles preserve the same mechanism with reduced trial counts.
