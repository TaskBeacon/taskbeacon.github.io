# Cognitive Reflection Test

| Field | Value |
|----------------------|------------------------------|
| Name | Cognitive Reflection Test |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000092-cognitive-reflection-test |
| Short Description | Classic three-item open-response measure of reflective reasoning |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

## 1. Task Overview

The Cognitive Reflection Test (CRT) measures the tendency to reconsider an appealing but incorrect intuitive answer and engage in further analytic reasoning. This baseline implementation presents the three classic Frederick (2005) word problems as semantically equivalent Chinese translations with their quantities and answer structure unchanged. Participants type one numeric answer per item; the task records correct, canonical-intuitive, other, and timeout outcomes without giving itemwise feedback.

| Property | Value |
|---|---|
| Construct | Cognitive reflection / analytic reasoning |
| Item set | Classic bat-and-ball, machines/widgets, and lily-pad questions |
| Response mode | Open numeric textbox; Return submits |
| Trial count | 3 items in one block |
| Primary outcome | Correct score from 0 to 3 |
| Secondary outcomes | Intuitive errors, other errors, response times, timeouts |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Visible event | Runtime behavior |
|---:|---|---|
| 1 | Chinese instruction screen | Space starts the task; no answer content is revealed. |
| 2 | One CRT block | The three item identities are shuffled without replacement and scheduled once each. |
| 3 | Neutral completion screen | Results are saved before the participant presses Space to exit. |

### Trial-Level Flow

| Phase | Stimuli | Timing | Response and transition |
|---|---|---|---|
| `question_response` | One question, blank textbox, item unit, submit hint | Up to 180 s | Type a number and press Return; a timeout is recorded at the safety ceiling. |

No correctness feedback appears between items. The next scheduled item begins immediately after submission, preserving the survey-like character of the original CRT.

### Controller Logic

There is no adaptive controller. PsyFlow owns trial identity, block execution, response capture, phase data, triggers, and persistence. The task has one `classic_crt` baseline condition. A focused helper shuffles the three config-defined item identities without replacement because the item set must appear exactly once.

### Other Logic

`src/utils.py` Unicode-normalizes the typed response, extracts one decimal number, and compares it with config-defined correct and intuitive values. The canonical score is the count of `correct` outcomes; lure errors remain separately identifiable as `intuitive`. Blank or unparseable submissions are `other`, while missing submissions at the deadline are `timeout`.

## 3. Configuration Summary

Settings below are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier used for output naming and seeded scheduling |

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
| `instruction_text` | Text | Task rules, no-tools instruction, numeric response rule, and start key |
| `question_bat_ball` | Text | Classic 1.10-dollar total and 1.00-dollar difference problem |
| `question_widgets` | Text | Classic parallel-rate 5-machine/5-minute problem |
| `question_lily_pads` | Text | Classic daily-doubling 48-day coverage problem |
| `response_entry` | TextBox | Blank 520 × 78 px editable numeric field |
| `unit_*` | Text | Condition-specific unit: 美元, 分钟, or 天 |
| `submit_hint` | Text | Short reminder to enter only a number and press Return |
| `good_bye_text` | Text | Neutral completion message without answers or score |

All participant-facing text uses SimHei. The question, textbox, unit, and hint have explicit vertical and horizontal anchors to prevent overlap at the configured window size.

### d. Timing

| Phase | Duration |
|---|---:|
| Question response | 180 s maximum; operational safety ceiling for an otherwise non-speeded item |
| Instructions and completion | Until Space |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment onset / end | 1 / 2 |
| Block onset / end | 3 / 4 |
| Bat-and-ball onset | 11 |
| Widgets onset | 12 |
| Lily-pads onset | 13 |
| Response submit | 51 |
| Response timeout | 59 |
| Completion screen onset | 60 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller | None |
| Condition policy | One baseline condition; three item identities shuffled without replacement |

## 4. Methods (for academic publication)

Participants completed a computerized Chinese-language version of the classic three-item Cognitive Reflection Test introduced by Frederick (2005). After reading an instruction screen, they viewed the bat-and-ball, machines/widgets, and lily-pad word problems once each in seed-randomized order. Each item appeared as black SimHei text on a white 1280 × 720 pixel display, above a blank numeric textbox and a condition-specific unit label. Participants entered one number and pressed Return. Items were operationally bounded at 180 s to support deterministic runtime completion, but the task was otherwise non-speeded and no itemwise correctness feedback was provided.

The three item relations and answer semantics were preserved exactly under Chinese semantic translation. Responses were Unicode-normalized and parsed as decimal numbers. Values of 0.05, 5, and 47 were scored correct for the bat-and-ball, widgets, and lily-pad items, respectively; 0.10, 100, and 24 were retained as the canonical intuitive-error values. Each correct response contributed one point to the 0–3 CRT score. Other submitted values and timeouts were recorded separately, and response time was measured from question onset to Return submission.

The implementation used PsyFlow's trial identity, `BlockUnit` execution, `StimUnit` response capture, trigger emission, and phase-data serialization. A deterministic helper shuffled the fixed item set without replacement; there was no adaptive controller, reward, penalty, or trial feedback. The design follows the canonical [Frederick (2005)](https://doi.org/10.1257/089533005775196732) item set, with supporting computerized/open-response evidence from [Bialek and Pennycook (2017)](https://doi.org/10.3758/s13428-017-0963-x) and the structurally equivalent CRT documented in eLife Table 7 by [Reed et al. (2020)](https://doi.org/10.7554/eLife.56345).

## Runtime

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

Outputs are written to profile-specific subdirectories under `outputs/`. The main CSV contains one logical row per item; a companion `_crt_summary.json` stores the aggregate score and category counts.

## References

See `references/references.md`, `references/parameter_mapping.md`, `references/stimulus_mapping.md`, and `references/task_logic_audit.md` for source selection and implementation traceability.
