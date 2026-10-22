# Tower of London Task

| Field | Value |
|---|---|
| Name | Tower of London Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-26 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

This mental minimum-move Tower of London task measures visuospatial planning.
Participants study a goal tower, mentally transform a start tower under peg
capacity rules, and report whether the shortest solution requires 2, 3, 4,
or 5 moves.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Instructions -> 4 practice problems -> reminder -> 24 scored problems ->
summary.

### Trial-Level Flow

Fixation 500 ms -> goal preview 5 s -> paired goal/start planning until SPACE
or 15 s -> minimum-move choice within 5 s -> practice feedback when applicable
-> blank ITI 750 ms.

### Controller Logic

No adaptive controller. A graph-verified item schedule binds every start/goal
pair to its unique optimal move count before `run_trial()`.

### Other Logic

The scored set contains six problems at each 2-5 move load. Every legal tower
state appears and no state is used more than twice.

## 3. Configuration Summary

### a. Subject Info

| Field | Constraint |
|---|---|
| Participant ID | Three digits |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 x 800 |
| Background | White |
| Units | Degrees of visual angle |

### c. Stimuli

| Phase | Visible content |
|---|---|
| Goal preview | Goal-only capacity 3/2/1 tower |
| Planning | Goal above start with red, green, and blue balls |
| Choice | Same tower pair plus 2/3/4/5 alternatives |
| Feedback | Practice-only correct, incorrect, or too-slow message |

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 500 ms |
| Goal preview | 5000 ms |
| Planning | 15000 ms maximum |
| Choice | 5000 ms maximum |
| Practice feedback | 750 ms |
| ITI | 750 ms |

### Triggers

Dedicated codes identify fixation, goal preview, planning readiness/timeout,
choice responses, feedback, ITI, and experiment/block boundaries.

## 4. Methods (for academic publication)

Participants completed a mental minimum-move Tower of London task. Each trial
presented a goal configuration alone for 5 s, followed by paired goal and
start configurations for up to 15 s. The towers contained one red, one green,
and one blue ball on pegs holding at most three, two, and one balls. Only the
top ball could move, one at a time, to a peg with remaining capacity.
Participants pressed SPACE when their mental plan was ready, then reported
the minimum solution length with keys 2-5 within 5 s. The scored schedule
contained six uniquely solvable problems at each move load from two to five.
