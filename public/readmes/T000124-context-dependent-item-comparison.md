# Context-Dependent Item Comparison

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Context-Dependent Item Comparison |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000124-context-dependent-item-comparison |
| Short Description | Five comparison contexts guide a first/second choice between two sequential familiar-object pictures. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavioral / intracranial-EEG-compatible trigger design |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (disabled) |

## 1. Task Overview

This task implements the context-dependent picture-comparison paradigm reported by Bausch et al. (2026). A question establishes one of five comparison contexts, two different pictures are then presented sequentially, and the participant selects whether the first or second picture best answers the question. The design crosses five questions with all 12 ordered non-repeating pairs from four familiar-object pictures and repeats every cell five times, yielding 300 trials that support analyses of contextual choice, consistency, and transitivity.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---|---|
| 1. Setup | Parse `human`, `qa`, or `sim` mode; collect subject ID; create `TaskSettings`, window, keyboard, trigger runtime, and preloaded `StimBank`. |
| 2. Instruction | Show `instruction` and wait for `space`. The screen teaches question advance, serial-picture memory, and `1`/`2` responses. |
| 3. Schedule | `build_trial_sequence` creates the exact question × ordered-pair × repetition schedule with `overall_seed = 120120`. |
| 4. Blocks | Partition 300 trials into five blocks of 60. Each block sends start/end triggers and executes `run_trial`. |
| 5. Breaks | Between blocks, show formatted `block_break` progress and wait for `space`. |
| 6. Export | Save one reduced row per logical trial plus a JSON summary of question coverage, RT, and order-reversal consistency. |
| 7. Finish | Show `goodbye`, wait for `space`, send the experiment-end trigger, close trigger runtime and window. |

### Trial-Level Flow

| Phase | Duration / response | Participant-visible content |
|---|---|---|
| Question | Self-paced; minimum 500 ms; `space` advances | One of five context questions, such as “哪个物体在现实中更大？”. |
| Pre-picture fixation | Uniform jitter, 100–200 ms | Central white `+` on black. |
| Picture 1 | 1,000 ms | First centered 420 × 420 px familiar-object image. |
| Inter-picture fixation | Uniform jitter, 200–300 ms | Central white `+` on black. |
| Picture 2 | 1,000 ms | Second centered 420 × 420 px familiar-object image. |
| Pre-answer blank | 16.67 ms | Blank black screen (one nominal 60-Hz frame). |
| Answer | 200-ms minimum display, then up to 300 s for keys `1`/`2` | Centered prompt “1 还是 2？”. No correctness feedback is shown; the long ceiling operationalizes the paper's self-paced response. |

### Controller Logic

| Component | Logic |
|---|---|
| Adaptive controller | None. The task does not adapt timing, stimuli, or scoring online. |
| Trial identity | `next_trial_id()` supplies the framework-owned global trial ID. |

### Other Logic

| Component | Logic |
|---|---|
| Full-factorial scheduler | For each question, constructs all 12 permutations of two different items, repeats them five times, shuffles deterministically within seeded question buckets, and interleaves questions. |
| Choice coding | Key `1` maps to `first_item_id`; key `2` maps to `second_item_id`. The task intentionally does not label subjective choices as correct or incorrect. |
| Summary | Reports question/response counts, mean answer RT, and whether responses agree when the same unordered pair appears in reversed serial order. |

## 3. Configuration Summary

Settings below come from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier from 101 to 999. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 720 px |
| Units | pixels |
| Background | black |
| Fullscreen | false |
| Monitor width | 35.5 cm |
| Viewing distance | 60 cm |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `instruction` | textbox | Chinese task instructions in SimHei. |
| `question_*` | text | Five centered participant-facing comparison questions. |
| `fixation` | text | White central `+`. |
| `item_strawberry` | image | Generated square photograph of one strawberry. |
| `item_wristwatch` | image | Generated square photograph of one analog wristwatch. |
| `item_bicycle` | image | Generated square photograph of one bicycle. |
| `item_house` | image | Generated square photograph of one detached house. |
| `answer_prompt` | text | Centered “1 还是 2？” response prompt. |
| `block_break` | textbox | Formatted progress and rest screen. |
| `goodbye` | text | Completion screen. |

### d. Timing

| Phase | Duration |
|---|---|
| Question | ≥500 ms, then self-paced |
| Pre-picture fixation | 100–200 ms |
| Picture 1 | 1,000 ms |
| Inter-picture fixation | 200–300 ms |
| Picture 2 | 1,000 ms |
| Pre-answer blank | 16.67 ms |
| Answer | 200-ms minimum, then ≤300-s response window |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 2 |
| Block start / end | 3 / 4 |
| Question: bigger / last seen / more expensive / like better / brighter | 10 / 11 / 12 / 13 / 14 |
| Pre-picture fixation | 20 |
| Picture 1 | 30 |
| Inter-picture fixation | 31 |
| Picture 2 | 32 |
| Pre-answer blank | 33 |
| Answer minimum display / response-window onset | 40 / 43 |
| Answer key 1 / 2 / timeout | 41 / 42 / 44 |
| Instruction / break / goodbye | 50 / 51 / 52 |

## 4. Methods (for academic publication)

Participants completed a context-dependent item-comparison task adapted from Bausch et al. (2026). Each trial began with one of five comparison questions: which item is bigger in real life, was seen more recently in real life, is generally more expensive, is liked better, or appears brighter. The question remained visible for at least 500 ms and advanced after a space-key press. A central fixation appeared for 100–200 ms, followed by the first 420 × 420 px familiar-object picture for 1,000 ms, another fixation for 200–300 ms, and the second picture for 1,000 ms. After a 16.67-ms blank, the prompt “1 还是 2？” appeared for 200 ms before a response window of up to 300 s opened on the visually unchanged screen. Participants pressed `1` or `2` to choose the first or second picture. No outcome feedback was provided.

Four fixed images (strawberry, wristwatch, bicycle, and house) were used. This is a reproducible adaptation of the paper's procedure, in which each session used four images selected after a participant-specific neuronal screening. The implemented schedule preserved the reported factorial design: all five questions were crossed with all 12 ordered pairs of two different images, with five repetitions per cell. The resulting 300 trials were deterministically randomized and divided into five 60-trial blocks for rest, without changing the overall cell counts.

Responses were treated as context-dependent judgments rather than trial-wise correct/incorrect classifications. Reduced output contained one row per logical trial with the question, ordered pair, response position, chosen item, and answer RT. The summary quantified response coverage and order-reversal consistency; the complete row-level output also supports question-specific preference ordering and transitivity analyses. The primary protocol source was Bausch, M. et al., “Distinct neuronal populations in the human brain combine content and context,” *Nature* 650, 690–700 (2026), https://doi.org/10.1038/s41586-025-09910-2.
