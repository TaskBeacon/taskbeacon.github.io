# Gaze Cueing Task

| Field | Value |
|---|---|
| Name | Gaze Cueing Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-26 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

This nonpredictive gaze-cueing task measures reflexive spatial attention. A
central schematic face looks left or right before a peripheral T or L appears.
Gaze direction predicts target side at chance, so faster congruent responses
index gaze-mediated orienting rather than strategic prediction.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Instructions -> 6 practice trials -> reminder -> 48 scored trials -> summary.

### Trial-Level Flow

Fixation 675 ms -> face with blank eyes 900 ms -> left/right gaze for 100, 300,
or 700 ms -> peripheral T/L until response or 3800 ms -> feedback 675 ms.

### Controller Logic

No adaptive controller. A deterministic factorial schedule balances validity,
SOA, target side, target letter, and scored repetitions.

### Other Logic

H reports T and SPACE reports L. The gaze-cueing effect is correct incongruent
RT minus correct congruent RT at each SOA.

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
| Face preview | 6.8-degree schematic face with empty eyes |
| Gaze cue | Same face with pupils displaced left/right |
| Target | T or L at x=-6 or +6 degrees while face remains |
| Feedback | `+` correct; `-` incorrect/timeout |

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 675 ms |
| Face preview | 900 ms |
| Gaze-target SOA | 100, 300, or 700 ms |
| Target response window | 3800 ms max |
| Feedback | 675 ms |

### Triggers

Dedicated codes identify gaze direction/SOA, validity/target side, response,
timeout, feedback, and experiment/block boundaries.

## 4. Methods (for academic publication)

Participants discriminated a peripheral target letter in a nonpredictive
gaze-cueing task. Each trial began with a 675-ms central asterisk, followed by
a 900-ms schematic face with empty eyes. Pupils then appeared looking left or
right for 100, 300, or 700 ms. A T or L appeared six degrees left or right of
center while the gazing face remained visible, and stayed until response or
3800 ms. Participants pressed H for T and SPACE for L. Congruent and
incongruent gaze-target relations were equiprobable at every SOA. A centered
plus or minus sign provided 675-ms feedback. The scored schedule crossed
validity, SOA, target side, and target identity with two repetitions per cell.
