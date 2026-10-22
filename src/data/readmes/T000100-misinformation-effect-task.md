# Misinformation Effect Task

| Field | Value |
|---|---|
| Name | Misinformation Effect Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000100-misinformation-effect-task |
| Short Description | Original event, consistent or misleading postevent report, and source-limited forced-choice memory test |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 or compatible |
| PsychoPy Version | 2025.1.1 or compatible |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice disabled) |

## 1. Task Overview

This task implements a compact misinformation-effect paradigm: an original event is followed by either a consistent or misleading postevent report, then by a two-choice memory test that explicitly restricts participants to the original source. The primary outcome is selection of the postevent alternative after misleading reports relative to alternative-choice errors after consistent reports.

The implementation uses 12 original Chinese traffic/geometric micro-events. It reproduces the experimental logic, not the classic accident film or its wording. This distinguishes the paradigm from DRM false memory, which relies on semantic associates without explicit postevent misinformation, and retrieval-induced forgetting, which manipulates selective retrieval competition.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

One instruction screen is followed by one 12-trial block and a completion screen. A participant-specific stable seed selects each event once, assigns six events to each narrative condition, shuffles order, and balances the original answer between F and J within each condition.

### Trial-Level Flow

1. Three original-event text frames appear for 2.2 s each.
2. A consistent or misleading postevent report appears for 4.5 s.
3. A fixation cross separates report and test for 0.75 s.
4. The source-limited two-choice test accepts F/J for up to 6.0 s.
5. A 0.5-s blank interval precedes the next event.

No corrective feedback is shown. The two answer choices are always the original detail and its plausible postevent alternative.

### Controller Logic

There is no adaptive controller. `src/utils.py` creates an immutable session plan before the block begins because event uniqueness, equal condition counts, and within-condition response-side balance cannot be guaranteed by independent label sampling.

### Other Logic

Reduced output contains one row per complete event. The summary JSON reports original-detail accuracy, misinformation acceptance, consistent-condition alternative errors, their difference, mean response time, and timeouts.

## 3. Configuration Summary

### a. Subject Info

| Field | Type | Allowed values |
|---|---|---|
| Subject ID | Integer | 101–999 |
| Age | Integer | 18–80 |
| Gender | Choice | Male / Female / Other |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 × 800 |
| Units | Degrees of visual angle |
| Background | `#F4F4F2` |
| Fullscreen | No by default |

### c. Stimuli

| Stage | Visible content | Layout |
|---|---|---|
| Original event | Source label plus one sentence | Label at y = 5.2°, sentence centered |
| Postevent report | Report label plus one sentence | Label at y = 5.2°, sentence centered |
| Source test | Red source reminder, question, two options, F/J hints | Options centered at x = ±7° |
| Separation | Fixation or blank | Centered |

All participant-facing text uses SimHei and is defined in YAML for localization.

### d. Timing

| Phase | Duration / window |
|---|---:|
| Each original-event frame | 2.2 s |
| Postevent report | 4.5 s |
| Retention fixation | 0.75 s |
| Source test | 6.0 s maximum |
| ITI | 0.5 s |

### e. Triggers

| Event family | Codes |
|---|---|
| Experiment / block lifecycle | 1, 10, 90, 99 |
| Original event frames | 21–23 |
| Consistent / misleading report | 31 / 32 |
| Retention | 40 |
| Consistent / misleading test | 51 / 52 |
| Original / alternative / timeout response | 61 / 62 / 63 |
| ITI | 70 |

### f. Adaptive Controller

Not applicable. Scheduling is deterministic for a participant but does not adapt to responses.

## 4. Methods (for academic publication)

Participants completed 12 event trials in a within-participant design. Each trial presented three sequential Chinese sentences constituting an original traffic or geometric event. The second sentence contained one critical detail. A postevent report then either repeated that detail (consistent condition) or substituted a plausible paired alternative (misleading condition). Following a brief fixation, participants answered a two-alternative recognition question while instructed to base their response only on the original event. The original and alternative options were assigned to the F and J keys with equal frequency within condition. Event order, report condition, and response side were determined by a participant-specific stable seed before task execution.

The primary analysis compares the proportion of alternative selections in misleading trials with the corresponding alternative-selection error rate in consistent trials. Additional outcomes are original-detail accuracy, response time, and timeout frequency. No trial-level feedback was provided.

### References

- Pérez-Mata, N., & Diges, M. (2024). [False memories in forensic psychology: do cognition and brain activity tell the same story?](https://pmc.ncbi.nlm.nih.gov/articles/PMC11141885/)
- Loftus, E. F., Miller, D. G., & Burns, H. J. (1978). [Semantic integration of verbal information into a visual memory](https://doi.org/10.1037/0278-7393.4.1.19).
- Lindsay, D. S., & Johnson, M. K. (1989). [The eyewitness suggestibility effect and memory for source](https://doi.org/10.3758/BF03198473).
- Okado, Y., & Stark, C. E. L. (2005). [Neural activity during encoding predicts false memories created by misinformation](https://doi.org/10.1101/lm.87605).

## Running the Task

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## Output Files

- `*_trace.csv`: one logical event per row, including condition, detail choices, accuracy, and response time.
- `*_trace_summary.json`: aggregate misinformation and control-error metrics.
- Simulation event logs: stage-level audit trail generated by the PsyFlow runtime.
