# Semantic Priming Task

| Field | Value |
|---|---|
| Name | Semantic Priming Task |
| Version | 0.1.0 |
| Date Updated | 2026-07-26 |
| PsyFlow Version | current local runtime |
| PsychoPy Version | current local runtime |
| Modality | Behavioral |
| Language | English |

## 1. Task Overview

This visual lexical-decision task measures semantic facilitation at a short
prime-target stimulus onset asynchrony (SOA). Word targets follow either a
semantically related or unrelated uppercase prime; matched pronounceable
nonwords provide the lexical-decision control condition.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Instructions -> 6 practice trials with feedback -> reminder -> 48 scored trials
without feedback -> performance summary.

### Trial-Level Flow

Fixation 500 ms -> uppercase prime 150 ms -> blank 50 ms -> lowercase target
until response or 3000 ms -> practice feedback when applicable -> ITI 1500 ms.

### Controller Logic

No adaptive controller is used. A/B lists rotate each word target between its
related and unrelated prime. Odd numeric participant IDs receive list A and even
IDs receive list B. Trial order is deterministically shuffled.

### Other Logic

F reports WORD and J reports NONWORD. The primary RT contrast is correct
unrelated-word RT minus correct related-word RT.

## 3. Configuration Summary

### a. Subject Info

| Field | Constraint |
|---|---|
| Participant ID | Three digits |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 x 800 |
| Background | Black |
| Letter-string font | Courier New |

### c. Stimuli

| Phase | Visible content |
|---|---|
| Prime | One centered uppercase English word |
| Target | One centered lowercase word or pronounceable nonword |
| Feedback | Practice only |

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 500 ms |
| Prime | 150 ms |
| Blank ISI | 50 ms |
| Target response window | 3000 ms max |
| Practice feedback | 500 ms |
| ITI | 1500 ms |

### Triggers

Dedicated codes identify relation, lexicality, response, timeout, feedback,
ITI, and experiment/block boundaries.

## 4. Methods (for academic publication)

Participants performed a visual lexical-decision task with a 200-ms
prime-target SOA. Each trial began with a 500-ms fixation, followed by a
150-ms uppercase prime, a 50-ms blank interval, and a lowercase target shown
until response or 3000 ms. Participants pressed F for English words and J for
nonwords. Twenty-four scored word targets were assigned to related or unrelated
prime conditions using complementary A/B lists, and 24 matched nonword trials
yielded equal lexicality counts. Six practice trials provided correctness
feedback; scored trials did not. The semantic-priming effect was defined as
mean correct RT for unrelated word targets minus mean correct RT for related
word targets.
