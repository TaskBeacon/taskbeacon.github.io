# Changelog

## 2026-03-11

- Switched HTML companion discovery from build-time index merging to runtime attachment via the shared `psyflow-web` manifest.
- Added a shared client-side companion loader that fetches `/psyflow-web/task-manifest.json` and merges matching HTML previews onto canonical TaskBeacon tasks by `slug` and `T/H` task id pairing.
- Updated the gallery, featured carousel, homepage preview counters, footer summary, and task detail pages to use runtime companion data without changing the visible card layout.
- Simplified the indexer so `tasks_index.json` now stays focused on canonical task records, while HTML preview metadata lives in the `psyflow-web` manifest.
