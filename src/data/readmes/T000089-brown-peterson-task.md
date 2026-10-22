# Brown-Peterson Task

| Field                | Value                        |
|----------------------|------------------------------|
| Name                 | Brown-Peterson Task |
| Version              | v0.1.0 |
| URL / Repository     | https://github.com/TaskBeacon/T000089-brown-peterson-task |
| Short Description    | Computerized consonant-trigram retention task with paced backward-counting distraction. |
| Created By           | TaskBeacon |
| Date Updated         | 2026-08-23 |
| PsyFlow Version      | 0.1.12 |
| PsychoPy Version     | 2025.2.4 |
| Modality             | Behavioral; visual memory stimuli with auditory metronome pacing |
| Language             | Chinese interface; Latin consonant task materials |
| Voice Name           | zh-CN-YunyangNeural (configured; synthesized voice disabled) |

## 1. Task Overview

The Brown-Peterson Task measures short-term verbal retention when active rehearsal is blocked by a paced backward-counting task. Participants encode a three-consonant string and a three-digit starting number, count backward aloud by three or four for a filled interval of 3, 6, 9, 12, 15, or 18 seconds, and then reproduce the consonants in their original order. The primary outcomes are exact-trigram recall, serial-position accuracy, recall latency, and the retention function across the six delays.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|------|-------------|
| Setup | `main.py` loads the selected human/QA/simulation config, creates `TaskSettings`, initializes the window, keyboard, trigger runtime, and preloaded `StimBank`. |
| General instruction | `instruction_general` explains the memorize-count-stop-recall procedure and waits for SPACE. |
| Practice | Two deterministic practice trials use 3-second/step-3 and 6-second/step-4 plans, followed by target-versus-response feedback. |
| Scored instruction | `scored_instruction` introduces the no-feedback scored phase. |
| Scored blocks | Eight blocks of six trials are run. Each block contains all six retention intervals once and three trials at each decrement; block order is deterministically shuffled. |
| Breaks | `block_break` follows blocks 1-7 and reports only the current block's exact-recall accuracy. |
| Completion | `good_bye` reports whole-task exact and letter-position accuracy plus recall timeouts, saves one logical trial per CSV row, and exits on SPACE. |

### Trial-Level Flow

| Step | Description |
|------|-------------|
| Encoding | `encoding_trigram`, `encoding_number`, and `encoding_step` appear in separate vertical bands for 1.5 seconds. |
| Filled retention | `counting_fixation` replaces the memory display while `metronome_ticks` plays at 2 Hz for the scheduled 3-18 seconds; the participant counts backward aloud. |
| Recall cue | A red `recall_cue` signals the participant to stop counting immediately. |
| Serial response | Three `recall_entry` units collect one consonant key per serial position under one shared 15-second deadline. Previously entered letters remain visible. |
| Practice feedback | Practice trials alone show `feedback_correct` or `feedback_incorrect` for 1.0 second. |
| ITI | `fixation` is shown for 0.75 seconds before the next trial. |

### Controller Logic

| Component | Description |
|-----------|-------------|
| Adaptive controller | None. Timing and scoring are fixed by the classic protocol. |
| Trial identity | Every logical trial obtains its ID from PsyFlow `next_trial_id()`. |

### Other Logic

| Component | Description |
|-----------|-------------|
| Session scheduler | `generate_session_schedule()` compiles all core factors before the first scored trial; `run_trial.py` performs no experimental randomization. |
| Interval balance | Each block contains 3, 6, 9, 12, 15, and 18 seconds exactly once. |
| Decrement balance | Each block has three step-3 and three step-4 trials; each interval is paired with each step four times in the full session. |
| Material constraints | All 48 scored trigrams and starting numbers are unique; adjacent trigrams share no letters, including across block boundaries. |
| Scoring | A letter is correct only in its original serial position; exact recall requires all three positions and a completed response. |

## 3. Configuration Summary

All settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|-------|---------|
| `subject_id` | Three-digit participant identifier from 101 to 999. |
| `age` | Participant age from 18 to 80 years. |
| `gender` | Male, Female, or Other. |

### b. Window Settings

| Parameter | Value |
|-----------|-------|
| Size | 1280 x 800 pixels |
| Units | Degrees of visual angle |
| Background | `#F4F4F2` |
| Fullscreen | False by default |
| Monitor geometry | 35.5-cm width at 57-cm viewing distance |

### c. Stimuli

| Name | Type | Description |
|------|------|-------------|
| `encoding_trigram` | Text | Large three-consonant memory item in Arial. |
| `encoding_number` | Text | Three-digit backward-counting start number. |
| `encoding_step` | Text | Chinese decrement instruction, 3 or 4. |
| `counting_fixation` | Text | Neutral central dot during the filled interval. |
| `metronome_ticks` | Sound | Generated 18-second 2-Hz pacing track, truncated by the scheduled interval. |
| `recall_cue` | Circle | Red signal corresponding to the historical recall light. |
| `recall_entry` | Text | Serial-position prompt and entered letters. |
| Practice feedback | Text | Correctness plus target and response; absent from scored trials. |

### d. Timing

| Phase | Duration |
|-------|----------|
| Encoding | 1.5 seconds |
| Filled retention | 3, 6, 9, 12, 15, or 18 seconds |
| Recall | 15 seconds maximum across all three letters |
| Practice feedback | 1.0 second |
| ITI | 0.75 seconds |

### e. Triggers

| Event | Code |
|-------|------|
| Experiment start / end | 1 / 99 |
| Block start / end | 10 / 19 |
| Encoding, 3-18 seconds | 20-25 |
| Distractor, 3-18 seconds | 30-35 |
| Recall cue | 40 |
| Letter response | 41 |
| Recall timeout | 42 |
| Practice correct / incorrect feedback | 50 / 51 |
| ITI | 60 |

### f. Adaptive Controller

| Parameter | Value |
|-----------|-------|
| Controller | None; the six retention intervals and two decrement steps are fixed and balanced. |

## 4. Methods (for academic publication)

Participants completed a computerized Brown-Peterson short-term retention task based primarily on Peterson and Peterson (1959). On every trial, a three-consonant string, a three-digit number, and a backward-count decrement of three or four were displayed for 1.5 s. The memory display was then replaced by a neutral fixation dot while an auditory metronome clicked twice per second. Participants counted backward aloud from the displayed number in synchrony with the metronome, preventing continuous rehearsal of the consonants. The filled retention interval lasted 3, 6, 9, 12, 15, or 18 s. A red circle then signaled participants to stop counting immediately and enter the three consonants in serial order. All three key responses shared a 15-s deadline.

After two practice trials with corrective feedback, participants completed 48 scored trials in eight blocks of six. Every block included each retention interval once; backward-count decrements were balanced within blocks and crossed equally with every retention interval across the session. Each scored trial used a unique three-consonant item and three-digit starting number. Consonants excluded vowels and Y, no consonant repeated within a trigram, and consecutive scored trigrams shared no letters. These session-level constraints were compiled deterministically before task onset to support exact replay and audit.

The principal dependent variable was exact trigram recall. Letter-level accuracy was additionally scored by serial position, following Brown's positional criterion, and response completion latency and timeout status were recorded. The retention-interval manipulation should be interpreted as performance under an attention-occupying distractor rather than as a pure assay of passive trace decay; contemporary evidence shows that time, rehearsal opportunity, processing demand, and interference must be distinguished when explaining short-term forgetting.
