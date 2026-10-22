# Mirror Tracing

| Field | Value |
|---|---|
| Name | Mirror Tracing |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000101-mirror-tracing |
| Short Description | Continuous six-point-star tracing under horizontally reversed cursor feedback, with trial-wise speed and path-error learning curves. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | 0.1.12 plus the public continuous pointer-trace primitive introduced for this task |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavioral; continuous mouse/pointer movement |
| Language | Chinese participant interface |
| Voice Name | zh-CN-YunyangNeural (configured; synthesized voice disabled) |

## 1. Task Overview

Mirror Tracing measures procedural visuomotor learning when visible movement feedback conflicts with the hand's habitual mapping. Participants hold the primary mouse button and trace a narrow six-point-star corridor. During formal trials, the displayed cursor is reflected horizontally about the screen center, so physical movement to the right produces visible movement to the left. Performance is quantified by completion time, boundary excursions, time and proportion off path, RMS path deviation, pointer lifts, and completion progress.

The task is deliberately distinct from Fitts' Law pointing, tapping, and anti-reach paradigms. It requires continuous trajectory control and online correction over a closed path rather than discrete target acquisition, rhythmic timing, or a single movement away from a cue.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Setup | `main.py` loads the mode-specific config, creates `TaskSettings`, initializes the PsychoPy window and trigger runtime, and preloads config-defined stimuli. |
| Instruction | Chinese instructions teach click-hold tracing, clockwise direction, the green start marker, and the reversed cursor mapping. |
| Familiarization | One unscored trial uses veridical cursor feedback so participants learn the digital input mechanics. |
| Scored phase | Three blocks of ten trials use horizontal mirror feedback. The sole human condition label, `mirror`, is scheduled by `BlockUnit.generate_conditions()`. |
| Breaks | Blocks 1 and 2 end with completion rate, mean time, and mean boundary excursions for the just-finished block. |
| Completion | The final screen compares the first and last five scored trials, then one logical trial per row is saved to CSV. |

### Trial-Level Flow

| Phase | Participant-visible content | Timing / termination |
|---|---|---|
| Tracing | Light-gray six-point-star corridor, dark centerline, green start/finish marker, yellow cursor and trail; the cursor turns red outside the corridor. | Up to 60 s. Drawing begins only after a primary-button press inside the start marker. Completion requires at least 95% ordered progress and return to the marker while pressed. |
| Feedback | Completion or timeout plus movement time, boundary-excursion count, and off-path proportion. | 1.5 s. |
| ITI | Central gray fixation cross. | 0.75 s. |

### Controller Logic

| Component | Description |
|---|---|
| Adaptive controller | None. The mirror transform, geometry, timing, and completion criteria are fixed. |
| Trial identity | Every practice and scored trial obtains its ID from PsyFlow `next_trial_id()`. |
| Pointer runtime | PsyFlow `capture_pointer_trace()` owns sampling, coordinate transformation, geometry, triggers, raw trajectory logging, QA injection, and phase data. |

### Other Logic

| Component | Description |
|---|---|
| Mirror mapping | `x_display = -x_physical`; `y_display = y_physical`. The symmetric star remains fixed. |
| Ordered progress | Forward-continuous nearest-segment arclength progress must reach 95% before return to the start can complete the trial. Large discontinuous jumps (including a reverse departure that maps near path end) are rejected, preventing click-and-release and wrong-direction shortcuts. |
| Error excursion | Counted once per transition from inside to outside the 0.70-deg corridor while the participant is drawing. |
| Off-path time | Frame intervals sampled outside the corridor are summed and divided by movement time. |
| Path deviation | RMS distance from every displayed drawing sample to the nearest star centerline segment. |
| Learning summaries | Formal trial rows support trial-wise and block-wise curves; the final screen contrasts the first and last five completed trials. |

## 3. Configuration Summary

All human parameters are in `config/config.yaml`; QA and two simulation profiles shorten only counts and timings needed for automated verification.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit identifier from 101 to 999. |
| `age` | Participant age from 18 to 80 years. |
| `gender` | Male, Female, or Other. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 pixels |
| Units | Degrees of visual angle |
| Background | Black |
| Fullscreen | False by default |
| Monitor geometry | 35.5-cm width at 57-cm viewing distance |

### c. Stimuli

| Stimulus | Type | Description |
|---|---|---|
| `trace_corridor` | PsychoPy `ShapeStim` | Closed 12-segment centerline rendered as a thick light-gray six-point star. |
| `trace_centerline` | PsychoPy `ShapeStim` | Thin dark line marking the corridor center. |
| `start_marker` | Circle | Green top-vertex start and finish target. |
| `trace_cursor` | Circle | Yellow framework-controlled visible cursor. |
| `trace_cursor_error` | Circle | Red cursor shown while the display position is outside the valid corridor. |
| `trace_instruction`, `trial_progress` | Text | Separate top and bottom bands; neither overlaps the star. |
| Feedback / break / goodbye | Text | Chinese performance summaries driven by YAML templates. |

The star's outer radius is 6.0 deg, its alternating inner radius is 3.5 deg, and the hit-tested corridor width is 0.70 deg. These display dimensions are documented in the evidence mapping as inferred digital parameters.

### d. Timing

| Phase | Duration |
|---|---|
| Tracing | 60 s maximum |
| Feedback | 1.5 s |
| ITI | 0.75 s |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 99 |
| Practice start | 5 |
| Block start / end | 10 / 90 |
| Tracing onset | 20 |
| Accepted drawing start | 21 |
| Boundary excursion | 22 |
| Valid trace completion | 23 |
| Trace timeout | 24 |
| Feedback onset | 30 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller | None; all human scored trials use the same mirror mapping and star geometry. |

## 4. Methods (for academic publication)

Participants completed a computerized mirror-tracing task derived from the classic six-pointed-star procedure used to assess acquisition and retention of visuomotor skill. A closed star-shaped path was displayed as a 0.70°-wide corridor centered on a 12-vertex alternating-radius outline (outer radius 6.0°, inner radius 3.5°). Participants positioned the pointer at the green marker on the upper vertex, pressed and held the primary mouse button, traced the corridor clockwise, and returned to the start. They were instructed to work quickly while minimizing departures from the corridor.

One unscored familiarization trial used veridical pointer feedback. Participants then completed 30 scored trials in three blocks of ten. On every scored trial, displayed horizontal pointer position was reversed about the screen center (`x_display = -x_physical`), while vertical position remained veridical. The operating-system pointer was hidden; the framework-rendered cursor and trail were the only movement feedback. A trial was completed when ordered arclength progress reached at least 95% and the displayed pointer returned within 0.38° of the start while the button remained pressed. Trials not completed within 60 s were marked as timeouts. Numeric feedback was shown for 1.5 s, followed by a 0.75-s intertrial interval.

The primary dependent variables were completion time and boundary excursions, matching classic mirror-tracing outcomes. A boundary excursion was counted on each transition from inside to outside the corridor, rather than on every outside sample. Additional continuous measures were total and proportional time off path, root-mean-square distance to the nearest path segment, pointer lifts, maximum ordered progress, and completion status. Learning is analyzed across scored-trial index and by block; early-versus-late summaries compare the first and last five completed scored trials. The veridical familiarization trial is excluded from these learning curves.

### Evidence and Inference Boundary

The six-point star, repeated-trial learning design, mirror-reversal construct, and time/contact/off-pattern outcomes are reference-aligned. Consolidating 30 trials into one three-block session, visual-angle geometry, the 60-s computerized deadline, ordered-progress safeguard, and immediate numeric feedback are explicit digital adaptations or inferences recorded in `references/parameter_mapping.md` and `references/task_logic_audit.md`.

### References

- Gabrieli, J. D. E., Corkin, S., Mickel, S. F., & Growdon, J. H. (1993). Intact acquisition and long-term retention of mirror-tracing skill in Alzheimer's disease and in global amnesia. *Behavioral Neuroscience, 107*, 899–910. https://doi.org/10.1037/0735-7044.107.6.899
- Telgen, S., Parvin, D. E., & Diedrichsen, J. (2014). Mirror reversal and visual rotation are learned and consolidated via separate mechanisms. *Journal of Neuroscience, 34*, 13768–13779. https://doi.org/10.1523/JNEUROSCI.5306-13.2014
- Corkin, S. (2002). What's new with the amnesic patient H.M.? *Nature Reviews Neuroscience, 3*, 153–160. https://doi.org/10.1038/nrn726
- Kelly, C., & Garavan, H. (2005). Human functional neuroimaging of brain changes associated with practice. *Cerebral Cortex, 15*, 1089–1102. https://doi.org/10.1093/cercor/bhi005

## Running

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
