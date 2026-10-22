# Verbal Fluency

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Verbal Fluency |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000091-verbal-fluency |
| Short Description | Mandarin semantic and phonological fluency with researcher-confirmed oral response timing |
| Created By | TaskBeacon |
| Date Updated | 2026-08-23 |
| PsyFlow Version | local TaskBeacon checkout |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavioral; overt speech with researcher key registration |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (configured; voice playback disabled) |

## 1. Task Overview

This implementation measures lexical retrieval and executive search under semantic and phonological constraints. A participant produces Mandarin words aloud for five one-minute cues; a researcher presses Space once for each valid, unique, on-cue response. The task stores response counts, timestamps, inter-response intervals, and four 15-second epoch counts without applying opaque automatic speech recognition.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---:|---|
| 1 | Load the selected human, QA, or simulation config; collect or synthesize participant metadata. |
| 2 | Initialize PsyFlow window, keyboard, trigger runtime, and config-driven `StimBank`. |
| 3 | Show `instruction_text` and wait for the researcher to press Space. |
| 4 | Start one `fluency_block` and schedule all five condition labels sequentially with `BlockUnit.generate_conditions(order="sequential")`. |
| 5 | Run the three semantic cues, followed by the two phonological cues. |
| 6 | Save one reduced row per cue trial and show the config-formatted session summary. |

### Trial-Level Flow

| Stage | Visible content | Timing and exit rule |
|---|---|---|
| Ready | Generic `ready_prompt`; the next cue is withheld to prevent advance generation. | Researcher Space press starts the cue. |
| Generation onset | One condition-specific cue plus `generation_hint` and `researcher_hint`. | The first screen flip starts the shared 60-second deadline and sends the condition onset trigger. |
| Accepted response | The cue screen remains unchanged. | Each researcher Space press ends one response-registration unit, sends trigger 31, and records a cumulative timestamp. |
| Generation end | The cue screen remains unchanged. | No further accepted response before the remaining deadline sends timeout trigger 32 and ends the cue; an 80-response safety ceiling is logged if reached. |

### Controller Logic

| Component | Behavior |
|---|---|
| Adaptive controller | None. Cue order, duration, and response policy are fixed. |
| Response acceptance | The researcher confirms lexical validity online; the program records the confirmation but does not infer whether a spoken word is valid. |

### Other Logic

| Function | Output |
|---|---|
| `summarize_trial` | Total accepted responses, first-response latency, ordered timestamps, inter-response intervals, and counts in 0–15, 15–30, 30–45, and 45–60 second epochs. |
| `summarize_session` | Per-cue counts plus semantic and phonological totals for the final screen. |

## 3. Configuration Summary

Settings below come from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier from 101 to 999. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Size | 1280 x 720 pixels |
| Background | `#F7F8FA` |
| Fullscreen | false |
| Monitor geometry | 35.5 cm width at 60 cm distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `instruction_text` | Text | Chinese task rules and researcher response policy. |
| `ready_prompt` | Text | Generic start screen that does not reveal the upcoming cue. |
| `cue_semantic_*` | Text | Large green semantic category cue: animals, fruits/vegetables, or tools. |
| `cue_phonological_*` | Text | Large blue Mandarin syllable cue: `/bu4/` or `/da4/`, both fourth tone. |
| `generation_hint` | Text | Fixed 60-second oral-generation instruction. |
| `researcher_hint` | Text | Subordinate reminder to press Space once per accepted response. |
| `good_bye_text` | Text | Per-cue and family-total accepted-response counts. |

### d. Timing

| Phase | Duration |
|---|---|
| Ready | Until researcher Space press |
| Generation | 60.0 seconds per cue |
| Epoch bins | Four consecutive 15.0-second bins |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment onset | 1 |
| Block onset | 10 |
| Semantic animals onset | 21 |
| Semantic fruits/vegetables onset | 22 |
| Semantic tools onset | 23 |
| Phonological `/bu4/` onset | 24 |
| Phonological `/da4/` onset | 25 |
| Accepted response | 31 |
| Generation timeout | 32 |
| Block end | 90 |
| Experiment end | 99 |

## 4. Methods (for academic publication)

Participants completed five overt verbal-fluency trials in Mandarin. Before each trial, a generic readiness screen withheld the upcoming cue. Once the researcher pressed Space, the cue appeared and the 60-second response window began. Semantic trials requested exemplars from animals, fruits or vegetables, and tools. Phonological trials requested multi-character Mandarin words beginning with `/bu4/` or `/da4/` (fourth tone). The semantic trials preceded the phonological trials and the exact cue order was fixed across participants.

Participants were instructed to respond aloud as quickly as possible while continuing to search until the window closed. Proper names, repeated responses, and off-cue words were not accepted. A researcher pressed Space once for each valid, unique spoken response; each key event was timestamped relative to cue onset. This manual decision boundary preserves human lexical review and avoids unvalidated automatic Mandarin transcription. Researchers should retain a synchronized audio recording outside the task runtime and review it before final scoring.

The primary outcome was the accepted unique-response count for each cue. The runtime additionally recorded first-response latency, all later response timestamps, inter-response intervals, and response counts in four 15-second epochs. Semantic and phonological totals were computed only for the final display and did not alter subsequent trials. The task contained no adaptive controller, performance feedback, reward, or penalty.

### Run Commands

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```
