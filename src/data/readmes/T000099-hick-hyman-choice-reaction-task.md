# Hick–Hyman Choice Reaction Task

| Field | Value |
|---|---|
| Name | Hick–Hyman Choice Reaction Task |
| TaskBeacon ID | T000099 |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000099-hick-hyman-choice-reaction-task |
| Short Description | Equiprobable 2/4/8-choice spatial key task for estimating RT per bit of response uncertainty |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 or compatible |
| PsychoPy Version | 2025.1.1 or compatible |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice disabled) |

## 1. Task Overview

This task measures how response-selection time changes with stimulus–response uncertainty. Participants see a compact row of two, four, or eight possible circle locations. One location contains a black target dot, and the participant presses the spatially corresponding keyboard key as quickly and accurately as possible.

For equiprobable alternatives, information is `H = log2(N)`: two, four, and eight choices contain one, two, and three bits. The primary result is the participant-level linear relation `mean correct RT = a + bH`, where `b` is reported in milliseconds per bit.

The task is distinct from psychomotor vigilance because it requires a differential response among multiple alternatives. It is also distinct from Fitts' law because pointing distance and target width are not manipulated and no aimed cursor movement is required.

## 2. Task Flow

![Task Flow](task_flow.png)

Each participant completes one block at each set size. The six possible block orders are assigned by subject ID modulo six to counterbalance practice and order.

### Block-Level Flow

`Instructions → N=2/4/8 block reminder → 32 balanced trials → block summary/break → next set size → final Hick-law summary`

### Trial-Level Flow

`Fixation (500 ms) → outlined choice set + one filled target (response, 2000 ms max) → error feedback when needed (500 ms) → ITI fixation (700 ms)`

The target screen contains no key labels, so response time reflects the learned one-to-one position–key mapping rather than reading a trial-specific prompt. Errors and timeouts receive corrective feedback; correct responses proceed directly to the ITI.

### Controller Logic

There is no adaptive controller. `BlockUnit.generate_conditions(...)` schedules config-defined target-position labels with equal weights within each set size. Target identities, probabilities, valid mappings, and information values are fully declared in config before trial execution.

### Other logic

The output records the preceding target and whether the current target repeats. This makes the known set-size/repetition relationship available for sensitivity analysis. The final summary uses correct trials only for the RT regression and reports accuracy and timeout rate separately.

## 3. Configuration Summary

### a. Subject Info

| Field | Type | Constraint |
|---|---|---|
| `subject_id` | integer | 3 digits, 101–999 |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 px |
| Background | `#F4F4F2` |
| Units | pixels |
| Fullscreen | false by default |

### c. Stimuli

| Set size | Information | Active positions | Keys from left to right | Trials |
|---:|---:|---|---|---:|
| 2 | 1 bit | inner 2 | F, J | 32 |
| 4 | 2 bits | central 4 | D, F, J, K | 32 |
| 8 | 3 bits | all 8 | A, S, D, F, J, K, L, ; | 32 |

All alternatives are equiprobable. Stimuli are PsychoPy circle primitives: 48 px outline radius, 32 px target radius, and 150 px center-to-center spacing.

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 0.50 s |
| Choice response | until response, 2.00 s max |
| Error/timeout feedback | 0.50 s, conditional |
| ITI | 0.70 s |

### Triggers

Trigger groups distinguish experiment and block lifecycle, trial/fixation onset, target onset for `N=2/4/8`, each physical response key, timeout, feedback, ITI, and participant-facing instruction/summary screens. See `config/config.yaml` for exact codes.

### Adaptive controller

Not applicable. No threshold, deadline, or scoring parameter changes online.

## 4. Methods (for academic publication)

Participants performed a visual choice-reaction task adapted from Hick (1952) and Hyman (1953). Each trial began with a 500-ms central fixation. A horizontal array of two, four, or eight outlined circles then appeared, with a black filled circle marking one equiprobable target location. Participants pressed the spatially corresponding key using the mapping A/S/D/F/J/K/L/; for the eight possible positions; the two-choice block used F/J and the four-choice block used D/F/J/K. The response display remained until the first response or 2000 ms. Incorrect and omitted responses were followed by 500 ms of corrective feedback, and trials ended with a 700-ms fixation interval.

Participants completed 32 trials at each set size, providing exact equal target frequencies within each block. The order of the 2-, 4-, and 8-choice blocks was selected from all six permutations based on subject ID. The primary dependent variable was mean correct reaction time for each set size. Information was coded as `log2(N)` (1, 2, and 3 bits), and ordinary least squares estimated the participant-specific intercept, slope in milliseconds per bit, and coefficient of determination. Accuracy, omissions, and stimulus–response repetitions were retained for audit and sensitivity analysis.

### References

- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology, 45*(3), 188–196. https://doi.org/10.1037/h0056940
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622
- Tajima, S., Drugowitsch, J., Patel, N., & Pouget, A. (2019). Optimal policy for multi-alternative decisions. *Nature Neuroscience, 22*, 1503–1511. https://doi.org/10.1038/s41593-019-0453-9

## Running

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
