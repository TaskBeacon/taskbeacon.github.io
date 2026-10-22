# Remote Associates Task

| Field | Value |
|---|---|
| Name | Remote Associates Task / 远距联想任务 |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/H000126-remote-associates-task |
| Short Description | Authored Chinese triad search with matched-time hint rescue |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Required commit43e52fb or later confirmed Unicode fix |
| PsychoPy Version | 2025.2.4 |
| Modality | behavior |
| Language | Chinese, SimHei |
| Voice Name | zh-CN-YunyangNeural; voice disabled |

## 1. Task Overview

Participants find a common associative answer to three Chinese cues. Eight newly authored items use ordinary semantic/compound relations, not shared-character search. After a first-attempt failure, the same item receives either a semantic hint or equal additional time without a hint. This is an unnormed adaptation of Mednick's paradigm, **not a validated Chinese RAT form or a diagnostic creativity test**. The answer key and all three relations appear in `references/authored_materials.json`. No commercial bank was reproduced. Link plausibility has been reviewed but remoteness, uniqueness, familiarity, difficulty and psychometric validity require independent native-speaker pilot data.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---|---|
| Setup | Collect numeric subject ID; load SimHei stimuli and mock behavioral triggers |
| Instruction | Explain associative links with two worked examples, F2 submission and retry rules; space continues |
| Allocation | Python-compatible random.Random/PythonRandom seeded by126031+subject ID shuffles item IDs, assigns four hints/four neutral; hidden until retry |
| Schedule | One BlockUnit, eight unique encoded item:arm labels, null/even weights, explicit seed126031; built-in Python-compatible shuffle |
| Trial series | Each item once, participant-paced ready screens |
| End | Save one reduced row per logical item plus summary; no personal creativity rating |

### Trial-Level Flow

| Phase | Content | Exit |
|---|---|---|
| ready | No cue preview; rest if needed | space |
| fixation | + | 500ms |
| initial | Three cues, neutral search instruction, blank editor | F2 or30s |
| retry, conditional | Only after initial keyed failure; same cues, assigned hint or neutral message, new blank editor | F2 or20s |
| saved | 本题已保存。; no answer revelation | 1s |

### Controller Logic

| Rule | Implementation |
|---|---|
| Adaptive controller | None |
| Branch | Keyed correct initial submission skips retry; any initial wrong/blank/timeout receives retry |

### Other Logic

| Rule | Implementation |
|---|---|
| Typed submission | F2, after confirming input-method text; Return is editing only |
| Scoring | NFKC plus surrounding whitespace trim; exact frozen accepted variants only. Framework hit merely means F2 registered |
| Deadline | Preserve unsubmitted buffer, score incorrect, solution RT null |
| RT | Per-stage onset-to-F2 seconds; correct-only solution RT includes search, typing and editing; no cross-phase/coarse-global subtraction |
| Outcomes | Initial accuracy, eventual accuracy and conditional rescue by arm; never a single creativity score |
| Hint contrast | Hint-rescued / initially-failed hint items minus neutral-rescued / initially-failed neutral items; report denominators; null if either denominator0 |

## 3. Configuration Summary

Settings are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Three-digit numeric ID101–999; controls reproducible hidden arm allocation |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size / units | 1280×800 / pixels |
| Background / fullscreen | white / false |
| Monitor geometry | 35.5cm width,60cm nominal distance; not calibrated |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction / ready / good_bye | text | Chinese,SimHei,wrap1080,centered |
| fixation | text | Black +,40px |
| triad | text | Concrete three-word row,y160,40px |
| stage_message | text | Initial instruction or retry hint/neutral,y65,25px |
| editor | textbox | New blank900×100 editor,y−45,30px text |
| entry_hint | text | F2 submission reminder,y−150,23px |
| saved | text | Neutral saved notice |

### d. Timing

| Phase | Duration |
|---|---|
| ready | participant-paced |
| fixation | 0.5s |
| initial | 30s maximum, ends on F2 |
| retry | 20s maximum, ends on F2; omitted after initial success |
| saved | 1s |

### e. Triggers

| Event | Code |
|---|---|
| experiment start/end | 1/99 |
| fixation onset | 10 |
| initial onset/submit/no-submit deadline | 20/21/22 |
| retry onset/submit/no-submit deadline | 30/31/32 |
| saved onset | 40 |

No-submit markers are conditional deadline events, not unconditional offsets. Mock triggers do not establish hardware timing. No adaptive controller.

## 4. Methods (for academic publication)

This authored Chinese adaptation follows the three-cue associative search structure of [Mednick1962](https://doi.org/10.1037/h0048850), while departing from the original30-item40-minute forms. Each participant views eight unique triads. A500ms fixation precedes each30s first attempt. Participants type one Chinese answer and pressF2 after the input method commits the text. F2 latency is measured relative to the relevant software phase onset and includes typing. A new editor is created at each phase to avoid stale caret state. Source [Bowden & Jung-Beeman2003](https://doi.org/10.3758/BF03195543) includes30s solution windows in EEG/fMRI subsets; the present horizontal layout, input method, behavioral setup and timings are adaptations, not an exact replication.

Before scheduling, a seeded pseudorandom allocation assigns half the items to a semantic-hint retry and half to a neutral extra-time retry. This allocation is concealed during the first attempt. Only initially incorrect, blank or timed-out trials receive a20s retry, with equivalent time budgets in both arms. Initial correct responses skip retry. No standard answer, reward, correctness feedback or insight label is displayed. All trial-level parameters are config-defined; no adaptive controller is used. Data preserve raw/normalized text, response events, per-stage RT, initial/retry accuracy, rescue eligibility, assigned arm and hint receipt. Accuracy is provisional frozen-key accuracy; plausible unlisted alternatives must be audited blind to condition and handled using a prospectively documented revised key, preserving original scores.

The new pool has no participant-derived norms or validated remote-association distances. Chinese language-specific norming is necessary ([Chinese norming study abstract](https://pubmed.ncbi.nlm.nih.gov/28342070/)). Every answer has three documented everyday links; several items may be easy or close associates, and hint strength is uncalibrated. The conditional rescue contrast controls additional opportunity but is descriptive in one small session; causal inference requires adequate randomized samples, item effects, balanced assignment checks and prespecified exclusions. This software supports pilot collection, not a claim of a standardized individual creativity measure. Native/browser timing is software-only; neither OS IME nor physical input/display calibration has been established.

Install `requirements.txt`, then run `python main.py human`. The pinned PsyFlow Unicode adapter is required. `python main.py qa`, `python main.py sim --config config/config_scripted_sim.yaml`, and `python main.py sim --config config/config_sampler_sim.yaml` use explicit four-item synthetic buffers and shortened deadlines; these test plumbing, not spontaneous responses. Standard/gate evidence is under `references/validation`. Human output stays in ignored `outputs/human`; no participant data are included in this repository.

Before research deployment: obtain independent Mandarin-speaker relation review and alternative answers, estimate item familiarity/solution rates and latency distributions, remove ambiguous/close-associate items as appropriate, pilot hint strengths, freeze a versioned item/key set, and validate local input-method behavior. Eight items are a demonstration/pilot pool, not an adequately powered instrument by themselves.

Although no explicit correct/incorrect message appears, retry occurrence implicitly reveals first-attempt failure. Hint strength is uncalibrated; rat08 explicitly narrows the answer toward a battery measure word.

Web integration: source-only derivedH000126, canonicalT000126. Run via https://taskbeacon.github.io/psyflow-web/?task=H000126-remote-associates-task . Full8items and all timings retained, no shortened preview. Do not run Python commands above in theHrepo; those document canonicalT. Shared runner supplies shell/fullscreen/export. See transfer_node.md. The notify workflow requires TASKBEACON_ORG_DISPATCH_TOKEN with Contents:Read and write on TaskBeacon/psyflow-web (Actions:write alone insufficient); organization approval may be needed.
