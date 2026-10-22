# Structured Visuomotor Graph Learning

| Field | Value |
|---|---|
| Name | Structured Visuomotor Graph Learning |
| Version | v0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000117-structured-visuomotor-graph-learning |
| Short Description | Learning eight visual-feature conjunctions as structured or structure-breaking finger-response maps |
| Created By | TaskBeacon |
| Date Updated | 2026-08-29 |
| PsyFlow Version | 0.1.12 |
| PsychoPy Version | 2025.2.4 |
| Modality | Behavior |
| Language | Chinese |
| Voice Name | zh-CN-YunyangNeural (voice disabled) |

TaskBeacon implementation of the hierarchical visuomotor association-learning
paradigm reported by Trach and McDougle (2025). The task supports both the
structured mapping shown in Figure 1b and the same-stimulus pseudorandom mapping
shown in Figure 3i.

## 1. Task Overview

Participants learn deterministic mappings from eight patterned geometric
stimuli to eight finger responses. The stimuli cross two shapes, two colours,
and two patterns. In the structured group, those features successively identify
hand, finger couplet, and finger-within-couplet. In the unstructured group, the
same stimuli use the pseudorandom key assignment from the paper's control study.

Primary outputs include accuracy, response time, timeouts, changed visual
features, preceding response, and hierarchical graph path distance.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. General instruction and eight-finger placement.
2. Motor RT baseline: green target among eight squares, with all ordered
   finger-to-finger transitions represented four times.
3. Fifteen unrestricted simplified practice trials with three emoji and H/J/K.
4. Preview of the eight formal-task stimuli without displaying their mappings.
5. Five learning blocks of 88 trials, yielding 55 presentations per stimulus.
6. Session summary and exit.

### Trial-Level Flow

- Motor baseline: green target remains until the spatially corresponding key is
  pressed correctly, followed by 100 ms with all squares white.
- Simplified practice: emoji remains until response, followed by 750 ms binary
  feedback.
- Learning: one patterned shape appears for up to 2.5 s, followed by 750 ms
  correct, incorrect, or timeout feedback.

### Controller Logic

There is no adaptive controller. The mapping group is selected once in the
experimenter-facing subject form. Motor transition coverage and all randomized
orders are generated deterministically from subject/block seeds.

### Other Logic

The motor sequence is an Eulerian traversal of the complete directed graph over
the eight keys, repeated four times per directed edge. Learning trials use
PsyFlow's balanced condition generator. Current-trial rows retain the preceding
stimulus and correct key so transition analyses remain reproducible.

## 3. Configuration Summary

### a. Subject Info

| Field | Values | Purpose |
|---|---|---|
| `subject_id` | 3-digit ID | Output identity and deterministic seeding |
| `mapping_structure` | `structured`, `unstructured` | Between-participant mapping group |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 × 720 px |
| Background | medium gray (`#8A8A8A`) |
| Fullscreen | false by default |

### c. Stimuli

| Phase | Visible content |
|---|---|
| Motor baseline | eight white squares with one green target |
| Practice | one of three emoji |
| Learning | one red/purple × square/circle × dots/stripes SVG |
| Feedback | yellow `★ +1`, red `×`, or faster-response message |

### d. Timing

| Parameter | Human value |
|---|---:|
| Motor all-white interval | 100 ms |
| Practice response window | unrestricted operationally |
| Learning response window | 2500 ms |
| Feedback duration | 750 ms |

### e. Triggers

Lifecycle, phase, stimulus-specific learning onsets, eight response keys,
timeout, and feedback branches have distinct codes in `config/config.yaml`.

### f. Adaptive Controller

Not applicable. All mappings are deterministic and no online difficulty update
is applied.

## 4. Methods (for academic publication)

Participants first completed a motor response-time baseline using eight squares
spatially aligned with the A/S/D/F and H/J/K/L keys. On each trial, one square
turned green and the display advanced only after the correct spatially aligned
key response, followed by a 100 ms all-white interval. A seeded sequence covered
each ordered finger transition four times. Participants then completed 15
unrestricted familiarization trials with three distinguishable emoji mapped to
H/J/K and binary feedback.

For formal learning, eight visual stimuli were generated from the factorial
combination of two shapes (square/circle), two colours (red/purple), and two
surface patterns (dots/vertical stripes). Participants viewed one stimulus per
trial and selected among A/S/D/F/H/J/K/L within 2.5 s. Correct mappings were
deterministic and feedback appeared for 750 ms. Each stimulus occurred 55 times
across five balanced blocks. In the structured group, shape identified hand,
colour identified the finger couplet, and pattern identified the response within
the couplet. In the unstructured group, identical stimuli followed the
pseudorandom mapping illustrated in Figure 3i. Participants were not informed
about latent structure.

Primary source: Trach, J. E., & McDougle, S. D. (2025). Mental graphs structure
the storage and retrieval of visuomotor associations. *Nature Human Behaviour,
9*, 1898–1912. https://doi.org/10.1038/s41562-025-02217-2

## Running

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

## Outputs

CSV rows preserve phase, stimulus, correct and observed key, correctness,
response time, timeout, mapping group, visual features, preceding trial, feature
change count, and graph path distance. Reference and protocol decisions are
documented under `references/`.
