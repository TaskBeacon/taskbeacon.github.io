# Pavlovian-to-Instrumental Transfer — Web

Browser-native companion to canonical `T000093-pavlovian-to-instrumental-transfer`, implemented for the shared `psyflow-web` runner.

The port preserves the full approach/withdrawal protocol: two participant-counterbalanced macro-blocks, each containing 60 instrumental trials, 100 Pavlovian cue exposures plus 20 every-fifth cue queries, and 60 extinction transfer trials. Across both macro-blocks, the task therefore contains the same 480 logical trials as the Python source.

Instrumental and transfer actions use `SPACE` for go and a 1.5 s non-response for no-go. Instrumental feedback is deterministic (`+20` correct, `−20` incorrect); transfer feedback remains hidden. The five compound pattern-and-tone cues preserve values `+100`, `+10`, `0`, `−10`, and `−100`, with `F`/`J` higher-value queries and the same participant-dependent cue/mushroom counterbalancing.

The stage order, response windows, valid keys, trial fields, summary statistics, and condition balances match the canonical task. Web-only shell differences are limited to browser-event triggers and shared-runner registration, export, fullscreen, cursor, and force-quit behavior. No trial counts or task timings are shortened.

The notify workflow expects `TASKBEACON_ORG_DISPATCH_TOKEN` to have access to `TaskBeacon/psyflow-web` with **Contents: Read and write** permission. TaskBeacon organization approval may also be required.

## Validation

Run task-local checks from `psyflow-web`:

```powershell
npx tsc --noEmit -p ..\H000093-pavlovian-to-instrumental-transfer\tsconfig.json
taps-validate ..\H000093-pavlovian-to-instrumental-transfer --contracts-root ..\taps\contracts\v0.2.0
```

The shared manifest, production build, authoring guards, and browser hit/miss/export checks are recorded in `transfer_node.md`.
