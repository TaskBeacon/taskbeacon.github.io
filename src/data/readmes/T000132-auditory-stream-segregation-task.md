# Auditory Stream Segregation Task

| Field | Value |
|---|---|
| Name | Auditory Stream Segregation Task / 听觉流分离 |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000132-auditory-stream-segregation-task |
| Short Description | ABA-family pure-tone stream grouping with frequency, rate and exposure manipulations |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | 43e52fbfb5900e894d51ee7551cae971bb01f34e; TAPS v0.2.0 |
| PsychoPy Version | 2025.2.4 |
| Modality | behavior / audio |
| Language | Chinese, SimHei |
| Voice Name | zh-CN-YunyangNeural (disabled) |

## 1. Task Overview
This is an ABA-family adaptation: participants hear alternating low/high pure tones and report one or two perceived streams at the end of each sequence. It is not a replication of Bregman and Campbell's 1971 six-tone order-report experiment. Three frequency separations, two rates, and two exposure lengths are crossed. There is no objectively correct response or individual hearing norm. Endpoint duration comparisons are indirect evidence about buildup, not continuous perceptual-switch records. The small default sample does not yield a reliable individual segregation threshold.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Procedure |
|---|---|
| Setup | Numeric subject ID, instruction, ordinary headphones at comfortable low starting volume |
| Readiness | Space initiates a 2s sample. 1=heard comfortably; 2=adjust and repeat; 3/60s timeout=stop. Maximum three attempts; no formal trials without confirmation |
| Blocks | Two blocks, each all 12 conditions once, BlockUnit equal weights; seed 132031+block index |
| Break | Self-paced space between blocks, headphone/volume setting unchanged |
| End | Save one row per logical trial, summary and separate readiness JSON; stop branch saves no experimental responses |

### Trial-Level Flow

| Phase | Duration | Stimulus / response |
|---|---|---|
| fixation | 4 s | Center +, silence to reduce carryover |
| listening | 4 or 12 s | Center + with original ABA- WAV; no response accepted |
| report | up to 5 s | Chinese question about the percept just before sound ended; 1=one, 2=two |
| saved | 0.4 s | Neutral confirmation, no correctness feedback |

### Controller Logic

| Function | Rule |
|---|---|
| Adaptive controller | None; full-factorial fixed conditions |
| Missing response | null stream count, excluded from valid-report fraction denominator |
| Summary | Total, valid, missing, two-stream count and valid two-stream fraction per condition |
| Audio | Entire sample-timed train precompiled; no per-tone screen-loop scheduling |

## 3. Configuration Summary
Settings are from `config/config.yaml`. Run `python main.py human`, `python main.py qa --config config/config_qa.yaml`, or `python main.py sim --config config/config_sampler_sim.yaml` from the repository root. Install compatible PsychoPy, PsyFlow, numpy, pandas and PyYAML. QA and simulations use synthetic identity and fewer trials, without shortening any audio/stage timing.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Integer 101–999; no name requested |

### b. Window Settings

| Parameter | Value |
|---|---|
| Window | 1280×800 px, white, windowed; SimHei |
| Geometry fields | 35.5cm width/60cm distance are display defaults only, not auditory calibration |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction/readiness | text | Explicit multiline Chinese |
| fixation | text | Center + |
| condition sound | sound | Identical stereo channels, 48000-Hz PCM16 |
| report_prompt | text | One/two stream subjective endpoint report |
| saved/break/end | text | Neutral flow information |

### d. Timing

| Phase | Duration |
|---|---|
| Tone / ramp | 100 ms including 10 ms raised-cosine onset and offset ramps |
| Fast slots | 125 ms: A at0, B at125, A at250, missing slot375; cycle500 ms |
| Slow slots | 250 ms: A at0, B at250, A at500, missing slot750; cycle1000 ms |
| Fast/slow silent gaps | 25/25/150 ms or150/150/400 ms |
| Exposure | 4 or12 s, integer cycles, final silence included |
| Frequencies | B1000 Hz; A=1000/2^(gap/12), gap2/6/12 semitones |
| Level | Peak0.12 digital full scale, sound gain1.0; no dB SPL claim |
| Pre-sequence silence / report / saved | 4 s /5 s maximum /0.4 s |

### e. Triggers

| Event | Code |
|---|---|
| experiment start/end | 1 /99 |
| fixation/listening | 10 /20 |
| report onset/one/two/missing | 30 /31 /32 /39 |
| saved | 40 |

The generic `report_hit` / `report_correct_keys` framework fields indicate a registered valid key only; both keys are valid and neither is a correct percept. Analyze `stream_count`, `two_stream`, and `missing_response`, never interpret `hit` as perceptual accuracy.

All timing evidence is software timing. Native flip timestamps are not acoustic hardware onsets. WAV sampling can verify tone/frequency/silence parameters but cannot establish soundcard/headphone latency or ear-level SPL. Readiness is a participant confirmation, not a hardware test.

## 4. Methods (for academic publication)
Participants wear ordinary headphones in a quiet environment and confirm a sample is audible at a comfortable volume before proceeding. On each trial, a four-second silent fixation is followed by a diotic ABA- pure-tone sequence, then a five-second opportunity to report the percept at sequence end. Missing reports remain missing; no response is scored as correct. Two randomized blocks contain one repetition each of 12 factorial conditions. Chinese instruction and key assignments are identical across conditions.

The 1971 classic study provides the perceptual-grouping rationale but used six-tone order judgments. The present stimulus construction instead follows the ABA and endpoint-report family described by Dykstra et al. (2011), with original synthesized sounds. Fixed B frequency, 100-ms tones and 10-ms ramps, and the faster125-ms slot timing follow that method; selected gaps, slower rate, 4/12-second durations, trial count, response deadline, language, and digital level are documented adaptations. Bregman's cumulative-streaming study motivates the exposure and silent-separation factors. There is no adaptive threshold estimator. No psychophysical effect, clinical validity, hearing norm, acoustic calibration or continuous switch timing has been established by software validation.

See `references/task_logic_audit.md`, parameter/stimulus mappings and source links for the exact evidence/adaptation boundary. `scripts/generate_audio.py` reproduces the assets, with hashes/sample events in `assets/manifest.json`. Synthetic validation data are identified under `validation/`; they are not participant observations.
