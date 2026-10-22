# Garden-Path Self-Paced Reading Task

| Field | Value |
|---|---|
| Name | 花园路径自定步速阅读 |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000131-garden-path-self-paced-reading-task |
| Short Description | Chinese paired no-所 / early-所 relative-clause moving-window reading |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | 43e52fb (native); web6a03630, see validation |
| PsychoPy Version | 2025.2.4 |
| Modality | behavior; keyboard only |
| Language | Simplified Chinese; SimHei |
| Voice Name | zh-CN-YunyangNeural (disabled) |

## 1. Task Overview

Readers reveal seven sentence regions using SPACE, then answer a yes/no comprehension question. Twelve authored pairs contrast a temporarily main-clause-compatible prefix with an early 所 relative-clause cue. Identical 的+head and subsequent regions permit descriptive critical/spillover comparisons. This is an **unpretested pilot adaptation**: no measured garden-path effect, human cloze validation, word-frequency norms or individual diagnostic interpretation is claimed. 所 also adds a character and affects register/familiarity, so its contrast is not a pure measure of ambiguity alone. Keypress RT is not an eye-movement measure.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Procedure |
|---|---|
| Instruction | Chinese instructions; SPACE begins |
| Practice | Two ordinary sentences, fixed order, comprehension feedback |
| Main | Two blocks of18:6experimental+12filler each; SPACE break before each |
| Lists | Numeric subject parity assigns one version of each12pairs;6ambiguous+6early_cued; each condition3F/3J answers; no item repeated |
| Order | Built-in BlockUnit shuffle, seed131031+subject_id+block_idx |
| End | Save per-trial CSV after eachblock plus descriptive summary; SPACE exits |

### Trial-Level Flow

| Phase | Display / response | Duration |
|---|---|---|
| ready | Length-preserving masks; SPACE starts | Untimed |
| region_01..07 | One revealed region at fixed position, others remasked; SPACE advances | Each10s maximum |
| comprehension | Whole Chinese question; F=yes,J=no | 10s maximum |
| feedback | Correct/incorrect/no-answer message | 0.8s |
| iti | Blank | 0.3s |

A region timeout stops the sentence, skips comprehension, records incomplete reading, then displays timeout feedback and ITI. No return to prior words. Initial start response is excluded from region RT. Questions include RC-role/referent relations and matrix facts; actual questions/keys are in the item inventory.

### Controller Logic

| Policy | Value |
|---|---|
| Adaptive controller | None; no reward or ability score |

### Other Logic

| Outcome | Definition |
|---|---|
| comprehension_correct | 1 iff completed reading and key matches item key; missing separately flagged |
| critical_rt_s / spillover_rt_s | One-based region4 / region5; null for fillers/practice or unread region |
| reading_fast_flag | Any responded region RT below0.1s; raw RT retained |
| analysis_eligible | Experimental, completed, correct comprehension, no fast region |
| Summary | Eligible per-condition means/counts and ambiguous-minus-early_cued differences; null if a condition absent |

## 3. Configuration Summary

All settings are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Integer101–999; parity counterbalances items and enters block seed |

### b. Window Settings

| Window parameter | Value |
|---|---|
| size / units | 1280x800 / pix |
| background / fullscreen | white / false |
| monitor metadata | 35.5cm width,60cm distance; uncalibrated defaults |

### c. Stimuli

| Stimulus name | Type | Description |
|---|---|---|
| region | text,SimHei30px | Seven spatially separated segments; fullwidth dash per hidden character |
| ready_hint | text21px | y=-100; only at start |
| question | text26px | y=70,wrap1050 |
| instruction | text23px | Explicit line breaks; no hypothesis disclosure |
| feedback / block_notice / good_bye | text | Correctness, pause, exit |

### d. Timing

| Phase | Duration |
|---|---|
| Reading / comprehension | 10s /10s maximum |
| Feedback / ITI | 0.8s /0.3s |
| Instruction / ready / pause / exit | Untimed SPACE |

### e. Triggers

| Event | Code |
|---|---|
| experiment_start / end | 1 /99 |
| region onset / response / timeout | 20 /21 /29 |
| comprehension onset / F / J / timeout | 40 /41 /42 /49 |
| feedback / ITI | 50 /60 |

Ready is logged by the standard wait unit without coded triggers. Repeated region codes are interpreted using raw context region_index and region_text. Driver is mock behavioral logging; no acquisition hardware calibration.

Run `python main.py human`, `python main.py qa`, or `python main.py sim --config config/config_sampler_sim.yaml`. QA and simulations use two practice plus four main trials, synthetic responses and exact canonical per-trial timing. Full run uses38logical rows including practice. Exclude `kind=practice` from analysis. Validation artifacts contain synthetic data only.

## 4. Methods (for academic publication)

The task adapts the noncumulative moving-window method described by Just, Carpenter and Woolley (1982), temporary syntactic ambiguity logic from Frazier and Rayner (1982), and the Mandarin 所 cue comparison in Hsu, Hurewitz and Phillips's (2009) author manuscript, Experiment1b. The seven-region display begins masked; each keypress replaces the current region with length cues and reveals the next. Reading time is software time from reveal to next SPACE. A10s safety deadline terminates stalled reading; otherwise a yes/no question and0.8s feedback follow, then a0.3s blank. No eye-tracking, fixation or regression data are acquired.

Twelve original simplified-Chinese item pairs use a main-clause-compatible noun/adverb/verb prefix. The region 的+head requires a relative-clause analysis; an added 所 before the verb provides an earlier cue in the comparison. Critical and immediately following strings, character counts and screen anchors are identical within each pair. Two complementary lists provide one version per pair, balanced6per condition and3yes/3no answers per condition. Twenty-four filler sentences and two practice sentences are included. There is no adaptation or controller. The implemented sample is shorter than the source study and uses original materials and segmentation.

The materials have not undergone human completion, acceptability, plausibility, 所-familiarity, frequency or comprehension pretests. Early-cue lexical/length/register costs and precritical spillover may contribute to the contrast, while repeated structure may induce learning. The cited Mandarin effect was mild and does not establish effects for these sentences. Software tests and simulations cannot establish psychometric validity. Before confirmatory use, pretest the materials, enlarge/rebalance the inventory, control cue-related covariates and preregister analysis/exclusions. Raw times remain available; current eligibility filters are descriptive pilot defaults, not validated thresholds.
