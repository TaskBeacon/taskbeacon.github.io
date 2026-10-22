# Psychological Refractory Period Task
| Field | Value |
|---|---|
| Name | Psychological Refractory Period Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-12 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview
This dual-choice task measures the PRP effect by varying the SOA between an auditory tone discrimination and a visual letter discrimination. The primary outcome is correct Task-2 RT as a function of SOA.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow
Instruction -> 20 balanced practice trials -> reminder -> 160 scored trials -> summary.

### Trial-Level Flow
Fixation 500 ms -> low/high tone (S1) -> SOA 50/150/300/600/1000 ms -> X/O letter (S2) -> joint response monitoring 2000 ms -> ITI 500 ms.

### Controller Logic
No adaptive controller. A deterministic factorial planner balances SOA, tone, and letter.

### Other Logic
S1 monitoring remains active before S2; unanswered R1 and R2 are then monitored together, preserving responses that occur on either side of S2 onset.

## 3. Configuration Summary
### a. Subject Info
| Field | Constraint |
|---|---|
| Participant ID | Three digits |
### b. Window Settings
| Setting | Value |
|---|---|
| Resolution | 1280 x 800 |
| Units | Degrees |
### c. Stimuli
| Task | Stimulus | Keys |
|---|---|---|
| Task 1 | 440/880-Hz tone | F low / J high |
| Task 2 | X/O | K X / L O |
### d. Timing
| Phase | Duration |
|---|---:|
| Fixation | 500 ms |
| SOA | 50-1000 ms |
| Post-S2 window | 2000 ms |
| ITI | 500 ms |
### Triggers
Dedicated codes identify S1/S2 identities, four keys, timeout, ITI, and boundaries.

## 4. Methods (for academic publication)
Participants performed two speeded choice tasks on each trial. A low or high tone required an F or J response, followed after an SOA of 50, 150, 300, 600, or 1000 ms by the letter X or O requiring K or L. Participants prioritized Task 1 while responding quickly and accurately to both. The design balanced tone, letter, and SOA. RT1 was measured from S1 onset and RT2 from S2 onset. The PRP effect was defined as mean correct RT2 at 50-ms minus 1000-ms SOA.
