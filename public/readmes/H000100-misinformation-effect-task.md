# Misinformation Effect Task (Web)

Browser-native companion to the canonical `T000100-misinformation-effect-task`. Each trial presents a self-authored three-frame event, a consistent or misleading postevent report, and a two-choice recognition test that explicitly asks participants to answer from the original event.

## Alignment

- The same 12 Chinese text micro-events are used; no classic crash film or copyrighted stimulus is copied.
- Every event appears once, with six consistent and six misleading reports per session.
- Within each condition, the original detail appears equally often on the F/left and J/right sides.
- Original frames last 2.2 s each, the report lasts 4.5 s, retention lasts 0.75 s, the source test allows 6.0 s, and the ITI lasts 0.5 s.
- The source reminder, keys, trigger meanings, no-feedback policy, trial fields, and condition-specific outcomes match the Python task.
- Reduced output contains one row per event, including original-detail accuracy, alternative selection, misinformation acceptance, consistent-condition alternative error, timeout, and RT.

## Primary measure

The misinformation effect is represented by alternative-detail selection after misleading reports relative to alternative-detail selection after consistent reports. The task also reports original-detail accuracy and the condition-specific error rates; it is not a clinical memory assessment.

## Randomization

The browser receives the registered participant ID before compiling trials. It uses that ID with `plan_seed` to make a reproducible event order while preserving the same balance constraints as the canonical task. Concrete randomized sequences need not match PsychoPy byte-for-byte because the runners use different seed mixers.

## Shared-runner refresh

`.github/workflows/notify-psyflow-web.yml` sends a `repository_dispatch` after pushes to `main`. It expects `TASKBEACON_ORG_DISPATCH_TOKEN`; a fine-grained token needs access to `TaskBeacon/psyflow-web` with **Contents: Read and write**.
