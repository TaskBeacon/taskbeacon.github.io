# Mental Scanning Task

Chinese browser adaptation of Kosslyn, Ball & Reiser (1978), Experiments2–3, derived from canonical [T000128](https://github.com/TaskBeacon/T000128-mental-scanning-task). This source-only task loads through the shared [PsyFlow web runner](https://taskbeacon.github.io/psyflow-web/?task=H000128-mental-scanning-task).

![Task procedure](task_flow.png)

The figure is illustrative; miniature maps preserve landmark order but are not calibrated distance plots. Original runtime map/check assets are800×600 and all distance analysis uses the canonical coordinate table.

Participants learn seven named locations, then complete two counterbalanced blocks: imagine a point moving from the cued start to a present target and press F on subjective arrival, or rapidly judge target membership with Fpresent/Jabsent. Both blocks use identical distance pairs and no visible map. A distance/RT slope describes reported behavior; it does not prove a unique mental representation or supply an ability diagnosis. No human pilot, normative data or hardware calibration is claimed.

Learning uses10s required study, up to60s additional study and seven independently shuffled location queries up to10s each. Two consecutive7/7 rounds are required, with at most5rounds. Failure ends before either test block. The numbered-location recognition criterion is an explicit adaptation, weaker than the original free-map reconstruction criterion.

The public default remains168test trials:84per block,42directed present pairs and42absent foils. Start cue4s; target8s fixed regardless of the first F/J response; after-block instruction adherence1–4up to30s. Intermediate landmark count is zero for all42present pairs under the declared24design-pixel corridor and strict between-endpoint projection. Distances span21unique lengths. Instructions do not predict a distance effect; rapid verification and adherence reports address, but cannot eliminate, strategy/demand confounds.

The separate config_diagnostic.yaml and explicit main(root,true) validation harness use16test trials total, retaining full learning criterion and original timing. The public runner calls main(root) and never selects that diagnostic implicitly. Browser QA evidence must not be described as a full168-trial human session.

Files remain aligned with native main/config/run_trial/controller/utils. Generic display, keyboard, fullscreen, export and software clock behavior belong to psyflow-web. Supported PythonRandom preserves random.Random schedules. Run through the shared runner workspace using its normal generate/build commands; this repository intentionally contains no app shell, bundled runtime, node_modules or dist.

Reduced data contain study/check/test/adherence rows plus one explicit web session_summary row. Filter row_kind=='test' before analysis. Relevant fields are criterion_passed, target_present, membership_correct, omitted, anticipation, valid_rt, arrival_reported, objective_arrival_accuracy(always null), arrival_rt_s, analysis_rt_s, distance_px, distance_normalized and intermediate_count. Unit probe_hit indicates a valid F/J was registered; it is not objective arrival accuracy or membership accuracy. Probe RT uses the shared stage clock, not coarse epoch subtraction. Raw stage rows retain timing/response markers. The summary row contains per-condition n, unique_distances, slope_s_per_100px, intercept_s and slope_difference_s_per_100px, equivalent to native separate summary JSON. Failed learning yields zero tests/null slopes.

Validation and synthetic exports are under validation/. Tests cover exact native100ID assignments/query order/schedules, full168compiled schedule, actual recorder/finalizer gating, failure paths, geometry, response validity and native summary parity. See transfer_node.md for alignment decisions and limitations.

The workflow .github/workflows/notify-psyflow-web.yml sends html-task-updated to TaskBeacon/psyflow-web on main pushes. TASKBEACON_ORG_DISPATCH_TOKEN must allow that repository with Contents:Read and write; Actions:write alone is insufficient and organization approval may be required. Repository publication and live runner deployment are separate checks.

Reference: Kosslyn, S.M., Ball, T.M., & Reiser, B.J.(1978). Visual images preserve metric spatial information: Evidence from studies of image scanning. Journal of Experimental Psychology:Human Perception and Performance,4(1),47–60. [DOI](https://doi.org/10.1037/0096-1523.4.1.47). Original methods anchors and adaptation decisions are in the canonical task references/task_logic_audit.md. MIT license covers this original implementation/material, not the original article.
