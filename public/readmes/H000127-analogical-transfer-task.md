# Analogical Transfer Task / 跨情境类比迁移

| Field | Value |
|---|---|
| Name | Analogical Transfer Task |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/H000127-analogical-transfer-task |
| Short Description | Original solved-source stories, spontaneous and hinted target solutions, blinded human coding |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Requires43e52fbfb5900e894d51ee7551cae971bb01f34e or later confirmed Unicode adapter |
| PsychoPy Version | 2025.2.4 tested |
| Modality | Behavior, typed Chinese |
| Language | Chinese / SimHei |
| Voice Name | zh-CN-YunyangNeural, disabled |

## 1. Task Overview

One solved source story precedes one different-surface target problem. A participant receives either a structurally matched or unmatched source, then writes an initial solution without an analogy prompt and a second solution after an explicit analogy hint. All transfer scores remain null until two blinded human raters agree or an independent adjudicator resolves differences. These are original, unnormed Chinese materials, not a clinical test or exact replication of Gick & Holyoak(1980).

Participant UI uses the neutral name 阅读与问题解决. Naive spontaneous-transfer studies must use controlled neutral/kiosk administration and prevent prior access to this repository, catalog, plot or paradigm-revealing URL. The public catalog/URL cannot preserve blinding by itself. Do not tell participants the analogy hypothesis before the initial response.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Behavior |
|---|---|
| Registration | Unique101–999 numeric participant ID; neutral instructions |
| Assignment | random.Random(127031+ID).choice selects one of two arms before singleton BlockUnit scheduling |
| Human block | Exactly1target; no within-person cross-arm/earlier-hint contamination |
| Diagnostic modes |1target per run at shortened windows; QA/scripted ID101matched, sampler ID102unmatched; direct native semantic test also covers both |
| Completion | Save raw acquisition fields; neutral pending-coding notice; no accuracy feedback |

### Trial-Level Flow

| Phase | Participant content | Exit |
|---|---|---|
| source | Solved water-town platform story, matched or unmatched | Space or60s |
| initial | New sealed-display light-lock problem; no analogy prompt; blank editor | F2 or120s |
| hint | Same source reread plus explicit instruction to consider its solution | Space or60s |
| hinted | Same target; new blank editor; write full retained/revised solution | F2 or120s |
| saved | Both responses saved, pending review |1s |

### Controller Logic

| Component | Rule |
|---|---|
| Adaptive controller | None |
| First-stage outcome | Never controls second-stage access; success not inferred online |
| Assignment | Equal probabilities; realized group sizes may differ; require unique IDs |

### Other Logic

| Component | Rule |
|---|---|
| Submission | F2 only; Return edits/IME commits; Unicode/raw line breaks preserved |
| Missing | Blank submission and nonempty unsubmitted draft are separate missing states |
| Runtime scores | All structural/transfer/feasibility fields null; submitted nonempty pending |
| Offline coding | Shuffled opaque IDs, two independent blinded judgments, unresolved cases remain null, independent adjudication |
| Summaries | Initial/hinted/any-attempt by source, with all/eligible/rated/missing/unrated denominators; initial success persists in any-attempt |

## 3. Configuration Summary

Settings are from `config/config.yaml`; the other three profiles are explicit synthetic diagnostic smoke tests.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Unique3digit101–999; reject nonnumeric IDs |
| assignment_seed |127031; native and web exact Python RNG pairing |

### b. Window Settings

| Parameter | Value |
|---|---|
| size, units |1280x800, pix |
| background, font | White, black SimHei |
| fullscreen | False locally; web shell controls browser fullscreen |
| physical geometry |35.5cm width/60cm viewing config are uncalibrated defaults |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction | text | Neutral task explanation, no analogy hypothesis |
| reading_title/story/reading_footer | text | Solved source, separated y285/45/-285; story25px/1040wrap |
| target/stage_message | text | Light-lock constraints, y190/-10,24/22px |
| editor | textbox | New blank each attempt; y-135,1000x180,24px |
| entry_hint | text | F2/Return editing rule at y-270 |
| saved/good_bye | text | No score feedback |

### d. Timing

| Phase | Duration |
|---|---|
| source/hint |60s maximum each; early space |
| initial/hinted |120s maximum each; early F2 |
| saved |1s |
| instruction/good_bye | Until space |

### e. Triggers

| Event | Code |
|---|---|
| start/end |1/99 |
| source onset/continue/no continue |10/11/12 |
| initial onset/submit/no submit |20/21/22 |
| hint onset/continue/no continue |30/31/32 |
| hinted onset/submit/no submit |40/41/42 |
| saved onset |50 |

Behavioral mock trigger default. No-response trigger is not an unconditional offset marker. No EEG validation or physical timing calibration. RT measures response submission latency including search, typing and editing; source/hint RT measures early advancement. No cross-phase subtraction using coarse global timestamps.

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Controller/reward | None |

## 4. Methods (for academic publication)

The design adapts Gick and Holyoak(1980), whose experiments examined transfer from a solved source in a semantically distant domain to a target, with varying source relations and analogy instructions. Full author-hosted scanned methods were audited: Table2p317, ExperimentIpp319–320, ExperimentIIpp333–334, ExperimentIVpp341–343 and ExperimentVp344. Here one newly authored Chinese water-town source is selected between participants. The matched source instantiates multiple capacity-limited paths with simultaneous central arrival; the unmatched source solves an ordered inspection problem by sequential movement along one route. Both groups receive the identical light-lock target and identical target windows. No copyrighted classic story, empirical norm or pilot result is supplied.

Participants read the source for up to60s, attempt the target for up to120s without an analogy prompt, reread their source with an explicit hint for up to60s, then attempt the same target for up to120s regardless of their first answer. They submit committed Chinese text withF2. Editors restart blank, but both original response records persist. These timings, universal second attempt, source re-exposure, Chinese text and absence of memory recall/distractors are explicit adaptations, not original experimental parameters. Neutral participant-facing naming reduces but cannot guarantee spontaneous-transfer blinding in a public web task.

Structural transfer requires human evidence of distinct converging paths, safe low contributions, and simultaneous sufficient combined input without violating constraints. The detailed rubric distinguishes other feasible solutions, missing submissions and unrated ambiguity. Runtime scores are withheld. See [human coding protocol](references/human_coding_protocol.md) and `tools/human_coding.py` for preparation, validation, adjudication and aggregation. A source-arm contrast and the within-person stage change have different interpretations: stage improvement conflates the analogy hint with extra time, repetition and source re-exposure; there is no neutral extra-time or no-source arm. A first-attempt structural solution is consistent with spontaneous transfer but does not prove source use. Materials require independent comprehension, familiarity/difficulty and reliability studies before substantive inference.

Canonical Python usage: `python main.py human`; diagnostics: `python main.py qa`, `python main.py sim --config config/config_scripted_sim.yaml`, `python main.py sim --config config/config_sampler_sim.yaml`. Run the five build gates via task-build scripts. Native backend Unicode tests do not verify operating-system IME; do not claim otherwise. Offline coding requires Python, PyYAML; coding CLI accepts strict nativeCSV and webJSON.


Web: open https://taskbeacon.github.io/psyflow-web/?task=H000127-analogical-transfer-task . This source-only derived repo uses the shared runner; see transfer_note.md for exact T/Halignment and notifysecret permissions. The offline human_coding.py accepts actual nativeCSV or webJSON without automatic scoring.
