# Fitts Law Pointing Task

| Field | Value |
|---|---|
| Name | Fitts Law Pointing Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-12 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

Digital reciprocal pointing across 16 amplitude x width conditions. The first homing click in each set is excluded; eight alternating movements are scored.

### Block-Level Flow
One randomized block of 16 condition sets.

### Trial-Level Flow
A left or right rectangular target appears until clicked or 3 s elapses.

### Controller Logic
No adaptive controller; deterministic planning keeps each condition contiguous and alternates sides.

## 2. Task Flow

![Task Flow](task_flow.png)

## 3. Configuration Summary

### a. Subject Info
Three-digit participant ID.

### b. Window Settings
Degree units on a black 1280 x 800 field.

### c. Stimuli
Teal rectangular targets with four amplitudes and four widths.

### d. Timing
Each target has a 3 s deadline.

## 4. Methods (for academic publication)

Participants alternated between horizontally separated targets. Amplitude was 6, 10, 14, or 18 degrees and width was 0.75, 1.5, 2.25, or 3 degrees. Index of difficulty used `log2(A/W + 1)`; movement time was regressed on index of difficulty and throughput was the reciprocal slope.

## 5. Run
`python main.py --mode human`
