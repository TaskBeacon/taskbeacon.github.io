# Posner Spatial Cueing Task (Web)

Browser-native companion to `T000061-posner-spatial-cueing-task`, powered by the shared `psyflow-web` runner.

## Alignment

- Same predictive central two-half diamond cue, two peripheral boxes, central fixation, and circle/diamond targets.
- Same five conditions: valid, invalid, neutral, no cue, and catch.
- Same 12 practice trials and six scored blocks of 60 trials, including exact per-block condition counts.
- Same 100 ms cue, 400/700 ms cue-target interval, 100 ms target exposure, 1000 ms response window, and 2000 ms cue-onset interval.
- Same Space response, target hit/omission and catch false-alarm/correct-rejection logic.
- Same validity effect (`invalid - valid`) and alerting effect (`no cue - neutral`) summaries.

## Trial Flow

`cue (100 ms) -> cue-target delay (300/600 ms) -> target/catch response window (1000 ms) -> ITI (600/300 ms)`

Targets remain visible for 100 ms, while Space remains accepted through the remaining 900 ms response interval. Practice trials add 500 ms correctness feedback.

## Data

Reduced output contains one row per logical trial, preserving condition, cue/target sides, target shape, SOA, target presence, response key and RT, correctness, omission, false alarm, and outcome.

## Runtime

Run through the shared TaskBeacon runner:

```text
https://taskbeacon.github.io/psyflow-web/?task=H000061-posner-spatial-cueing-task
```

The repository intentionally contains no task-local frontend shell, dependency tree, or build output. The `TASKBEACON_ORG_DISPATCH_TOKEN` repository secret used by the notification workflow must access `TaskBeacon/psyflow-web` with `Contents: Read and write`.
