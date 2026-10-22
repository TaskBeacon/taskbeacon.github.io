# Pavlovian-to-Instrumental Transfer

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Pavlovian-to-Instrumental Transfer |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000093-pavlovian-to-instrumental-transfer |
| Short Description | Approach/withdrawal PIT task measuring valence-dependent Pavlovian bias on instrumental go/no-go choices. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | local TaskBeacon checkout |
| PsychoPy Version | environment managed |
| Modality | Behavioral |
| Language | Chinese |
| Voice Name | Disabled |

## 1. Task Overview

This task implements the human Pavlovian-to-Instrumental Transfer protocol of Huys et al. (2011). Participants separately learn mushroom action contingencies and five audiovisual cue values, then repeat the instrumental choice under those task-irrelevant cues without feedback. The crossed approach/withdrawal design tests whether positive cues promote approach and suppress withdrawal while negative cues produce the complementary bias.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Block | Implementation |
|---|---|---|
| 1 | General instruction | Explains separate action learning, cue learning, and transfer testing; space continues. |
| 2 | First macro-block | Participant parity selects approach or withdrawal first. |
| 3 | Instrumental phase | Six mushrooms are repeated in balanced random order with ±20-point feedback. |
| 4 | Pavlovian phase | Five patterned visual cues plus tones predict +100, +10, 0, −10, or −100 points; every fifth exposure is followed by a query. |
| 5 | Transfer phase | Every mushroom × cue pair is tested under extinction with hidden outcomes. |
| 6 | Participant-controlled break | A break separates the two action contexts. |
| 7 | Second macro-block | The remaining action context repeats instrumental → Pavlovian → transfer. |
| 8 | Summary and exit | Shows learning accuracy, query accuracy, and transfer go rates. |

### Trial-Level Flow

| Trial kind | Sequence | Response and outcome |
|---|---|---|
| Instrumental action | Mushroom plus blue action frame, up to 1.5 s → feedback 1.5 s → fixation 0.5 s | Space is go; withholding is no-go. Correct choices gain 20 points; incorrect choices lose 20. |
| Pavlovian exposure | Patterned cue plus tone 1.0 s → associated outcome 1.5 s → fixation 0.5 s | Passive observation; the outcome is fixed by cue identity. |
| Pavlovian query | Two cue patterns, up to 2.5 s → fixation 0.5 s | F selects left and J selects right; no immediate feedback. |
| Transfer action | Cue plus tone behind mushroom/action frame, up to 1.5 s → fixation 0.5 s | Space is go and withholding is no-go; outcomes remain hidden. |

### Controller Logic

| Component | Rule |
|---|---|
| Adaptive controller | None. The task has fixed timing and contingencies. |
| Instrumental contingency | Approach: good→go, bad→no-go. Withdrawal: bad→go, good→no-go. |
| Cue-value mapping | Pattern identity is rotated by participant and macro-block while preserving the five-value set. |
| Block order | Odd/even participant number counterbalances approach-first versus withdrawal-first. |

### Other Logic

| Component | Rule |
|---|---|
| Condition scheduling | Precompiled deterministic plans enforce six-item instrumental balance, every-fifth query insertion, and the full 6×5 transfer grid. |
| Randomness | Seed derives from config seed, participant number, macro-block, and phase; condition and timing randomness do not share state. |
| Transfer outcome | `correct` can be calculated from learned mushroom contingency for audit, but no correctness or points are displayed. |
| Primary analysis | Compare transfer go probability and RT across cue values separately for approach and withdrawal. |

## 3. Configuration Summary

Settings below are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier; also defines counterbalance parity. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 × 800 |
| Units | Degrees of visual angle |
| Background | White |
| Fullscreen | False |
| Monitor geometry | 35.5 cm width at 57 cm distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `m01`–`m12` | TextBox2 primitives | Twelve distinct colored mushroom-like cap/stem symbols. |
| `cue_center`, `cue_left`, `cue_right` | TextBox2 primitives | Five counterbalanced abstract geometric patterns in full-field or query layout. |
| `tone_1`–`tone_5` | WAV sound | Five 1-s pure tones paired with visual cues. |
| Action frames | Rectangle/text primitives | Blue collect frame or opposite-side discard target. |
| Outcomes and feedback | TextBox2 primitives | Signed point outcomes and correct/incorrect feedback cards. |

### d. Timing

| Phase | Duration |
|---|---|
| Instrumental/transfer action window | 1.5 s maximum |
| Pavlovian cue and tone | 1.0 s |
| Pavlovian/instrumental outcome | 1.5 s |
| Pavlovian query | 2.5 s maximum |
| ITI | 0.5 s |

### e. Triggers

| Event | Code |
|---|---|
| Experiment start / end | 1 / 98 |
| Block start / end | 10 / 99 |
| Instrumental / transfer action | 20 / 21 |
| Go / no-go | 30 / 31 |
| Correct / wrong feedback | 40 / 41 |
| Pavlovian cue | 50 |
| Outcomes +100 / +10 / 0 / −10 / −100 | 51 / 52 / 53 / 54 / 55 |
| Query onset / left / right / timeout | 60 / 61 / 62 / 63 |
| ITI | 80 |

## 4. Methods (for academic publication)

Participants completed two counterbalanced macro-blocks, one framed as collecting mushrooms (approach) and one framed as discarding mushrooms (withdrawal). Each macro-block began with instrumental training on six colored mushrooms. In approach, collecting good mushrooms and withholding from bad mushrooms were correct; in withdrawal, discarding bad mushrooms and retaining good mushrooms were correct. A space press emitted the active go response within a 1.5-s window, while no response implemented no-go. Correct and incorrect choices were followed immediately by +20 and −20 points, respectively, for 1.5 s.

Participants then learned five independent compound Pavlovian cues, each comprising an abstract geometric pattern and a 1-s tone. The cues deterministically predicted +100, +10, 0, −10, or −100 points, displayed for 1.5 s. Every fifth exposure was followed by a two-alternative query in which participants selected the more valuable cue with F or J. In the transfer phase, each learned mushroom was presented over each Pavlovian audiovisual background. Instrumental responses retained their learned meaning, but outcomes were withheld to test transfer under extinction. Each trial ended with a 0.5-s neutral fixation.

The human profile presents each Pavlovian cue 20 times per macro-block, directly following Huys et al. (2011). Instrumental and transfer stages use balanced counts of 60 trials each per macro-block; these counts are documented implementation inferences because the accessible protocol text specifies the contingency structure but not those totals. Stimulus assignment and macro-block order are deterministically counterbalanced by participant identifier. No adaptive controller is used. The principal PIT contrast is the cue-value slope of go probability (and response time) in approach versus withdrawal transfer trials, with instrumental accuracy and Pavlovian-query accuracy serving as learning checks.
