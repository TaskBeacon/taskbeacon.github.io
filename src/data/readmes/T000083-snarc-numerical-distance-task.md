# SNARC and Numerical Distance Task

| Field | Value |
|---|---|
| Name | SNARC and Numerical Distance Task |
| Task ID | `T000083` |
| Variant | Baseline combined parity and magnitude comparison |
| Version | `v0.1.0` |
| Date Updated | 2026-08-01 |
| PsyFlow Contract | `v0.2.0` |
| PsyFlow Version | `0.1.12` |
| PsychoPy Version | `2025.1.1` |
| Modality | Behavioral |
| Language | Chinese instructions; Arabic numeral stimuli |

## 1. Task Overview

This task combines two classic speeded number judgments. In the parity blocks, participants classify centrally presented digits as odd or even while the left/right response mapping reverses across blocks; response-time differences across number magnitude estimate the Spatial-Numerical Association of Response Codes (SNARC) effect. In the magnitude blocks, participants judge whether a two-digit target is smaller or larger than 65; response time across absolute distances from 65 estimates the numerical distance effect.

Primary outcomes are accuracy, reaction time, the participant-level SNARC regression slope over digits, and the participant-level distance-effect slope over absolute numerical distance.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

The task contains four blocks: two parity blocks and two magnitude-comparison blocks. Each judgment uses both possible left/right category mappings. Mapping order is deterministically counterbalanced from the task seed. Every block begins with a mapping-specific instruction, includes tagged warm-up trials, and ends with a rest screen.

| Block type | Mapping pair | Warm-up | Experimental |
|---|---|---:|---:|
| Parity | F=even/J=odd and reversed | 12 per block | 90 per block |
| Magnitude | F=smaller/J=larger and reversed | 20 per block | 120 per block |

### Trial-Level Flow

| Judgment | Phase | Duration | Participant-visible event |
|---|---|---:|---|
| Parity | Empty frame | 300 ms | Centered empty rectangle |
| Parity | Digit/response | 1300 ms | One digit from 0-9 inside the frame; F/J response |
| Parity | ITI | 1500 ms | Blank screen |
| Magnitude | Attention cue | 200 ms | Centered white rectangle |
| Magnitude | Cue-target delay | 1800 ms | Blank screen |
| Magnitude | Number | 200 ms | Two-digit target from 30-99, excluding 65 |
| Magnitude | Post-target response | 1300 ms | Blank screen; F/J remains active if unanswered |
| Magnitude | ITI | 1500 ms | Blank screen |

### Controller Logic

The task is nonadaptive. Before each block, a deterministic generator creates concrete trial plans. The full parity profile uses a first-order-balanced sequence in which every digit 0-9 occurs nine times and directed transitions are balanced cyclically. Magnitude plans balance close, medium, and far distance bins and the smaller/larger sides of 65. PsyFlow owns trial identity, phase timing, response capture, triggers, and data persistence.

### Other Logic

Warm-up trials are marked by `is_practice=true` and excluded from primary summaries. The response mapping reverses once within each judgment type. No reward or penalty is used.

## 3. Configuration Summary

### a. Subject Info

The human profile collects a three-digit subject ID. `F` is the left-hand response, `J` is the right-hand response, and Space advances instructions and breaks.

### b. Window Settings

The default window is 1280 x 800 in visual-degree units on a black background, with a 35.5 cm monitor width and 57 cm viewing distance.

### c. Stimuli

All task stimuli are PsychoPy primitives. Chinese text uses SimHei. Parity targets are Arabic digits 0-9 shown inside a 3.2 x 2.2 degree frame. Magnitude targets are two-digit Arabic numbers centered on screen. The reference number 65 is memorized from the instruction and never shown as a target.

Distance bins follow Pinel et al. (2001): close = 60-64 or 66-69, medium = 50-59 or 70-79, and far = 30-49 or 80-99.

### d. Timing

Parity timing follows Dehaene et al. (1993): 300 ms empty frame, 1300 ms digit/response window, and 1500 ms blank interval. Magnitude timing follows the ERP-style Pinel et al. (2001) protocol: a 200 ms attention rectangle, target onset 2 s later, 200 ms target visibility, a 1500 ms total response deadline, and a 3 s target-onset interval.

### e. Triggers

Triggers identify experiment and block boundaries, parity frame onset, parity target parity/magnitude class, magnitude attention onset, magnitude target distance bin/side, left/right responses, timeouts, and ITIs. Trial events are emitted through PsyFlow `StimUnit` paths.

### f. Adaptive Controller

No adaptive controller is used. Randomness is restricted to deterministic block planning from `task.plan_seed`.

## 4. Methods (for academic publication)

Participants completed a combined spatial-numerical association and magnitude-comparison task. In two parity blocks, Arabic digits 0-9 were presented centrally inside a rectangular frame. Each trial began with the empty frame for 300 ms, followed by the digit for a 1300 ms response window and a 1500 ms blank interval. Participants classified each digit as odd or even using horizontally arranged left- and right-hand keys. The parity-to-hand mapping reversed across the two blocks. Each block began with 12 warm-up trials and contained 90 experimental trials, with each digit presented nine times in a cyclic first-order-balanced sequence.

In two magnitude-comparison blocks, participants decided whether a centrally presented two-digit number was smaller or larger than the memorized reference 65. A white attention rectangle appeared for 200 ms; the number appeared 2 s after cue onset and remained visible for 200 ms. Responses were accepted for 1500 ms from target onset. Targets were drawn from 30-99 excluding 65 and were balanced across close (60-64, 66-69), medium (50-59, 70-79), and far (30-49, 80-99) distance bins and across smaller/larger responses. Each block began with 20 warm-up trials and contained 120 experimental trials; response-to-hand mapping reversed across blocks.

Primary analyses exclude warm-up trials and errors. The SNARC effect is estimated by regressing the difference between right- and left-response RTs on target digit. The numerical distance effect is estimated by regressing correct-trial RT on absolute distance from 65. Negative slopes indicate the canonical effects in both analyses.

## References

- Dehaene, S., Bossini, S., & Giraux, P. (1993). The mental representation of parity and number magnitude. *Journal of Experimental Psychology: General, 122*(3), 371-396. https://doi.org/10.1037/0096-3445.122.3.371
- Pinel, P., Dehaene, S., Riviere, D., & LeBihan, D. (2001). Modulation of parietal activation by semantic distance in a number comparison task. *NeuroImage, 14*(5), 1013-1026. https://doi.org/10.1006/nimg.2001.0913
- Schwarz, W., & Keus, I. M. (2004). Moving the eyes along the mental number line: Comparing SNARC effects with saccadic and manual responses. *Perception & Psychophysics, 66*(4), 651-664. https://doi.org/10.3758/BF03194909
