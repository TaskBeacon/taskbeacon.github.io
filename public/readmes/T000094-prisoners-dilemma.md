# Prisoner’s Dilemma

| Field | Value |
|---|---|
| Name | Prisoner’s Dilemma |
| Version | `0.1.0` |
| URL / Repository | https://github.com/TaskBeacon/T000094-prisoners-dilemma |
| Short Description | Sequential-choice iterated Prisoner’s Dilemma with a seeded computer partner |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (disabled) |

## 1. Task Overview

This task implements a sequential-choice, iterated Prisoner’s Dilemma for measuring reciprocal cooperation. The participant repeatedly chooses whether to cooperate with or defect against a clearly identified computer partner. The partner observes the participant's current move and responds with a seeded probabilistic policy, allowing reproducible analyses of cooperation, retaliation, exploitation, and mutual defection.

The payoff ordering satisfies the canonical dilemma: unilateral defection yields the highest individual reward, mutual cooperation yields a better joint outcome than mutual defection, and unilateral cooperation against defection yields the lowest reward.

| Outcome | Participant | Computer partner |
|---|---:|---:|
| Mutual cooperation (CC) | 2 | 2 |
| Participant cooperates, partner defects (CD) | 0 | 3 |
| Participant defects, partner cooperates (DC) | 3 | 0 |
| Mutual defection (DD) | 1 | 1 |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Procedure |
|---|---|
| Instructions | Explain the two actions, payoff matrix, keys, timeout rule, and computer-partner identity. |
| Practice | Run two unscored rounds with a separate seeded controller. |
| Main game | Run one 30-round interaction with the same computer partner. |
| Summary | Report cooperation rates, outcome counts, and both cumulative scores. |
| End | Save stage-level and logical-trial data, close triggers, and exit. |

### Trial-Level Flow

| Stage | Human timing | Participant-visible content | Response |
|---|---:|---|---|
| Round cue | 2 s | Round number and computer-partner avatar | none |
| Decision | 4 s max | Payoff matrix and spatially separated cooperate/defect options | F = cooperate; J = defect; timeout = defect |
| Choice reveal | 1 s | Registered participant move | none |
| Partner wait | 2, 4, or 6 s | Fixation cross | none |
| Outcome | 4 s | Both moves, round payoffs, and cumulative totals | none |
| Inter-round fixation | 2, 4, or 6 s | Fixation cross | none |

### Controller Logic

When the participant cooperates, the computer partner cooperates with probability 0.67. When the participant defects, the partner defects with probability 0.90. Choice and timing random streams are independently seeded. The controller records each probability and random draw along with both cumulative scores.

### Other Logic

The practice controller uses a separate seed and its scores do not carry into the main game. QA and simulation profiles shorten counts and timing while preserving the stage order, response mapping, partner policy, payoff semantics, and exported fields.

## 3. Configuration Summary

Settings below are from `config/config.yaml`.

### a. Subject Info

| Field | Human profile |
|---|---|
| Participant ID | Three-digit integer, 101–999 |
| Age | 18–80 |
| Gender | Male / Female / Other |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 720 px |
| Units | pixels |
| Background | gray |
| Fullscreen | false |
| Monitor geometry | 35.5 cm width at 60 cm viewing distance |

### c. Stimuli

| Component | Setting |
|---|---|
| Window | 1280 × 720 px, gray background |
| Font | SimHei for all Chinese text |
| Partner cue | Built-in circle avatar plus “电脑伙伴” label |
| Decision display | Text payoff matrix plus green cooperate and coral defect options |
| External assets | None |

### d. Timing

| Parameter | Value |
|---|---|
| Practice rounds | 2 |
| Main rounds | 30 |
| Decision deadline | 4 s |
| Timeout policy | Register and score as defection |
| Choice reveal | 1 s |
| Partner wait / ITI | Discrete 2, 4, or 6 s |
| Outcome display | 4 s |

### e. Triggers

| Event group | Codes |
|---|---|
| Experiment / block | 1–2 / 10–11 |
| Round cue | 20 |
| Decision / responses / timeout | 30–33 |
| Choice reveal / partner wait | 40–41 |
| CC / CD / DC / DD outcomes | 50–53 |
| Inter-round fixation | 60 |

### f. Adaptive Controller

The controller is stateful because partner moves depend on the current participant move and scores accumulate across rounds. It is not an adaptive staircase. The choice policy and payoff matrix are configured under `controller` in each YAML profile.

### Runtime

```powershell
python main.py human --config config/config.yaml
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a sequential-choice iterated Prisoner’s Dilemma adapted from the protocol described by Rilling and colleagues. After two unscored practice rounds, participants played 30 rounds against one explicitly identified computer partner. At the start of each round, the round number and partner cue appeared for 2 s. Participants then viewed the conventional payoff matrix and had 4 s to choose cooperation (F) or defection (J); omissions were treated as defection. The registered participant move appeared for 1 s, followed by a randomly selected 2, 4, or 6 s fixation interval. The computer partner then cooperated with probability .67 after participant cooperation and defected with probability .90 after participant defection. The outcome screen showed both moves, both round payoffs, and cumulative scores for 4 s, followed by a 2, 4, or 6 s inter-round fixation. Payoffs were 2/2 for mutual cooperation, 0/3 when the participant cooperated and the partner defected, 3/0 when the participant defected and the partner cooperated, and 1/1 for mutual defection. Choice-policy and timing random streams were independently seeded. Primary outcomes were cooperation rate, conditional cooperation, decision latency, CC/CD/DC/DD frequencies, and cumulative payoff.

### References

- Rilling, J. K., et al. (2011). Effects of intranasal oxytocin and vasopressin on cooperative behavior and associated brain activity in men. *Psychoneuroendocrinology*. https://doi.org/10.1016/j.psyneuen.2011.07.013
- Krach, S., et al. (2008). Can Machines Think? Interaction and Perspective Taking with Robots Investigated via fMRI. *PLoS ONE*. https://doi.org/10.1371/journal.pone.0002597
- De Vico Fallani, F., et al. (2010). Defecting or Not Defecting: How to “Read” Human Behavior during Cooperative Games by EEG Measurements. *PLoS ONE*. https://doi.org/10.1371/journal.pone.0014187
- Wood, R. M., et al. (2006). Effects of Tryptophan Depletion on the Performance of an Iterated Prisoner's Dilemma Game in Healthy Adults. *Neuropsychopharmacology*. https://doi.org/10.1038/sj.npp.1300932
