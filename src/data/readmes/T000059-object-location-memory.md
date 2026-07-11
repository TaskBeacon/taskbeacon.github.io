# Object-Location Memory Task

| Field | Value |
|---|---|
| Name | Object-Location Memory Task |
| Version | v0.1.0 |
| Repository | https://github.com/TaskBeacon/T000059-object-location-memory |
| Date Updated | 2026-07-12 |
| PsyFlow Version | 0.1.0 |
| PsychoPy Version | 2025.1.1 |
| Modality | Behavior |
| Language | English |
| Primary construct | Object-position binding |

## 1. Task Overview

This task measures immediate memory for bindings between familiar objects and spatial positions. It implements the object-to-position-assignment condition of the classic Object Relocation paradigm. Participants study ten objects distributed across a square array, then assign each queried object to one of the ten marked positions.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Description |
|---|---|
| Instructions | Explain study and numbered position assignment. |
| Suppression block | One practice and two scored trials while repeating `BLAH` during study. |
| Silent block | One practice and two scored trials with silent study. |
| Summary | Report assignment accuracy and percentage mislocated. |
| Save | Export one reduced row per ten-object array. |

### Trial-Level Flow

| Phase | Duration | Visible content / response |
|---|---:|---|
| Fixation | 500 ms | Central `+`. |
| Study | 30 s | Ten object tiles in a 4 by 4 array. |
| Retention blank | 500 ms | Blank screen. |
| Assignment | 10 s max per object | Numbered occupied positions; press 0-9. |
| Practice feedback | 1.5 s | Correct count, practice only. |
| ITI | 500 ms | Blank screen. |

### Controller Logic

No adaptive controller is used. `src/utils.py` preplans distinct object sets, nonoverlapping occupied cells, key-position mappings, and shuffled query orders before each block runs.

## 3. Configuration Summary

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Participant identifier. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Resolution | 1024 x 768 |
| Units | visual degrees |
| Background | light gray |

### c. Stimuli

| Element | Implementation |
|---|---|
| Object pool | Nineteen familiar items named in Postma et al. (1998). |
| Study array | Ten unique two-letter object tiles in ten cells. |
| Assignment array | Same occupied cells marked by keys 1-9 and 0. |
| Query | Full object name, one item at a time. |

### d. Timing

| Parameter | Value |
|---|---:|
| Fixation | 0.500 s |
| Study | 30.000 s |
| Retention blank | 0.500 s |
| Assignment window | 10.000 s per object |
| ITI | 0.500 s |

### Triggers

Separate trigger codes mark experiment and block boundaries, fixation, study, retention, assignment onset, each numeric response, timeout, practice feedback, and ITI.

### Adaptive Controller

None.

## 4. Methods (for academic publication)

Participants completed an object-location memory task adapted from the object-to-position-assignment condition of Postma et al. (1998). Each trial began with a 500-ms fixation followed by a 30-s display containing ten familiar objects distributed across ten cells of a square array. After a 500-ms blank, the same occupied cells were marked with ten numeric response keys. Each object was queried once in random order, and participants selected its remembered position. In one block, participants repeated `BLAH` aloud throughout encoding; in the other, they studied silently. Assignment accuracy and percentage of mislocated objects were calculated for each array.

The source task used black line drawings and mouse relocation without a deadline. For cross-runtime portability, this implementation uses object-name tiles, numbered position selection, and a 10-s item deadline. These adaptations preserve categorical object-position assignment but change visual and motor demands.

## Running

```powershell
python main.py --mode human
python main.py --mode qa --config config/config_qa.yaml
python main.py --mode sim --config config/config_scripted_sim.yaml
python main.py --mode sim --config config/config_sampler_sim.yaml
```
