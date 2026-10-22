# Reicher-Wheeler Word Superiority Task (Web)

Browser-native companion to the canonical PsychoPy task, [`T000104-word-superiority-effect-task`](https://github.com/TaskBeacon/T000104-word-superiority-effect-task). The task measures masked two-alternative letter identification across word, pronounceable-pseudoword, illegal-string, and isolated-letter contexts. It is not a lexical-decision task.

## Task contract

- Two blocks of 32 trials; each block contains all 4 contexts × 4 target positions × 2 displayed variants exactly once.
- Trial flow: fixation 500 ms → display 60 ms → patterned mask 200 ms → F/J letter probe up to 2500 ms → ITI 500 ms.
- The tested position is marked only after the mask. F selects the left alternative and J the right; alternative sides reverse between blocks.
- No trial feedback. Reduced output contains one logical row per letter-identification trial.

## Shared-runner integration

This repository deliberately contains no task-local `node_modules`, Vite app, or compiled bundle. The shared [`TaskBeacon/psyflow-web`](https://github.com/TaskBeacon/psyflow-web) runner discovers `main.ts`, loads `config/config.yaml`, and owns registration, execution, browser-event triggers, data export, and routing.

For local development, place this repository beside `psyflow-web`, run the shared runner, and open:

```text
http://localhost:5173/tasks/H000104-word-superiority-effect-task/
```

## Python/Web alignment

Condition labels, item matrices, block balance, timings, response semantics, scoring, and reduced trial factors are exact ports of the stable Python source. The browser uses native DOM text and rotated rectangle fragments instead of PsychoPy glyph and `visual.Line` objects; configured visual-angle geometry and the deterministic per-trial mask seed are preserved. See [`transfer_node.md`](transfer_node.md) for the audit matrix.

## Integration secret

`.github/workflows/notify-psyflow-web.yml` dispatches a shared-runner refresh on pushes to `main`. Configure `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`; without it, the workflow exits successfully without dispatching.
