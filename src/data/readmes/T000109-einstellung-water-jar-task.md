# Luchins Water-Jar / Einstellung Task

| Field | Value |
|---|---|
| Name | Luchins Water-Jar / Einstellung Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000109-einstellung-water-jar-task |
| Short Description | Ordered symbolic water-jar problems measuring persistence of a learned complex solution |
| Created By | TaskBeacon |
| Date Updated | 2026-08-24 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

## 1. Task Overview

The Luchins Water-Jar task measures Einstellung, or mental set: repeated success with one procedure can make a solver continue using it when a simpler solution is available. This implementation first presents five structurally distinct problems whose shortest bounded solution is `B-A-2C`, then presents dual-solution and set-breaker problems. Participants see only the capacities of jars A, B, and C, a target value, and a formula input box.

The task uses a newly generated, algebraically verified number set rather than copying the original complete Luchins table. This distinguishes it from Tower of London, where the outcome concerns planning through a state space, and from the Cognitive Reflection Test, where each independent item elicits an intuitive numerical lure. Here the central outcome is cross-trial reuse of a learned formula.

| Property | Value |
|---|---|
| Construct | Mental set / cognitive flexibility / problem solving |
| Response mode | Open symbolic formula; Return submits |
| Series | 1 practice + 5 set + 2 critical + 1 extinction + 2 post-extinction trials |
| Primary outcome | Proportion of dual-solution trials answered with `B-A-2C` |
| Secondary outcomes | Set acquisition, simple-solution use, extinction success, correctness, RT, invalid responses, timeouts |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Visible event | Runtime behavior |
|---:|---|---|
| 1 | Chinese instruction screen | Space starts the fixed series; notation is explained without revealing the recurring set formula. |
| 2 | One syntax-practice problem | Rehearses formula entry and is excluded from the mental-set score. |
| 3 | Five set-induction problems | Each has `B-A-2C` as the shortest solution within the audited coefficient range. |
| 4 | Two critical problems | Both `B-A-2C` and shorter `A-C` solutions are correct. |
| 5 | One extinction problem | A simple `A-C` solution works, but `B-A-2C` does not. |
| 6 | Two post-extinction problems | Both `B-A-2C` and shorter `A+C` solutions are correct. |
| 7 | Neutral completion screen | Results and the Einstellung summary are saved before Space exits. |

### Trial-Level Flow

| Phase | Stimuli | Timing | Response and transition |
|---|---|---:|---|
| `problem_response` | Capacity line, target line, blank formula box, submit hint | Up to 120 s | Type a formula and press Return; no correctness feedback is shown. |
| `inter_problem_interval` | Blank white screen | 0.5 s | Automatically advances to the next fixed problem. |

### Controller Logic

There is no adaptive controller. A focused helper validates and emits the config-defined causal sequence because ordinary randomized condition generation would destroy the required induction → critical → extinction ordering. PsyFlow owns trial identity, block execution, response capture, timing, triggers, and persistence.

### Other Logic

`src/utils.py` Unicode-normalizes formula text and parses only signed A/B/C terms with optional integer coefficients; it never evaluates arbitrary code. A response is correct when its coefficient vector evaluates to the target. Vector `(-1, 1, -2)` is classified as the set strategy, lower-operation-cost correct vectors as simple strategies, and other correct vectors separately. Startup validation confirms every generated item has its declared set-only, dual-solution, or extinction relation.

## 3. Configuration Summary

Settings below are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier used for output naming |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 720 px |
| Background | White |
| Fullscreen | False by default |
| Monitor width | 35.5 cm |
| Viewing distance | 60 cm |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `instruction_text` | Text | Jar-formula rules and examples that do not disclose `B-A-2C` |
| `problem_header` | Text | Neutral capacity heading |
| `jar_template` | Text | Formatted A/B/C capacities |
| `target_template` | Text | Formatted target water amount |
| `response_entry` | TextBox | Blank 640 × 82 px editable formula field |
| `submit_hint` | Text | Compact Return-key reminder |
| `good_bye_text` | Text | Neutral completion message without solutions or score |

All participant-facing text uses SimHei. The header, capacity line, target, textbox, and hint use explicit vertically separated anchors and are checked in QA at 1280 × 720.

### d. Timing

| Phase | Duration |
|---|---:|
| Problem response | 120 s maximum; safety ceiling for a self-paced reasoning item |
| Inter-problem interval | 0.5 s |
| Instructions and completion | Until Space |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment onset / end | 1 / 2 |
| Block onset / end | 3 / 4 |
| Practice onset | 10 |
| Set-induction onset | 11 |
| Critical onset | 12 |
| Extinction onset | 13 |
| Post-extinction onset | 14 |
| Formula submit / timeout | 51 / 59 |
| Completion screen onset | 60 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller | None |
| Sequence policy | Fixed config-defined item order, fail-fast structural validation |
| Condition weights | `null`; exchangeable weighted scheduling is intentionally not used |

## 4. Methods (for academic publication)

Participants completed a computerized Chinese-language adaptation of the Luchins water-jar mental-set paradigm. Following an instruction screen, they solved one notation-practice item and ten scored problems in fixed order. Each problem displayed three labeled capacities (A, B, and C), a target amount, and a blank textbox. Participants entered an additive/subtractive formula composed of the jar labels and optional integer coefficients, then pressed Return. Responses were limited to 120 s by an operational safety ceiling, separated by a 0.5-s blank interval, and received no itemwise feedback.

The scored series comprised five set-induction problems, two pre-extinction critical problems, one extinction problem, and two post-extinction critical problems. For every induction problem, `B-A-2C` was the shortest solution found by exhaustive coefficient search over `[-4, 4]`. Each critical problem admitted both this cost-4 set solution and a cost-2 `A-C` or `A+C` solution. On the extinction problem, a cost-2 `A-C` solution worked but the set formula did not. The complete number set was newly generated for TaskBeacon and preserves these structural relations without reproducing Luchins's historical full item table.

Submitted formulas were parsed into integer coefficient vectors using a strict whitelist grammar. Correctness was determined by substituting the displayed capacities and comparing the result with the target. Correct vector `(-1, 1, -2)` was labeled `set`; correct vectors requiring fewer than four jar operations were labeled `simple`; other correct, incorrect, malformed, and timeout responses remained distinguishable. The main Einstellung index is the proportion of dual-solution critical trials on which the participant used the set formula, accompanied by set-acquisition rate, extinction success, post-extinction set/simple rates, accuracy, and response time.

The ordered set/critical/extinction logic follows [Luchins (1942)](https://doi.org/10.1037/h0093502), with direct water-jar procedure support from [Crooks and McNeil (2009)](https://escholarship.org/uc/item/1976z9q8) and [Vallée-Tourangeau et al. (2011)](https://doi.org/10.1080/17470218.2011.605151). The broader familiar-solution fixation mechanism is supported by [Bilalić et al. (2008)](https://doi.org/10.1016/j.cognition.2008.05.005). The user-provided [Tempel and Frings (2019)](https://doi.org/10.1016/j.actpsy.2019.102955) link is retained as adjacent directed-forgetting context but is not used as the water-jar protocol source.

## Runtime

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

Outputs are written to profile-specific subdirectories under `outputs/`. The main CSV stores one logical row per problem; a companion `_einstellung_summary.json` stores aggregate mental-set measures.

## References

See `references/references.md`, `references/parameter_mapping.md`, `references/stimulus_mapping.md`, and `references/task_logic_audit.md` for evidence selection and implementation traceability.
