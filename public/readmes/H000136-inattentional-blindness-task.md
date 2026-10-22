# Inattentional Blindness Task

| Field | Value |
|---|---|
| Name |Inattentional Blindness Task / 非注意盲视 |
| Version |0.1.0 |
| URL / Repository |https://github.com/TaskBeacon/H000136-inattentional-blindness-task |
| Short Description |One unannounced square during line-length judgment, then attention controls |
| Created By |TaskBeacon |
| Date Updated |2026-08-31 |
| PsyFlow Version |Published43e52fb or compatible newer release |
| PsychoPy Version |2025.2.4 |
| Modality |Behavioral, keyboard |
| Language |Chinese, SimHei |
| Voice Name |zh-CN-YunyangNeural (disabled) |

## 1. Task Overview

This adaptation follows the New School3+3+3 schedule in Mack & Rock's chapter. Participants judge cross-arm length; only trial3 includes an unannounced gray square. After the primary task, separate reports assess awareness, identity and location. Later trials test the now-expected square with divided and full attention. No individual norm, diagnostic score, pilot result, population noticing rate or physical calibration is supplied.

**Researcher-only spoiler:** Do not show this README, flow figure, catalog title, source or URL description to prospective naive participants. Use a prepared neutral participant view “线长判断任务.” Independently screen prior exposure; reading documentation contaminates eligibility. The first instruction and registration are neutral and do not disclose the square. Appropriate consent, ethics review, recruitment and debriefing are the researcher's responsibility.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Block | Procedure |
|---|---|
| 1 |Neutral instruction; two cross-only baseline trials; trial3 critical with square and posttrial probes |
| 2 |Explicit divided attention; two cross-only trials; trial6 expected square; primary judgment then probes |
| 3 |Full attention:ignore line length; two cross-only trials without report; trial9 expected square and probes |
| End |Debrief; no individual ability inference |

### Trial-Level Flow

| Phase | Duration and behavior |
|---|---|
| fixation |Central6px dot,1000ms |
| cross |3px unequal lines,200ms;20px gray square only on3/6/9 |
| mask |384px circular black-white mask,1500ms |
| cross_report |Trials1–6:F horizontal/J vertical; max30s |
| awareness |Trials3/6/9:1 yes/2 no; max30s |
| identification |Trials3/6/9:1 square/2 circle/3 triangle/4 diamond; max30s; guess if needed |
| localization |Trials3/6/9:1 upper-left/2 upper-right/3 lower-left/4 lower-right; max30s; guess if needed |
| intertrial |Blank500ms |

### Controller Logic

| Component | Behavior |
|---|---|
| Adaptive controller |None; no threshold claim |
| Scheduling |Precompiled labels through BlockUnit sequential scheduling preserve one irreversible surprise transition |

### Other Logic

| Component | Behavior |
|---|---|
| Randomness |Python random.Random(136031+numeric subject_id); pairs/orientations/quadrants scheduled before trials; first two orientations opposite |
| Scoring |Primary accuracy; reported awareness; independent identity/location accuracy; supplementary noticing=yes AND either identity/location correct when all reports complete |
| Missing |Null, never recoded to no awareness or failed perception |
| Eligibility |Prior-exposure self-report no AND new same-ID marker AND non-diagnostic |
| Persistence |Atomic start marker before first instruction survives abort; repeated starts are demonstrations |

## 3. Configuration Summary

Settings are from `config/config.yaml`. QA/sim preserve all9 trials and timings. No preview shortens or repeats the surprise sequence.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id |Integer101–999, deterministic assignment basis |
| prior_exposure |Neutral participation/reading question:no/yes/unknown; unknown is ineligible |

### b. Window Settings

| Parameter | Value |
|---|---|
| Native |1280x800, white, pix, windowed |
| Minimum |960x640; no silent resizing |
| Materials |512x512 logicalpixels; not physical visual angles |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| fixation/mask |PNG |6px dot;384px circular8px-cell binary noise |
| cross_H_V_Q |PNG |Lengths192/180,192/168,180/168px;20px square centered±64px |
| instructions/probes |Text |Chinese SimHei24–26px, explicit line breaks,900–1000px wrap |

### d. Timing

| Phase | Duration |
|---|---|
| fixation/cross/mask |1000/200/1500ms |
| Each report |30s maximum, terminates on valid key |
| intertrial |500ms |

Triggers (behavioral mock only)

| Event | Code |
|---|---|
| start/end |1/99 |
| fixation/cross/mask |10/20/30 |
| primary onset/F/J |40/41/42 |
| awareness onset/yes/no |50/51/52 |
| identity onset/options |60/61–64 |
| location onset/options |70/71–74 |
| omission/intertrial |89/90 |

In the canonical Python repository, run `python main.py human`, `psyflow-qa . --config config/config_qa.yaml --no-maturity-update`, or `python main.py sim --config config/config_sampler_sim.yaml`. Native CSV has one logical trial per row; prefixed phase fields and synthetic event logs retain detail. Summary JSON keeps the critical observation separate from full attention. QA/sim always set diagnostic=true and naive_eligible=false; they never touch human exposure markers. Outputs and markers are excluded from git.

## 4. Methods (for academic publication)

Participants fixated centrally and judged horizontal versus vertical line length. An unannounced square accompanied the third cross. Primary judgment preceded awareness, identification and location reports. Explicit divided and full attention instructions then introduced two further three-trial groups, with target on the last trial of each. Full attention omitted line judgments. These groups are controls rather than additional inattentional-blindness measurements. The primary source is [Mack & Rock's author chapter](https://journalpsyche.org/files/0xaa59.pdf); supporting [Kreitz et al.2015](https://doi.org/10.1371/journal.pone.0134675) informs the independent report measures.

Cross and mask durations were200ms and1500ms. Deterministic original PNGs were preloaded. Square quadrant and unequal line pairs were assigned before runtime using a recorded seed. Pixel geometry, deadline, Chinese response choices, fixation/ITI and first-two orientation balancing are documented adaptations; no exact original retinal geometry is claimed. Software durations are not hardware onset measurements and fixation is not eye-tracked.

Only one eligible critical observation per independently recruited naive participant is valid. Same-ID aborted/repeated starts remain marked, but local storage/self-report cannot establish real-world naivety, detect a new ID or machine, or survive manual deletion. Synthetic diagnostics prove software branches only. Missing answers remain unknown; correct forced choices without reported noticing are not equated with conscious seeing. A group study needs a declared missing-data and control-success policy. This implementation has no human validation, norms or clinical interpretation.

Control-question wording adaptation: only the critical awareness question refers to something absent on earlier trials. Divided/full controls ask whether another shape was seen, without novelty wording, because the square is now familiar. Both versions are config-defined and preserve yes/no semantics.

## Web companion

Canonical Python task:T000136-inattentional-blindness-task. See transfer_node.md. Use the shared runner with ?task=H000136&participant=1; prepare this neutral view before inviting a naive participant. Add diagnostic=1 only for software QA; all9trials/timings remain unchanged. The research launcher/catalog/source pages disclose the paradigm and are unsuitable for recruitment. Participant mode hides only the researcher launcher; safety/exit/export controls remain.

This source-only repository imports the shared psyflow-web runtime. All32canonicalPNG assets decode before registration/Start. IndexedDB atomically records same-ID starts; storage failure refuses Start, repeated/aborted starts remain ineligible, and diagnostics do not touch history. Export JSON/CSV reduced rows and rawJSONL through the runtime buttons. The final reduced row contains session_summary, with the same values as the native summary JSON. Task tests require Vitest and fake-indexeddb6.2.4 in an external validation environment; neither is bundled into the task. All browser results are software timing, not displayhardware measurements.

Notify workflow requires TASKBEACON_ORG_DISPATCH_TOKEN with Contents:Read and write on TaskBeacon/psyflow-web; Actions:write alone is insufficient; organization approval may be needed. Pushes notify the shared runner; repository publication is distinct from live deployment.

Data-field warning: framework phase fields such as `cross_report_hit`, `awareness_hit`, `identification_hit` and `localization_hit` indicate accepted responses, not task-specific accuracy or awareness. Analyze `primary_correct`, `awareness_report`, `identity_correct`, `location_correct` and the documented null-preserving `operational_noticing` instead.
