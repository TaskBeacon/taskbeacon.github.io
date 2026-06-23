# Probabilistic Stimulus Selection

![Maturity: prototype](https://img.shields.io/badge/Maturity-prototype-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Probabilistic Stimulus Selection |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000040-probabilistic-stimulus-selection |
| Short Description | Browser companion for the Chinese probabilistic stimulus selection task with kana stimuli and criterion-driven learning/transfer blocks. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## 1. Task Overview

This HTML companion mirrors the canonical local `T000040-probabilistic-stimulus-selection`. Participants read Chinese instructions, learn three probabilistic pairs (`AB`, `CD`, and `EF`) with 80/20, 70/30, and 60/40 contingencies, and then complete a transfer phase with all 15 pairings and no feedback.

Six Japanese kana symbols are randomized to roles `A-F` per participant. The browser port preserves the canonical learning rule, the learning criteria, the left/right balance policy, and the runtime-dependent transfer seed by compiling transfer variants for every possible number of completed learning blocks and activating the matching one at runtime.

## 2. Task Flow

### Block-Level Flow

| Step | Description |
|---|---|
| Load Config | Load `config/config.yaml` and initialize the shared stimulus bank. |
| Collect Subject Info | The shared runner collects a three-digit `subject_id`. |
| Counterbalance | `subject_id` determines the kana-to-role assignment deterministically. |
| Show Instructions | Present the Chinese instruction text and optional instruction voice asset. |
| Run Learning Blocks | Learning blocks repeat until all criteria are met or the six-block cap is reached. |
| Run Transfer Block | One transfer block presents all 15 pairings with no feedback. |
| Finish | Show the goodbye screen and export the task data through the shared runner. |

### Trial-Level Flow

| Step | Description |
|---|---|
| Block Ready | A centered ready screen appears for `3.0 s` before each block. |
| Choice Screen | Two kana symbols appear left and right; the participant responds with the left or right key within `4.0 s`. |
| Learning Feedback | Learning trials show `正确` or `错误` for `1.0 s` based on the sampled reward outcome. |
| Transfer No-Feedback | Transfer trials skip feedback and go directly to the inter-trial interval. |
| Inter-Trial Interval | A fixation `+` appears for `1.0 s` before the next trial. |

### Controller Logic

| Component | Description |
|---|---|
| Role assignment | `buildRoleAssignment(...)` shuffles the six kana symbols into roles `A-F` per participant. |
| Learning schedule | `buildLearningBlockSchedule(...)` creates exactly 20 trials per learning pair with exact within-block left/right balance. |
| Transfer schedule | `buildTransferBlockSchedule(...)` creates exactly 10 trials per transfer pair across all 15 pairings. |
| Probabilistic feedback | On learning trials, the chosen role is sampled against the pair-specific win probability. |
| Criterion check | `evaluateLearningBlock(...)` requires `AB >= 0.65`, `CD >= 0.60`, and `EF >= 0.50`. |
| Transfer summary | `summarizeTransferBlock(...)` reports role choice rates and timeout counts for audit logs. |

### Browser Notes

| Component | Description |
|---|---|
| Voice asset | The canonical instruction voice MP3 is preserved, but `voice_enabled` remains `false` by default. |
| Shell | Fullscreen, cursor, and export behavior are handled by the shared `psyflow-web` runtime. |
| Seeds | The browser companion keeps the canonical transfer-seed behavior by precompiling one transfer variant per possible completed-learning-block count. |

## 3. Configuration Summary

All task settings are defined in `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | 3-digit participant identifier used to seed the kana role assignment. |

### b. Window Settings

| Parameter | Value |
|---|---|
| `size` | `[1280, 720]` |
| `units` | `pix` |
| `screen` | `0` |
| `bg_color` | `black` |
| `fullscreen` | `false` |
| `monitor_width_cm` | `35.5` |
| `monitor_distance_cm` | `60` |

### c. Stimuli

| Stimulus ID | Purpose |
|---|---|
| `instruction_text` | Chinese instruction page with runtime-injected left/right key labels. |
| `block_ready` | Ready screen for learning and transfer blocks. |
| `iti_fixation` | Centered `+` used during the inter-trial interval. |
| `feedback_correct` | Green Chinese correctness cue `正确`. |
| `feedback_incorrect` | Orange Chinese error cue `错误`. |
| `good_bye` | Final exit screen. |
| `kana_1` to `kana_6` | Six kana glyphs (`あ`, `い`, `う`, `え`, `お`, `か`) that are randomly assigned to roles `A-F` per participant. |

### d. Timing

| Phase | Duration |
|---|---|
| Block ready | `3.0 s` |
| Response window | `4.0 s` |
| Learning feedback | `1.0 s` |
| Inter-trial interval | `1.0 s` |

### e. Response and Feedback

| Parameter | Value |
|---|---|
| `response_key_left` / `response_key_right` | `a` / `l` |
| `response_key_labels.left` / `response_key_labels.right` | `A` / `L` |
| `learning_criteria` | `AB >= 0.65`, `CD >= 0.60`, `EF >= 0.50` |
| `learning_probabilities` | `AB 80/20`, `CD 70/30`, `EF 60/40` |
| `left_right_balance_policy` | `exact_within_block` |
| `symbol_role_shuffle_policy` | `random_per_subject` |
| `no_response_policy` | `timeout_counts_as_incorrect_on_learning` |
| `correct_score_delta` / `incorrect_score_delta` | `1` / `0` |

### f. Browser Notes

| Parameter | Meaning |
|---|---|
| `task.save_path` | Browser output target handled by the shared runner. |
| `task.voice_enabled` | Kept `false` by default so the task remains text-only. |
| Runtime renderer | The shared `psyflow-web` runtime renders PsychoPy-style kana text and wrapped Chinese text. |

## 4. Methods

Probabilistic stimulus selection is a classic reinforcement-learning paradigm used to measure reward sensitivity, choice bias, and transfer from learned feedback contingencies. The canonical structure contains three acquisition pairs with progressively weaker reward contingencies and a transfer test that presents all pairwise combinations without feedback.

This browser companion preserves that structure while moving shell behavior into the shared `psyflow-web` runtime. The reduced export remains one logical trial per row, and the task-specific Chinese text stays in YAML so it can be reviewed or translated without editing the trial logic.

## Run

Open the task through the shared `psyflow-web` runner with:

`?task=H000040-probabilistic-stimulus-selection`
