# Language-based Visual World Paradigm

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Language-based Visual World Paradigm |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000047-language-based-visual-world-paradigm |
| Short Description | Browser companion for the canonical language-based visual world paradigm. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | English |

## Task Overview

This HTML companion mirrors `T000047-language-based-visual-world-paradigm`. Participants preview four labeled cards, listen to a sentence, then press `1`, `2`, `3`, or `4` to choose the named item.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Conditions | Preserves the 12 target x predictive/neutral condition labels from `trial_bank`. |
| Scene layout | Preserves four-card positions, quadrant-key mapping, target, semantic competitor, and two distractors. |
| Trial flow | Fixation, scene preview, sentence listening, response selection, and ITI. |
| Voice | Instruction and sentence text are converted to browser speech when `voice_enabled` is true. |
| Data | Reduced output is one logical trial per row with family, target, semantic competitor, distractors, target quadrant/key, display order, selected label, RT, correctness, and timeout. |

## Browser Notes

Fullscreen, cursor hiding, force quit, preflight, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000047-language-based-visual-world-paradigm`
