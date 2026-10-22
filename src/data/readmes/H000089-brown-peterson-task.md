# Brown-Peterson Task (Web)

| Metadata | Value |
|---|---|
| Task ID | `H000089` |
| Canonical source | `T000089-brown-peterson-task` |
| Version | `v0.1.0` |
| Runtime | `psyflow-web` / TAPS `v0.2.0` |
| Language | Chinese interface; Latin consonant materials |

## Overview

This source-only browser task ports the canonical Brown-Peterson procedure. Each trial displays a consonant trigram, a three-digit starting number, and a decrement of three or four for 1.5 seconds. The participant then counts backward aloud to a 2-Hz metronome for 3, 6, 9, 12, 15, or 18 seconds before a red cue starts serial recall of the three consonants under one shared 15-second deadline.

The full task contains two practice trials and 48 scored trials in eight blocks. Every scored block contains all six retention intervals once, decrement is balanced within blocks and crossed equally with interval, all materials are unique, and adjacent trigrams share no letters. The primary reduced fields are exact trigram recall, three serial-position scores, total letters correct, recall latency, completion/timeout, interval, decrement, trigram, and starting number.

## Shared runner

The task is discovered by the sibling `psyflow-web` runner and launches at:

```text
/?task=H000089-brown-peterson-task
```

From `psyflow-web`, run the manifest generator, typecheck, tests, or production build. This repository intentionally contains no task-local app shell, build configuration, `node_modules`, or `dist` output.

## Update notification

`.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` to `TaskBeacon/psyflow-web` after pushes to `main`. The organization secret `TASKBEACON_ORG_DISPATCH_TOKEN` must be able to access `TaskBeacon/psyflow-web` with **Contents: Read and write**.

## Alignment

See [transfer_node.md](transfer_node.md) for the canonical-to-web procedure, parameter, data, and intentional-difference audit.

