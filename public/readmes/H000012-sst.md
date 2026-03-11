# H000012 SST

HTML/browser preview of the Stop-Signal Task built with `psyflow-web`.
The within-trial procedure, go/stop condition semantics, instruction text, and adaptive SSD controller are aligned to the local `T000012-sst` task; only the block and trial count are shortened for preview use.

## Layout

- `main.ts`: task-level orchestration
- `config/config.yaml`: declarative task config
- `src/run_trial.ts`: trial-level logic
- `src/controller.ts`: adaptive SSD controller
- `src/utils.ts`: constrained condition generator and block summary helpers

## Run

From [psyflow-web](/e:/xhmhc/TaskBeacon/psyflow-web):

```powershell
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:4173/?task=H000012-sst
```
