# Feature-Rich Episodic Decision Task

| Field | Value |
|---|---|
| Name | Feature-Rich Episodic Decision Task |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000113-feature-rich-episodic-decision-task |
| Short Description | Encode multifeature rewarded episodes, then evaluate temporarily specified feature offers |
| Created By | TaskBeacon |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

## 1. Task Overview

This task implements the baseline Experiment 1 Sample A protocol from Nicholas and Mattar (2026). Participants encode six one-shot episodes per independent round. Each episode combines a concrete item, two visible features (color and semantic category), and a signed reward. After a 2-back distractor, participants see a temporarily specified feature such as “blue” or “animal,” sum the rewards of all matching episodes, and accept positive offers or reject negative offers. Free recall and item-value recall follow the decisions.

The paradigm tests whether detailed episodic representations support flexible construction of decision values when the relevant feature is unknown during encoding. The design distinguishes on-the-fly episodic retrieval from precomputed feature-value learning without instructing participants to use either strategy.

| Property | Value |
|---|---|
| Construct | Episodic memory / flexible decision-making / value-based choice |
| Human protocol | 5 independent rounds, about 5 min each |
| Episodes per round | 6 |
| Decisions per round | 6 (Experiment 1 Sample A) |
| Feature space | 4 colors × 4 categories; 16 concrete items |
| Primary outcomes | Offer accuracy and RT as a function of recalled episodes; recalled versus true offer value |
| Secondary outcomes | Attention accuracy, 2-back accuracy, free recall, reward-memory error |

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Visible event | Runtime behavior |
|---:|---|---|
| 1 | Chinese task instructions | Explains independent rounds, episode values, feature offers, F/J mappings, distractor, and memory tests. |
| 2 | Round start | Announces round number without revealing future feature relevance. |
| 3 | Encoding phase | Six item episodes, each followed immediately by a two-choice attention check. |
| 4 | Distractor phase | 90 s sequential-letter 2-back task prevents active rehearsal. |
| 5 | Decision phase | Six represented color/category offers appear in randomized order. |
| 6 | Memory phase | Six-box free recall followed by six item-value probes. |
| 7 | Next round or completion | Round state resets; no learning carries between rounds. |

### Trial-Level Flow

| Logical item | Phase sequence | Timing | Response |
|---|---|---:|---|
| Encoding episode | Item alone → item + signed reward → item + true/foil reward check | 1.0 s → 6.0 s → 3.0 s max | F left, J right |
| Distractor letter | One uppercase letter with persistent 2-back mapping reminder | 1.5 s | F non-match, J match |
| Feature offer | One localized color/category label with accept/reject options | 7.5 s max | F accept, J reject |
| Free recall | Six non-overlapping editable fields | Self-paced | Return submits |
| Value recall | One encoded item plus numeric entry field | 15 s safety maximum | Signed integer, Return submits |

No itemwise outcome feedback is shown during decisions because the source does not report a feedback state. Accepted offers still update stored round/session earnings for analysis.

### Controller Logic

There is no adaptive controller. `src/utils.py` constructs the entire session before the first trial because later offers and memory probes depend on the exact items and rewards encoded in each round. The deterministic plan enforces the paper's cross-trial sampling and reward constraints. PsyFlow owns trial identity, response capture, timing, trigger delivery, block execution, and persistence.

### Other Logic

Valid six-item sets have non-zero feature counts `[3, 2, 1]` for both colors and categories. Each round receives three positive and three negative non-zero rewards from -9 through +9. All represented feature sums are non-zero, and the round includes at least one positive and one negative offer. Reappearing items receive a different reward. A separately seeded letter stream prevents timing changes from changing experimental conditions.

## 3. Configuration Summary

Settings below are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier |
| `age` | Age, 18–80 |
| `gender` | Male / Female / Other |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 |
| Units | Degrees of visual angle |
| Background | `#F7F7F5` |
| Fullscreen | False by default |
| Monitor width / distance | 35.5 cm / 57 cm |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `item_frame` + `item_image` | Rect + image | Pastel color card and concrete OpenMoji pictogram |
| `reward_text` | Text | Signed episode reward |
| `attention_prompt`, `left_reward`, `right_reward` | Text | Spatially separated reward recognition check |
| `distractor_letter` | Text | Uppercase 2-back letter |
| `offer_feature`, `accept_option`, `reject_option` | Text | Localized feature offer and actions |
| `recall_box_1..6` | TextBox | 2×3 free-recall grid |
| `value_recall_entry` | TextBox | Signed numeric item-value response |

All Chinese text uses SimHei. Multi-element screens use explicit anchors and spacing. OpenMoji assets are 618×618 transparent PNGs with attribution and full CC BY-SA 4.0 license in `assets/`.

### d. Timing

| Phase | Duration |
|---|---:|
| Item alone | 1.0 s |
| Item + reward | 6.0 s |
| Attention check | 3.0 s maximum |
| Distractor | 90 s total; 1.5 s per letter (letter cadence inferred) |
| Feature offer | 7.5 s maximum |
| Free recall | Self-paced |
| Value recall | 15 s maximum (inferred operational bound) |

### e. Triggers

| Event family | Codes |
|---|---|
| Experiment / round lifecycle | 1, 10, 50, 99 |
| Encoding item / value / check | 11–16 |
| 2-back letter / responses / timeout | 21–24 |
| Offer / accept / reject / timeout | 31–34 |
| Free recall / value recall | 41–45 |
| Stage block start / end | 60 / 61 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller | None |
| Condition weights | `null`; label-level weighted scheduling cannot express cross-phase dependencies |
| Session planner | Deterministic custom plan with task seed and separate distractor sub-seeds |

## 4. Methods (for academic publication)

Participants completed a Chinese-language computerized implementation of the Feature-Rich Episodic Decision Task. In each of five independent rounds, six concrete items were sampled from a 16-item color-by-category grid. The subset had feature multiplicities of three, two, and one for both represented colors and represented categories. Each item appeared alone for 1 s and then with a non-zero integer reward from -9 to +9 for 6 s. Immediately afterward, participants had 3 s to select the just-seen reward from two spatially separated values. Rewards were assigned so that each round contained three positive and three negative values, no represented feature summed to zero, and both positive and negative feature offers were available.

After encoding, participants completed a 90 s 2-back letter task. Each letter was displayed for an inferred 1.5 s response interval; participants pressed F for a non-match and J for a match to the letter two positions earlier. They then evaluated six single-feature offers. Each offer displayed one represented color or semantic category for up to 7.5 s. Participants pressed F to accept or J to reject. The true offer value was the sum of all encoded rewards associated with matching items; a positive offer was correctly accepted and a negative offer correctly rejected. No itemwise decision feedback was added.

Finally, participants freely recalled the six encoded items using six text fields and then saw each item again and entered its associated signed reward. Trial data retain item identity, color, category, reward, relevant memories, true offer value, response, RT, correctness, earned points, recall output, and reward-memory error. The main behavioral tests compare decision time with the number of recalled episodes and compare true versus recalled offer value as predictors of acceptance.

The protocol and exact reported parameters follow [Nicholas and Mattar (2026)](https://doi.org/10.1038/s41562-025-02383-3), with the full author manuscript, figures, data, and analysis code audited from the [authors' public repository](https://github.com/jonathanicholas/nm2025_emdm) at commit `6704df07ec17ff3e599a1eb10fe7640a879e5dfb`. The 2-back letter cadence, F/J key assignments, value-recall safety bound, transition screens, and redistributable pictogram treatment are documented as adapted or inferred in `references/parameter_mapping.md`, `references/stimulus_mapping.md`, and `references/task_logic_audit.md`.

## Runtime

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

Outputs are written to mode-specific directories under `outputs/`. The CSV stores one row per encoding episode, distractor letter, offer decision, free-recall screen, or value-recall probe; a companion summary JSON stores phase accuracies, decision RT/timeouts, earned points, and reward-memory error.

## References

See `references/references.md`, `references/parameter_mapping.md`, `references/stimulus_mapping.md`, and `references/task_logic_audit.md` for full evidence and inference traceability.
