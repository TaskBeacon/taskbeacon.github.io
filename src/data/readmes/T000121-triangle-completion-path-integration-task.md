# Triangle Completion / Path Integration Task

| Field | Value |
|---|---|
| Name | Triangle Completion / Path Integration Task |
| Task ID | `T000121` |
| Acquisition | Behavior |
| Variant | Baseline desktop adaptation |
| Modality | Pointer-controlled 2D virtual navigation |
| Language | Chinese |
| Version | `v0.1.0` |
| Date Updated | 2026-08-30 |
| PsyFlow Version | `0.1.12` |
| PsychoPy Version | `2025.2.4` |
| Primary source | Kessler et al., Nature Communications (2024) |

## 1. Task Overview

The Triangle Completion / Path Integration Task measures how participants combine remembered self-motion with visual landmarks when returning to a previously visited location. Each trial presents a virtual arena with three sequential goals. After visiting all three, the environment disappears for 20 seconds and then returns with one of four cue configurations: landmarks absent, route orientation degraded with landmarks available, both cues available, or landmarks covertly rotated by 15 degrees.

This TaskBeacon version is a source-mapped desktop adaptation of room-scale/HMD walking. Pointer-controlled movement and endpoint selection preserve the cited trial sequence, cue semantics, geometry, and endpoint-error analyses, but do not reproduce vestibular signals from physical walking.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

The human profile contains one 40-trial test block, balanced at 10 trials per cue condition. Four outbound layouts and both conflict directions are distributed by a deterministic seed before trial execution.

### Trial-Level Flow

Trial-level flow:

1. Click goal 1 (the later home location).
2. Click goal 2.
3. Click goal 3.
4. View a 20-second hidden-environment delay; landmark-only trials include the desktop disorientation analogue.
5. Click the remembered goal-1 location in the arena under the scheduled cue manipulation.
6. See a neutral marker at the selected endpoint, then a brief inter-trial interval.

### Controller Logic

There is no adaptive controller and no correctness feedback. A task-specific deterministic generator binds cue condition, layout, jitter, and conflict direction before `run_trial()` begins.

### Other Logic

The response grid is invisible and exhaustively covers the arena. Selection acknowledgement shows only the chosen endpoint, never the true home location.

## 3. Configuration Summary

### a. Subject Info

The human profile collects a three-digit subject ID, age, and gender.

### b. Window Settings

The task uses a 1280 x 800 px window with a dark background and a centered virtual arena.

### c. Stimuli

All participant-visible stimuli use configuration-defined Chinese text and PsychoPy vector primitives.

### d. Timing

The nominal source-aligned delay is 20 seconds. Outbound and homing response guards are generous desktop adaptations.

| Category | Configuration |
|---|---|
| Subject info | Three-digit subject ID, age, gender |
| Window | 1280 x 800 px, dark background, windowed by default |
| Virtual arena | 6.9 x 8.8 m mapped at 70 px/m |
| Conditions | Self-motion, landmark, combined, conflict |
| Trials | 40 total; 10 per condition |
| Landmarks | Three stable beacons; hidden or rotated only at homing as scheduled |
| Outbound targets | Three sequential goals; ±0.4 m deterministic jitter |
| Delay | 20 s nominal |
| Conflict | ±15° landmark rotation around the final position |
| Homing response | One selection from a 14 x 18 invisible endpoint grid |
| Outcomes | Endpoint error, heading error, response time, timeout, conflict cue proximity |
| Triggers | Experiment/block, three outbound onsets, selection/timeout, delay, condition-specific homing, completion |

Run modes:

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a pointer-controlled two-dimensional adaptation of the triangle-completion task synthesized by Kessler et al. (2024). On each trial they traversed three sequentially visible goals in a 6.9 x 8.8 m virtual arena containing three landmarks. The first goal served as the home location. After the third goal, the environment was hidden for 20 s. At homing, either landmarks were absent (`self_motion`), route orientation was degraded while veridical landmarks were available (`landmark`), both sources remained available (`combined`), or landmarks were rotated 15° left or right around the final position (`conflict`). Participants selected the remembered home location without accuracy feedback. The primary dependent variable was Euclidean endpoint error; secondary measures were heading error, response time, timeout rate, and response proximity to self-motion- versus landmark-defined endpoints on conflict trials.

The test contained 40 trials (10 per condition), matching the Chen et al. parameter set reported in Kessler et al. Supplementary Table 1. Four outbound layouts and both conflict directions were balanced in a participant-seeded deterministic plan. Target locations were jittered by up to 0.4 m. Because the cited experiments used physical walking or HMD VR, conclusions requiring vestibular equivalence should not be drawn from this desktop adaptation.

## References

- Kessler, F., Frankenstein, J., & Rothkopf, C. A. (2024). Human navigation strategies and their errors result from dynamic interactions of spatial uncertainties. *Nature Communications, 15*, 5677. https://doi.org/10.1038/s41467-024-49722-y
- Nardini, M., Jones, P., Bedford, R., & Braddick, O. (2008). Development of cue integration in human navigation. *Current Biology, 18*, 689-693. https://doi.org/10.1016/j.cub.2008.04.021
- Zhao, M., & Warren, W. H. (2015). How you get there from here. *Psychological Science, 26*, 915-924. https://doi.org/10.1177/0956797615574952
- Chen, X., McNamara, T. P., Kelly, J. W., & Wolbers, T. (2017). Cue combination in human spatial navigation. *Cognitive Psychology, 95*, 105-144. https://doi.org/10.1016/j.cogpsych.2017.04.003
