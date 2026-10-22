# Director Visual Perspective-Taking Task

| Field | Value |
|---|---|
| Name | Director Visual Perspective-Taking Task |
| Version | `0.1.0` |
| Date Updated | 2026-08-01 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

The Director Visual Perspective-Taking Task measures whether a participant can
use another person's visual access to resolve a referential instruction while
inhibiting a privileged competitor. Each screen contains a 4 x 4 shelf with
eight objects. Gray-backed cells are unavailable to the director but remain
visible to the participant.

The package includes a matched nonsocial Rule Control. The same gray-backed
cells and arrays must be filtered, but no director is present. Critical trials
contain a same-category privileged competitor; matched control trials replace
that object with an unrelated shape. The main outcomes are selection accuracy,
response time, and privileged-object errors.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. General instruction and two Director-context practice trials.
2. Two scored blocks (`director`, `rule`), counterbalanced by participant ID.
3. Sixteen seeded, randomized trials per block: eight critical/control pairs.
4. A summary screen reports accuracy, critical accuracy, privileged errors, and timeouts.

### Trial-Level Flow

| Phase | Duration | Participant-visible event | Response |
|---|---:|---|---|
| Grid study | 5.0 s | 4 x 4 shelf, eight objects, five gray-backed cells, and context cue | None |
| Spoken instruction | 2.8 s | Same shelf plus a generated English movement instruction | None |
| Object and destination selection | 5.0 s maximum | Same shelf and compact instruction text | Click object, then destination slot |
| Practice feedback | 0.75 s | Correct/incorrect message | None; practice only |
| ITI | 0.5 s | Fixation cross | None |

There is no adaptive controller. Trial identity, phase events, pointer timing,
timeouts, and response triggers are owned by PsyFlow. Condition labels are
scheduled by `BlockUnit.generate_conditions(...)`; scene realization is a
deterministic lookup from config-defined item specifications.

### Controller Logic

No adaptive controller is used. Subject-ID parity counterbalances context order;
PsyFlow's seeded block scheduler randomizes item labels within each context.

## 3. Configuration Summary

### a. Subject Info

| Setting | Value |
|---|---|
| Participant ID | Three-digit integer in human mode |
| Window | 1280 x 800, degree units, white background |
| Input | Pointer / mouse |
| Seed policy | Participant-stable block seeds |

### b. Window Settings

The task uses a 1280 x 800 white window in degree units with a 35.5-cm monitor
width and a 57-cm viewing distance in the default profile.

### c. Stimuli

| Component | Configuration |
|---|---|
| Shelf | 4 x 4 cells; five gray-backed cells per item |
| Objects | Eight primitive-drawn circles, blocks, triangles, stars, diamonds, and fillers |
| Critical manipulation | Privileged same-category competitor versus unrelated matched control |
| Context manipulation | Director Present versus no-director Rule Control |
| Audio | Eight generated English WAV instructions in `assets/audio/` |
| Study / instruction / response / ITI | 5.0 / 2.8 / 5.0 max / 0.5 s |

### d. Timing

The study, spoken-instruction, pointer-response, optional practice-feedback,
and ITI phases last 5.0 s, 2.8 s, up to 5.0 s, 0.75 s, and 0.5 s,
respectively.

### Triggers and outputs

Phase onsets, pointer selections, completion, timeout, feedback, block, and
experiment lifecycle events have dedicated trigger codes in `config/*.yaml`.
Reduced CSV rows contain one logical instruction trial with context,
competitor status, expected and selected sequences, selection latencies,
object/destination correctness, privileged-error flag, timeout, and outcome.

### Run commands

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a computerized referential-communication task adapted
from the Director Task. On each trial, they viewed a 4 x 4 shelf containing
eight geometric/cartoon objects. Five cells had gray backs. In Director blocks,
a visible director could see only the white-backed cells; participants were
instructed that the director neither saw nor knew the contents of gray-backed
cells. In Rule blocks, the director was absent and an explicit rule stated that
instructions never referred to gray-backed cells.

After a 5-s study period, participants heard a short relational movement
instruction. They selected the referent and its destination by two ordered
mouse clicks. Critical arrays included a privileged same-category object that
was a better size or vertical-position match from the participant's own view.
Matched control arrays replaced that competitor with an unrelated object while
holding the target, instruction, and layout constant. Scored trials provided no
feedback. Accuracy, post-instruction selection latency, privileged-competitor
errors, and timeouts were recorded.

The canonical setup and critical/control logic follow Keysar et al. (2000); the
computerized grid, gray-backed slots, recorded instructions, pointer response,
5-s study period, and Director-versus-rule comparison follow Apperly et al.
(2010). The matched social/nonsocial action-selection rationale is supported by
Dumontheil et al. (2010). See `references/` for the complete evidence mapping
and documented adaptations.
