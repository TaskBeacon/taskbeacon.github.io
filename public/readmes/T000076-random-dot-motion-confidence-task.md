# Random-Dot Motion + Confidence Task

| Field | Value |
|---|---|
| Name | Random-Dot Motion + Confidence Task |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000076-random-dot-motion-confidence-task |
| Short Description | Random-dot motion direction discrimination with trial-wise confidence ratings |
| Created By | TaskBeacon |
| Date Updated | 2026-07-27 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | Chinese |
| Voice Name |  |

## 1. Task Overview

Participants judge whether a dynamic random-dot field moves predominantly left or right, then rate confidence in that decision on a nine-point scale. Motion coherence (12% or 28%) manipulates perceptual evidence, while the scale orientation is counterbalanced to reduce fixed motor-position bias. The task measures visual motion sensitivity, perceptual decision speed and accuracy, and metacognitive calibration.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Instruction | Teach `F` = left, `J` = right, and the orientation-dependent 1-9 confidence response. |
| Two scored blocks | Each block contains 64 balanced trials generated with PsyFlow `BlockUnit.generate_conditions(...)`. |
| Block break | Show direction accuracy and mean confidence after block 1. |
| Completion | Show response rate, accuracy, mean RT, and confidence summaries. |

### Trial-Level Flow

| Phase | Duration | Participant-visible event |
|---|---:|---|
| Fixation | 500 ms | Central white `+`. |
| Motion decision | Up to 1.2 s | 150-dot circular random-dot kinematogram; `F`/`J` response. |
| Post-decision blank | Unused motion time + 1.5-4.0 s | Blank grey screen. |
| Confidence | Up to 3.0 s | Nine positions labeled `1`-`9`; endpoint meanings may reverse. |
| ITI | 500 ms | Central fixation. |

If no direction response occurs, a task-specific timeout message appears and the confidence phase is skipped.

### Controller Logic

No adaptive controller is used. Conditions are the balanced factorial product of direction, coherence, and confidence-scale orientation. Random-dot microstructure is deterministically seeded from the task seed, PsyFlow trial identity, and condition label.

### Other Logic

The position selected on a reversed confidence scale is converted to the same canonical score: 1 always means lowest confidence and 9 always means highest confidence.

## 3. Configuration Summary

### a. Subject Info

| Field | Human profile |
|---|---|
| Subject ID | Three digits |
| Age | 18-80 |
| Gender | Male / Female / Other |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 |
| Units | Degrees of visual angle |
| Background | Mid-grey (`#707070`) |
| Viewing distance | 57 cm |

### c. Stimuli

| Stimulus | Reference-aligned implementation |
|---|---|
| Random-dot field | 150 white 0.1° dots, 4-frame lifetime, 6°/s speed, 6° circular aperture |
| Coherence | 12% and 28% |
| Confidence scale | Horizontal nine-position scale with counterbalanced endpoint orientation |
| Text | Chinese, SimHei |

### d. Timing

| Parameter | Human value |
|---|---:|
| Fixation | 0.5 s |
| Motion response | 1.2 s maximum |
| Post-decision delay | 1.5-4.0 s after completing the 1.2-s motion interval |
| Confidence response | 3.0 s maximum |
| ITI | 0.5 s |

### Triggers

Triggers distinguish motion direction/coherence, left/right direction responses, direction timeout, confidence-scale orientation, confidence response/timeout, and block/experiment boundaries. See `config/config.yaml` for the complete map.

### Adaptive Controller

None. The baseline library profile uses two reference-derived fixed coherence levels.

## 4. Methods (for academic publication)

Participants completed two blocks of a random-dot motion discrimination task with trial-wise confidence reports. Each trial began with a 500-ms central fixation. A circular random-dot kinematogram containing 150 white dots was then shown for up to 1.2 s or until a response. Dots subtended 0.1° of visual angle, had a four-frame lifetime, moved at 6°/s within a 6° aperture, and contained either 12% or 28% coherent horizontal motion. Participants pressed `F` for leftward and `J` for rightward motion. After the unused part of the 1.2-s motion interval and an additional 1.5-4.0-s blank delay, participants rated decision confidence using a nine-position scale within 3 s. Low- and high-confidence endpoints alternated across trials; responses were recoded so higher canonical values always represented greater confidence. Direction, coherence, and scale orientation were balanced within each 64-trial block. No trial-wise accuracy feedback was provided.

## References

- Gherman, S., & Philiastides, M. G. (2018). Human VMPFC encodes early signatures of confidence in perceptual decisions. *eLife*, 7, e38293.
- Zylberberg, A., Fetsch, C. R., & Shadlen, M. N. (2016). The influence of evidence volatility on choice, reaction time and confidence in a perceptual decision. *eLife*, 5, e17688.
- Kiani, R., & Shadlen, M. N. (2009). Representation of confidence associated with a decision by neurons in the parietal cortex. *Science*, 324, 759-764.
