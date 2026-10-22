# Two-Step Sequential Decision Task

| Field                | Value                        |
|----------------------|------------------------------|
| Name | Two-Step Sequential Decision Task |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000075-two-step-sequential-decision-task |
| Short Description | Classic Daw two-step reinforcement-learning task |
| Created By | TaskBeacon |
| Date Updated | 2026-07-26 |
| PsyFlow Version | Current local runtime |
| PsychoPy Version | Current local runtime |
| Modality | Behavioral |
| Language | English |
| Voice Name |  |

## 1. Task Overview

This classic two-step sequential decision task measures the relative influence
of model-based and model-free reinforcement learning. Participants make a
first-stage choice that commonly or rarely reaches one of two second-stage
states, then choose again for a reward whose probability changes gradually.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---|---|
| Instructions | Explain stable transitions, drifting coin probabilities, and F/J left-right responses. |
| Practice | 50 trials with a distinct card set and an independent reward controller. |
| Transition | Replace practice symbols and reset reward probabilities before scoring. |
| Scored blocks | Three blocks of 67 trials; reward values persist across block breaks. |
| Summary | Report coins, reward rate, common-transition rate, and completion rates. |

### Trial-Level Flow

| Phase | Stimulus and response |
|---|---|
| Fixation | `fixation` for 500 ms. |
| First-stage choice | Two gold cards for up to 2 s; F chooses left and J chooses right. A timeout aborts the sequence. |
| Transition | The chosen action reaches its assigned state with probability 0.70 and the alternate state with probability 0.30. |
| Second-stage choice | Two pink or blue cards for up to 2 s; F/J again choose left/right. |
| Outcome | `reward_coin` or `unrewarded_zero` for 1 s; timeouts show `feedback_timeout`. |
| ITI | `blank` for 1 s. |

### Controller Logic

| Component | Implementation |
|---|---|
| Transition model | Each first-stage action has a fixed common state; participant parity swaps the mapping. |
| Reward model | Four independent Bernoulli reward probabilities, one for each second-stage action. |
| Drift | After every scheduled trial, each probability receives Gaussian noise with SD 0.025. |
| Boundaries | Values reflect at 0.25 and 0.75. |
| State separation | Practice and scored phases use independent seeded controllers. |

### Other Logic

| Component | Implementation |
|---|---|
| Card positions | First- and second-stage action identities are pseudorandomly assigned left/right each trial. |
| Stay coding | Current first action is compared with the previous completed trial's first action. |
| Stay predictors | Previous completed trial contributes common/rare transition and rewarded/unrewarded outcome. |
| Descriptive indices | Model-based: `(CR-CU)-(RR-RU)`; model-free: `mean(CR,RR)-mean(CU,RU)`. |

## 3. Configuration Summary

Settings below come from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| `subject_id` | Three-digit participant identifier; parity selects the counterbalancing group. |

### b. Window Settings

| Parameter | Value |
|---|---|
| Resolution | 1280 x 800 |
| Units | Degrees of visual angle |
| Background | `#f7f8fa` |
| Monitor geometry | 35.5 cm width at 57 cm viewing distance |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| `card_left`, `card_right` | Image | Dynamic 4.2-degree abstract card images at x = -5 and +5 degrees. |
| `stage1_label` | Text | Gold first-choice state label above the cards. |
| `state_pink`, `state_blue` | Text | Reached second-stage state label above the cards. |
| `reward_coin` | Image | Centered generated gold coin. |
| `unrewarded_zero` | Text | Centered zero for no reward. |
| `coin_count` | Text | Cumulative task-coin count below the outcome. |

### d. Timing

| Phase | Duration |
|---|---:|
| Fixation | 0.5 s |
| First-stage choice | 2.0 s maximum |
| Second-stage choice | 2.0 s maximum |
| Outcome | 1.0 s |
| ITI | 1.0 s |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start / end | 1 / 99 |
| Block start / end | 10 / 90 |
| Fixation | 20 |
| First-stage onset / left / right / timeout | 30 / 31 / 32 / 33 |
| Pink onset / blue onset | 40 / 41 |
| Second-stage left / right / timeout | 42 / 43 / 44 |
| Common / rare transition | 50 / 51 |
| Rewarded / unrewarded / timeout outcome | 60 / 61 / 62 |
| ITI | 70 |

### f. Adaptive Controller

| Parameter | Value |
|---|---|
| Common / rare transition probability | 0.70 / 0.30 |
| Reward random-walk SD | 0.025 |
| Reward probability bounds | 0.25 to 0.75, reflecting |
| Initial reward probabilities | 0.40, 0.60, 0.60, 0.40 |
| Human trial count | 50 practice + 3 x 67 scored |
| Reproducibility seed | 75075 |

## 4. Methods (for academic publication)

Participants completed a classic two-step sequential decision task. After 50
practice trials with a separate symbol set, they completed 201 scored trials
in three blocks of 67. On each trial, a 500-ms fixation preceded a first-stage
choice between two gold abstract cards. Participants selected the left or
right card with F or J within 2 s. Each first-stage action led to one colored
second-stage state on 70% of selections and the alternate state on 30%; the
action-state mapping was counterbalanced by participant identifier.

At the reached pink or blue state, participants selected one of two cards
within 2 s. The selected action yielded one coin according to its current
reward probability, followed by a 1-s coin or zero display and a 1-s blank
interval. The four second-stage reward probabilities evolved independently
after each trial through Gaussian random walks with SD 0.025 and reflecting
bounds at 0.25 and 0.75. Practice and scored phases used independent seeded
controllers.

Goal-directed and habitual contributions were summarized from first-stage
stay choices conditioned on the previous completed trial. A reward-by-
transition interaction, `(stay_CR-stay_CU)-(stay_RR-stay_RU)`, served as a
descriptive model-based index, while the reward main effect served as a
descriptive model-free index. Trial-level data retain both choices, response
times, transition type, reward draw, reward probabilities before and after
drift, and the previous-trial predictors required for confirmatory regression
or computational modeling.
