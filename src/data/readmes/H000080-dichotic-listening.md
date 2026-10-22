# Dichotic Listening (Web)

| Field | Value |
|---|---|
| Name | Dichotic Listening |
| Task ID | `H000080` |
| Canonical Source | `T000080-dichotic-listening` |
| Variant | Browser companion |
| Version | `v0.1.0` |
| Date Updated | 2026-08-23 |
| PsyFlow Web | Shared local runtime |
| Contract | TAPS `v0.2.0` |
| Language | Chinese instructions; reference CV syllables |

## Overview

This is the browser-derived companion to the canonical Python task. It preserves the complete 36-pair Bergen consonant-vowel condition set, simultaneous stereo delivery, one-response rule, fixed trial timing, six response keys, homonym handling, and laterality-index calculation.

## Task Flow

![Task Flow](task_flow.png)

- Fixation: 500 ms.
- Dichotic stereo audio: 400 ms; the first condition token is the left channel and the second is the right channel.
- Report: 3100 ms with B/D/G/P/T/K; the first response is recorded while the stage retains its fixed duration.
- No correctness feedback is shown.

## Running in the shared runner

From `psyflow-web`:

```bash
npm run dev
```

Then open the task with `?task=H000080-dichotic-listening`.

## Outputs

The shared runner exports one reduced row per logical trial plus raw stage/event data. Primary fields include condition and channel syllables, homonym status, response key and syllable, reaction time, left/right match flags, reported ear, valid-report status, outcome, and laterality-exclusion status.

See [transfer_node.md](transfer_node.md) for the canonical-to-web alignment audit.
