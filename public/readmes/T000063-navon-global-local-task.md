# Navon Global-Local Task

| Field | Value |
|---|---|
| Name | Navon Global-Local Task |
| Task ID | `T000063` |
| Variant | Brief, masked, spatially uncertain global/local identification |
| Version | `v0.1.0` |
| Date Updated | 2026-07-12 |
| PsyFlow Version | `0.2.0` |
| PsychoPy Version | `2025.1.1` |
| Modality | Behavioral |
| Language | Chinese instructions; Latin-letter stimuli |
| Primary construct | Global precedence and asymmetric interference |

## 1. Task Overview

Participants identify either the global figure or the local elements of hierarchical H/S stimuli. The attended level is blocked and order is counterbalanced by participant-number parity. Each target-level block includes consistent, neutral, and conflicting stimuli, preserving the six stimulus identities and spatial uncertainty of Navon's Experiment 3.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. Instructions define `F = H` and `J = S`.
2. Before each target level, participants complete 12 practice trials with feedback.
3. One 36-trial scored block follows for that level.
4. Each of six identities appears six times; each quadrant is used nine times.
5. The other target level then repeats the practice-plus-scored sequence.

### Trial-Level Flow

| Phase | Duration | Event |
|---|---:|---|
| Fixation | 500 ms | Central plus |
| Compound stimulus | 40 ms | Hierarchical figure in one of four quadrants |
| Postexposure mask | Until response, max 1960 ms | 33 x 33 dot mask at stimulus location |
| Practice feedback | 500 ms | Correct, error, or timeout; practice only |
| ITI | 500 ms | Blank screen |

Primary outcomes are accuracy, median correct RT by target level and consistency, and conflicting-minus-consistent interference for each level.

### Controller Logic

The task is nonadaptive. A deterministic planner enforces stimulus-identity and position counts; PsyFlow owns timing, response capture, trial identity, triggers, and persistence.

## 3. Configuration Summary

### a. Subject Info

Three-digit participant IDs determine global-first (even) or local-first (odd) counterbalancing. F identifies H and J identifies S.

### b. Window Settings

The task uses visual-degree units, a black background, and a configured 50 cm viewing distance.

### c. Stimuli

Five-row monospace hierarchical H, S, and rectangular neutral figures are rendered at runtime. The mask is a 33 x 33 dot grid.

### d. Timing

Canonical timing is 500 ms fixation, 40 ms exposure, a response deadline at 2000 ms from stimulus onset, and a 500 ms ITI.

## 4. Methods (for academic publication)

Participants completed a blocked global/local identification task based on Navon (1977), Experiment 3. A central fixation appeared for 500 ms, followed immediately by a hierarchical stimulus for 40 ms in one of four equiprobable quadrants. A 33 x 33 dot mask then occupied the same location until response or a 2000 ms stimulus-onset deadline. Participants pressed F for H and J for S at the instructed level. Target-level order was counterbalanced by participant-number parity. Each scored target-level block comprised 36 trials: six repetitions of each attended-letter-by-consistency identity, with nine trials per quadrant.

The original six blocks per attention condition were shortened to one 12-trial practice and one 36-trial scored block per condition. A 2000 ms deadline, 500 ms ITI, F/J keys, and practice-only feedback are documented local adaptations. The warning beep is omitted from this behavioral baseline.

## Run

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## Reference

Navon, D. (1977). Forest before trees: The precedence of global features in visual perception. *Cognitive Psychology, 9*(3), 353-383. https://doi.org/10.1016/0010-0285(77)90012-3
