# Pursuit Rotor

**T000137** · `pursuit-rotor-task` · behavior · Chinese/SimHei · v0.1.0 · 2026-08-31.

| Metadata | Value |
|---|---|
| Name | Pursuit Rotor |
| Version | 0.1.0 |
| Date Updated | 2026-08-31 |
| PsyFlow Version | 8cbafd341b48a762c26e4f726b7f8373f1b43d7a |
| PsychoPy Version | 2025.2.4 |
| Modality | behavior |
| Language | Chinese |

## 1. Task Overview

An explicitly adapted mouse pursuit task for continuous tracking and immediate post-rest performance. Source geometry/speed/trial length come from Zhang et al.(2024), section2.3.3. Ammons(1947) is the supplied historical basis, but only its first-page publisher preview and abstract were accessible; this is not a mechanical-apparatus replication or normed assessment.

Requires PsyFlow's additive `capture_pointer_pursuit` API. The extension is published in TaskBeacon/psyflow commit `8cbafd341b48a762c26e4f726b7f8373f1b43d7a`. Install that revision (for example `python -m pip install git+https://github.com/TaskBeacon/psyflow.git@8cbafd341b48a762c26e4f726b7f8373f1b43d7a`) or use a sibling clone on PYTHONPATH. Development used an isolated clone named `psyflow-task137`, not a private dependency. Run `python main.py human`, `python main.py qa`, or `python main.py sim --config config/config_sampler_sim.yaml`. Operator must record device description, mouse hand and acceleration setting in config before research collection. Unknown defaults are exported as incomplete metadata. Keep device and settings fixed. No DPI or physical calibration is claimed.

## 2. Task Flow

![Task Flow](task_flow.png)

Instruction -> acquisition4trials -> fixed60srest -> retention4trials -> completion. Each trial:2sready ->15stracking ->5srest after trials1-3 only. Principal rest follows acquisition4, then retention1's2sready. No participant input shortens tracking/rest. Scheduled total after instruction is226s:120s tracking,16sready,30s shortrests,60s principalrest, plus software overhead.

Controller logic: no adaptive difficulty, feedback reward or randomized factors. Built-in BlockUnit schedules a single phase label in each chronological block. Trial IDs come from PsyFlow. Shared primitive owns pointer/display clocks, sampling, scoring and lifecycle; task code sequences phases and computes descriptive session differences.

Sampling occurs once per display update even for a stationary known mouse. Target command time, actual flip time, cursor observation time, target/cursor software coordinates, validity and invalidation epoch are preserved. Motion is elapsed-time driven. Native public window handlers track mouse motion/leave, deactivation and resize; absent support makes samples missing. A fresh movement establishes pointer validity. Escape aborts tracking; completed rows are preserved, incomplete current trial is not called complete.

## 3. Configuration Summary

| Group | Values |
|---|---|
| Subject info |three-digit ID101-999; never publish participant data |
| Window |1000x800 software px, gray; no physical calibration |
| Stimuli |253px orbit radius,25px red target radius,3px white cursor; SimHei text |
| Timing |0.13rotations/s;2sready;15stracking;5sITI;60srest |
| Triggers |experiment1/2;ready10;acquisition20/21;retention30/31;rest40;mock driver |
| Adaptive controller |none |
| Device metadata |description, mouse hand, acceleration; missing fields flagged |
| QA/simulation |6trials,0.5stracking/0.25srest, synthetic input; not research timing |

Scoring uses left-hold time quadrature with valid endpoints and unchanged invalidation epoch. Gaps>100ms are wholly missing. Initial/terminal uncovered intervals are missing; timestamps beyond15s only close the preceding clipped interval. On-target duration divided by15s is an observed lower bound when coverage is incomplete. Also export observed-time proportion, observed/missing durations, coverage, maximum gap and sample count. RMS=sqrt(time-weighted squared distance/observed time). No observed time gives null RMS/observed proportion.

Raw phases include full `tracking_pursuit_samples`; reduced CSV has one row per logical trial. `practice_gain`=acquisition4-acquisition1; `post_rest_change`=retention1-acquisition4 for full-duration on-target proportion. RMS differences reverse subtraction so positive means smaller error. Summaries are null unless both rows coverage>=0.95. A single-session difference does not establish learning or consolidation.

## 4. Methods (for academic publication)

Participants used an unchanged mouse and mouse hand to follow a red circular target. Orbit253softwarepx, target radius25softwarepx,0.13rotations/s and15s trial duration adapt the pursuit measure in Zhang et al.(2024). Four acquisition trials preceded60s rest and four immediate post-rest trials. Two-second preparation and five-second intertrial intervals are implementation inferences, not recovered Ammons parameters. Freihaut et al.(2021) supports computer-tracking context; its stress manipulation,25s duration and inside/outside ratio were not adopted.

Software timestamps do not measure photon onset or hardware mouse latency. Native pix and browser CSSpx are distinct software units; physical size, sensitivity, refresh rate and device differences limit comparisons. Synthetic responders and automated UI mouse events verify plumbing/rendering, not human skill or motor learning. [Logic audit](references/task_logic_audit.md), [parameter mapping](references/parameter_mapping.md), [stimulus mapping](references/stimulus_mapping.md), [references](references/references.md).

