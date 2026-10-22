# Moral Strategy Outcome-Learning Task

| Field | Value |
|---|---|
| Name | Moral Strategy Outcome-Learning Task |
| Task ID | T000115 |
| Slug | moral-strategy-outcome-learning-task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000115-moral-strategy-outcome-learning-task |
| Short Description | Outcome-contingent learning of moral rules versus cost-benefit reasoning |
| Created By | TaskBeacon |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Acquisition | Behavior |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |
| Canonical source | Maier, Cheung, and Lieder (2025), Experiment 1 |

## 1. Task Overview

This task implements the 13-trial moral-learning paradigm introduced by Maier, Cheung, and Lieder. Participants read realistic moral dilemmas, rate the moral rightness of a proposed action, decide whether to take that action, observe the contingent outcome, and rate how good or bad the outcome was. Each participant remains in one learning environment: either cost-benefit reasoning (CBR) always produces the positive outcome or following the pertinent moral rule always produces the positive outcome.

The task measures trial-wise reliance on CBR versus moral rules and whether decision strategies become aligned with the consequences experienced in the assigned environment. The yes/no action framing is deliberately crossed with strategy: the proposed action is the CBR option in eight dilemmas and the rule option in five.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Participant setup | Collect participant ID and demographics; derive a stable, reproducible CBR-success or rule-success environment. |
| Instructions | Explain the three responses and the integer rating controls. |
| Learning block | Present the fixed 13-dilemma Experiment 1 sequence once. |
| Summary | Save trial rows and a compact strategy-learning summary, then show completion statistics. |

### Trial-Level Flow

| Phase | Participant-visible content | Response |
|---|---|---|
| Moral judgment | Full realistic dilemma plus a 0-100 moral-rightness scale initialized at 50 | Arrow/Page keys adjust; Space confirms |
| Decision choice | Item-specific action question with spatially separated Yes and No options | F = Yes; J = No |
| Outcome evaluation | Choice-contingent narrative in green for a positive outcome or red for a negative outcome, plus a -100 to +100 scale initialized at 0 | Arrow/Page keys adjust; Space confirms |

### Controller Logic

No adaptive controller is used. Environment assignment occurs once per participant. On each trial, the action framing converts Yes/No into CBR/rule strategy. The assigned environment then deterministically maps the chosen strategy to that item's positive or negative outcome narrative.

### Other Logic

The original Qualtrics mouse sliders are represented by an integer-preserving keyboard adjustment because the PsyFlow config stimulus registry has no standard slider primitive. Left/Right changes one point; PageDown/PageUp changes ten; Space confirms. The ranges and initial values match the source.

## 3. Configuration Summary

### a. Subject Info

| Field | Type | Constraint |
|---|---|---|
| subject_id | Integer | 101-999999 |
| age | Integer | 18-80 |
| gender | Choice | Male / Female / Other (Chinese labels) |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 x 800 px |
| Background | White |
| Fullscreen | False by default |
| Font | SimHei |

### c. Stimuli

All 13 scenarios, questions, and 52 choice-by-valence outcome narratives are config-defined in `config/materials.yaml`. They are faithful Chinese translations of the authors' open OSF materials. Positive narratives use green (`#16803C`); negative narratives use red (`#B42318`). Internal condition labels and strategy classifications are never shown to participants.

### d. Timing

| Phase | Ceiling | Interpretation |
|---|---:|---|
| Moral judgment | 180 s | Conservative self-paced reading/rating ceiling |
| Yes/No choice | 60 s | Conservative self-paced decision ceiling |
| Outcome evaluation | 180 s | Conservative self-paced reading/rating ceiling |
| Timeout notice | 1.5 s | Shown only after a missing Yes/No choice |

### e. Triggers

Structured triggers cover experiment/block lifecycle, rating onsets and adjustments, Yes/No responses, positive/negative outcome onset, confirmation, and timeout events. See `config/config.yaml` for the complete map.

### f. Adaptive Controller

Not applicable. The only session-level state is the fixed learning environment.

## 4. Methods (for academic publication)

Participants completed a computerized Chinese-language implementation of the moral learning paradigm from Experiment 1 of Maier et al. (2025). They were assigned to one of two stable learning environments: CBR Success or Rule Success. In one block, participants encountered 13 realistic moral dilemmas in the source order. For each dilemma, participants first rated how morally right it would be to take the proposed action on an integer scale from 0 (not at all morally right) to 100 (completely morally right), initialized at 50. They then indicated whether they would take the action. The proposed action was the CBR-consistent choice for eight dilemmas and the rule-consistent choice for five, dissociating action/omission from decision strategy.

After the decision, participants viewed an item-specific consequence. In the CBR Success environment, the CBR option always produced the overall positive outcome and the rule option the overall negative outcome; the mapping was reversed in the Rule Success environment. Positive outcomes were displayed in green and negative outcomes in red. Participants rated each outcome from -100 (extremely bad) to +100 (extremely good), initialized at 0. Trial-level data included moral-rightness rating, choice and RT, inferred decision strategy, assigned environment, outcome valence, environment alignment, and outcome evaluation.

### Run locally

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

### Primary reference

Maier, M., Cheung, V., & Lieder, F. (2025). Learning from outcomes shapes reliance on moral rules versus cost-benefit reasoning. *Nature Human Behaviour*. https://doi.org/10.1038/s41562-025-02271-w

The source article, materials, data, and code are open access; the complete evidence mapping is under `references/`.
