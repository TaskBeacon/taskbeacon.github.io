# Temporal Order and Simultaneity Judgment Task

| Field | Value |
|---|---|
| Name | Temporal Order and Simultaneity Judgment Task |
| Version | 0.1.0 |
| Date Updated | 2026-08-01 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | Chinese |

## 1. Task Overview

This task measures audiovisual temporal-order perception and perceived simultaneity with a classic flash-click method. On every trial, participants see a 12-ms central white-disc flash and hear a 12-ms white-noise burst at one of 15 signed stimulus-onset asynchronies (SOAs). Separate temporal-order (TOJ) and binary simultaneity (SJ2) blocks preserve the different response criteria needed to estimate psychometric functions, point of subjective simultaneity (PSS), and temporal sensitivity.

The local Python task is the canonical implementation. Participant judgments are recorded without correctness feedback or reward because the outcome is a subjective psychophysical report.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Block-level flow: welcome → counterbalanced TOJ/SJ2 rule sessions → 30 practice trials per rule → four 225-trial scored blocks per rule → session summary.

### Trial-Level Flow

Trial-level flow: four corner markers (0.5-1.5 s) → flash/click pair with signed SOA → locator remains until the 2-s event display ends → unspeeded rule-specific judgment → brief choice confirmation → 0.5-s blank ITI.

### Controller Logic

Controller logic: none. The 15 SOAs are equally balanced with PsyFlow's built-in block condition scheduling. The only sampled value is the foreperiod, generated from a stable timing seed independent of condition order.

### Other Logic

Other logic: TOJ/SJ2 rule order is counterbalanced by participant-number parity. Negative SOA means sound first; positive SOA means flash first; zero means simultaneous physical onset.

## 3. Configuration Summary

### a. Subject Info

| Item | Value |
|---|---|
| Subject fields | ID, age, gender |

### b. Window Settings

| Item | Value |
|---|---|
| Window | 1280 × 800, fullscreen, black background |
| Units | visual degrees |
| Viewing distance | 60 cm |

### c. Stimuli

| Item | Value |
|---|---|
| Visual event | white disc, 1.4° diameter, 12 ms |
| Auditory event | generated white-noise burst, 12 ms; local SPL calibration required |
| SOAs | -350 to +350 ms in 50-ms steps |

### d. Timing

| Item | Value |
|---|---|
| Foreperiod | 0.5-1.5 s |
| Locator display | 2.0 s total |
| Judgment ceiling | 60 s; speed is not emphasized |
| Choice confirmation | 0.3 s, no correctness feedback |
| ITI | 0.5 s |

### Responses and triggers

| Rule | F | J |
|---|---|---|
| TOJ | sound first | flash first |
| SJ2 | simultaneous | asynchronous |

Triggers distinguish lifecycle events, modality onsets, physical simultaneity, judgment rules, response categories, timeouts, confirmation, and ITI. The human profile uses the configured serial loopback driver; QA and simulation use mock triggers.

### Runtime

```powershell
python main.py human --config config/config.yaml
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed separate temporal-order and binary simultaneity judgment blocks using a central audiovisual flash-click stimulus. A four-corner visual locator appeared for 2 s. Within this interval, a 12-ms white disc and a 12-ms white-noise burst occurred with one of 15 equiprobable signed SOAs from -350 to +350 ms in 50-ms increments. Event onset occurred 0.5-1.5 s after locator onset. In TOJ blocks, participants reported whether the sound or flash appeared first. In SJ2 blocks, they reported whether the events appeared simultaneous or asynchronous. Responses were unspeeded, briefly acknowledged, and received no accuracy feedback. Each rule included 30 practice trials followed by four 225-trial measurement blocks. Rule order was counterbalanced across participant-number parity.

Primary protocol evidence is documented in `references/references.md`, with parameter, stimulus, and state-machine traceability in the remaining `references/` artifacts.
