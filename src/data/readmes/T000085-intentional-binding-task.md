# Intentional Binding Task

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Intentional Binding Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000085-intentional-binding-task |
| Short Description | Conventional Libet-clock task measuring perceived temporal attraction between voluntary actions and their auditory outcomes. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-01 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | None (voice disabled) |

## 1. Task Overview

This task implements the conventional four-condition Intentional Binding paradigm. Participants watch a clock hand rotating once every 2.5 s and report the perceived position of either a self-paced key press or a 1000 Hz tone. Comparing signed report errors between single-event baselines and action-causes-tone trials yields action binding, tone binding, and total binding estimates. Because temporal binding is not uniquely diagnostic of agency, the exported measures should be interpreted as action-outcome temporal attraction rather than a stand-alone proof of subjective agency.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Stage | Implementation |
|---|---|
| Session setup | Load the selected mode config, collect or inject `subject_id`, initialize PsyFlow, the trigger runtime, window, keyboard, and preloaded stimulus bank. |
| General instruction | Show `instruction`; explain the rotating clock, event-specific report, free action timing, and pointer report. Continue with space. |
| Block order | Shuffle `baseline_action`, `baseline_tone`, `operant_action`, and `operant_tone` deterministically from `overall_seed` and participant ID. |
| Block instruction | Show one config-defined condition instruction that states whether an action and/or tone will occur and whether action or tone time must be reported. |
| Practice | Run 6 practice trials for the current condition, then show `practice_complete`. QA and simulation profiles omit practice. |
| Scored block | Run 30 scored trials for the current condition using built-in `BlockUnit.generate_conditions(...)` with a single condition label. |
| Completion | Save one reduced row per logical trial and show completed/valid counts plus mean absolute report error. |

### Trial-Level Flow

| Phase | Visible/Auditory Content | Timing and Response |
|---|---|---|
| `warning` | `warning`: centered Chinese new-trial message | 1.0 s; condition-specific onset trigger |
| `fixation` | `fixation`: central `+` | 0.5 s |
| `clock_stationary` | 60 ticks, labels `0, 5, ..., 55`, center dot, and a red hand at one of 12 start positions | 0.5 s |
| `clock_running` - action trials | Same clock; hand rotates clockwise once per 2.5 s | Space is accepted for up to 6.0 s; the action ends baseline-action trials or starts the operant delay |
| `clock_running` - tone baseline | Same rotating clock without valid keys | Tone onset is sampled in 0.2-2.0 s from a deterministic trial seed |
| `action_tone_delay` | Rotating clock continues | 0.2 s after an operant action |
| `tone` | Rotating clock plus PsychoPy-generated 1000 Hz tone | 0.1 s |
| `post_event_clock` | Rotating clock continues without feedback | Continues until 2.0 s has elapsed from the event being judged |
| `clock_report` | Static clock face plus `report_action` or `report_tone` | Click one of 60 clock positions within 15 s |
| `iti` | `blank` white screen | 0.5 s |

### Controller Logic

| Component | Logic |
|---|---|
| Adaptive controller | None. The task contains no staircase, reward update, or performance adaptation. |
| Condition scheduling | Each block passes its single canonical condition through PsyFlow's built-in generator; no custom condition generator is used. |
| Nuisance sampling | `src/utils.py` deterministically samples the 12-position clock start and baseline-tone latency from `overall_seed` plus PsyFlow `trial_id`. |
| Dynamic clock | `ClockHand.draw()` derives the current position from a PsychoPy clock; StimUnit retains ownership of drawing frames, flips, response capture, triggers, and logging. |

### Other Logic

| Measure | Definition |
|---|---|
| Clock unit | `2500 / 60 = 41.667 ms` |
| Signed judgment error | Shortest circular displacement from actual event position to reported position, wrapped to `[-30, 30)` and converted to milliseconds |
| Action binding | Mean `operant_action` error minus mean `baseline_action` error |
| Tone binding | Mean `baseline_tone` error minus mean `operant_tone` error |
| Total binding | Action binding plus tone binding |
| Valid trial | Required action occurred (when applicable) and one clock-position report was collected |

## 3. Configuration Summary

Settings below come from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier from 101 to 999 |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 x 800 |
| Units | Degrees of visual angle |
| Background | White |
| Fullscreen | False |
| Monitor geometry | 35.5 cm width, 57 cm viewing distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `instruction` | Text | General Chinese task instructions |
| `block_*` | Text | Four condition-specific Chinese instruction screens |
| `warning` | Text | New-trial warning |
| `fixation` | Text | Central plus sign |
| `clock_rim`, `clock_center`, `clock_label` | Circle/Text | Config-defined anchors for the generated 60-position clock |
| Generated ticks/hand | Line | 60 radial ticks and a red clockwise rotating hand |
| `outcome_tone` | Sound | Generated 1000 Hz sine tone asset, 100 ms |
| `report_action`, `report_tone` | Text | Event-specific report prompts above the clock |
| Report targets | Circle | 60 invisible pointer targets centered on clock positions 0-59 |
| `blank` | Text | Empty ITI stimulus |

### d. Timing

| Phase | Duration |
|---|---|
| Warning | 1.0 s |
| Fixation | 0.5 s |
| Stationary clock | 0.5 s |
| Clock period | 2.5 s per revolution |
| Action response ceiling | 6.0 s |
| Baseline-tone latency | Uniform 0.2-2.0 s |
| Action-to-tone delay | 0.2 s |
| Tone | 0.1 s |
| Clock after judged event | 2.0 s total from critical event |
| Clock report ceiling | 15.0 s |
| ITI | 0.5 s |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 99 |
| Block start / end | 10 / 90 |
| Condition warnings | 20-23 |
| Fixation / stationary clock | 30 / 31 |
| Condition clock onsets | 40-43 |
| Action / action timeout | 50 / 54 |
| Tone / post-event clock | 51 / 52 |
| Report onset / selection / timeout / complete | 60 / 61 / 62 / 63 |
| ITI | 70 |

## 4. Methods (for academic publication)

Participants completed four blocked conditions presented in participant-seeded random order: baseline action, baseline tone, operant action judgment, and operant tone judgment. Each condition began with six practice trials and contained 30 scored trials. A trial started with a 1.0 s warning and 0.5 s fixation. A 60-position Libet clock then appeared with its hand stationary for 0.5 s at one of 12 five-unit start positions. The hand subsequently rotated clockwise with a 2.5 s period. In action-containing conditions, participants pressed the space bar at a freely chosen time within a 6.0 s ceiling. In baseline-tone trials, no action was made and the computer presented the tone 0.2-2.0 s after rotation onset.

In operant trials, the voluntary action caused a 1000 Hz, 100 ms tone after 200 ms. The clock continued until approximately 2.0 s had elapsed from the event designated for judgment. Participants then clicked the perceived event position on a stationary clock labeled from 0 to 59. Baseline blocks contained only the judged event: action without tone or computer-generated tone without action. No accuracy feedback or reward was provided. Clock start position and baseline-tone latency were deterministically sampled per trial, while trial identity, phase context, response capture, and triggers were managed by PsyFlow.

For each valid trial, the report error was the shortest signed circular displacement between the reported and actual event positions multiplied by 41.667 ms per clock unit. Action binding is estimated by subtracting baseline-action error from operant-action error; tone binding is estimated by subtracting operant-tone error from baseline-tone error; total binding is their sum. The procedure follows the conventional Libet-clock timing and blocked judgments described by [Barlas and Obhi (2013)](https://doi.org/10.3389/fnhum.2013.00514), with operant/baseline interpretation informed by [Dewey and Knoblich (2014)](https://doi.org/10.1371/journal.pone.0110118). Inferences about subjective agency should remain cautious because comparable temporal binding can arise without intentional action, as shown by [Suzuki et al. (2019)](https://doi.org/10.1177/0956797619842191).

## Run

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
