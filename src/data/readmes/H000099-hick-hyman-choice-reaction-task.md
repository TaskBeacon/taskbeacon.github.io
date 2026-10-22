# Hick–Hyman Choice Reaction Task (Web)

## 1. Overview

This repository is the browser companion to the canonical PsychoPy task in `T000099-hick-hyman-choice-reaction-task`. It measures how choice reaction time changes with stimulus uncertainty by comparing equiprobable 2-, 4-, and 8-alternative blocks (1, 2, and 3 bits).

## 2. Task Flow

Participants complete three counterbalanced blocks. Every trial shows a 500-ms fixation, then identical circular response locations until a keypress or the 2-s deadline. Incorrect responses and timeouts receive 500-ms corrective feedback, followed by a 700-ms inter-trial interval.

## 3. Conditions and Responses

- N=2: centered positions mapped to `F` and `J`.
- N=4: centered positions mapped to `D`, `F`, `J`, and `K`.
- N=8: all positions mapped to `A`, `S`, `D`, `F`, `J`, `K`, `L`, and `;`.

Each alternative occurs equally often within its 32-trial block. The participant summary reports accuracy, mean correct RT for each set size, the OLS Hick slope in ms/bit, and R².

## 4. Run

The task is loaded by the shared `psyflow-web` runner. From the sibling runner repository, generate the task manifest and open:

`/?task=H000099-hick-hyman-choice-reaction-task`

## 5. Canonical Source

The T repository is canonical. Update and validate it first, then synchronize behavior here. See `transfer_node.md` for the alignment audit.

## 6. References

- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*. https://doi.org/10.1080/17470215208416600
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology*. https://doi.org/10.1037/h0056940
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time. *Quarterly Journal of Experimental Psychology*. https://doi.org/10.1080/17470218.2017.1322622
