# Directed Forgetting Task
| Field | Value |
|---|---|
| Name | Directed Forgetting Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-12 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview
Item-method directed forgetting with 30 remember-cued and 30 forget-cued study words, followed by recognition of all 60 old words among 60 foils.

### Block-Level Flow
Study then recognition.
### Trial-Level Flow
Fixation, word, memory cue; recognition word and F-old/J-new response.
### Controller Logic
No adaptive controller; deterministic item planning preserves cue balance and old/new linkage.

## 2. Task Flow
![Task Flow](task_flow.png)

## 3. Configuration Summary
### a. Subject Info
Three-digit participant ID.
### b. Window Settings
1280 x 800 black display.
### c. Stimuli
120 unique five-letter English nouns.
### d. Timing
500 ms fixation, 2 s word, 2 s cue, 3 s recognition deadline.

## 4. Methods (for academic publication)
Sixty words were followed individually by remember or forget cues. Recognition instructions required judgments for every old item regardless of cue, mixed with 60 new words. The directed-forgetting effect is remember hit rate minus forget hit rate.

## 5. Run
`python main.py --mode human`
