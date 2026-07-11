# Object-Location Memory Task (Web)

Browser-native companion to `T000059-object-location-memory`, powered by the shared `psyflow-web` runner.

## Alignment

- Same slug, title, object-to-position-assignment variant, 19-item object pool, ten-object arrays, condition meanings, stage order, timing, response mapping, and score identity.
- The browser task preserves one practice and two scored arrays in each of the two encoding conditions.
- Browser rendering uses pixel dimensions corresponding to the local visual hierarchy; serial trigger hardware is omitted.

## Trial Flow

`fixation (500 ms) -> study array (30 s) -> retention blank (500 ms) -> 10 object-position assignments (10 s max each) -> optional practice feedback -> ITI (500 ms)`

## Data

Reduced output preserves one logical row per ten-object array with condition, practice status, object/location plan, query order, item responses, correct count, assignment accuracy, percentage mislocated, mean RT, and conventional response fields.

## Runtime

Run through the shared TaskBeacon runner:

```text
https://taskbeacon.github.io/psyflow-web/?task=H000059-object-location-memory
```

The source repository intentionally contains no task-local frontend shell, dependencies, or build output.

