# Alternative Uses Task / 物品替代用途生成 (Web)

Source-only web port of [canonical T000125](https://github.com/TaskBeacon/T000125-alternative-uses-task),v0.1.0,Chinese,behavioral. Shared runner: https://taskbeacon.github.io/psyflow-web/?task=H000125-alternative-uses-task .

## 1. Task Overview

Generate unusual but feasible uses for three ordinary objects. Original Chinese adaptation of the120s typed training procedure of Stevenson et al.(2014),not its four-minute assessment. No norms,clinical validity,human pilot,actual ratings or reliability are claimed.

## 2. Task Flow

![Task Flow](task_flow.png)

One shuffled balanced set of砖头,空铁罐,毛巾,seed125031. Instructions until space,then each object: readiness until space → fixed120s editable buffer → neutral saved1s. Goodbye then shared export UI. Return is a nonterminating editing key; generation_hit indicates a key only,not validity or creativity. Raw final text is retained. Use semicolons; no per-idea RT or early submit. Single-line browser input scrolls horizontally; native textbox wraps. [Alignment matrix](transfer_node.md) records all differences.

## 3. Configuration Summary

Identical canonical YAML:1280x800 white,pixel units,SimHei,three object trials,120s generation,1s saved,voice off. Object heading y260,short instructions y195/editor y-10/note y-220. Subject study ID101–999. No adaptation/controller. Shared runtime owns fullscreen,abort and export; no per-task app shell or hardware access. Browser software timestamps do not establish calibrated timing. Marker21 is conditional no-Return timeout; saved30/native close marks every completed window.

Reduced rows contain one object trial each,including generation_response_text,submitted_segment_count,coding_status and four separate null scores. Blank text also remains pending_human_review. No automatic semantic score or combined creativity scalar.

## 4. Methods (for academic publication)

The participant types unusual feasible uses for each named object for120s. The final full buffer is editable until the deadline and then saved verbatim. Whole-buffer revision,Chinese wording,three selected objects and feasibility coding are explicit original adaptations; the source instead submitted individual ideas. This changes visibility/editing and prevents individual-idea RT estimation.

Use the [offline coding protocol](references/coding_codebook.md). The Python stdlib coding utility is shipped unchanged with its pure helper so H exported reduced JSON/CSV can be coded without uploading data. Generate separate anonymous files for two raters; retain manifest privately. All items,including blanks,require explicit review. Structural/large numerical disagreements require third-person adjudication. Fluency,originality,flexibility and feasibility remain separate. Software checks declared distinct identities/independence but cannot authenticate them. Real training,cultural comprehension and rater agreement remain study responsibilities.

```powershell
python scripts/coding.py pack --input downloaded_reduced.json --out coding_private/session
python scripts/coding.py score --manifest coding_private/session/manifest.json --a coding_private/session/rater_A.json --b coding_private/session/rater_B.json --adjudication coding_private/session/adjudication.json --out coding_private/session/scores.json
```

Development/build/testing belong to shared psyflow-web. Native companion requires PsyFlow43e52fbfb5900e894d51ee7551cae971bb01f34e for Unicode multi-character commit repair; old pip releases may lack it. Native Unicode backend and browser committed text tests do not validate a participant's operating-system IME.

The notify workflow dispatches html-task-updated to TaskBeacon/psyflow-web. It requires TASKBEACON_ORG_DISPATCH_TOKEN with access to that repository and Contents: Read and write (Actions:write alone is insufficient); organization approval may be required. A missing secret skips dispatch and is not deployment success.
