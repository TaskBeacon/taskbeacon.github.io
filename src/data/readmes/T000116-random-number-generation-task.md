# Random Number Generation Task

| Field | Value |
|---|---|
| Name | 随机数字生成 / Random Number Generation Task |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000116-random-number-generation-task |
| Short Description | Self-generated digits at a visual metronome; multidimensional sequence measures |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Local current checkout |
| PsychoPy Version | Installed supported runtime |
| Modality | Behavior, keyboard |
| Language | Chinese / SimHei |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

## 1. Task Overview

Generate a digit 0–9 on every visual beat as an independent draw with replacement. Repetitions are allowed; avoid habitual counting and fixed patterns. This is an original Chinese keyboard/visual-paced adaptation of the user-provided RNG methods associated with [Baddeley (1966)](https://doi.org/10.1080/14640746608400019), using separate descriptive metric families from [Towse & Neil (1998)](https://doi.org/10.3758/BF03209475). It is not an exact replication, licensed test, normed measure, or clinically validated executive-function score.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Behavior |
|---|---|
| Instruction | Independent draws, repeats allowed, top-row digit keys, release each key; space to continue |
| Practice | Start screen, 10 fixed beats; separately tagged and excluded from main analysis |
| Main | Two blocks of 100 beats each; self-paced rest/start screen before each block |
| Finish | Neutral completion screen; save rows and per-block summaries |

### Trial-Level Flow

| Phase | Display / response / timing |
|---|---|
| generation | Center circle alternates filled/hollow every beat; first valid digit retained; complete nominal 1.0s window regardless of response |
| Next beat | No blank/feedback/history; opposite circle at next capture onset; missed beat remains null |

### Controller Logic

| Component | Rule |
|---|---|
| Adaptive controller | None; all beats same period, no performance adjustment |
| Beat plan | BlockUnit delegates deterministic precompiled cue/index/nominal-onset plan; no random computer digits shown |
| Reset | SequenceRecord resets at practice/main block boundaries |

### Other Logic

| Measure | Exact meaning |
|---|---|
| Frequency / R | Ten digit counts; H=−sum(p log2 p), R=100(1−H/log2(10)); null with no responses |
| Counting adjacency | +1 and −1 proportions, separate and combined; denominator consecutive paced-beat pairs with both responses |
| Immediate repetition | Equal digits on consecutive valid paced beats / eligible pairs |
| Transition distribution | 10×10 counts and row-conditional probabilities; unobserved source row null |
| First-order differences | Counts −9…9 over eligible paced-beat pairs |
| Repetition distances | Since preceding same digit: beat distance and valid-response distance, separately labeled and distributed |
| Missed beats | Scheduled beat with no accepted digit; omission count and fraction |
| Timing QC | Planned onset, actual onset/close/response timestamps, actual interval, relative drift and cadence error |

Omissions **break adjacency**; there is no last-to-first sequence wrap and 9→0 is not counting adjacency. This paced-pair convention intentionally differs from RGCalc wrap-around scoring. A perfectly ordered counting sequence can have R=0; no single metric establishes randomness. No Evans RNG scalar or combined diagnostic score is provided. Additional presses in the same beat are ignored, not claimed to be fully recorded. Each response must be released. Framework `hit` only means a valid digit, not a correct random answer.

## 3. Configuration Summary

Settings are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Three-digit research ID, 101–999; avoid personally identifying information |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size / units | 1280×800 / pixels |
| Background / font | White / SimHei |
| Acquisition | Behavioral mock triggers; no hardware calibration claim |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction | text | Chinese response rule, draws with replacement, no counting examples |
| practice_start / block_start | text | Beat count and self-paced start |
| filled / hollow | circle | Center, radius36px, dark5px outline, dark/white fill |
| good_bye | text | Neutral completion |

### d. Timing

| Phase | Duration |
|---|---|
| Each generation beat | Nominal1.0s fixed window; actual software timing exported |
| Starts/rests | Until space |
| QA/sim | 4 practice + 2×6 main,0.1 timing scaling; no human timing validity claim |

### Triggers

| Event | Code |
|---|---|
| experiment start / instruction | 1 / 2 |
| block start / generation onset | 10 / 20 |
| digit0…9 | 30…39 |
| missed beat | 50 |
| block end / experiment end | 90 / 99 |

### Adaptive Controller

| Parameter | Value |
|---|---|
| Adaptation | None |

Run `python main.py human`, `python main.py qa --config config/config_qa.yaml`, or `python main.py sim --config config/config_sampler_sim.yaml`. Human outputs are ignored by Git. One reduced row per paced beat; `generation_` fields preserve native phase data; final beat of each block contains `block_summary`. Sidecar `_summary.json` contains summaries per block. Analyze main blocks separately, exclude `is_practice=true`, and inspect omitted beats and timing QC before interpreting randomness measures.

## 4. Methods (for academic publication)

Participants generate digits from 0–9 using the top keyboard row at a nominal1Hz visual pace. A central dark filled circle alternates with a dark outline circle at every beat. Each beat retains a full1.0s response window irrespective of keypress. The first valid digit is accepted; further same-beat presses are ignored. Repetitions are permitted, and participants are instructed to approximate independent draws with replacement, avoid habitual counting or fixed patterns, and resume on the current beat after an omission. There are10 practice beats followed by two100-beat main blocks, each preceded by a self-paced start screen. Digits, scores and feedback are never shown during generation.

Descriptive analyses distinguish digit-use redundancy, ordinal counting, immediate repetition, transitions, first-order differences, repetition distance and missed beats. Pairwise measures use only consecutive paced beats containing responses, with no wrap-around; omissions remain explicit. Repetition distances are reported both in beat positions and valid-response positions. Undefined quantities are null, and no composite clinical or executive-function score is computed. Practice and main histories reset independently.

The user-provided protocol and Baddeley1966 motivate paced self-generation; the publisher abstract was available but original full methods were not retrieved. Towse and Neil1998 supplies the multidimensional scoring rationale. Digit vocabulary, visual modality, geometry, keyboard selection, Chinese translation, counts,1Hz period and omission conventions are original, explicitly inferred adaptation choices. Software timing does not establish physical display calibration; fixed-duration sequential capture may accumulate frame/runtime overhead, which is exported as cadence error and onset drift. Device QA and participant comprehension/motor-effects piloting are required before research deployment. No norms, psychometric equivalence or clinical validity are claimed.

Python cadence uses native high-resolution `generation_flip_time` (PsychoPy monotonic clock), not the coarse core.getAbsTime epoch field. `runtime_window_s` is the requested/scaled software duration, not a physical period measurement. Native epoch columns are retained for audit but are unsuitable for subsecond cadence.

The flow diagram is schematic: circle size is enlarged for legibility and is not a calibrated spatial scale. Trigger code2 is reserved in config; lifecycle instruction pulse is not emitted in this version.
