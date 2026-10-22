# Self-Ordered Pointing Task / 自我排序指认

| Field | Value |
|---|---|
| Name | Self-Ordered Pointing Task (SOPT) |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/H000112-self-ordered-pointing-task |
| Short Description | Monitor self-chosen item history while positions are shuffled |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Local shared PsyFlow runtime; see validation logs |
| PsychoPy Version | Local installed version; see validation logs |
| Modality | Behavioral pointer responses |
| Language | Chinese, SimHei |
| Voice Name | zh-CN-YunyangNeural configured; voice disabled |

## 1. Task Overview

This research adaptation of SOPT repeatedly presents the same abstract figures in shuffled spatial arrangements. Participants freely choose a figure they have not selected earlier in the current set. Set sizes are 6, 8, 10, and 12, with three successive complete series per size (12 sets, 108 choices). Repeating an item is an error even when intervening choices occurred. New series reset memory. This is distinct from reproducing an externally supplied spatial sequence. The geometric figures and Chinese translation are original adaptations, not original commercial test materials or a normed clinical instrument.

## 2. Task Flow

![Task Flow](task_flow.png)

The generated diagram illustrates the stimulus family and array counts; authoritative pixel-exact task materials are the assets and actual QA screenshots.

### Block-Level Flow

| Step | Implementation |
|---|---|
| Instruction | Explain free order, same-item memory, no error feedback and memory reset; SPACE continues |
| Set start | Display set number and N; SPACE starts a new empty choice history |
| Series | Exactly N pages; sizes ascend 6 → 8 → 10 → 12, each repeated three times |
| Completion | Neutral thank-you screen; SPACE saves/exits; no diagnostic feedback |

### Trial-Level Flow

| Stage | Implementation |
|---|---|
| choice | Same N figures, new preplanned permutation; click one figure; no selected-item marks |
| Scoring | Compare stable item identity with all prior choices in this series; continue after errors |
| page_gap | White blank for 250 ms, then next page or set boundary |

### Controller Logic

| State | Update |
|---|---|
| SetMemory | Stores chosen identities and first repeat position; new object for every set |
| Difficulty | Fixed set-size progression; no adaptive controller or stopping after errors |
| Omission | Separate timeout outcome; does not enter choice history or count as repeat |

### Other Logic

| Logic | Implementation |
|---|---|
| Reproducible arrays | BlockUnit custom page generator, 32-bit LCG (1664525,1013904223) and Fisher–Yates; seed 112031 + zero-based set index |
| Permutations | Reject identical consecutive whole-array orders; individual unchanged positions are possible |
| Data | One reduced row per choice, including identity, slot, item order, history, error flags, RT; separate per-set summary |

## 3. Configuration Summary

Settings are from `config/config.yaml`; QA and both synthetic simulation profiles use one complete series at every set size (36 choices) and framework time scaling.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Anonymous 3-digit participant ID, 101–999 |

### b. Window Settings

| Parameter | Value |
|---|---|
| Window | 1280×800, white, nonfullscreen, pixel units |
| Font | SimHei, 28 px, 1000 px text wrap |
| Geometry | 4 columns; 220 px horizontal / 190 px vertical spacing; 120×120 px figures |
| Input | Mouse/pointer click within image bounding box; outside clicks ignored |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction, set_start, good_bye | text | Config-defined Chinese instructions and neutral boundaries |
| item_01–12 | image | Original black angular silhouettes with identical white apertures; geometry.json records coordinates |
| blank | text | Empty white page-turn screen |

### d. Timing

| Phase | Duration |
|---|---|
| choice | Self-paced with 86400 s software safety ceiling; no visible deadline |
| page_gap | 0.25 s |
| Administrative screens | Until SPACE |

### e. Triggers

| Event | Code |
|---|---|
| experiment_start / instruction_onset | 1 / 2 |
| block_start / block_end | 10 / 90 |
| choice_onset / item_select / choice_complete / choice_timeout | 20 / 30 / 31 / 32 |
| page_gap / experiment_end | 40 / 99 |

Behavioral mock triggers only. No EEG or device synchronization was established.

## 4. Methods (for academic publication)

Participants viewed black abstract geometric figures on a white 1280×800 display. They clicked one figure per page in a freely chosen order, attempting to avoid every figure previously selected in the current series. Figure identities remained constant within each series while spatial positions were reshuffled after each response. Sets contained 6, 8, 10, or 12 figures and exactly the corresponding number of responses; each size was presented in three consecutive series. Errors did not terminate series, and no correctness feedback or selected-item markings were supplied. Series boundaries instructed participants to begin a new choice history.

The primary outcome was repeated selection of any earlier chosen identity in the current set. First-error serial position, immediate repetition, unique item count, choice latency, full chosen identity sequence and selected grid positions were retained for secondary analysis. The canonical data unit is one choice page, with per-set aggregates computed separately. Omissions at an extreme 24-hour safety ceiling were coded separately from repetition errors. Nominal interpage blanks were 250 ms, with no speed emphasis. Pixel dimensions and response latencies are not physically calibrated measures.

The procedure draws on Petrides and Milner (1982), with retrieved supporting methods from Geurts et al. (2005, section 2.5.4) and Daigneault and Braun (1993, Method/Procedure). The 1982 full text was not retrieved; supporting text was inspected via indexed author/repository sources. Original program-generated silhouettes, mouse input, nested figure pools across sizes, Chinese translation, display geometry, interpage interval and safety ceiling are explicit adaptations. Figure distinguishability/verbalizability, translation comprehension and behavioral validity require participant piloting. No published norms, diagnostic thresholds, psychometric equivalence or calibrated hardware precision are claimed. See references/task_logic_audit.md and mapping files for evidence boundaries.

Run with `python main.py human`, `python main.py qa`, or `python main.py sim --config config/config_sampler_sim.yaml`. Dependencies: shared PsyFlow, PsychoPy, pandas and PyYAML. Use `python -m unittest discover -s tests` for deterministic protocol edge cases. Standard gates are recorded in `outputs/qa/gate_report.json`. Outputs are ignored by Git; only explicitly reviewed synthetic validation artifacts may be published.

Sources: [Petrides & Milner 1982](https://doi.org/10.1016/0028-3932(82)90100-2), [Geurts et al. 2005](https://doi.org/10.1016/j.acn.2004.11.001), [Daigneault & Braun 1993](https://doi.org/10.1080/01688639308402605).

Web integration: source-only derived H000112, loaded by the shared runner at https://taskbeacon.github.io/psyflow-web/?task=H000112-self-ordered-pointing-task . No separate app shell. See references/alignment.md. The notify workflow requires TASKBEACON_ORG_DISPATCH_TOKEN with Contents: Read and write access to TaskBeacon/psyflow-web (Actions: write is insufficient), plus org approval if enforced. Browser clocks, fullscreen and file export differ from PsychoPy; experimental parameters do not. Python commands above apply to the canonical T repository.
