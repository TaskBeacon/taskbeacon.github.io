# Corsi Block-Tapping Task (Web)

Browser-native companion to `T000060-corsi-block-tapping-task`, powered by the shared `psyflow-web` runner.

## Alignment

- Same nine fixed blocks, forward and backward conditions, subject-based direction counterbalancing, and no-repeat sequence semantics.
- Same three length-3 practice trials per direction and adaptive scored span from length 2 through 9.
- Same two attempts per length, one-correct-to-advance rule, two-failure stopping rule, and longest-successful-length span score.
- Same 500 ms flash, 1000 ms onset interval, 30 s pointer-recall ceiling, 750 ms practice feedback, and 500 ms ITI.

## Trial Flow

`ready board (500 ms) -> sequential flashes (500 ms each; 1000 ms IOI) -> ordered pointer recall (30 s max) -> optional practice feedback (750 ms) -> ITI (500 ms)`

The blue ready marker appears with the final flash and remains visible during recall. Forward trials require the presented order; backward trials require its reverse.

## Data

Reduced output contains one row per executed Corsi trial. It preserves direction, sequence length, attempt, practice status, presented and expected sequences, ordered selections and timestamps, first-tap and completion latency, correctness, timeout, outcome, and adaptive span state. Preplanned trials after adaptive stopping are omitted.

## Runtime

Run through the shared TaskBeacon runner:

```text
https://taskbeacon.github.io/psyflow-web/?task=H000060-corsi-block-tapping-task
```

The repository intentionally contains no task-local frontend shell, dependency tree, or build output.

The `TASKBEACON_ORG_DISPATCH_TOKEN` repository secret used by the notification workflow must be able to access `TaskBeacon/psyflow-web` with `Contents: Read and write`.

