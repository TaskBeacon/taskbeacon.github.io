# H000011 Simon

HTML/browser preview of the Simon task built with `psyflow-web`.
The trial procedure, response mapping, congruent/incongruent condition semantics, and feedback logic are aligned to local `T000011-simon`; total blocks/trials are shortened for preview.

## Layout

- `main.ts`: task orchestration
- `config/config.yaml`: declarative config
- `src/run_trial.ts`: trial logic
- `src/utils.ts`: block accuracy summary helper

## Run

From `e:\xhmhc\TaskBeacon\psyflow-web`:

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4173/?task=H000011-simon
```
