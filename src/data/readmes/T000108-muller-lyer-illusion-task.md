# Muller-Lyer Illusion Task

| Field | Value |
|---|---|
| Name | Muller-Lyer Illusion Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000108-muller-lyer-illusion-task |
| Short Description | Method-of-adjustment estimate of the classical Muller-Lyer point of subjective equality and illusion magnitude |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 or compatible |
| PsychoPy Version | 2025.1.1 or compatible |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice disabled) |

## 1. Task Overview

This task measures the classical Muller-Lyer visual length illusion with the method of adjustment. On every trial, participants see a fixed inward-fin reference shaft on the left and an outward-fin comparison shaft on the right. They shorten or lengthen the comparison until both shafts look equal, then confirm the judgment.

The primary outcome is the point of subjective equality (PSE), defined as the mean confirmed comparison length. The sample standard deviation of adjustments estimates the difference limen (DL). Signed illusion magnitude is `reference length - PSE`; positive values indicate that the outward-fin comparison had to be physically shorter to match the inward-fin reference.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

The session presents Chinese instructions, then one randomized block of 20 trials: 10 begin from a short comparison and 10 from a long comparison. Each trial follows fixation (500 ms) -> bidirectional adjustment (15 s maximum) -> blank ITI (500 ms). The left/right arrow keys change comparison length by 0.10 deg and Space confirms equality. No correctness feedback is shown.

### Trial-Level Flow

Fixation (500 ms) -> inward-fin reference plus adjustable outward-fin comparison (15 s maximum) -> blank ITI (500 ms).

### Controller Logic

Controller logic: none. Conditions are balanced by PsyFlow block scheduling. The comparison length is bounded to 4.0-12.0 deg and the task accepts at most 100 adjustment actions per trial.

Other logic: the completion screen reports valid-trial count, PSE, DL, signed illusion magnitude, and percent illusion magnitude. Trial-level exports retain starting length, confirmed length, response time, adjustment count, timeout state, and trial illusion estimates.

## 3. Configuration Summary

### a. Subject Info

| Field | Configuration |
|---|---|
| Subject ID | 3-digit integer, 101-999 |
| Age | 18-80 |
| Gender | 男 / 女 / 其他 |

### b. Window Settings

| Item | Configuration |
|---|---|
| Window | 1280 x 800, degrees, 57-cm distance, 35.5-cm monitor width |
| Background | medium gray (`#707070`) |
| Reference | inward fins, 8.0-deg shaft, center `(-6.0, 0.5)` |
| Comparison | outward fins, 4.0-12.0-deg shaft, center `(6.0, 0.5)` |
| Fins | 2.0 deg, 30-deg acute angle |
| Rendering | white PsychoPy vector lines, 4 px width |

### c. Stimuli

Both Muller-Lyer figures are generated at runtime from vector line primitives. All participant-facing text is defined in YAML with SimHei.

### d. Timing

| Phase | Duration / response |
|---|---|
| Fixation | 500 ms |
| Adjustment | 15 s maximum; Left / Right / Space |
| ITI | 500 ms |

### Triggers

| Event family | Codes |
|---|---|
| Experiment / block | 1, 10, 90, 99 |
| Fixation / adjustment condition | 20, 31, 32 |
| Shorten / lengthen / confirm / timeout | 41, 42, 43, 44 |
| ITI | 80 |

Adaptive controller: none.

## 4. Methods (for academic publication)

Participants completed 20 trials of a computerized Muller-Lyer method-of-adjustment task. A fixed 8.0-deg inward-fin reference figure was displayed to the left of an outward-fin comparison figure. Both figures were drawn in white on a medium-gray background; fins were 2.0 deg long and met the shaft at an acute angle of 30 deg. The comparison shaft began at either 6.0 or 10.0 deg on equally frequent, randomly ordered trials. Participants adjusted its length in 0.10-deg increments with the left and right arrow keys and pressed Space when the two shafts appeared equal. Each judgment had a 15-s deadline, and no accuracy feedback was given. PSE was calculated as the mean confirmed comparison length, DL as the sample standard deviation, and relative illusion magnitude as `100 * (8.0 - PSE) / 8.0`.

### Run locally

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
