# Method-of-Loci Context Binding Task

| Field | Value |
|---|---|
| Name | Method-of-Loci Context Binding Task |
| Task ID | T000118 |
| Version | v0.1.0 |
| Date Updated | 2026-08-29 |
| Repository | https://github.com/TaskBeacon/T000118-method-of-loci-context-binding-task |
| Modality | Behavioral |
| Language | Chinese instructions with source-aligned English item words |
| Runtime | PsychoPy / PsyFlow |
| PsyFlow Version | 0.2.0 |
| PsychoPy Version | 2025.1.1 |
| Primary source | [Huang et al., Nature Communications (2026)](https://www.nature.com/articles/s41467-026-71428-6) |

## 1. Task Overview

This task measures schema-supported item-context binding and ordered episodic recall with the Method of Loci. Participants create or confirm an ordered route of familiar loci, bind one concrete noun to each successive locus through an interactive mental image, then revisit the loci in order to retrieve the nouns.

The implementation preserves the source study's 20-item standardized length, released 20-word W4D2 item set, 12-second word presentation, 1-second post-word fixation, self-paced ordered retrieval, and serial-order scoring principle. It adapts spoken retrieval to typed word and association reports so the task can run without microphone or transcription infrastructure.

Primary outcomes are strict locus-item recall accuracy and paper-aligned serial-order recall. The task also exports omissions, intrusions, duplicate responses, response times, and association-report completion.

Run locally:

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Block | Participant experience | Output |
|---|---|---|
| Locus setup | Confirm or replace 20 prefilled familiar home-route loci in a fixed order. | Ordered participant-specific locus list. |
| Route review | Review the complete two-column route and mentally traverse it once. | No scored response. |
| Encoding | For each locus position, view one English concrete noun for 12 s and imagine a vivid interaction at the internally retrieved locus; view fixation for 1 s. | Pair ID, locus, word, animacy, phase timing. |
| Retrieval | Revisit each locus in the original order, type the associated word, then describe the imagined interaction. | One reduced row per locus-item pair plus stage-level audit data. |
| Summary | View strict and serial-order recall totals. | JSON summary and CSV outputs. |

### Trial-Level Flow

| Trial type | Ordered phases | Response rule |
|---|---|---|
| Locus setup | Locus heading -> editable prefilled locus -> submit | Return; 60 s safety ceiling. |
| Encoding pair | Ordinal + word + imagery reminder (12 s) -> fixation (1 s) | No response. |
| Retrieval pair | Locus-cued word entry -> interaction description | Return submits each textbox; 60 s ceiling per screen. |

### Controller Logic

There is no adaptive controller. `src/utils.py` creates explicit ordered `TrialSpec` schedules because participant-entered loci must be carried from setup into both encoding and retrieval. Item identity, animacy, locus position, and target word are fixed before each call to `run_trial()`; trial code does not generate hidden factors.

### Other Logic

Strict recall requires the normalized response to match the target word at that locus. The paper-aligned sequence score removes duplicate recognized items and checks whether each recognized target's original encoding position increases relative to the preceding recognized response. Both scores are retained because a participant may remember list order while assigning an item to the wrong locus.

## 3. Configuration Summary

### a. Subject Info

| Field | Type | Purpose |
|---|---|---|
| `subject_id` | Three-digit integer | Participant identifier. |
| `age` | Integer, 18-80 | Demographic descriptor. |
| `gender` | Choice | Demographic descriptor. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Resolution | 1280 x 720 px |
| Background | `#F5F4F0` |
| Fullscreen | Off by default |
| Monitor geometry | 35.5 cm width, 60 cm viewing distance |

### c. Stimuli

| Stimulus family | Content and layout |
|---|---|
| Locus setup | Chinese ordinal/prompt, centered editable textbox, separated submit hint. |
| Route review | Two columns of numbered locus names with a centered heading. |
| Encoding | Small locus ordinal, large centered English noun, concise Chinese imagery reminder. |
| Retrieval | Locus cue above a word textbox, followed by a separate multiline association textbox. |
| Fixation | Centered `+`. |

All Chinese text uses SimHei and English target words use Arial. The item set is stored in `assets/materials.yaml`; no external image, sound, or movie asset is required.

### d. Timing

| Parameter | Human value | Evidence status |
|---|---:|---|
| Encoding word | 12.0 s | Direct from Huang et al. Methods. |
| Post-word fixation | 1.0 s | Direct from Huang et al. Methods. |
| Locus setup | 60.0 s maximum | Inferred deployment bound. |
| Word recall | 60.0 s maximum | Adapted finite bound for self-paced retrieval. |
| Association report | 60.0 s maximum | Adapted finite bound for self-paced retrieval. |

QA and simulation profiles use four pairs and compressed verification-only durations; the human profile above remains canonical.

### e. Triggers

| Range | Events |
|---|---|
| 1-2 | Experiment onset/end. |
| 10-19 | Block onset/end. |
| 20-22 | Locus setup onset/submit/timeout. |
| 30-31 | Encoding word/fixation onset. |
| 40-42 | Recall onset/submit/timeout. |
| 50-52 | Association onset/submit/timeout. |
| 60 | Summary onset. |

### f. Adaptive Controller

Not applicable. Schedules are deterministic and ordered.

## 4. Methods (for academic publication)

Participants completed a computerized Method-of-Loci task implemented in PsychoPy/PsyFlow. They first confirmed an ordered route of 20 familiar loci, replacing any prefilled suggestion that was not personally familiar. The complete route was then reviewed once. During encoding, 20 concrete English nouns from the source study's released W4D2 materials were shown in fixed order for 12 s each. Participants were instructed to advance internally to the next locus and form a vivid, meaningful interaction between the item and locus. Each word was followed by a 1-s fixation cross.

Retrieval proceeded through the loci in the original order. At each locus, participants typed the associated English word and then entered a brief description of the imagined locus-item interaction. Each typed screen was self-paced up to a 60-s deployment ceiling. Strict recall was scored by normalized target identity at the correct locus. A second ordered-recall measure followed the source paper's logic by mapping non-repeated recognized words to their encoding serial positions and assessing increasing serial order. Stage-level audit data and one reduced row per logical locus-item pair were saved.

The source study used multiweek Method-of-Loci training, internally generated loci during fMRI encoding, and spoken retrieval. The present standalone behavioral adaptation combines locus setup, encoding, and retrieval in one session and uses typed responses; it therefore measures immediate context binding and ordered recall rather than training-related neural change.

## Data Outputs

| File | Granularity |
|---|---|
| `*_trace.csv` | One row per logical locus-item pair. |
| `*_trace_stages.csv` | Setup, encoding, and retrieval trial records with phase-prefixed fields. |
| `*_trace_summary.json` | Aggregate recall, error-category, and association-report metrics. |
| `*_settings.json` | Resolved runtime configuration and subject metadata. |
