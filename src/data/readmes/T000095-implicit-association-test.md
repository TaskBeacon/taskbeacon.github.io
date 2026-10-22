# Implicit Association Test

| Field | Value |
|----------------------|------------------------------|
| Name | Implicit Association Test |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000095-implicit-association-test |
| Short Description | Seven-block flower–insect valence IAT with improved D scoring |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese instructions; English reference stimuli |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

## 1. Task Overview

The Implicit Association Test (IAT) measures the relative ease of sorting two target categories with two attribute categories. This implementation reproduces the classic flower–insect valence contrast: FLOWER versus INSECT and PLEASANT versus UNPLEASANT. Participants sort one centered word at a time with the E (left) or I (right) key. Faster performance when FLOWER shares a response with PLEASANT, relative to the reversed pairing, produces a positive D score.

The task is a research measure of relative response association. It is not a diagnostic test and the participant exit screen does not present or interpret an individual score.

| Property | Value |
|---|---|
| Construct | Implicit evaluative association |
| Target categories | FLOWER / INSECT |
| Attribute categories | PLEASANT / UNPLEASANT |
| Response keys | E = left; I = right |
| Human trials | 190 across 7 blocks |
| Primary outcome | Improved IAT D score |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Block | Role | Trials | Visible category mapping |
|---:|---|---:|---|
| 1 | Initial target practice | 20 | FLOWER vs INSECT |
| 2 | Attribute practice | 20 | PLEASANT vs UNPLEASANT |
| 3 | Initial combined practice | 20 | One target + one attribute per side |
| 4 | Initial combined test | 40 | Same pairing as Block 3 |
| 5 | Reversed target practice | 30 | FLOWER/INSECT sides reversed |
| 6 | Reversed combined practice | 20 | Reversed target pairing |
| 7 | Reversed combined test | 40 | Same pairing as Block 6 |

Initial target and attribute sides are independently counterbalanced from the participant identifier. Combined blocks strictly alternate a target exemplar on odd trials with an attribute exemplar on even trials. The generator balances the five exemplars within each semantic category and rejects schedules containing more than four consecutive trials with the same correct key.

### Trial-Level Flow

Each trial begins directly with the classification display. Current category labels remain in the upper left and upper right, and one exact English exemplar appears at center. A correct E/I response ends the display and starts a 250 ms blank ITI. An incorrect response retains the labels and exemplar, adds a red X below the word, and waits for the correct key. Correct-response latency includes the correction period. A 10-second operational bound records a timeout at the same boundary used to exclude slow trials from D scoring.

### Controller Logic

There is no adaptive controller. PsyFlow owns trial identity, response capture, phase data, trigger timing, and persistence. A task-specific deterministic planner owns only the seven-block counterbalanced sequence. `src/utils.py` also computes the publication-standard D score.

### Other Logic

The D score uses the practice pair (Blocks 3 and 6) and test pair (Blocks 4 and 7). For each pair, incompatible-minus-compatible mean latency is divided by the inclusive standard deviation; the two quotients are averaged. Critical latencies over 10 seconds are excluded, and sessions with more than 10% of critical latencies below 300 ms are marked invalid.

## 3. Configuration Summary

Settings below are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier used for output naming and counterbalancing |

### b. Window Settings

| Setting | Human profile |
|---|---|
| Participant ID | 3-digit integer |
| Window | 1280 × 800, degree units |
| Background | Black |
| Fullscreen | False by default |
| Monitor geometry | 35.5 cm width, 57 cm distance |

### c. Stimuli

| Category | Implemented exemplars | Color |
|---|---|---|
| FLOWER | rose, tulip, daisy, orchid, lily | White |
| INSECT | ant, bee, mosquito, cockroach, wasp | White |
| PLEASANT | love, peace, happy, laughter, pleasure | Green |
| UNPLEASANT | abuse, poison, hatred, ugly, sickness | Green |

All words come from the original 1998 Appendix A pools. Target and attribute colors distinguish the two word-based discriminations; category meaning is carried by the exact labels and exemplar membership.

### d. Timing

| Parameter | Value |
|---|---:|
| Classification/correction bound | 10.0 s total |
| Response-to-next-trial ITI | 0.25 s |
| Fast-trial threshold | 0.30 s |
| Slow-trial exclusion threshold | 10.0 s |

### e. Triggers

| Event | Code(s) |
|---|---|
| Experiment start/end | 1 / 99 |
| Block start/end | 10 / 90 |
| Flower/insect/pleasant/unpleasant onset | 21 / 22 / 23 / 24 |
| E/I response | 40 / 41 |
| Error onset / timeout | 50 / 51 |
| ITI | 60 |

### Runtime profiles

```powershell
python main.py human --config config/config.yaml
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

QA and simulation profiles preserve all seven block roles and response semantics while shortening each block to four trials.

## 4. Methods (for academic publication)

Participants completed a computerized flower–insect Implicit Association Test using the standard seven-block procedure. The target categories were FLOWER and INSECT, and the attribute categories were PLEASANT and UNPLEASANT. Five word exemplars represented each category. Category labels remained visible in the upper screen corners while one exemplar appeared centrally. Participants classified each exemplar using E for the left-positioned category or pair and I for the right-positioned category or pair. An incorrect initial response produced a red X while the stimulus and labels remained visible; the trial continued until a correct response or the 10-second operational bound. The response-to-next-trial interval was 250 ms.

The task contained 20 target-practice, 20 attribute-practice, 20 initial combined-practice, 40 initial combined-test, 30 reversed-target-practice, 20 reversed combined-practice, and 40 reversed combined-test trials. Initial target and attribute side assignments were independently counterbalanced across participant-derived cells. Target and attribute exemplars alternated strictly within combined blocks. Trial schedules balanced exemplars and contained no run longer than four same-key-correct trials.

IAT D was computed from Blocks 3, 4, 6, and 7. Correct-response latency included time spent correcting an initial error. Critical latencies above 10,000 ms were excluded. Sessions were marked invalid when more than 10% of critical trials were faster than 300 ms. Inclusive standard deviations were computed separately for the combined-practice and combined-test pairs; incompatible-minus-compatible mean differences were divided by their corresponding standard deviations and averaged. Positive scores indicated relatively faster flower+pleasant/insect+unpleasant sorting.

### References

- Greenwald, A. G., McGhee, D. E., & Schwartz, J. L. K. (1998). Measuring individual differences in implicit cognition: The Implicit Association Test. *Journal of Personality and Social Psychology, 74*(6), 1464–1480. https://doi.org/10.1037/0022-3514.74.6.1464
- Greenwald, A. G., Nosek, B. A., & Banaji, M. R. (2003). Understanding and using the Implicit Association Test: I. An improved scoring algorithm. *Journal of Personality and Social Psychology, 85*(2), 197–216. https://doi.org/10.1037/0022-3514.85.2.197
- Nosek, B. A. (2005). Moderators of the relationship between implicit and explicit evaluation. *Journal of Experimental Psychology: General, 134*(4), 565–584. https://doi.org/10.1037/0096-3445.134.4.565
- Greenwald, A. G., et al. (2021). Best research practices for using the Implicit Association Test. *Behavior Research Methods*. https://doi.org/10.3758/s13428-021-01624-3
