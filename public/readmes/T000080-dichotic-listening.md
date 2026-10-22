# Dichotic Listening

| Field | Value |
|---|---|
| Name | Dichotic Listening |
| Version | `v0.1.0` |
| URL / Repository | https://github.com/TaskBeacon/T000080-dichotic-listening |
| Short Description | Baseline one-response Bergen consonant-vowel dichotic-listening task for auditory speech laterality. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | `0.1.12` |
| PsychoPy Version | `2025.2.4` |
| Modality | Behavioral auditory |
| Language | Chinese instructions; reference CV syllables |
| Voice Name | Microsoft David Desktop (offline asset generation only) |

## 1. Task Overview

This task measures perceptual auditory laterality for speech using the baseline Bergen consonant-vowel procedure. On every trial, one approximately 400 ms CV syllable is delivered to the left headphone channel while another begins simultaneously in the right channel. Participants report only the syllable heard best and most clearly. The scored outcomes are left- and right-ear report counts, valid report rate, response time, and the laterality index `100 × (RE - LE) / (RE + LE)`.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Setup | Load the selected human, QA, or simulation config; initialize subject data, PsychoPy, triggers, and all 36 stereo assets. |
| Instruction | Explain the one-response rule and six response keys without revealing the internal left/right pair labels. |
| Schedule | Use `BlockUnit.generate_conditions(order="random")` to present every one of the 36 ordered syllable pairs exactly once. |
| Scored block | Run one 36-trial block; send block start/end triggers and store one reduced row per logical trial. |
| Summary | Display valid report rate, non-homonym left/right report counts, laterality index, and timeouts. |

### Trial-Level Flow

| Phase | Duration | Participant-visible/audible event | Response |
|---|---:|---|---|
| Fixation | 500 ms | Central `+`. | None. |
| Dichotic audio | 400 ms | Headphone marker plus one stereo WAV: scheduled left-ear syllable in channel 1 and right-ear syllable in channel 2. | None. |
| Report | 3100 ms | Six spatially separated options: `/ba/`, `/da/`, `/ga/`, `/pa/`, `/ta/`, `/ka/`. | `B`, `D`, `G`, `P`, `T`, or `K`; first response is recorded while the screen remains for the full window. |

The resulting pair-onset interval is 4.0 s. No trial feedback is shown.

### Controller Logic

| Component | Description |
|---|---|
| Adaptive controller | None. The paradigm has no staircase, learning rule, reward, or online adaptation. |
| Condition ownership | PsyFlow schedules the 36 scalar pair labels from the configured block seed; `run_trial.py` does not sample experimental factors. |

### Other Logic

| Component | Description |
|---|---|
| Pair decoding | A strict pure helper converts `<left>_<right>` labels to the two channel syllables and rejects unknown labels. |
| Ear classification | A non-homonym response matching only the left or right channel is classified as `left` or `right`; a nonmatching syllable is an `intrusion`. |
| Homonyms | Six same-syllable pairs remain in the 36-trial presentation set but are excluded from the ear-specific laterality index. |
| Laterality index | `100 × (right_reports - left_reports) / (right_reports + left_reports)` over valid non-homonym ear reports. |

## 3. Configuration Summary

All settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier from 101 to 999. |
| Headphone setup | Human sessions require stereo headphones with verified left/right orientation and calibrated output near 70 dB SPL. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 |
| Units | Degrees of visual angle |
| Background | `#20242A` |
| Monitor geometry | 35.5 cm width; 57 cm viewing distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `fixation` | Text | Central white plus sign. |
| `listening_marker` | Text | Central headphone marker during playback. |
| `pair_<left>_<right>` | Sound | One of 36 channel-isolated 44.1 kHz, 16-bit PCM, 400 ms stereo WAV files. |
| `response_prompt` | Text | Chinese one-response question above the option grid. |
| `option_ba` ... `option_ka` | Text | Six keyboard-labeled syllable options in a 2 × 3 grid. |

The six mono tokens were synthesized once with an installed adult male English voice, trimmed, normalized, time-fitted within 360 ms, padded to 400 ms, and combined offline into stereo pairs. Runtime code performs no speech synthesis or audio mixing. `assets/audio_manifest.csv` records every channel mapping, duration, format, and SHA-256 digest.

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 0.5 s |
| Dichotic audio | 0.4 s |
| Report window | 3.1 s |
| Pair onset interval | 4.0 s |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 99 |
| Block start / end | 10 / 90 |
| Fixation | 20 |
| Different / homonym audio pair | 30 / 31 |
| Response prompt | 40 |
| `/ba/`, `/da/`, `/ga/`, `/pa/`, `/ta/`, `/ka/` response | 41–46 |
| Response timeout | 47 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller | None |
| Randomization | Equal one-per-condition scheduling with `random_seed: 80080` and PsyFlow block-seed policy. |

## 4. Methods (for academic publication)

Participants completed a computerized baseline consonant-vowel dichotic-listening task through stereo headphones. The stimulus set comprised `/ba/`, `/da/`, `/ga/`, `/pa/`, `/ta/`, and `/ka/`. Each trial began with a 500 ms central fixation, followed by simultaneous onset of one CV token in the left channel and one in the right channel for 400 ms. After playback, six response alternatives appeared for 3100 ms. Participants selected the single syllable heard best and most clearly using the corresponding initial-letter key. The response display remained visible for its full duration after an early keypress, yielding a constant 4.0 s onset interval between successive dichotic pairs. No accuracy feedback was provided.

The scored block contained all 36 ordered combinations of the six syllables, including six homonym trials, each presented once in pseudo-random order. Stereo files were prepared offline from a constant adult-male synthesized voice, with silence trimmed, peak level normalized, voiced content fitted within 360 ms, and the final asset padded to exactly 400 ms. Each pair file isolated the scheduled left token to the left channel and the scheduled right token to the right channel. Laboratory deployment requires calibration of headphone output near 70 dB SPL and confirmation of correct channel orientation.

For each non-homonym trial, a report matching the left or right token was classified by ear; nonmatching reports were classified as intrusions, and missing reports as timeouts. Homonym trials were retained in presentation but excluded from ear-specific scoring. The laterality index was calculated as `100 × (RE - LE) / (RE + LE)`, where positive values indicate a right-ear advantage. The implementation adapts the cited spoken one-response procedure to a six-key computerized response while preserving the one-syllable report rule, acoustic pair structure, trial count, and laterality calculation.

## References

- Yazgan, M. Y., Wexler, B. E., Kinsbourne, M., Peterson, B. S., & Leckman, J. F. (1995). Functional significance of individual variations in callosal area. *Neuropsychologia, 33*, 769–779. https://doi.org/10.1016/0028-3932(95)00018-X
- Hugdahl, K., Law, I., Kyllingsbæk, S., Brønnick, K., Gade, A., & Paulson, O. B. (2000). Effects of attention on dichotic listening: An 15O-PET study. *Human Brain Mapping, 10*, 87–97. https://doi.org/10.1002/(SICI)1097-0193(200006)10:2%3C87::AID-HBM50%3E3.0.CO;2-V
- Westerhausen, R., Grüner, R., Specht, K., & Hugdahl, K. (2009). Functional relevance of interindividual differences in temporal lobe callosal pathways: A DTI tractography study. *Cerebral Cortex, 19*, 1322–1329. https://doi.org/10.1093/cercor/bhn173
