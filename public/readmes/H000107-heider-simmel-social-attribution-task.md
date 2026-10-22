# Heider–Simmel Social Attribution Task — Web

| Field | Value |
|---|---|
| Task ID | H000107 |
| Canonical task | T000107 |
| Variant | HTML / browser |
| Version | 0.1.0 |
| Language | Chinese |
| Runtime | `psyflow-web` |

This is the browser companion to canonical `T000107-heider-simmel-social-attribution-task`. It presents six newly generated silent geometric animations: two socially contingent, two mechanically constrained, and two independent random-motion clips.

Each clip is shown twice for 15 seconds with a 0.5-second fixation between playbacks. Participants then type an open narrative (60 seconds maximum; Return submits) before seeing the three family labels and choosing `1=社会互动`, `2=机械运动`, or `3=随机运动` within 8 seconds. No feedback is shown.

The shared web runtime records one reduced row per clip, including condition, motion family, movie ID, narrative text and counts, response times, timeouts, classification, correctness, and outcome. The original asset provenance and hashes are documented under `assets/animations/manifest.json`; cross-runtime decisions are documented in `transfer_node.md`.

## Local validation

From the sibling `psyflow-web` repository, generate the task manifest and run TypeScript, unit, and browser checks. The task must load as `H000107-heider-simmel-social-attribution-task` without task-local JavaScript runtime dependencies.
