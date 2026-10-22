# Retrieval-Induced Forgetting (Web)

| Field | Value |
|---|---|
| Task ID | H000090 |
| Canonical source | T000090-retrieval-induced-forgetting |
| Version | v0.1.0 |
| Runtime | psyflow-web |
| Language | Chinese |
| Modality | Keyboard and Chinese text entry |

## Overview

Browser-native companion to the canonical PsychoPy implementation. Participants study 48 Chinese category-exemplar pairs, practice retrieval of half the items from half the categories across three rounds, complete a 20-minute arithmetic distractor, then recall all 48 items from category and first-character cues.

## Task Flow

![Task Flow](task_flow.png)

The final test preserves the analysis conditions Rp+ (practiced items), Rp- (unpracticed competitors from practiced categories), and Nrp (items from unpracticed categories). Rp-/Nrp trials precede Rp+ trials to reduce output interference.

## Run in the shared runner

The source-only task is discovered by `psyflow-web`. From the sibling `psyflow-web` repository, run the normal development server and select `H000090-retrieval-induced-forgetting` from the task manifest.

## Response and data contract

- Retrieval practice and final recall use an editable browser textbox. Participants type the complete Chinese exemplar and press Enter within the configured response window.
- Arithmetic judgments use F for odd and J for even while the screen remains visible for the full 10-second interval.
- Each reduced presentation row records stage, condition and item identities, response key/text, RT, correctness, and timeout status.
- Session export is handled by the shared runner shell.

## Integration

`.github/workflows/notify-psyflow-web.yml` dispatches `html-task-updated` after pushes to `main`. The workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained PAT needs access to `TaskBeacon/psyflow-web` with `Contents: Read and write`.
