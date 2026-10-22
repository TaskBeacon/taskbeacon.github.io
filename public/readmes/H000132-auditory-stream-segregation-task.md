# Auditory Stream Segregation Task — Web

| Field | Value |
|---|---|
| Name | Auditory Stream Segregation Task / 听觉流分离 |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/H000132-auditory-stream-segregation-task |
| Short Description | ABA-family subjective stream grouping, source-only shared-runner port |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | psyflow-web 08041fd or newer, TAPS v0.2.0 |
| Modality | behavior / audio |
| Language | Chinese / SimHei |

## 1. Task Overview
Canonical [T000132](https://github.com/TaskBeacon/T000132-auditory-stream-segregation-task) is an ABA-family adaptation, not a reproduction of Bregman and Campbell's 1971 six-tone order experiment. Participants report one or two streams at the end of original pure-tone sequences. Frequency gap, rate and exposure duration are crossed. There is no objective correct answer, hearing norm, clinical interpretation, continuous switch record or fitted individual threshold.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Procedure |
|---|---|
| Preparation | All13WAVs fetched and decoded through public strict preload before Start is mounted; failure rejects readiness |
| Start | Shared user-gesture Start unlocks audio; numeric subject101–999; instructions |
| Sound check | Space starts2s sample;1 heard comfortably /2 adjust and repeat /3 or60s timeout stop;max3 attempts |
| Blocks | Two blocks×12 balanced conditions, exact Python-compatible seeded order132031+block index |
| Break/end | Self-paced space between blocks; after end download reducedJSON/CSV and rawJSONL |

### Trial-Level Flow

| Phase | Timing | Content |
|---|---|---|
| fixation | 4s | Silent centered+ |
| listening | 4or12s | Centered+ and ABA- waveform; no accepted response |
| report | 5s max | Endpoint stream question;1 one stream /2 two streams |
| saved | 0.4s | Neutral saved text, no correctness feedback |

### Controller Logic
No adaptive controller. Missing reports remain null and are excluded from valid-report denominators. Summary gives total/valid/missing/two counts and two-stream fraction by condition. Readiness failure prevents all experimental trials and reduced rows. Raw startup rows preserve attempted confirmations; native readiness uses a separate sidecar. The generic `report_hit` denotes a valid key, not perceptual accuracy.

## 3. Configuration Summary
The public config is byte-identical to T. Public default remains the full24-trial protocol. Source-only task: use [the shared runner](https://taskbeacon.github.io/psyflow-web/?task=H000132-auditory-stream-segregation-task), not a per-task app shell.

| Parameter | Value |
|---|---|
| Subject | Integer101–999, no name requested |
| Display | Logical1280×800, white, Chinese SimHei; shared shell controls fullscreen/abort |
| Frequency | B1000Hz; A=1000/2^(gap/12); gap2/6/12 semitones |
| Tone | 100ms including10ms raised-cosine onset/offset ramps |
| Fast |125ms slots; A at0, B125, A250, silence375; cycle500ms |
| Slow |250ms slots; A at0, B250, A500, silence750; cycle1000ms |
| Audio file | Original stereoPCM16,48000Hz, identical channels; digital peak0.12, playback gain1 |
| Audio gaps | Fast25/25/150ms; slow150/150/400ms |
| Duration |4or12s integer cycles; final silence included |
| Triggers | Symbolic mock1/99 start/end,10 fixation,20 listen,30 report,31/32 responses,39 missing,40 saved |

Digital amplitude is not dB SPL. Users must choose a comfortable low starting level with ordinary headphones and keep it fixed. File/sample verification does not establish ear-level loudness, latency or human hearing. Preload guarantees decoded assets, not autoplay permission or physical acoustic onset. Stage onsets are software timestamps. See `transfer_note.md` for exact port boundaries.

## 4. Methods (for academic publication)
Participants listen to diotic ABA- tone sequences and report their percept just before each sequence ends. The complete factorial set combines three frequency separations with two presentation rates and two exposure lengths, once per block in two seeded randomized blocks. A four-second silent fixation precedes each sequence to reduce carryover. Responses are subjective and unscored; the5s deadline is an explicit adaptation.

The stream-grouping rationale comes from Bregman and Campbell1971, while ABA timing and endpoint reporting follow the family used by Dykstra et al.2011. Exposure and separation factors are motivated by Bregman1978. Selected gaps, slower rate,4/12s exposures, trial count, Chinese instructions, response deadline and digital level are documented adaptations. Duration comparisons are indirect endpoint comparisons, not continuous buildup measurements. This software has no established clinical validity or normative interpretation.

## Integration and validation
Requires psyflow-web08041fd6f0824118e70fcf74faefc1b79e6f6d44 or newer for public strict audio preloading. The notify workflow sends html-task-updated to TaskBeacon/psyflow-web. Its configured organization dispatch token needs Contents:Read and write for that repository; Actions:write alone is insufficient, and organization approval may be required. Repository publication and live deployments are distinct.

Archived validation responses are synthetic software tests, not human percepts. The normal public configuration has no injected fixture material; its `synthetic_fixture=false` does not make automation-generated test responses real observations. Validation filenames and provenance identify them as synthetic. No participant data or credentials are included.

Actual production-browser validation completed24trials plus a separate rejected-readiness run.28scoped tests, source-inclusive TypeScript, productionbuild,177export checks and82public-audio-observation checks passed.13buffers decoded before Start with no playback; production WAV hashes equal native. Software stop sometimes cut up to10.67ms of encoded final silence, with all audible samples covered. These observations do not establish acoustic onset or ear-level loudness. See [browser QA](validation/browser_qa.md) and retained [initial failures](validation/initial_failures.md).
