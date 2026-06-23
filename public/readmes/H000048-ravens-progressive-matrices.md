# Raven's Progressive Matrices

![Maturity: draft](https://img.shields.io/badge/Maturity-draft-64748b?style=flat-square&labelColor=111827)

| Field | Value |
|---|---|
| Name | Raven's Progressive Matrices |
| Version | html (v0.1.0-dev) |
| URL / Repository | https://github.com/TaskBeacon/H000048-ravens-progressive-matrices |
| Short Description | Browser companion for the canonical Raven's Progressive Matrices task. |
| Created By | TaskBeacon psyflow-web py2js port |
| Modality | Behavior |
| Language | English |

## Task Overview

This HTML companion mirrors `T000048-ravens-progressive-matrices`. Participants view a 3x3 matrix with one missing cell and select one of four generated options.

## Alignment Notes

| Area | Web Alignment |
|---|---|
| Item bank | Preserves the canonical default practice/easy/medium/hard generated item definitions. |
| Trial flow | Fixation, blank, response-open window, warning window if unanswered, practice feedback, and ITI. |
| Timing | Converts canonical millisecond response windows to seconds for browser runtime. |
| Response semantics | Keys `1-4` map to option positions; warning responses include open-window duration in RT. |
| Data | Reduced output is one logical item per row with category, template, correct key/position, selected option, response phase, RT, correctness, and timeout. |

## Browser Notes

Matrix and option stimuli are generated from shape primitives; no image assets are required. Fullscreen, preflight, force quit, and export controls are handled by the shared `psyflow-web` runner. The notification workflow is included and expects `TASKBEACON_ORG_DISPATCH_TOKEN` with access to `TaskBeacon/psyflow-web` and `Contents: Read and write`.

## Run

Open through the shared runner with:

`?task=H000048-ravens-progressive-matrices`
