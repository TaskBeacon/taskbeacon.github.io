# Moral Strategy Outcome-Learning Task — Web

Browser companion for canonical [T000115](https://github.com/TaskBeacon/T000115-moral-strategy-outcome-learning-task), running on the shared `psyflow-web` jsPsych runtime.

![Task flow](task_flow.png)

## Paradigm

One participant is assigned to one stable learning environment and completes the fixed 13-dilemma Experiment 1 sequence. Every trial presents a realistic moral dilemma, a 0–100 moral-rightness rating initialized at 50, a Yes/No action choice, deterministic choice-contingent feedback, and a −100–100 outcome rating initialized at 0. The proposed action is CBR-consistent in eight dilemmas and rule-consistent in five, so action responses are converted to strategies before feedback is resolved.

## Run in the shared preview

```powershell
cd E:\Taskbeacon\psyflow-web
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173/?task=H000115-moral-strategy-outcome-learning-task`.

## Validation

```powershell
cd E:\Taskbeacon\psyflow-web
npm run generate:tasks
npx tsc --noEmit -p ..\H000115-moral-strategy-outcome-learning-task\tsconfig.json
npx vitest run --config ..\H000115-moral-strategy-outcome-learning-task\vitest.config.js
```

See `transfer_node.md` for the Python-to-web alignment matrix. The exact Chinese materials are in `config/materials.yaml` and remain subordinate to canonical T000115.

## Evidence

- Maier, Cheung, and Lieder (2025), *Nature Human Behaviour*: https://doi.org/10.1038/s41562-025-02271-w
- Open materials: https://osf.io/4up5z/

