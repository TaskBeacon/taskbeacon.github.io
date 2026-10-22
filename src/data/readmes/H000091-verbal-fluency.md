# Verbal Fluency (Web)

Browser-native companion to `T000091-verbal-fluency`. The Python task is canonical. This source-only port preserves the five Chinese cue trials, their fixed order, the shared 60-second generation window, researcher Space-key registration, and response-count summaries.

## Alignment

- Identity: `H000091` pairs with canonical `T000091` and keeps slug `verbal-fluency`.
- Conditions: semantic `动物`, `水果或蔬菜`, and `工具`, followed by syllable cues `/bu4/` and `/da4/`.
- Procedure: instruction -> cue-free ready screen -> cue plus repeated response registration for 60 seconds -> next trial.
- Response: the researcher presses Space once for each valid, unique spoken response; the participant does not press keys.
- Data: total count, first latency, response timestamps, inter-response intervals, four 15-second epoch counts, and session totals use the canonical field names.
- Feedback: no online correctness feedback or visible word list is provided.

## Intentional browser differences

- Registration, fullscreen request, cursor policy, force quit, and downloads belong to the shared runner.
- The browser re-renders the same cue after each accepted Space press while preserving one shared 60-second deadline; this mirrors the canonical repeated `StimUnit` capture loop.
- Hardware trigger delivery is absent; trigger codes remain in compiled stage metadata for audit.

## Run URL

`https://taskbeacon.github.io/psyflow-web/?task=H000091-verbal-fluency`

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends `html-task-updated` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; the fine-grained token must grant `TaskBeacon/psyflow-web` **Contents: Read and write**, subject to organization approval.
