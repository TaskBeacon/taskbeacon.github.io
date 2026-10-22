# Anchoring in Numerical Estimation
| Metadata | Value |
|---|---|
| Name | Anchoring in Numerical Estimation |
| Version | v0.1.0 |
| Date Updated | 2026-08-31 |
| PsyFlow Version | 43e52fb or newer |
| PsychoPy Version | 2025.2.4 |
| Modality | behavioral |
| Language | Chinese |

H000140; original unvalidated pilot.

## 1. Task Overview
Computer-administered anchoring adaptation with nine original astronomy quantity questions. High-anchor, low-anchor and unanchored conditions. This is an unvalidated pilot item bank, not a direct historical replication, clinical test, or normed individual-difference measure. The arbitrary comparison value is explicitly described as a preset number, not an answer. Fact sources and all anchor values: [item audit](references/item_sources.md). Mechanism source: [Tversky and Kahneman1974](https://pubmed.ncbi.nlm.nih.gov/17835457/).

## 2. Task Flow

![Task Flow](task_flow.png)
### Block-Level Flow

Instructions -> one block of nine unique items -> closing screen. 

### Trial-Level Flow

Each item: fixation500ms -> comparison up to10s (anchored only) -> absolute estimate up to30s -> confidence up to5s -> prior knowledge up to5s -> recorded500ms. F means quantity lower or equal, J higher; Return submits ASCII decimal estimate;1-4 confidence;1-3 knowledge. No correctness feedback, rewards or adaptive controller. Blank editor has no numerical default. Timeouts retain a draft but do not create a valid submission.

### Controller Logic

No adaptive controller. BlockUnit shuffles all labels once with140031+subject_id. Labels are preassigned by item ordinal and subject_id modulo3. Each participant sees three items per arm, each item once. Across a balanced consecutive-ID triplet each item occurs in all three arms. The item-condition pairing is confounded within a single list: DO NOT interpret raw across-item arm means as the anchoring effect. No individual score is generated.

## 3. Configuration Summary
| Setting | Value |
|---|---|
| Subject | Three-digit numeric ID101-999; assignment_list=ID modulo3 |
| Window |1280x800 pixels, white, windowed; nominal monitor dimensions not calibration |
| Stimuli | SimHei Chinese text and fresh650x90 blank numeric editor |
| Timing | .5/10/30/5/5/.5 seconds; baseline omits comparison |
| Triggers | Mock behavioral map1-99; see audit; no hardware accuracy claim |
| Controller | None; fixed unvalidated anchors |
| Truth/anchors | Config item metadata; never reveal truth during task |
| Validation profiles |3 distinct items covering all arms; unchanged deadlines; explicitly synthetic numeric fixtures |

### a. Subject Info

IDs101-999; balance the three modulo lists.

### b. Window Settings

Pixel geometry in the table is nominal and not hardware calibration.

### c. Stimuli

Fact and anchor provenance is in references/item_sources.md.

### d. Timing

Response deadlines are unchanged in QA/sim; only item count and synthetic fixture buffers differ.

Native canonical run: `python main.py human`; QA `psyflow-qa . --config config/config_qa.yaml --no-maturity-update`; simulations `python main.py sim --config config/config_scripted_sim.yaml` or sampler config. Requires PsyFlow commit43e52fb or newer for PsychoPy TextBox2 caret compatibility. Use ordinary ASCII digits and decimal point; no Chinese IME required.

## 4. Methods (for academic publication)
Participants estimate nine astronomy quantities in a within-participant, counterbalanced three-condition pilot. Items are assigned by a three-list cyclic rotation and randomized in order by PsyFlow. Comparative judgment is followed by a blank absolute numeric estimate, then exploratory confidence and self-reported prior knowledge. Baseline skips comparative judgment. Display and deadlines are adaptation parameters, not reported original-study settings.

Reduced data contain one row per item with item ID, assignment list, arm, anchor/truth/units, comparison response/RT, raw estimate/draft/submission status, parsed value, relative error, anchor-scaled estimate, ratings and phase data. Numeric0 is valid; blank, invalid and timeout differ. Primary anchored inclusion requires a comparison response and valid estimate. Missing comparison is retained for sensitivity analyses. RT is framework response latency in seconds; coarse absolute timestamps are not subsecond timing evidence.

Analyse high-minus-low within each item across participants, preferably with participant/item models or item-level median contrasts scaled by that item's high-minus-low anchor gap. Baseline comparisons also require item adjustment. Do not mix raw units across questions or ignore list/sequence balance. Confidence and knowledge are post-treatment exploratory reports, not causal moderators.

Limitations: no item/anchor pretest, nine astronomy-only items, related knowledge domains, only three observations per arm, no reliability/norms, baseline has shorter sequence, and post-rating carryover may influence later estimates. Pilot independent unanchored responses and freeze revised anchors before confirmatory data collection. Synthetic plumbing tests and software screenshots do not establish physical timing, clinical validity or effect replication.


Web port: source-only shared runtime integration; see [alignment](transfer_node.md). Run with the [shared runner](https://taskbeacon.github.io/psyflow-web/?task=H000140-anchoring-estimation-task). Base config, full9-item count, timings and keys exactly match T000140.

Native automation limitation: actual Chinese screens and ASCII0 in the editor were visually verified. Automated OS Return was not captured, so physical-human submission on the default PTB keyboard is not claimed verified. Native QA/simulation uses explicitly synthetic keys/buffers; these are not OS-input evidence.

Validation: five native build gates passed (initial metadata failure retained), five native semantic tests, one reviewed imagegen plot, and19web/runtime tests plus scoped TypeScript including owned tests. Real browser full9item export produced53raw stages;6valid,2timeouts,1invalid, all exact native formula/assignment parity. All archived browser responses are synthetic operator tests although production configuration exports synthetic_fixture=false. This is not scientific validation of anchoring efficacy.
