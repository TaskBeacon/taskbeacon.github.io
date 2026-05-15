# Language-based Visual World Paradigm

| Field | Value |
|---|---|
| Name | Language-based Visual World Paradigm |
| Version | v0.1.0-dev |
| URL / Repository | `E:\Taskbeacon\T000047-language-based-visual-world-paradigm` |
| Short Description | Spoken-sentence four-object selection task that proxies visual-world prediction and semantic competition |
| Created By | TaskBeacon build pipeline |
| Date Updated | 2026-04-16 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | English |

## 1. Task Overview

This task implements a behavioral proxy for the visual world paradigm. On each trial, participants see four object cards, hear one spoken sentence, and choose which card was named. The task keeps the classic visual-world structure from the literature while using a keyboard-based quadrant response instead of eye-tracking.

Twelve trial labels are organized as six lexical families crossed with two sentence types:
predictive sentences use a strong action verb, and neutral sentences use a generic verb phrase.
The visual display always contains one target, one semantically related competitor, and two unrelated distractors.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Read the mode-specific config and task metadata. |
| Collect Subject Info | Collect subject ID in human mode or inject deterministic IDs in QA/sim. |
| Initialize Runtime | Create the PsychoPy window, keyboard, triggers, and stimulus bank. |
| Prepare Audio | Synthesize the instruction audio and sentence audio from config text. |
| Show Instructions | Present the spoken-task instructions and response-key mapping. |
| Run Block | Generate 12 condition labels and execute the trial state machine. |
| Show Block Break | Display block accuracy, mean correct RT, and timeout count. |
| Save Outputs | Write CSV data and the settings JSON to the mode output folder. |
| Finish | Present the goodbye screen, send the end trigger, and quit PsychoPy. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Fixation | Show a centered fixation cross for 0.5 s. |
| Scene Preview | Show the four-object array for 1.0 s with no response numbers. |
| Sentence Listening | Keep the array on screen while the sentence audio plays. |
| Response Selection | Overlay 1/2/3/4 on the quadrants and capture a keypress for up to 2.5 s. |
| ITI | Show the fixation cross again for 0.6 s before the next trial. |

### Controller Logic

| Feature | Description |
|---|---|
| Condition Scheduling | `BlockUnit.generate_conditions(...)` draws from the explicit 12-label condition list. |
| Determinism | The block seed is derived from the configured overall seed and block index. |
| Trial Context | Every participant-visible phase calls `set_trial_context(...)` for auditability. |
| Scoring | Correctness is based on matching the response key to the target quadrant. |
| Simulation | The sampler responder targets the correct key most of the time and samples a plausible RT. |

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
| `instruction_text` | Intro screen that explains the four-object, spoken-sentence task and response mapping. |
| `fixation` | Center fixation cross. |
| `response_prompt` | Prompt shown during the response window. |
| `block_break` | Block summary with accuracy, mean RT, and timeouts. |
| `good_bye` | Final task summary and exit screen. |
| `trial_bank` entries | Sentence audio plus the object-family content for each of the 12 trial labels. |

### d. Timing

| Parameter | Value |
|---|---|
| `timing.fixation_duration` | `0.5` s |
| `timing.scene_preview_duration` | `1.0` s |
| `timing.response_deadline` | `2.5` s |
| `timing.iti_duration` | `0.6` s |

### e. Triggers

| Trigger | Code |
|---|---|
| `exp_onset` / `exp_end` | `1` / `2` |
| `block_onset` / `block_end` | `10` / `11` |
| `fixation_onset` | `20` |
| `scene_preview_onset` / `scene_preview_offset` | `21` / `22` |
| `sentence_onset` / `sentence_offset` | `23` / `24` |
| `response_window_onset` | `30` |
| `response_1` / `response_2` / `response_3` / `response_4` | `31` / `32` / `33` / `34` |
| `response_timeout` | `35` |
| `iti_onset` | `50` |

## 4. Methods (for academic publication)

Participants completed a spoken-language visual-world task implemented in PsychoPy/PsyFlow. Each trial presented a four-object display containing a target, a semantically related competitor, and two unrelated distractors. After a brief preview, participants heard a sentence and indicated which object was named using a four-choice quadrant response.

Predictive sentences used an action verb that biased the target object before the noun was spoken, whereas neutral sentences used a generic verb phrase. The design is a behavioral proxy for the gaze-based visual-world paradigm, and the runtime logs trial timing, response key, response RT, and accuracy for audit and simulation purposes.
