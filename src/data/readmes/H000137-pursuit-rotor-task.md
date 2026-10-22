# Pursuit Rotor (web)

Source-only companion to canonical **T000137-pursuit-rotor-task**. Shared PsyFlow web runner owns the app, fullscreen, pointer primitive and all exports; no task-local app shell or direct jsPsych dependency.

## 1. Task Overview

Same explicit mouse adaptation and source limitations as T000137. Zhang et al.(2024) section2.3.3 supplies253px orbit radius,25px redtarget radius,0.13rotations/s and four15s trials. Two such batteries with60srest,2sready and5sITIs are documented adaptations. Ammons1947 full methods were unavailable; this is not mechanical norm equivalence or a validated consolidation test.

## 2. Task Flow

![Task Flow](task_flow.png)

Instruction ->4acquisition trials ->60srest ->4post-rest trials ->completion. Each trial2sready ->15stracking;5srest after trials1-3 of each battery. Full default226s scheduled duration is never shortened in browser production. Chronological labels, no random manipulation or adaptive controller.

## 3. Configuration Summary

Canonical config bytes are copied unchanged. Browser intentionally enables fullscreen and shows the system cursor during preparation/rest; tracking displays a small white cursor. Web layout uses20px instruction/status text, single paragraph line breaks, and moves the three status labels from y340 to y305CSSpx to fit650px-high viewports; wording is unchanged. Circle geometry is never responsively scaled; below600x650CSSpx Start fails closed. Web uses CSSpixels, not calibrated physical units. Use a mouse, same device/hand/settings throughout; operator metadata defaults remain visibly incomplete in exported rows until edited for research.

Every animation update samples the last known in-surface mouse position, including stationary periods. Mousemove establishes validity; blur, leave, hidden, resize and non-mouse pointer invalidate. Invalidation epochs prevent a same-frame exit/re-entry from bridging missing time. Resize invalidates the rest of that trial. The target follows real elapsed time, not frame count. rAF command time, sample time, last mouse-event time and actualcommanded coordinates are recorded separately; none measures hardware latency or photon onset.

Time-weighted left-hold TOT and RMS match native formulas. Both interval endpoints must be valid and sameepoch; >100msgaps wholly missing. Full15s denominator is an observed lower bound with missing data; observed-time proportion is separate. Empty input has null RMS/observedproportion. Eight reduced logical rows retain phase-level raw data and full trajectories. Practice and immediate post-rest differences require>=95%coverage in both rows. They do not prove learning or consolidation.

## 4. Methods (for academic publication)

See canonical source/logic/parameter audit. This port preserves instructions, stageorder, timing, geometry/speed, score definitions, trialcounts and data meanings. Native polls through PsychoPy; browser holds latest DOM mouse event until invalidated. Both report missing intervals explicitly. Automated validation establishes software/UI behavior, not physical-human skill or scientific validity.

Run using [the shared runner](https://taskbeacon.github.io/psyflow-web/?task=H000137-pursuit-rotor-task). `.github/workflows/notify-psyflow-web.yml` sends `html-task-updated` on main pushes. Requires `TASKBEACON_ORG_DISPATCH_TOKEN`; fine-grained PAT access to TaskBeacon/psyflow-web with Contents:Read and write (Actions:write alone is insufficient), and orgapproval if required.

The minimum viewport is also checked before every ready/tracking stage. Resizing during tracking invalidates the current trace, and the next stage refuses to start if the viewport cannot fit fixed geometry and labels.

Requires published psyflow-web `1ad548f55079cb0e9d4fcdec9b63f29d0ccd3f54` or a compatible descendant. [Port audit](transfer_node.md) and [validation/reproduction](references/validation/README.md) document all differences, failures, actual downloads and software-only limits.

