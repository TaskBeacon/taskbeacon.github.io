# Alternative Uses Task / 物品替代用途生成

| Field | Value |
|---|---|
| Name | Alternative Uses Task (AUT) |
| Version | 0.1.0 |
| URL / Repository | https://github.com/TaskBeacon/T000125-alternative-uses-task |
| Short Description | Timed generation of unusual feasible uses, followed by independent manual coding |
| Created By | TaskBeacon |
| Date Updated | 2026-08-31 |
| PsyFlow Version | Installed development runtime; required native StimUnit/TextBox2 APIs |
| PsychoPy Version | 2025.2.4 validation environment |
| Modality | Behavioral, keyboard text entry |
| Language | Chinese / SimHei |
| Voice Name | zh-CN-YunyangNeural, voice disabled |

## 1. Task Overview

An original Chinese AUT adaptation presents three everyday object names, with120s to type unusual but feasible uses for each. The implementation draws on the **two-minute typed training** procedure in Stevenson et al.(2014), not its separate four-minute assessment or entire multi-session intervention. It preserves raw text and ships an offline two-rater coding workflow; fluency, originality, flexibility and feasibility are separate outcomes. No automatic creativity score, norms, clinical validity, rater reliability or pilot evidence is claimed.

## 2. Task Flow

![Task Flow](task_flow.png)

### Block-Level Flow

| Step | Implementation |
|---|---|
| Setup | Subject ID,1280x800 white window,Chinese instructions until space |
| Block | One block; brick,tin_can,towel each once; native balanced shuffled scheduling,seed125031 |
| Trials | Readiness until space,120s generation,1s saved screen |
| Finish | Data saved; goodbye until space; no score feedback |

### Trial-Level Flow

| Phase | Visible content and response |
|---|---|
| ready | No object preview; participant rests until space |
| generation | Object name plus editable text; separate uses with Chinese/ASCII semicolons or newline; all final text retained at120s |
| saved | Neutral acknowledgement1s; next object readiness |

### Controller Logic

| Component | Rule |
|---|---|
| Adaptive controller | None; no timing or stimulus adaptation |
| Response policy | Full buffer remains editable until deadline; no early completion; no per-idea RT |

### Other Logic

| Component | Rule |
|---|---|
| Online output | generation_response_text plus submitted_segment_count; all four scores null and coding_status pending_human_review |
| Offline scoring | Separate blinded rater packs, strict completion checks,third-person adjudication for structural or large rating disagreements |
| Outcome definitions | Fluency=valid unique feasible uses; originality=mean1–5 among eligible uses; flexibility=eligible categories; feasibility=mean1–5 of valid unique uses plus feasible proportion |

See [coding protocol](references/coding_codebook.md) for the exact rubric,privacy practices and commands. The pack contains private linkage; raters receive only their own files. Independence declarations cannot authenticate human identities. Source files and ratings must be retained unchanged. There is no combined score.

## 3. Configuration Summary

Settings are from `config/config.yaml`.

### a. Subject Info

| Field | Meaning |
|---|---|
| subject_id | Three-digit study code101–999; no names requested |

### b. Window Settings

| Parameter | Value |
|---|---|
| size / units |1280x800 / pix |
| background / fullscreen | white / false |
| monitor width / distance |35.5cm /60cm; configured,not calibrated |
| font |SimHei |

### c. Stimuli

| Name | Type | Description |
|---|---|---|
| instruction,ready,saved,good_bye |text | Chinese instructions and neutral transitions |
| object_prompt |text | 砖头,空铁罐,毛巾 at(0,260),height42 |
| generation_hint,entry_hint |text | Separate lines at y195 and-220 |
| editor |textbox | Editable1050x280 buffer at(0,-10),letterHeight26,left alignment |

### d. Timing

| Phase | Duration |
|---|---|
| instruction,ready,good_bye | Until space |
| generation |120s; fixed window,typing does not end it |
| saved |1s |

### Triggers

| Event | Code |
|---|---|
| experiment_start |1 |
| generation onset / no-Return timeout |20 /21 |
| saved / experiment_end |30 /99 |

Behavioral markers only; no hardware timing calibration. Native monotonic flip timestamps are retained. Requested duration is not a measured interval; integer absolute timestamps must not be used for subsecond timing.

Run `python main.py human`, `python main.py qa`, or `python main.py sim --config config/config_sampler_sim.yaml`. QA/sim use **two-item,two-second synthetic fixture windows** and simulate continuation keys; they validate buffer preservation and scheduling, not spontaneous text generation or Chinese IME performance. Tests run with `python -m unittest discover -s tests -v`.

## 4. Methods (for academic publication)

Participants viewed three ordinary object names in a Chinese adaptation of the Alternative Uses Task. Each object appeared in a120s fixed generation window. Participants typed unusual yet feasible uses into an editable buffer, separating ideas with semicolons. The final buffer was preserved verbatim, including omissions, repetitions and incomplete final text. They could rest between objects. Object order was balanced and shuffled through PsyFlow with seed125031. Text remained visible and revisable throughout the window; unlike the source's individual submissions, this whole-buffer adaptation does not provide individual-idea response times.

The task uses the120s duration of the typed training procedure in Stevenson et al.(2014; doi:10.3389/fnhum.2014.00827). Three objects,Chinese localization,whole-buffer entry,readiness/save screens and the feasibility rubric are explicit adaptations. It is not a replication of the source four-minute pre/post assessment. No observed human data or validation is included. Actual Chinese comprehension,typing proficiency,object familiarity and rater agreement require study-specific piloting and preregistration.

Offline coding uses two independent raters blinded to participant identity and group labels through separately shuffled anonymous item packs. Validity,semantic duplicates,categories,originality1–5 and feasibility1–5 are reviewed. Structural disagreements or rating differences exceeding one point require a third-person decision. Fluency,originality,flexibility and feasibility are reported separately according to the frozen codebook; no estimates are substituted for missing human ratings. Empty trials retain pending status until reviewed. All checked-in response and rating fixtures are synthetic software tests,not pilot evidence.

Return is recorded only as a nonterminating editing key. Framework generation_hit does not indicate a valid use or correctness. Semicolons are the portable separator; native Return can add newline while the browser single-line field ignores newline.

Marker21 is conditional: emitted at deadline only when no Return editing key occurred. The native close timestamp and next saved onset30 mark the window boundary on all completed trials.

Dependency: use PsyFlow commit43e52fbfb5900e894d51ee7551cae971bb01f34e or later with the multi-character TextBox2 commit fix. Native text events,mid-text insertion,backspace and reset are verified; the headless desktop cannot provide OS IME validation. Check the target machine input method before collecting data.
