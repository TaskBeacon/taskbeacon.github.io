# Feature-Rich Episodic Decision Task (Web)

Browser-native companion to the canonical [`T000113-feature-rich-episodic-decision-task`](https://github.com/TaskBeacon/T000113-feature-rich-episodic-decision-task), implemented for the shared `psyflow-web` runner.

The task implements Experiment 1, Sample A from Nicholas and Mattar (2026): five independent rounds of six feature-rich item–reward episodes, a 90 s 2-back distractor, six temporarily cued color/category decisions, free item recall, and item-value recall.

## Alignment

- Same slug, task title, five-round structure, 16-item color × category space, 3/2/1 feature multiplicities, reward constraints, stage order, timings, F/J mappings, accept/reject scoring, no decision feedback, and reduced-row meanings as the Python canonical task.
- The shared browser runner owns participant registration, fullscreen/lifecycle behavior, raw/reduced export, and browser key normalization.
- The browser's current editable-text primitive captures one input at a time. Free recall therefore uses one wide field with comma-separated item names instead of six simultaneous boxes; it preserves self-paced recall and six-item response meaning.
- Random draws are deterministic per participant but use the shared browser PRNG, so a participant number need not produce the identical item draw in Python and JavaScript. All published sampling constraints are identical.

See [`transfer_node.md`](transfer_node.md) for the full alignment matrix and validation record.

## Development

The task is source-only and is loaded by the sibling `psyflow-web` workspace; it has no local `node_modules`, app shell, or direct jsPsych imports.

```powershell
npx tsc --noEmit -p H000113-feature-rich-episodic-decision-task/tsconfig.json
npx vitest run --config H000113-feature-rich-episodic-decision-task/vitest.config.js
```

The notification workflow requires `TASKBEACON_ORG_DISPATCH_TOKEN`. For a fine-grained PAT, grant access to `TaskBeacon/psyflow-web` with **Contents: Read and write**; TaskBeacon organization approval may also be required.

## Evidence

- Nicholas, J., & Mattar, M. G. (2026). Episodic memory facilitates flexible decision-making via access to detailed events. *Nature Human Behaviour*, 10, 760–776. https://doi.org/10.1038/s41562-025-02383-3
- Author materials: https://github.com/jonathanicholas/nm2025_emdm

Item pictograms are adapted from OpenMoji and remain available under CC BY-SA 4.0; see [`assets/README.md`](assets/README.md).
