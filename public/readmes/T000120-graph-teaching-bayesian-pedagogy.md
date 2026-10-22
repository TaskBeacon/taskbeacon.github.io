# Graph Teaching / Bayesian Pedagogy Task

TaskBeacon ID: `T000120`\
Variant: `baseline` (Experiment 1)\
Runtime: PsyFlow / PsychoPy\
Language: Chinese

| Metadata | Value |
|---|---|
| Name | Graph Teaching / Bayesian Pedagogy Task |
| Version | 0.1.0 |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.2.0-compatible local runtime |
| PsychoPy Version | 2025.2.3 |
| Modality | Visual graph / pointer response |
| Language | Chinese |

## 1. Task Overview

This task measures how people choose information to teach after observing a learner's behavior. Each trial shows a directed reward graph and the path taken by a learner who knows only some graph connections. The participant acts as a teacher and reveals one previously unseen connection to help the learner earn more points after replanning.

The key computational distinction is whether teaching choices depend on inference about the learner's latent knowledge state (Bayesian mentalizing) or on simpler graph heuristics such as choosing an edge near high-value nodes.

| Field | Value |
|---|---|
| Primary source | Harootonian et al., Nature Human Behaviour (2026) |
| Baseline schedule | 3 feedback practice trials + 40 no-feedback test trials |
| Test set | 20 source graphs + 20 horizontal mirrors |
| Response | Pointer-click one grey dotted edge |
| Main outcomes | Selected edge, RT, source-optimal choice, timeout |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. Instructions explain layered rewards, partial learner knowledge, and the one-edge teaching goal.
2. Three practice learners receive immediate feedback; the best edge is shown in amber.
3. A four-question comprehension check can be attempted twice.
4. Forty independent test learners are presented in seeded random order without feedback.
5. Trial-level outcomes and a test-block summary are saved.

### Trial-Level Flow

| Phase | Participant-visible event | Duration / response |
|---|---|---|
| Teaching choice | New learner heading + 10-node graph + black path + grey dotted edges | Click one dotted edge; 300 s operational guard |
| Practice feedback | Same graph with best edge(s) in amber and quality message | 2.5 s; practice only |
| Inter-trial interval | Blank white screen | 0.5 s |

### Controller Logic

There is no adaptive controller. Every trial is independent. The exact source trial table owns graph rewards, observed paths, mirror status, and the source-designated optimal teaching edge. A dedicated seeded shuffle changes order without changing trial content.

### Other logic

The pointer target for each dotted line is an invisible 26-pixel-wide polygon around the visible line. PsyFlow owns pointer timing, response injection, trigger emission, and timeout behavior. Test-trial correctness is logged but never fed back during the experimental block.

## 3. Configuration Summary

### a. Subject Info

The human profile requests a three-digit subject ID. QA and simulation profiles use fixed synthetic identifiers.

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 x 800 px |
| Background | White |
| Units | Pixels |
| Fullscreen | False by default |

### c. Stimuli

The graph uses PsychoPy primitives only: ShapeStim edge segments, Circle reward nodes, and TextStim labels. The ten nodes use a fixed 1-3-3-3 layout. Black solid edges show the learner's observed path; grey dashed edges are teachable; amber marks a selection or a practice best edge.

### d. Timing

| Parameter | Human value | Rationale |
|---|---:|---|
| Response guard | 300 s | Experiment 1 was effectively self-paced; finite runtime safeguard |
| Selection highlight | 150 ms | Visible response acknowledgement |
| Practice feedback | 2.5 s | Standardized display of source-required feedback |
| Inter-trial interval | 500 ms | Exact source browser post-trial gap |
| Quiz response window | 30 s | Practical comprehension-check window |

### Triggers

The trigger map distinguishes experiment/block lifecycle, practice/test choice onsets, practice feedback, quiz events, edge selection/completion, timeout, and goodbye. Human mode uses the configured serial URL driver; QA/simulation use a mock trigger runtime.

### Adaptive controller

None. The task has no across-trial learning or staircase state.

## 4. Methods (for academic publication)

Participants acted as teachers in a graph-navigation setting. On each trial, a layered graph contained ten reward-bearing nodes and seventeen possible downward transitions. A learner's previously executed reward-maximizing trajectory, conditional on the learner's unknown subset of transition knowledge, appeared as three black solid edges. Other possible transitions appeared as grey dashed edges. Participants selected one dotted edge to teach, with the goal of maximizing the learner's reward after adding that edge to its knowledge and replanning.

The baseline task contained three feedback practice trials followed by a comprehension check and forty no-feedback experimental trials. The experimental set comprised twenty unique source graphs and their horizontally mirrored versions. Test order was randomized with a reproducible task seed. Each response recorded the selected edge, pointer response time, timeout status, source graph identity, mirror status, reward vector, observed trajectory, and whether the choice matched the source-designated optimal edge. No experimental-trial outcome feedback was shown.

### Running

```powershell
python main.py human --config config/config.yaml
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

### Evidence and provenance

Protocol decisions are documented in `references/task_logic_audit.md`; parameter and stimulus traceability are in `references/parameter_mapping.md` and `references/stimulus_mapping.md`. The exact author-published Experiment 1 trial table is retained at `assets/exp1_trialsetup.csv`.
