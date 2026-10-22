# Slips-of-Action / Outcome Devaluation Task

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Slips-of-Action / Outcome Devaluation Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000079-slips-of-action-outcome-devaluation |
| Short Description | Fruit-box instrumental learning, instructed outcome devaluation, slips-of-action, and stimulus-devaluation baseline control |
| Created By | TaskBeacon |
| Date Updated | 2026-07-27 |
| PsyFlow Version | local TaskBeacon checkout |
| PsychoPy Version | environment-managed |
| Modality | Behavioral |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (disabled by default) |

## 1. Task Overview

This task measures how flexibly participants use learned action–outcome knowledge when outcome values change. Participants learn six deterministic fruit stimulus–response–outcome mappings, demonstrate outcome-action knowledge, and then complete matched rapid tests in which either outcomes (Slips-of-Action) or stimuli (baseline control) are repeatedly devalued. Responding for a devalued predicted outcome is a slip of action, whereas selective responding for valued outcomes indicates stronger goal-directed control.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Blocks / Trials | Participant-visible flow |
|---|---:|---|
| Instrumental training | 6 × 12 | Learn which F/J response opens each fruit-marked box and which fruit appears inside. Correct responses reveal the outcome and earn 1–5 points according to response time. |
| Outcome-devaluation knowledge test | 1 × 12 | View two open boxes; one outcome fruit has a red X. Press the response that previously earned the still-valued fruit. No trial-wise feedback is shown. |
| Slips-of-Action test | 6 × 24 | Before each block, view all six outcome fruits for 10 s with two crossed out. Respond to stimuli predicting valued outcomes and withhold from stimuli predicting devalued outcomes. |
| Stimulus-devaluation baseline | 6 × 24 | Matched to Slips-of-Action, except the six discriminative stimuli are shown at block start and two stimuli are crossed out. |
| Test counterbalancing | participant-based | Slips and baseline order is reversed for odd versus even participant IDs. |

### Trial-Level Flow

| Trial type | Ordered states | Timing and response rule |
|---|---|---|
| Training | `training_choice → training_feedback → trial_iti` | Closed box up to 3 s (F/J); open-box feedback 1 s; fixation 0.5 s. |
| Outcome devaluation | `outcome_choice → trial_iti` | Two open boxes up to 6 s (F/J); no correctness feedback; fixation 0.5 s. |
| Slips valued | `rapid_choice → trial_iti` | Closed box for fixed 1 s; press its learned F/J key; neutral 1 s ITI. |
| Slips devalued | `rapid_choice → trial_iti` | Closed box for fixed 1 s; withhold both keys; neutral 1 s ITI. |
| Baseline valued/devalued | `rapid_choice → trial_iti` | Same timing and response rules as slips, but value is assigned directly to the stimulus shown in the block overview. |

### Controller Logic

| Component | Implementation |
|---|---|
| Adaptive controller | None. The task uses deterministic mappings and fixed schedules. |
| Running state | A small task state records cumulative training points only. |
| Trial identity | PsyFlow `next_trial_id()` owns trial IDs. |

### Other Logic

| Logic | Implementation |
|---|---|
| Participant counterbalancing | Six distinct stimulus fruits map to six distinct outcome fruits; outcome rotation/reversal and balanced three-left/three-right keys derive deterministically from participant ID. |
| Exact scheduling | Custom preplanned `TrialPlan` objects enforce each fruit’s repetitions and the six-block devaluation schedule. |
| Point scoring | Correct training RTs earn 5 (≤1 s), 4 (≤1.5 s), 3 (≤2 s), 2 (≤2.5 s), or 1 (>2.5 s) point. |
| Devaluation schedule | Two identities are devalued per rapid block; across six blocks, each identity is devalued twice. |
| Main outcomes | Valued response rate, devalued response rate, slips, and devaluation sensitivity index (`valued − devalued`) for both rapid tests. |

## 3. Configuration Summary

Settings below come from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier; also determines deterministic counterbalancing. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 |
| Units | degrees of visual angle |
| Background | `#f8fafc` |
| Fullscreen | false |
| Monitor geometry | 35.5 cm width, 57 cm viewing distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `closed_box` / `open_box` | Rect primitives | Gray closed box or cream open box with explicit lid and handle geometry |
| `fruit_icon` | Image | One of 12 original generated fruit illustrations |
| `devalue_mark` | Text | Large red X centered over a devalued fruit |
| `overview_card` | Rect + image | Six-card 3×2 overview grid |
| Instructions / scores | Text | Chinese phase-specific instructions, running points, and final completion summary |

### d. Timing

| Phase | Duration |
|---|---:|
| Training response | 3.0 s maximum |
| Training feedback | 1.0 s |
| Training ITI | 0.5 s |
| Outcome-devaluation response | 6.0 s maximum |
| Outcome-devaluation ITI | 0.5 s |
| Devaluation overview | 10.0 s |
| Rapid response window | fixed 1.0 s |
| Rapid ITI | 1.0 s |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 99 |
| Block start / end | 10 / 90 |
| Training choice / left / right / timeout | 20 / 21 / 22 / 23 |
| Training feedback correct / incorrect / timeout | 30 / 31 / 32 |
| Outcome choice / left / right / timeout | 40 / 41 / 42 / 43 |
| Devaluation overview | 50 |
| Slips valued / devalued | 60 / 61 |
| Baseline valued / devalued | 62 / 63 |
| Rapid left / right / withhold | 64 / 65 / 66 |
| ITI | 70 |

## 4. Methods (for academic publication)

Participants completed a deterministic instrumental-learning task adapted from the fruit-box Slips-of-Action paradigm. During six training blocks, each of six discriminative fruit stimuli appeared twice per block on the door of a closed box. Participants selected a left (`F`) or right (`J`) response. Correct responses opened the box to reveal a unique outcome fruit and earned 1–5 points as a decreasing function of response time; incorrect responses revealed an empty box and earned zero. Stimulus–outcome assignments and three-left/three-right response mappings were counterbalanced deterministically across participants.

Next, participants completed 12 instructed outcome-devaluation trials. Each trial displayed one left-associated and one right-associated outcome fruit, with one outcome crossed out in red. Participants selected the response previously associated with the still-valued outcome; no trial-wise feedback was provided. They then completed Slips-of-Action and stimulus-devaluation baseline tests in counterbalanced order. Each test contained six 24-trial blocks. Before every block, all six relevant identities were displayed for 10 s and two were crossed out. Rapid test stimuli appeared for 1 s followed by a 1 s intertrial interval, with no feedback.

In the Slips-of-Action test, participants responded with the trained key only when the stimulus predicted an outcome that remained valuable and withheld when the predicted outcome was devalued. The matched baseline directly devalued discriminative stimuli, controlling for rule updating, working memory, and response inhibition without requiring outcome retrieval. Primary measures are the percentages of responses to valued and devalued trials and their difference (devaluation sensitivity index), computed separately for the Slips-of-Action and baseline phases.

## Running

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## Evidence

The primary protocol and stimulus logic follow Gillan et al. (2011), with supporting task-family evidence from de Wit et al. (2011, 2012, 2018). Full parameter and stimulus traceability is recorded in `references/`.
