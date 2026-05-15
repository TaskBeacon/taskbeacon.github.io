# H000035 Sternberg Working Memory Task

HTML/browser preview of Sternberg Working Memory Task built with `psyflow-web`.
Memory-set generation, old/new probe logic, response scoring, and block/final summary metrics are aligned to local `T000035-sternberg-working-memory`.

The web implementation now follows the same architecture as the local psyflow task:

- native `BlockUnit.generate_conditions(...)` for block-level load scheduling
- pure helper-based `TrialSpec` expansion for trial-level memory/probe sampling
- no task-local `controller`, because this task has no adaptive timing or response-window control requirement

## Layout

- `main.ts`: task orchestration
- `config/config.yaml`: declarative config
- `src/run_trial.ts`: trial logic that consumes a concrete trial spec and records trial outcome
- `src/utils.ts`: pure trial-spec helpers plus block/overall summary helpers

## Run

From `e:\xhmhc\TaskBeacon\psyflow-web`:

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4173/?task=H000035-sternberg-working-memory
```
