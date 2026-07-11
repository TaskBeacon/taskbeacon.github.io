# Attentional Blink Task (Web)

Browser-native companion to `T000058-attentional-blink`, powered by the shared `psyflow-web` runner.

## Alignment

- Same slug, title, four condition meanings, target/distractor pools, lag semantics, trial phases, timing, valid keys, zero-for-absence rule, and conditional T2 scoring.
- The browser task preserves the canonical 34 practice trials and four 102-trial scored blocks.
- Browser rendering uses pixel layout values corresponding to the local visual hierarchy; acquisition hardware and serial triggers are omitted.

## Trial Flow

`fixation (1780 ms) -> RSVP items (50 ms + 34 ms blank) -> post-stream blank (1000 ms) -> T1 report -> T2/absence report -> optional practice feedback -> ITI (200 ms)`

## Data

Reduced output preserves one logical row per RSVP trial with `condition`, `interval`, `lag`, `t2_present`, target identities, ordered responses, RTs, timeout flags, T1/T2 correctness, `t2_correct_given_t1`, and overall response fields.

## Runtime

Run through the shared TaskBeacon runner:

```text
https://taskbeacon.github.io/psyflow-web/?task=H000058-attentional-blink
```

The source repository intentionally contains no task-local frontend shell, dependencies, or build output.
