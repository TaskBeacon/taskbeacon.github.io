# Sperling Partial Report Task

| Field | Value |
|---|---|
| Name | Sperling Partial Report Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000097-sperling-partial-report-task |
| Short Description | Whole-report and delayed auditory partial-report measurement of iconic-memory capacity and decay |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 or compatible |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice disabled) |

## 1. Task Overview

This task measures the capacity and rapid decay of visual sensory memory using
Sperling's whole-report and auditory partial-report procedures. A 3 × 4 matrix
of uppercase letters appears for 50 ms. Whole-report trials request all twelve
letters; partial-report trials reveal the requested row only after the matrix
has disappeared, using a high, middle, or low tone.

The five post-display cue delays (0, 150, 300, 500, and 1000 ms) estimate the
decay function. The primary dependent measures are position-correct letters,
proportion correct, and the partial-report estimate `12 × proportion correct`.
This is a sensory-memory task, not a visual change-detection working-memory
retention task.

Primary source: [Sperling (1960), The information available in brief visual presentations](https://doi.org/10.1037/h0093759).

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Participant registration → instructions → two randomized 36-trial blocks →
between-block summary/break → final summary and data save.

### Trial-Level Flow

1. Fixation (`500 ms`).
2. Three rows of four letters (`50 ms`).
3. Whole report branches directly to an 8-s response window.
4. Partial report waits `0/150/300/500/1000 ms`, then plays the row tone and
   opens a 4-s response window.
5. ITI fixation (`500 ms`).

High (`2500 Hz`), middle (`650 Hz`), and low (`250 Hz`) tones select the top,
middle, and bottom rows respectively. No trial-level correctness feedback is
shown.

### Controller Logic

There is no adaptive controller. PsyFlow's weighted condition scheduler gives
equal expected representation to whole report and each partial-report delay;
row cues are balanced within delay.

### Other Logic

Each trial's twelve non-repeating letters are generated deterministically from
the configured seed and PsyFlow trial ID. The seed and full matrix string are
saved, so every trial can be reconstructed. Responses are scored by serial
position and reduced to one logical row per trial.

## 3. Configuration Summary

### a. Subject Info

| Field | Constraint |
|---|---|
| Subject ID | Three digits, 101-999 |
| Age | 18-80 years |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 × 800 |
| Units | visual degrees |
| Background | black |
| Human mode | fullscreen |

### c. Stimuli

| Stimulus | Implementation |
|---|---|
| Letter array | Three centered PsychoPy text rows, four uppercase letters each |
| Row cues | Program-generated mono WAV: 250, 650, 2500 Hz |
| Response prompts | Chinese text in SimHei; cue row is not named visually |

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 500 ms |
| Matrix | 50 ms |
| Cue delay | 0, 150, 300, 500, or 1000 ms |
| Cue tone | 500 ms |
| Whole-report window | 8 s |
| Partial-report window | 4 s |
| ITI | 500 ms |

### e. Triggers

Triggers distinguish experiment/block boundaries, fixation, whole versus
partial matrix onset, each nonzero delay, each row cue, letter responses,
timeouts, and ITI. Human mode uses the configured serial driver; QA/simulation
use the mock runtime.

### f. Adaptive Controller

Not applicable.

## 4. Methods (for academic publication)

Participants viewed a centrally presented 3 × 4 array of non-repeating
uppercase letters for 50 ms. On whole-report trials, they entered all twelve
letters in row-major order. On partial-report trials, an auditory cue beginning
0, 150, 300, 500, or 1000 ms after display offset selected one row: 2500 Hz
selected the top row, 650 Hz the middle row, and 250 Hz the bottom row. Each
tone lasted 500 ms. Participants entered the four letters from the cued row.

Responses were compared with the target at corresponding serial positions.
Whole-report span was the mean number correct out of twelve. Partial-report
capacity was estimated as twelve times the proportion correct in the cued row.
The difference between immediate partial-report capacity and whole-report span
indexed the partial-report advantage; capacity by cue delay indexed iconic
memory decay. Trials were randomized using configured weights, with equal
expected frequency for whole report and every delay level and balanced row cues
within delay.

### Run commands

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
