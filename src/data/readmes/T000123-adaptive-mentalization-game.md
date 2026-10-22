# Adaptive Mentalization Game

**TaskBeacon ID:** T000123  
**Version:** v0.1.0  
**Updated:** 2026-08-29  
**Language:** Chinese  
**Acquisition:** Behavioral (fMRI-compatible timing and triggers)

| Metadata | Value |
|---|---|
| Name | Adaptive Mentalization Game |
| Version | 0.1.0 |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.2.0-compatible local runtime |
| PsychoPy Version | 2025.2.3 |
| Modality | Visual number choice / keyboard response |
| Language | Chinese |

## 1. Task Overview

This task implements the adaptive mentalization game introduced by Buergi et al. (2026). Participants repeatedly choose one of three numbers against artificial opponents whose recursive reasoning depth is fixed at k=0, k=1, or k=2 within a match and changes between matches. The circular payoff rule is 2 beats 1, 3 beats 2, and 1 beats 3.

The primary outcomes are choice, response time, win/tie/loss, score, opponent level, and the opponent policy state required to audit each generated action. The local task is a behavioral implementation of the paper's three-action artificial-opponent protocol using the replication fMRI timing profile.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

The human profile contains six 40-round matches. Each opponent level occurs twice in a seeded order that does not begin with k=2 and avoids adjacent repetitions. A new-opponent screen appears before every match; level identity is never shown to the participant.

### Trial-Level Flow

| Phase | Duration | Participant-visible content | Response |
|---|---:|---|---|
| Fixation | 1–3 s | Centered `+` | None |
| Private choice | 3–5 s max | Numbers 1/2/3 on a circular dominance diagram | Keys 1, 2, or 3 |
| Joint feedback | 2 s | Own choice in blue, opponent choice in green, outcome and score | None |

### Controller Logic

Each match uses one fixed-level artificial opponent. Action attractions begin uniform and update with learning rate α=0.9. A k=0 opponent samples from its recency-weighted own-action attractions; k=1 best responds to the participant's recency-weighted actions; k=2 recursively best responds to the participant's predicted best response. The calibrated noise policy from the public companion code adjusts inverse temperature according to recent participant success and outcome streaks.

### Other logic

Win/tie/loss scores are +1/0/−1. A timeout is recorded as a neutral 0 and does not fabricate a participant action for the opponent's learning state. QA and simulation profiles shorten only block/trial counts and display times.

## 3. Configuration Summary

### a. Subject Info

The human profile collects participant ID, age, and gender. QA/simulation use fixed test IDs.

### b. Window Settings

| Setting | Value |
|---|---|
| Size | 1280 × 720 px |
| Background | Light gray |
| Units | Pixels |
| Fullscreen | Configurable; off by default |

### c. Stimuli

All participant-facing stimuli use PsychoPy text and circle primitives with the SimHei font. The three actions are explicitly positioned on a cycle. Keys `1`, `2`, and `3` choose the matching number; `Space` advances instructions and breaks.

### d. Timing

| Parameter | Human value | Source |
|---|---:|---|
| Fixation | Uniform 1–3 s | Buergi et al. (2026), replication fMRI Methods |
| Choice window | Uniform 3–5 s max | Buergi et al. (2026), replication fMRI Methods |
| Feedback | 2 s | Buergi et al. (2026), Methods |

### Triggers

Triggers distinguish experiment/block boundaries, fixation, k=0/1/2 choice onsets, the three response keys, timeout, and win/tie/loss/timeout feedback.

### Adaptive controller

The participant is not controlled adaptively. The task-specific controller generates opponent actions using fixed reasoning depth with recency learning and calibrated stochastic deviations. Controller state is reset to uniform attractions at each match, matching the paper's block-wise reset used in modeling.

## 4. Methods (for academic publication)

Participants completed six 40-round matches of a three-action cyclic dominance game. On each round, a fixation cross appeared for 1–3 s, followed by a number-choice display for up to 3–5 s. Participants selected 1, 2, or 3 using the corresponding keyboard key. Both choices were then revealed for 2 s, with the participant's choice shown in blue and the opponent's choice in green. The participant received +1 for choosing the action exactly one step ahead of the opponent in the cycle 1→2→3→1, 0 for a tie, and −1 for a loss.

Participants faced artificial opponents with fixed recursive reasoning depths k=0, k=1, and k=2. Each opponent level appeared in two matches in a seeded counterbalanced order without adjacent repetitions. Artificial opponents tracked recency-weighted action frequencies (α=0.9), applied level-specific recursive best responses, and used the calibrated stochasticity rules supplied with the source article. Opponent identity changed between matches and reasoning level was not disclosed.

### Reference

Buergi, N., Aydogan, G., Konovalov, A., et al. (2026). A neural signature of adaptive mentalization. *Nature Neuroscience, 29*, 934–944. https://doi.org/10.1038/s41593-026-02219-x

## Running the task

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
