# Serial Reaction Time Task

| Field | Value |
|---|---|
| Name | Serial Reaction Time Task |
| Task ID | T000057 |
| Version | 0.1.0-dev |
| Date Updated | 2026-07-11 |
| PsyFlow Version | local main / TAPS v0.2.0 |
| PsychoPy Version | 2025.1 compatible |
| Language | Chinese |
| Acquisition | Behavior |
| Modality | Behavioral |
| Runtime | PsyFlow / TAPS v0.2.0 |

## 1. Task Overview

The Serial Reaction Time Task (SRTT) measures visuomotor sequence learning. Participants respond to a black target appearing in one of four horizontal locations by pressing the spatially corresponding D, F, J, or K key. They are not told that target locations follow a repeating 12-item second-order conditional sequence.

The human protocol contains 15 blocks of 96 trials. Blocks 1-12 use the participant's assigned training sequence, block 13 switches to the alternate sequence, and blocks 14-15 restore the trained sequence. A reaction-time increase during transfer and reduction during recovery provide the primary sequence-learning measures.

| Component | Implementation |
|---|---|
| Construct | Implicit visuomotor sequence learning / procedural learning |
| Main manipulation | Trained sequence vs alternate transfer sequence |
| Primary outcomes | Correct RT, accuracy, transfer cost, recovery |
| Response mapping | D / F / J / K from left to right |
| Counterbalancing | SOC1 for odd subject IDs; SOC2 for even subject IDs |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. Chinese task instructions and spatial key mapping.
2. Blocks 1-12: eight repetitions of the assigned 12-item SOC sequence per block.
3. Block 13: eight repetitions of the alternate SOC sequence.
4. Blocks 14-15: the assigned SOC sequence resumes.
5. A self-paced rest screen appears between blocks.
6. The completion screen reports neutral aggregate performance.

### Trial-Level Flow

1. Four empty boxes appear with one black circular target in the scheduled location.
2. The participant presses D, F, J, or K within the 5-second safety window.
3. A correct response removes the target and begins a 250 ms response-stimulus interval.
4. An incorrect or missing response produces a 100 ms tone followed by 150 ms of blank interval, preserving the 250 ms total RSI.

### Controller Logic

No adaptive controller is used. Participant-level sequence assignment is deterministic from subject-ID parity. Exact block schedules are generated before `run_trial()` because the cited SOC order and transfer block cannot be represented by independent weighted labels.

### Other Logic

The task stores sequence identity, position, repetition, target location, correct key, response, RT, correctness, timeout, and block role for every logical trial. QA and simulation use three 12-trial blocks while preserving training, transfer, and recovery semantics.

## 3. Configuration Summary

### a. Subject Info

| Field | Human Profile |
|---|---|
| Subject ID | Three-digit integer, 101-999 |
| Sequence assignment | Odd = SOC1; even = SOC2 |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 x 720 px |
| Background | White |
| Fullscreen | False by default |

### c. Stimuli

| Stimulus | Value |
|---|---|
| Position boxes | Four 140 x 140 px outlined squares |
| Box centers | x = -300, -100, 100, 300 px |
| Target | Black circle, 35 px radius |
| Error feedback | 500 Hz generated tone, 100 ms |

### d. Timing

| Parameter | Human Profile |
|---|---:|
| Response window | 5.0 s safety bound |
| Response-stimulus interval | 250 ms |
| Error tone | 100 ms within the RSI |
| Blocks | 15 |
| Trials per block | 96 |

### Triggers

| Range | Events |
|---|---|
| 1-2 | Experiment onset/end |
| 10-11 | Block onset/end |
| 20-21 | Trial and target onset |
| 31-35 | D/F/J/K responses and timeout |
| 40-41 | Error tone and RSI |
| 50-52 | Instruction, break, and goodbye screens |

### Adaptive Controller

Not applicable. The sequence schedule is fixed and counterbalanced rather than adaptive.

### Runtime Commands

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a four-choice Serial Reaction Time Task implemented in PsychoPy with PsyFlow. Four outlined boxes were continuously arranged horizontally on a white background. On each trial, a black circular target appeared in one location, and participants responded with the spatially corresponding D, F, J, or K key as quickly and accurately as possible. The target was removed when a response was registered. Incorrect responses produced a brief auditory tone. The response-stimulus interval was 250 ms.

Target locations followed one of two counterbalanced 12-item second-order conditional sequences. Each human block contained eight repetitions of the active sequence, yielding 96 trials. Participants completed 15 blocks: blocks 1-12 used the assigned training sequence, block 13 used the alternate sequence, and blocks 14-15 returned to the trained sequence. Participants were not informed about the sequential regularity. Sequence-specific learning was quantified primarily as the increase in mean correct reaction time from block 12 to block 13, with block-14 recovery used as a supporting measure. Incorrect and timeout trials were excluded from reaction-time summaries.

Protocol evidence and implementation decisions are documented in `references/references.md`, `references/parameter_mapping.md`, `references/stimulus_mapping.md`, and `references/task_logic_audit.md`.
