# Levels of Processing Task

A reference-aligned implementation of Craik and Tulving's incidental-encoding paradigm. Participants make structural, phonemic, or semantic judgments before an unexpected old/new recognition test.

| Field | Value |
|---|---|
| Name | Levels of Processing Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-12 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

- Encoding: 60 five-letter words, balanced across three processing levels and yes/no answers.
- Recognition: all 60 old words mixed with 120 five-letter distractors.
- Primary measures: hit rate by encoding level, false-alarm rate, and corrected recognition.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Incidental encoding is followed, without advance warning, by recognition.

### Trial-Level Flow

Encoding: question (2 s), word (200 ms), response interval. Recognition: word and old/new response.

### Controller Logic

There is no adaptive controller. A deterministic item planner preserves exact cell counts and old/new linkage.

## 3. Configuration Summary

### a. Subject Info

Three-digit participant ID.

### b. Window Settings

1280 x 800, black background, degree units.

### c. Stimuli

Unique five-letter English nouns from `assets/stimuli.csv`.

### d. Timing

Questions last 2 s, encoding words 200 ms, and recognition has a 3 s per-item deadline.

## 4. Methods (for academic publication)

Participants incidentally encode 60 words while answering case, rhyme, or sentence questions, balanced for yes/no answers. An unexpected recognition phase mixes those words with 120 distractors. Recognition is summarized by hit rate for each encoding level and false alarms to new words.

## 5. Run

```powershell
python main.py --mode human
python main.py --mode qa
python main.py --mode sim --config config/config_scripted_sim.yaml
```

## 4. Evidence

The primary protocol is Experiment 2 of Craik and Tulving (1975). Browser-friendly visual questions and sequential old/new responses are documented adaptations; the 3 x 2 encoding design and surprise recognition structure are preserved.
