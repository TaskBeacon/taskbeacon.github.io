# Hand Laterality Judgment

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Hand Laterality Judgment |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000045-hand-laterality-judgment |
| Short Description | Browser companion for the canonical hand laterality judgment task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | Chinese |

## Task Overview

This HTML companion mirrors `T000045-hand-laterality-judgment`. Participants judge whether rotated hand images depict a left or right hand, using `F` for left and `J` for right.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Session plan | Preserves one practice block followed by six test blocks. |
| Trial pool | Preserves hand side, palm/back view, and four orientation labels with canonical rotation degrees. |
| Trial flow | Fixation, rotated hand response window, practice feedback when applicable, then ITI. |
| Response semantics | Correct key is determined by hand side; timeout is recorded when no valid response is captured. |
| Data | Reduced output is one logical trial per row with hand/view/orientation, stimulus id, correct key, response key, RT, correctness, timeout, and feedback kind. |

## Browser Notes

Hand image assets are preserved in `assets/`. Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000045-hand-laterality-judgment`
