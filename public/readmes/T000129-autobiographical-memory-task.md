# Autobiographical Memory Task

| Field | Value |
|---|---|
| Name | Autobiographical Memory Task / 自传体记忆任务 |
| Version |0.1.0 |
| URL / Repository |https://github.com/TaskBeacon/T000129-autobiographical-memory-task |
| Short Description |Chinese typed adaptation with private local acquisition and human specificity coding |
| Created By |TaskBeacon |
| Date Updated |2026-08-31 |
| PsyFlow Version |43e52fb or newer verified Unicode textbox fix |
| PsychoPy Version |2025.2.4 |
| Modality |behavior |
| Language |Chinese (SimHei) |
| Voice Name |zh-CN-YunyangNeural (disabled) |

## 1. Task Overview

Recall one personally experienced event for each emotional cue. This typed Chinese adaptation follows the original10-cue AMT structure described in Williams's author manual. It is not an exact1986 replication or a validated clinical instrument. No automatic content score, diagnosis, or normative interpretation is provided.

**Privacy:** emotional cues can evoke upsetting experiences. Participants may use ordinary events, skip with F8 without penalty, or stop. Only a six-digit pseudonym is requested; instructions prohibit names, contact details and identifying narrative details. Responses stay local. Outputs/logs contain sensitive text and must not be committed or uploaded. Browser downloads are voluntary. F8 removes current text from task exports. No audio/video/keystroke transcript or automatic network upload is used.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Block-Level Flow | Implementation |
|---|---|
| Orientation |Privacy warning then instructions, space to continue |
| Practice |Car/tree translations, two trials with generic self-check; not scored |
| Formal |10 distinct cue words once, fixed alternating valence order |
| Finish |Local save; web additionally user-clicked downloads |

### Trial-Level Flow

| Trial-Level Flow | Timing and behavior |
|---|---|
| ready |Untimed rest; space begins retrieval |
| retrieval |60s max, cue; space marks memory ready, F8 skips, timeout bypasses typing |
| entry |Only if ready; fresh blank editor; separate60s; F2 submits, Return edits, F8 deletes |
| saved |0.6s neutral acknowledgement |
| practice_check |Practice only; generic specificity reminder, space continues |

### Controller Logic

| Controller Logic | Value |
|---|---|
| Adaptive control |None |
| Scheduling |Native BlockUnit sequential configured labels |

| Other Logic | Meaning |
|---|---|
| Acquisition |submitted, submitted_empty, entry_timeout_text, entry_timeout_empty, retrieval_timeout, skipped remain distinct |
| Coding |nonblank retained text pending; memory_type and specificity_score null |
| Latency |retrieval_ready_rt_s = cue-to-self-declared-readiness; entry_submit_rt_s = entry-onset-to-F2; neither is original spoken onset latency |

## 3. Configuration Summary

Settings are from `config/config.yaml`. Run `python main.py human`; QA/sim modes use separate configs with four formal synthetic trials and short0.7s windows for plumbing only. Native user data are saved under outputs/human.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id |Six-digit numeric pseudonym, no personal/contact fields |

### b. Window Settings

| Window Parameter | Value |
|---|---|
| size / units |1280×800 pixels |
| color / font |white / SimHei |
| fullscreen |false |

### c. Stimuli

| Stimuli | Type | Description |
|---|---|---|
| privacy / instruction |text |warning, examples and key rules |
| cue / entry_cue |text |快乐、遗憾、安全、生气、感兴趣、笨拙、成功、受伤害、惊喜、孤独 |
| editor |textbox |1050×280 blank buffer,26px |
| hints |text |spatially separated instructions |
| saved / practice_check / good_bye |text |no content scoring |

### d. Timing

| Timing Phase | Duration |
|---|---|
| retrieval |60s max |
| entry |60s max, separate from retrieval |
| acknowledgement |0.6s |
| other screens |until space |

### e. Triggers

| Trigger Event | Code |
|---|---|
| experiment start/end |1/99 |
| retrieval onset/ready/skip/timeout |20/21/22/23 |
| entry onset/submit/skip/timeout |30/31/32/33 |
| acknowledgement |40 |

Mock behavioral triggers only. Timeout markers require no registered valid key; they are not unconditional offsets. RT uses native response clocks, not whole-second global timestamps. There is no physical timing calibration claim.

## 4. Methods (for academic publication)

This implementation presents two neutral practice cues followed by ten emotional cues. The supplied Williams & Broadbent1986 Oxford record was reviewed first but did not provide the full methods. Williams's2005 author scoring manual, reproduced in Broxon2018 AppendixC pp55–57, supplies the original fixed cue sequence and60s retrieval window. A later primary empirical report (DOI10.1080/09658210903387513) describes the oral administration and verbal onset timing. The current Chinese translations and visual typed administration are adaptations. Their cultural equivalence and psychometric properties have not been established.

Participants view a cue and press space when an event is in mind, then describe it in a separate60s interval. This self-reported readiness latency is not an objective verification of retrieval and is not the original latency to spoken response or to a specific memory. Writing time is independently recorded only on F2 submission; timeouts have no imputed RT. Responses remain available for trained human coding as specific, categorical, extended, semantic nonmemory or uncodable. The task does not probe ambiguous answers or certify practice comprehension. Coders judge the final unprompted written buffer, not an unobserved first memory or utterance.

See references/coding_manual.md and scripts/coding.py for blinded packets, strict validation, adjudication and aggregation. Practice and voluntary skips are excluded from attempted denominators; omissions stay in them. Pending, disputed and uncodable responses block a complete attempted-item specificity proportion. All supplied fixtures and validation sessions are synthetic software checks, not a participant pilot, inter-rater reliability study or clinical norm. Native Unicode backend events are tested separately; no claim of OS IME certification is made.

The editor supports line breaks and wrapping; Return edits, F2 submits. task.entry_multiline=true records native TextBox2 behavior and opts into the shared browser textarea through the public StimBank API. Validation artifacts document the initial single-line defect and subsequent correction separately.
