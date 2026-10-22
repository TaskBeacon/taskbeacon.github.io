# Multiple Object Tracking Task
| Field | Value |
|---|---|
| Name | Multiple Object Tracking Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-12 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview
This task measures attentional identity tracking for 2, 4, or 6 targets among eight identical independently moving objects. It crosses target count with slow/fast motion and target/distractor probes.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow
Instruction -> six slow-motion practice trials -> reminder -> 36 scored trials -> summary.

### Trial-Level Flow
Fixation 500 ms -> targets highlighted red 2000 ms -> all eight white objects move 4000 ms -> one final object receives a yellow ring for a target/distractor judgment -> ITI 500 ms.

### Controller Logic
No adaptive controller. Thirty-six generated clips cover 12 factorial cells with three deterministic trajectory variants each.

### Other Logic
F reports TARGET and J reports DISTRACTOR. Practice alone gives correctness feedback. Metadata preserves target IDs, probe ID, speed, paths, and clip identity.

## 3. Configuration Summary
### a. Subject Info
| Field | Constraint |
|---|---|
| Participant ID | Three digits |
### b. Window Settings
| Setting | Value |
|---|---|
| Resolution | 1280 x 800 |
| Stimulus field | 16 x 12 degrees |
### c. Stimuli
| Phase | Visible content |
|---|---|
| Cue | 8 circles; targets red |
| Tracking | 8 identical white moving circles |
| Probe | final frame with one yellow ring |
### d. Timing
| Phase | Duration |
|---|---:|
| Fixation | 500 ms |
| Cue | 2000 ms |
| Tracking | 4000 ms |
| Probe | 3000 ms max |
| ITI | 500 ms |
### Triggers
Dedicated codes identify target count, speed, probe status, responses, feedback, ITI, and boundaries.

## 4. Methods (for academic publication)
Participants tracked 2, 4, or 6 cued targets among eight visually identical moving circles. Targets were red for 2000 ms before all circles became white and moved for 4000 ms along independent bouncing trajectories at 70 or 120 px/s. At motion offset, one object was ringed and participants pressed F if it was an original target or J if it was a distractor. Target count, speed, and probe status were balanced; each cell used three deterministic trajectory variants.
