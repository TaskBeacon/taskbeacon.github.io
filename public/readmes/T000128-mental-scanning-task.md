# Mental Scanning Task

| Field | Value |
|---|---|
| Name | Mental Scanning Task / 心理意象扫描 |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000128-mental-scanning-task |
| Short Description | Learn an original map; report hidden-map imaginal arrival and compare a distance-matched verification control. |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Current TaskBeacon PsyFlow (native validation dependency recorded in validation) |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavioral; mock event markers |
| Language | Chinese, SimHei |
| Voice Name | zh-CN-YunyangNeural (voice disabled; visual cues) |

## 1. Task Overview

This Chinese computerized adaptation of Kosslyn, Ball & Reiser (1978), Experiments 2–3, compares self-reported imaginal arrival latencies with fast map-membership verification for the same pairs of landmarks. Participants first meet a spatial learning criterion. The map is absent throughout test trials; only central landmark words remain visible. A positive distance–RT slope is descriptive evidence, not a unique test of representation format, imagery accuracy, clinical status or individual ability. Materials are original and have not been human-piloted or normed.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---|---|
| Registration | Three-digit integer participant ID101–999; software-seeded condition order logged. |
| Learning | Up to5 rounds. Named map10s, then additional study up to60s or SPACE. Seven independently shuffled name-to-location checks per round. |
| Criterion | Two consecutive rounds of7/7 correct. Aggregate round feedback; failures reset consecutive-perfect count. After5 unsuccessful rounds no test block runs. |
| Test blocks | Imagery and verification, seeded order.84 trials each:42 directed present pairs and42 absent foils. No more4 consecutive present or absent trials. |
| Adherence | Four ordinal bins after each block;30s window. |
| End | Save phase-rich trial rows and descriptive slope summary; no performance/diagnostic score displayed. |

### Trial-Level Flow

| Trial type | Sequence / response |
|---|---|
| Study | Named red-dot map, title and separated footer.10s fixed study then SPACE/60s additional study. |
| Learning check | Numbered unlabeled locations and one queried landmark; keys1–7,10s maximum. No named-map asset; correct location is scored. |
| Imagery test | Start word4s; probe word8s fixed. Form whole map, imagine a black speck moving along shortest straight line, press F at subjective arrival if present, J if absent. Only first response retained. |
| Verification test | Same start/probe, timing and pairs; fast membership F/J, no scan instruction. |
| Adherence | Keys1–4 indicate0–24,25–49,50–74,75–100% instruction adherence; no response is missing. |

### Controller Logic

| State | Rule |
|---|---|
| LearningCriterion | Track correct responses within each7-item round. At round end increment consecutive perfect rounds or reset to0. `passed` becomes true after2 perfect rounds. |
| Gating | Stop learning immediately after pass; skip all tests on failure. Public web counterpart uses the same criterion and conditional phases. |

### Other Logic

| Item | Rule |
|---|---|
| Schedules | Exact pair/foil sets require a custom BlockUnit generator. Native random.Random and supported web PythonRandom share seeds. Learning query order independently shuffled. |
| Spatial metric | Euclidean distance between red-dot centers in800×600 design-pixel map; normalized by maximum591.713613px. No physical centimeters inferred. |
| Intermediate count | Other dot projection strictly inside segment and perpendicular distance≤24px. All42 directed paths have0; minimum clearance64.500987px. |
| Test eligibility | Present, correct membership, passed criterion, nonmissing firstRT≥0.15s. Other rows retained with flags. F arrival is subjective, never objective scanning accuracy. |
| Slopes | OLS seconds per100design-pixels, separately by mode; eligible count, distinct distances and intercept retained. Difference undefined if either slope undefined. No silent outlier removal. |

## 3. Configuration Summary

All settings are from `config/config.yaml`. The human/public web defaults retain168 test trials. `config_diagnostic.yaml` explicitly shortens to8per block while retaining phase timing and learning criterion. Automated QA additionally scales durations by.05; sim profiles retain nominal phase timing and are synthetic plumbing checks, not behavioral observations.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Integer101–999; no names or sensitive personal details collected. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Resolution / units | 1280×800 / pixels |
| Background / fullscreen | White / false |
| Font | SimHei |
| Monitor metadata |35.5cm width,60cm viewing-distance setting; not measured calibration |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| map | Original image | Seven Chinese named landmarks and red location dots inside original island outline. |
| check_map | Original image | Same location dots, labels1–7 instead of landmark names. |
| start_word / word | Text38px | Start shown as 起点：名称, followed by bare probe name; no map or spatial coordinate cue. |
| check_prompt / hint | Text | Query at y335 and key instruction at y−330, map centered. |
| instruction / block instructions | Text25px | Explicit line breaks for native Chinese readability; no predicted distance effect disclosed. |
| round_result / adherence / endings | Text | Criterion feedback, self-report and non-diagnostic completion/failure messages. |

### d. Timing

| Phase | Duration |
|---|---|
| Study / study-ready |10s fixed /60s maximum orSPACE |
| Location check |10s maximum |
| Start |4s fixed |
| Probe |8s fixed, including time after first response |
| Adherence |30s maximum |

### e. Triggers

| Event | Code |
|---|---|
| Experiment start / end |1 /99 |
| Study / ready / continue / no-continue |10 /11 /12 /13 |
| Check onset / response / omission |20 /21 /22 |
| Start-word onset |30 |
| Imagery onset / F / J / omission |40 /41 /42 /43 |
| Verification onset / F / J / omission |50 /51 /52 /53 |
| Adherence onset / response / omission |60 /61 /62 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| criterion_rounds |2consecutive perfect7-item rounds |
| max_learning_rounds |5 |
| Adaptive RT / rewards |None |

## 4. Methods (for academic publication)

Participants learn an original seven-landmark map with Chinese labels. Full-map study precedes seven randomly ordered landmark-to-location recognition trials on a numbered, unlabeled map. Two consecutive complete rounds with all seven correct are required, with at most five learning rounds. This is an explicit digital recognition adaptation of the original paper's free reconstruction criterion within0.64cm, and should not be described as reproducing that criterion. Failure saves learning data and ends without testing. The current materials and comprehension have not received a human pilot.

After criterion, participants receive imagery and rapid-verification instructions in counterbalanced order. Each block has the same42 directed present pairs and42 start-matched absent probes. Start cues last4s; probes have an8s fixed response window. This follows the paper's materials timing, while recording the discrepancy between its4s recorded gap and5s wording in the procedure. Central Chinese visual words replace spoken English cues. The entire map, outline, location dots and routes remain absent during both test blocks. Imagery F responses mark subjective arrival; verification F responses indicate membership. Raw RT includes cue recognition and decision/motor components. Intervening landmarks are held at zero under a published geometric corridor definition; routes have multiple unique lengths.

Eligible present-trial first RTs are regressed on map distance separately by condition and retained with eligibility/omission/anticipation flags. Native RT derives from the PsychoPy keyboard clock at onset flip, not differences of coarse integer global timestamps. Browser timing is software timing, without hardware display/keyboard calibration. Descriptive slopes cannot establish a single pictorial or propositional mechanism. Within-person instruction carryover, demand characteristics, lexical processing, recognition-based learning and self-reported compliance remain limitations. Record condition order; first-block-only between-person sensitivity analyses are advisable. No participant data, invented normative result, or synthetic pilot is supplied.

Run with Python3.10 and installed PsyFlow/PsychoPy:

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
python -m unittest discover -s tests
```

`outputs/human` is excluded from version control. Reduced rows are one logical study/check/test/adherence trial, distinguished by `row_kind`; restrict distance analyses to `row_kind=test` and `valid_rt=true`. Native CSV preserves StimUnit-prefixed phase fields. `*.summary.json` provides descriptive slopes. Synthetic validation artifacts are explicitly labeled and kept separately. The paired source-only H000128 task uses the shared PsyFlow-Web runner.

Source: [Kosslyn, Ball & Reiser1978](https://doi.org/10.1037/0096-1523.4.1.47), original methods pp.51–54; see reference audit and mappings for all adaptations.
