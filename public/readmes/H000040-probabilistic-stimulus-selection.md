# Probabilistic Stimulus Selection Task

## Overview

This snapshot mirrors the browser companion task `H000040-probabilistic-stimulus-selection`.
It preserves the kana-based learning and transfer logic from the local canonical build while running inside the shared browser runner.

## Task Flow

1. Instructions explain the left/right response mapping.
2. Learning trials present AB, CD, and EF pairs with probabilistic feedback.
3. The learning block stops early only when the criterion is met.
4. Transfer trials present all pairwise combinations without feedback.
5. A final screen ends the task and exports the data.

## Configuration

- Six kana symbols are randomized across roles A-F per participant.
- Learning probabilities are AB 80/20, CD 70/30, and EF 60/40.
- Response keys are `A` for left and `L` for right.
- The preview uses shortened counts so the browser version stays compact.

## Run

Open the TaskBeacon browser runner and launch `H000040-probabilistic-stimulus-selection`.
