# Judgment of Learning

> TaskBeacon ID: `T000102`  
> Slug: `judgment-of-learning`  
> Version: `0.1.0`  
> Runtime: PsyFlow / TAPS `v0.2.0`

| Metadata | Value |
|---|---|
| Name | Judgment of Learning |
| Version | 0.1.0 |
| Date Updated | 2026-08-23 |
| PsyFlow Version | 0.3.0 |
| PsychoPy Version | 2025.1+ |
| Modality | Behavioral |
| Language | Chinese instructions / English word materials |

## 1. Task Overview

This task measures prospective metamemory: after learning a cue-target word pair, participants predict the probability that they will later recall the target from the cue. Those predictions are then compared with actual cued recall using absolute calibration and relative resolution. This differs from perceptual confidence tasks such as random-dot-motion confidence, where confidence follows a perceptual decision; here the judgment predicts future episodic recall.

The baseline follows the classic delayed-JOL paradigm. Participants study 66 unrelated concrete English noun pairs. Six pairs form a non-scored practice/primacy buffer; the remaining 60 are split into two 30-pair blocks. Within each block, 15 items receive an immediate cue-only JOL and 15 receive a delayed cue-only JOL after intervening activities. After a 10-minute arithmetic filler, all scored targets are tested by typed cued recall.

| Field | Value |
|---|---|
| Primary construct | Prospective metamemory monitoring |
| Secondary constructs | Calibration, resolution, paired-associate recall |
| Acquisition | Behavioral; trigger-ready for EEG and related modalities |
| Conditions | Immediate JOL; delayed JOL |
| JOL scale | 0%, 20%, 40%, 60%, 80%, 100% |
| Primary outcomes | Calibration error; Brier score; Goodman-Kruskal gamma |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. Read general and practice instructions.
2. Complete six non-scored practice/primacy-buffer pairs.
3. Complete two scored study/JOL blocks of 30 pairs each.
4. Complete a 10-minute arithmetic-parity filler.
5. Complete typed cued recall for all 60 scored pairs.
6. View separate immediate/delayed recall, calibration, and resolution summaries.

### Trial-Level Flow

- Study: an unrelated concrete noun pair is shown for 6 seconds.
- Immediate-JOL item: the cue-only prediction screen follows the study display immediately.
- Delayed-JOL item: its cue-only prediction screen occurs after all study events in that block, within one of three randomized delayed-item groups.
- JOL: press `1..6` for predicted recall probability `0..100%` in 20-point steps.
- Recall: type the target word from the cue and press Return; the first three normalized letters determine correctness.

### Controller Logic

There is no adaptive controller. A deterministic participant-seeded schedule enforces equal JOL-timing counts, prevents runs longer than three same-timing items, preserves delayed-JOL lag structure, and carries each pair identity across study, judgment, and recall.

### Other logic

Stage-level rows are saved separately for audit. The primary result CSV reduces study, JOL, and recall events to one logical row per scored pair. A JSON summary stores overall and timing-specific metrics plus calibration bins.

## 3. Configuration Summary

### a. Subject Info

| Field | Value |
|---|---|
| Collected fields | Subject ID, age, gender |
| QA identity | `qa102` |
| Simulation identity | `sim102` |

### b. Window Settings

| Setting | Human value |
|---|---|
| Window | 1280 x 800, degree units |
| Background | `#F4F4F2` |
| Participant language | Chinese instructions; English noun materials |
| Fonts | SimHei for Chinese; Arial for English |

### c. Stimuli

All task displays are config-defined PsychoPy text or textbox primitives. The study material is loaded from `assets/word_pairs.yaml`; no external media are required.

### d. Timing

| Phase | Visible content | Human duration / window |
|---|---|---:|
| Study | Cue — target | 6.0 s |
| JOL | Cue — ?, future-recall question, six probabilities | 8.0 s max |
| Filler | Arithmetic expression; F odd / J even | 120 x 5.0 s |
| Recall | Cue — ?, editable target field | 12.0 s max |

### Conditions and responses

| Element | Mapping |
|---|---|
| Immediate JOL | Cue-only JOL directly after study |
| Delayed JOL | Cue-only JOL after intervening study/JOL events |
| Probability keys | `1=0%`, `2=20%`, `3=40%`, `4=60%`, `5=80%`, `6=100%` |
| Filler keys | `F=odd`, `J=even` |
| Recall submit | Return |

### Triggers

| Event family | Codes |
|---|---|
| Experiment / block lifecycle | 1, 10, 19, 99 |
| Study immediate / delayed | 20, 21 |
| JOL immediate / delayed | 30, 31 |
| JOL responses / timeout | 40-46 |
| Filler onset / responses / timeout | 50-53 |
| Recall immediate / delayed / submit / timeout | 60-63 |

### Run commands

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a paired-associate Judgment of Learning task adapted from Nelson and Dunlosky (1991) and the cue-only condition of Dunlosky and Nelson (1992). Six practice/primacy-buffer pairs preceded 60 scored unrelated concrete noun-noun pairs. Scored pairs were divided into two blocks of 30. Within each block, 15 pairs were assigned to immediate JOL and 15 to delayed JOL, with no more than three consecutive assignments of the same type. Each pair appeared for 6 s. Immediate JOLs followed their study item; delayed JOLs occurred after block study in three successive randomized groups, preserving intervening-item delay. Each JOL presented the cue alone and requested the predicted probability of recalling its target later, using 0%, 20%, 40%, 60%, 80%, or 100%.

After the second study/JOL block, participants performed 10 minutes of arithmetic parity judgments. Final cued recall then presented each cue and accepted a typed target response. Responses were scored correct when their first three normalized letters matched the target, following the spelling-tolerant rule in Dunlosky and Nelson (1992). Absolute monitoring accuracy was summarized by signed calibration bias, absolute calibration error, Brier score, and calibration bins. Relative monitoring accuracy (resolution) was summarized with the Goodman-Kruskal gamma correlation between JOL rank and later binary recall. Metrics were calculated overall and separately for immediate and delayed JOL items.

### References

- Nelson, T. O., & Dunlosky, J. (1991). [When people's judgments of learning are extremely accurate at predicting subsequent recall](https://doi.org/10.1111/j.1467-9280.1991.tb00147.x). *Psychological Science, 2*, 267-271.
- Dunlosky, J., & Nelson, T. O. (1992). [Importance of the kind of cue for judgments of learning and the delayed-JOL effect](https://doi.org/10.3758/BF03210921). *Memory & Cognition, 20*, 374-380.
- Rhodes, M. G., & Tauber, S. K. (2011). [The influence of delaying judgments of learning on metacognitive accuracy](https://doi.org/10.1037/a0021705). *Psychological Bulletin, 137*, 131-148.
