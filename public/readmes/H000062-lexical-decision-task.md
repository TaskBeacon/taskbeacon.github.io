# Lexical Decision Task (Web)

Browser-native companion to `T000062-lexical-decision-task`, powered by the shared `psyflow-web` runner.

## Alignment

- Same 30 high-frequency words, 30 low-frequency words, 60 pseudowords, and separate 30-item practice pool.
- Same exact 15-word/15-pseudoword block composition and alternating 8/7 high/low word counts.
- Same deterministic no-repeat allocation and donor/display disjointness validation.
- Same 500 ms fixation, 2000 ms response window, 750 ms keyed-error feedback, and 150 ms ITI.
- Same F word / J nonword mapping and `correct`, `error`, `timeout` outcomes.
- Same accuracy, lexicality accuracy, and low-minus-high median RT summaries.

## Trial Flow

`fixation (500 ms) -> uppercase string (F/J, up to 2000 ms) -> ERROR after wrong key only (750 ms) -> ITI (150 ms)`

## Data

Reduced output contains one row per logical trial with item ID, letter string, lexicality, frequency class, correct and observed keys, RT, practice status, correctness, and outcome.

## Runtime

```text
https://taskbeacon.github.io/psyflow-web/?task=H000062-lexical-decision-task
```

The repository is source-only. The notification workflow requires `TASKBEACON_ORG_DISPATCH_TOKEN` access to `TaskBeacon/psyflow-web` with `Contents: Read and write`.
