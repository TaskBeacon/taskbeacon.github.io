# Posner Spatial Cueing Task

| Field | Value |
|---|---|
| Name | Posner Spatial Cueing Task |
| Task ID | `T000061` |
| Variant | Central predictive cued target detection |
| Version | `v0.1.0` |
| Date Updated | 2026-07-12 |
| PsyFlow Version | `0.2.0` |
| PsychoPy Version | `2025.1.1` |
| Modality | Behavioral |
| Language | Chinese |
| Primary construct | Covert visuospatial orienting and reorienting |
| Release | `v0.1.0` |

## 1. Task Overview

This task implements the central predictive Posner spatial cueing procedure reported by Thiel, Zilles, and Fink (2005). Participants maintain central fixation while a two-part central diamond provides spatial, neutral, or no advance information. A filled circle or diamond then appears briefly in the left or right peripheral box, and participants press Space as quickly as possible. On catch trials no target appears and the response must be withheld.

Spatial cues are valid on 80% and invalid on 20% of spatially cued target trials. Neutral cues brighten the whole central diamond, while no-cue trials leave it unchanged. The key behavioral contrasts are the validity effect (invalid minus valid median RT) and alerting effect (no-cue minus neutral median RT).

The implementation preserves the canonical 192 valid, 48 invalid, 48 neutral, 48 no-cue, and 24 catch events, divided into six balanced behavioral blocks. The nicotine manipulation and fMRI null events from the source study are intentionally excluded.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

1. Chinese instruction and 12-trial mechanism-complete practice.
2. Six scored blocks of 60 trials each.
3. Exact per-block counts: 32 valid, 8 invalid, 8 neutral, 8 no-cue, and 4 catch.
4. Short break summary between blocks.
5. Final accuracy, false-alarm, validity-effect, and alerting-effect summary.

### Trial-Level Flow

| Phase | Duration | Participant-facing event |
|---|---:|---|
| Cue | 100 ms | Left/right half, whole, or neither half of central diamond brightens |
| Cue-target interval | 300 or 600 ms | Baseline display; target SOA is 400 or 700 ms |
| Target | 100 ms | Filled white circle/diamond in left or right box |
| Post-target response | 900 ms | Baseline display; response remains open |
| Catch response window | 1000 ms | Baseline display with no target; withhold response |
| Practice feedback | 500 ms | Correct/incorrect, practice only |
| ITI | 600 or 300 ms | Baseline display; nominal cue-onset interval remains 2 s |

### Controller Logic

The task is nonadaptive and uses no custom controller. PsyFlow owns response capture, phase timing, triggers, trial identity, and data persistence.

### Other Logic

`generate_trial_plans()` preplans exact event counts and balances target side, cue side, target shape, and cue-target interval before each block. A stable independent seed makes every plan auditable and replayable.

## 3. Configuration Summary

### a. Subject Info

| Parameter | Value |
|---|---|
| Subject ID | Three digits |
| Response | Space for target; withhold for catch |

### b. Window Settings

| Parameter | Value |
|---|---|
| Window | 1280 x 800 px |
| Units | Visual degrees |
| Background | Black |
| Viewing distance | 60 cm configured |

### c. Stimuli

| Stimulus | Definition |
|---|---|
| Central cue | Two dim triangular halves forming a 2.6-degree diamond |
| Peripheral boxes | 3 x 3 degrees at +/-9.6 degrees eccentricity |
| Target | Filled white circle or diamond, 1.3 degrees wide |
| Fixation | Small central point retained throughout trial |

### d. Timing

| Parameter | Value |
|---|---:|
| Cue | 100 ms |
| Cue-target SOA | 400 or 700 ms |
| Target exposure | 100 ms |
| Response deadline | 1000 ms from target onset |
| Nominal trial onset interval | 2000 ms |

### e. Triggers

| Event | Code |
|---|---:|
| Experiment start/end | 1 / 99 |
| Block start/end | 10 / 90 |
| Valid/invalid cue | 20 / 21 |
| Neutral/no-cue/catch cue | 22 / 23 / 24 |
| Target left/right | 40 / 41 |
| Catch window | 42 |
| Target response/false alarm/timeout | 50 / 51 / 52 |
| Practice feedback/ITI | 60 / 70 |

Run locally with:

```powershell
python main.py human
python main.py qa --config config/config_qa.yaml
python main.py sim --config config/config_scripted_sim.yaml
python main.py sim --config config/config_sampler_sim.yaml
```

QA uses runtime timing scaling while preserving canonical configured values. Simulation profiles use explicitly shortened 1:10 timing values because they test state and response semantics rather than psychophysical latency.

## 4. Methods (for academic publication)

Participants completed a computerized central predictive Posner spatial cueing task implemented in PsychoPy and PsyFlow. They maintained central fixation while viewing a dim central diamond and two peripheral boxes at 9.6 degrees eccentricity. For 100 ms, the left or right half of the central diamond brightened as a spatial cue, the whole diamond brightened as a neutral cue, or the diamond remained unchanged. After a cue-target onset interval of 400 or 700 ms, a filled white circle or diamond appeared for 100 ms in one peripheral box. Participants pressed Space as quickly as possible when a target appeared and withheld responses on catch trials. Spatial cues predicted the target side on 80% of spatially cued trials. The scored task contained 192 valid, 48 invalid, 48 neutral, 48 no-cue, and 24 catch trials across six blocks. Primary outcomes were detection accuracy, false-alarm rate, median reaction time by cue condition, the invalid-minus-valid validity effect, and the no-cue-minus-neutral alerting effect.

## References

- Thiel, C. M., Zilles, K., & Fink, G. R. (2005). Nicotine modulates reorienting of visuospatial attention and neural activity in human parietal cortex. *Neuropsychopharmacology, 30*, 810-820. https://doi.org/10.1038/sj.npp.1300633
- Hommel, B., Pratt, J., Colzato, L., & Godijn, R. (2001). Symbolic control of visual attention. *Psychological Science, 12*, 360-365. https://doi.org/10.1111/1467-9280.00367
- Corbetta, M., Miezin, F. M., Shulman, G. L., & Petersen, S. E. (1993). A PET study of visuospatial attention. *Journal of Neuroscience, 13*, 1202-1226. https://doi.org/10.1523/JNEUROSCI.13-03-01202.1993
