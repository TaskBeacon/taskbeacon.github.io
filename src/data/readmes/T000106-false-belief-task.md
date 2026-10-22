# False-Belief / Unexpected Transfer Task

| Field | Value |
|---|---|
| Name | False-Belief / Unexpected Transfer Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000106-false-belief-task |
| Short Description | Timed first- and second-order unexpected-transfer belief reasoning with geometric stimuli |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 or compatible |
| PsychoPy Version | 2025.1.1 or compatible |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice disabled) |

## 1. Task Overview

This task measures explicit representation of another person's belief when that belief conflicts with reality. It preserves the unexpected-transfer logic introduced by Wimmer and Perner (1983), adds matched true-belief controls, and includes first- and second-order judgments suitable for adults. All scenes use original colored geometric characters and two vector-drawn containers; no Sally–Anne illustrations are used.

Participants view short panel-based stories and answer where a character will search, where the object is now, and where it began. The principal outcomes are belief-question accuracy and reaction time. Reality and memory controls distinguish belief-reasoning errors from failures to track the story.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. General instructions teach the F/J spatial mapping.
2. Four practice trials cover first-order false/true and second-order false/true stories with feedback.
3. Two scored blocks each contain 16 randomized trials.
4. A block summary reports belief accuracy, control-qualified accuracy, and timeouts.
5. A final summary reports first- and second-order accuracy and mean correct belief RT.

### Trial-Level Flow

| Phase | Participant-visible event | Duration / response |
|---|---|---|
| Fixation | Central `+` | 0.5 s |
| Story setup | Character(s), two containers, and the object in its initial container | 1.8 s |
| Perspective event | Agent leaves/stays, or the observer gains/does not gain knowledge that the target watched | 2.2 s |
| Unexpected transfer | Object appears in the opposite container with a transfer arrow | 1.8 s |
| Agent return | Relevant character(s) return beside two closed containers | 1.0 s |
| Belief question | First-order search prediction or second-order embedded search prediction | F/J, 4.0 s maximum |
| Reality control | Current real object location | F/J, 4.0 s maximum |
| Memory control | Initial object location | F/J, 4.0 s maximum |
| Practice feedback | Correct, incorrect, or timeout message | 0.8 s; practice only |
| ITI | Neutral blank screen | 0.5 s |

### Controller Logic

No adaptive controller is used. PsyFlow's built-in `BlockUnit.generate_conditions(...)` schedules eight equally weighted labels. Each label fixes belief order, belief status, and initial side before `run_trial()` begins.

### Other logic

`F` always selects the left container and `J` the right container. Left/right initial locations balance the correct key. A belief response counts as control-qualified only when both the reality and initial-memory controls are correct.

## 3. Configuration Summary

### a. Subject Info

| Field | Human profile |
|---|---|
| Participant ID | 3 digits, 101–999 |
| Age | 18–80 years |
| Gender | Male / Female / Other |

### b. Window Settings

| Parameter | Value |
|---|---|
| Resolution | 1280 × 800 |
| Units | degrees of visual angle |
| Background | `#F7FAFC` |
| Monitor geometry | 35.5 cm width at 57 cm |

### c. Stimuli

| Element | Implementation |
|---|---|
| Characters | Blue circle observer/agent and purple triangle target, drawn with PsychoPy primitives |
| Containers | Left blue and right orange vector rectangles at fixed positions |
| Object | Yellow star for first-order stories; teal diamond for second-order stories |
| Text | Chinese, SimHei, config-defined |
| External assets | None |

### d. Timing

| Parameter | Human value |
|---|---|
| Fixation | 0.5 s |
| Setup | 1.8 s |
| Perspective event | 2.2 s |
| Transfer | 1.8 s |
| Return | 1.0 s |
| Each question | 4.0 s maximum |
| Practice feedback | 0.8 s |
| ITI | 0.5 s |

### Triggers

Triggers distinguish experiment/block lifecycle, each story panel, belief order/status, question type, left/right response, timeout, feedback, and ITI. Human mode uses the configured serial URL driver; QA and simulation use mock triggers.

### Adaptive controller

Not applicable. The task has no staircase, online learning rule, or adaptive deadline.

### Runtime

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a computerized unexpected-transfer false-belief task comprising first-order and second-order belief judgments. Each trial presented an original geometric story with two spatially separated containers. After observing the initial object placement, participants saw an epistemic-access manipulation. In first-order false-belief trials, the agent was absent during the transfer; in matched true-belief trials, the agent observed it. In second-order false-belief trials, a target secretly observed the transfer while an observer did not know that the target had watched; in matched second-order true-belief trials, the observer knew the target had watched. The object then moved to the opposite container and relevant characters returned.

Participants predicted the relevant character's search using spatially compatible keys (`F` left, `J` right) within 4 s. They then answered current-location and initial-location control questions with the same mapping. The primary dependent variables were belief accuracy and response time. A control-qualified belief score required correct responses to both control questions. Eight condition labels crossed belief order, belief status, and initial side; labels were equally weighted and randomized within each of two 16-trial blocks after four practice trials. Stimuli were implemented with PsychoPy vector primitives and Chinese config-defined text.

### References

- Wimmer, H., & Perner, J. (1983). Beliefs about beliefs: Representation and constraining function of wrong beliefs in young children's understanding of deception. *Cognition, 13*, 103–128. https://doi.org/10.1016/0010-0277(83)90004-5
- Perner, J., & Wimmer, H. (1985). “John thinks that Mary thinks that…” Attribution of second-order beliefs by 5- to 10-year-old children. *Journal of Experimental Child Psychology, 39*, 437–471. https://doi.org/10.1016/0022-0965(85)90051-7
- Sullivan, K., Zaitchik, D., & Tager-Flusberg, H. (1994). Preschoolers can attribute second-order beliefs. *Developmental Psychology, 30*, 395–402. https://doi.org/10.1037/0012-1649.30.3.395
- Meinhardt, J., Sodian, B., Thoermer, C., Döhnel, K., & Sommer, M. (2010). True- and false-belief reasoning in children and adults. *Developmental Cognitive Neuroscience, 1*, 67–76. https://doi.org/10.1016/j.dcn.2010.08.001
- Wysocka, J., et al. (2020). Processing false beliefs in preschool children and adults. *Frontiers in Human Neuroscience, 14*, 119. https://doi.org/10.3389/fnhum.2020.00119
