# Algorithm Induction from Demonstration

| Field | Value |
|---|---|
| Name | Algorithm Induction from Demonstration |
| TaskBeacon ID | `T000119` |
| Version | `v0.1.0` |
| Date Updated | 2026-08-29 |
| PsyFlow Version | Current workspace runtime |
| PsychoPy Version | Current workspace runtime |
| Modality | Behavioral |
| Variant | `baseline` |
| Acquisition | Behavioral |
| Language | Chinese |
| Runtime | PsyFlow / PsychoPy |
| TAPS contract | `v0.2.0` |
| Release | `v0.1.0` |
| Primary source | Pitt et al. (2026), *Nature Communications* |

## 1. Task Overview

This task is a screen-based adaptation of the two algorithm-induction experiments reported by Pitt et al. (2026). Participants infer latent sequential structure from very sparse demonstrations without being told the rule and without trial feedback. The task first uses colored-ball actions directed to two bins, then tests transfer of abstract structure across new geometric symbols, larger alphabets, and new sequence lengths.

The main constructs are program induction, pattern learning, relational abstraction, and out-of-distribution generalization. Primary behavioral outputs are the ordered response sequence, position-wise accuracy, exact-match status, edit distance to a canonical rule-consistent sequence, use of all offered symbols, completion latency, and timeout status. Raw ordered responses remain the primary record because the source paper allows multiple structurally plausible responses in some generalization conditions.

Source: [Children use algorithm induction to discover patterns in data](https://doi.org/10.1038/s41467-026-73029-9).

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. General instructions explain observation, continuation, pointer input, and the absence of rule text or correctness feedback.
2. **Action-sequence block:** three trials in the published order Sort, Double, Hitch.
3. **Pattern-generalization block:** six sample patterns in the published order Alternate, Mirror.4, Hitch, Mirror.6, Split, Grow. Each sample receives Copy, Translate, Integrate, and Extend in that order.
4. The task writes trial-level CSV data plus a compact JSON session summary, then shows a neutral completion screen.

### Trial-Level Flow

Action trials show four demonstration steps, one at a time. The participant then sees a compact demonstration strip and concrete action tiles arranged under labeled left/right bin columns. They click eight actions in sequence within 50 seconds. Sort alternates single red/blue balls, Double additionally alternates one/two-ball groups, and Hitch adds a black companion ball. No response feedback is shown.

Pattern trials keep a colored-shape sample row visible while showing a fixed-length empty response board and a clickable response alphabet. Copy preserves alphabet and length; Translate changes all response objects; Integrate adds an unfamiliar symbol and lengthens the board; Extend uses the translated alphabet on a 12-position board. The participant fills the ordered response by clicking symbols, with no correctness feedback.

### Controller Logic

There is no adaptive controller. `src/utils.py` precompiles the fixed source-aligned schedule and participant-level action counterbalancing before `BlockUnit` execution. Starting color, color-to-side assignment, and Double color-to-number assignment are deterministic from the task seed and participant ID.

### Other logic

The physical tabletop response is adapted to PsyFlow's framework-owned `capture_pointer_sequence(...)`. A click on an action tile represents choosing the shown ball group and placing it in the tile's labeled bin. The human profile includes 27 logical trials; QA and simulation profiles shorten only pattern coverage while retaining all mechanisms.

## 3. Configuration Summary

### a. Subject Info

| Setting | Value |
|---|---|
| Subject ID | Three-digit integer, 101-999 |
| Seed policy | Same within participant |
| Input | Mouse or touch pointer; Space to continue non-trial screens |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 × 800 px |
| Units | Pixels |
| Background | Warm off-white (`#F7F3E8`) |
| Fullscreen | Disabled by default |

### c. Stimuli

| Family | Implementation |
|---|---|
| Colored balls and bins | PsychoPy circle and rectangle primitives |
| Sample/response blocks | Triangle, diamond, square, circle, trapezoid, and pentagon primitives |
| Text | Chinese, `SimHei`, explicit non-overlapping anchors |
| External assets | None |

### d. Timing

| Phase | Human profile |
|---|---:|
| Each action demonstration step | 1.0 s |
| Action continuation window | 50.0 s |
| Pattern response window | 60.0 s (inferred digital deadline) |
| Inter-trial interval | 0.5 s |

### Conditions

| Condition | Participant-visible manipulation |
|---|---|
| Sort | Alternate single colored balls across bins |
| Double | Alternate color, bin, and one/two-ball quantity |
| Hitch | A black ball accompanies each alternating colored ball |
| Copy | Same alphabet and same length |
| Translate | New alphabet, same abstract sequence and length |
| Integrate | One added symbol type and a longer board |
| Extend | Translated alphabet on a 12-position board |

### Triggers

| Code | Event |
|---:|---|
| 1 / 99 | Experiment start / end |
| 10 / 90 | Block start / end |
| 20 | Action demonstration onset |
| 30 | Action response onset |
| 31 / 32 / 33 | Pointer selection / response complete / timeout |
| 40 | Pattern response onset |
| 50 | Inter-trial interval onset |

### Adaptive controller

None. All trial specifications are deterministic and auditable before presentation.

### Run commands

```powershell
python main.py human --config config/config.yaml
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 4. Methods (for academic publication)

Participants completed a two-block pointer-response task adapted from Pitt et al. (2026). In the first block, each of three action algorithms was demonstrated for four steps. Sort alternated two ball colors and response bins; Double additionally alternated group size; Hitch paired a third-color ball with every primary colored ball. Immediately after each demonstration, participants selected eight concrete action tiles in order during a 50-second response window. Starting color and feature assignments were counterbalanced deterministically across participant identifiers.

In the second block, participants viewed six source patterns encoded by the abstract structures ABAB, ABBA, ABCB, ABCCBA, AAABBB, and ABBCCC, presented as colored geometric objects. For each source pattern, participants completed four conditions: Copy (same alphabet and length), Translate (new colored-shape alphabet, same length), Integrate (one additional symbol type and a longer response board), and Extend (translated alphabet, 12 positions). Source patterns remained visible throughout response. No trial-level informative feedback was provided.

Responses were stored as ordered symbol/action sequences. Descriptive outcomes included exact match to a deterministic canonical continuation, position-wise accuracy, Levenshtein edit distance, completion latency, timeout, and full-alphabet use. The canonical score supports automated QA and descriptive analysis; raw response sequences should be retained for source-paper-compatible modeling because multiple algorithmically regular responses can be theoretically meaningful.

### Reproducibility and source alignment

The action order, four-step demonstration, 50-second action window, six sample structures, four generalization conditions, Integrate lengths, 12-position Extend board, and no-feedback policy come directly from the primary paper. The fixed eight-action digital response length, 1-second digital demonstration pacing, 60-second pattern deadline, and exact colored-shape assignment where the paper provides only examples are documented as adaptations or inferences in `references/parameter_mapping.md` and `references/task_logic_audit.md`.

### Outputs

- Human data: `outputs/human/`
- QA data and reports: `outputs/qa/`
- Scripted simulation: `outputs/sim/`
- Sampler simulation: `outputs/sim_sampler/`
- Evidence and audit trail: `references/`

## License

MIT. The task uses only code-defined PsychoPy primitives and includes no third-party media assets.
