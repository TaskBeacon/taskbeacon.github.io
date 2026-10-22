# Beads Task / Jumping-to-Conclusions

| Field | Value |
|---|---|
| Name | Beads Task / Jumping-to-Conclusions |
| Version | 0.1.0 |
| Date Updated | 2026-07-27 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | Chinese |

## 1. Task Overview

The Beads Task measures how much sequential evidence a participant samples
before making a probabilistic judgment. Two candidate jars contain orange and
blue beads in complementary proportions. One jar is selected secretly, and
beads are revealed one at a time with replacement. The participant may request
another bead or decide which jar is the source. Fewer draws to decision (DTD)
indicate a hastier evidence-sampling style; a decision after one or two beads is
the conventional extreme jumping-to-conclusions (JTC) index.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

Chinese instructions -> one scored block -> four trials (85:15 left/right,
then 60:40 left/right) -> completion summary.

### Trial-Level Flow

Candidate jars for 2.5 s -> cumulative bead evidence until SPACE requests
another bead or F/J chooses a jar (20 beads maximum) -> 50%-100% confidence
rating -> 0.5-s neutral inter-trial interval.

### Controller Logic

No adaptive controller is used. PsyFlow's built-in condition scheduler presents
four scalar condition labels sequentially. Each label maps to a fixed,
auditable 20-bead sequence so every participant receives identical evidence.

### Other Logic

The primary measure is DTD. The task also records extreme-JTC status, jar-choice
accuracy, decision RT, final confidence, color counts, and the equal-prior
Bayesian posterior for the source jar at the stopping point. No trialwise
correctness feedback is shown.

## 3. Configuration Summary

### a. Subject Info

| Field | Constraint |
|---|---|
| Participant ID | Three digits |

### b. Window Settings

| Setting | Value |
|---|---|
| Resolution | 1280 x 800 |
| Background | White |
| Units | Degrees of visual angle |

### c. Stimuli

| Phase | Visible content |
|---|---|
| Ratio preview | Two equally sized jars containing 20 miniature beads that exactly depict 85:15 or 60:40 proportions |
| Evidence | Up to 20 accumulated orange/blue beads in a 10 x 2 grid |
| Confidence | Six numeric options from 50% to 100% |
| ITI | Neutral blank screen; no correctness feedback |

### d. Timing

| Phase | Duration |
|---|---:|
| Ratio preview | 2500 ms |
| Each evidence decision window | 60 s maximum (self-paced ceiling) |
| Confidence response window | 30 s maximum |
| ITI | 500 ms |

### Triggers

Dedicated codes identify task/block boundaries, easy/hard previews, each
evidence presentation, requests for another bead, left/right decisions,
confidence responses, timeouts, and the ITI.

### Adaptive Controller

None.

## 4. Methods (for academic publication)

Participants completed a computerized draws-to-decision Beads Task. At the
start of each trial, they viewed two candidate jars containing orange and blue
beads in complementary proportions. Easy trials used 85:15 versus 15:85 jars;
difficult trials used 60:40 versus 40:60 jars. One candidate jar was the hidden
source. A fixed sequence of beads was then revealed one item at a time with
replacement, and all observed beads remained visible. After every draw,
participants pressed SPACE to request another bead, F to select the left jar,
or J to select the right jar. A maximum of 20 observations was permitted.
After choosing a jar, participants rated confidence from 50% to 100% on a
six-level scale. No correctness feedback was provided. The primary outcome was
draws to decision; decisions after no more than two draws were coded as
extreme JTC. Secondary outcomes included choice accuracy, response time,
confidence, and an equal-prior Bayesian posterior calculated from the evidence
available at the stopping point.
