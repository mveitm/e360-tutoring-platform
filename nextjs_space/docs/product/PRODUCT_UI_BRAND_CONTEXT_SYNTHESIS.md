# Product/UI/Brand Context Synthesis

## 1. Purpose and Source Status

This document synthesizes three external Word documents that were supplied as critical product, UI, and brand context for Bexauri / E360.

The original `.docx` files are not versioned in the repo by this phase. This Markdown synthesis is versioned so future agents can use it as product/UI/brand context during Context Gates.

This document does not replace GOV-CONTEXT governance docs. If this synthesis conflicts with Git preflight or canonical GOV-CONTEXT governance docs, Git and the governance docs win.

Source files:

* `Mvp Ui Flow 1 Secuencia Canonica Bexauri Cierre Dia.docx`: found and read from `C:\Projects\e360-product-context-inputs`.
* `MVeit-Bexauri-Definicion de Producto.docx`: found and read from `C:\Projects\e360-product-context-inputs`.
* `Bexauri_Guia_Identidad_Visual_v1_1.docx`: found and read from `C:\Projects\e360-product-context-inputs`.

Source note:

* The file named as the visual identity guide contains strong product and learning-method direction. In the extracted text available to this phase, it does not provide a conventional color, typography, logo, spacing, or component-spec identity system. Future UI/brand phases should not invent visual rules from this file name alone.

## 2. Executive Product Synthesis

Bexauri is an intelligent tutoring app and learning-regulation system for PAES preparation. Its core is not a task-management platform. Its intended product center is a Sistema Regulador del Aprendizaje: the student studies, responds, reflects, receives feedback, and continues while Bexauri regulates internal learning structures.

The student problem is friction in sustained PAES preparation: students need a clear study path, fast learning feedback, confidence, continuity, and adaptation without being forced to manage internal educational or administrative states.

The human-machine learning system Bexauri is trying to become has three roles:

* Student: learns inside Bexauri, solves short activities, self-reports, reviews feedback, and continues.
* System/app: creates and maintains internal tutoring structures, captures evidence, regulates continuity, updates the roadmap, and presents the next useful learning step.
* Tutor/human supervisor: protects quality, monitors evidence, detects risk, answers asynchronously, adjusts when needed, and improves the program without becoming the normal bottleneck.

The ethical/quality posture is human-supervised continuity. Bexauri should be adaptive and helpful, but should not pretend that unsupported automation, expert validation, PAES scoring, theta, mastery, or autonomous AI authority already exists.

## 3. Product Definition Decisions

Core product promise:

* Bexauri gives students a guided, calm, evidence-aware PAES tutoring experience.
* The app should help the student know what to study now, learn from errors, and keep moving.
* The system should internally maintain the learning path and evidence, instead of exposing administrative complexity to the student.

Intended users and stakeholders:

* Students preparing for PAES.
* Tutor/human supervisors who monitor evidence and quality.
* Parent/payer stakeholders, if present in future commercial flows, need a clear promise that does not overstate current coverage or readiness.

Student value proposition:

* Clear entry into tutorias from web/mobile/tablet.
* Simple dashboard with tutorias such as PAES L1, M1, and M2.
* Short learning loads, feedback by question, and continuity.
* Ability to review prior performance and feedback.
* Eventual access to essay/practice-test experiences when aligned with roadmap and implementation.

Tutor/admin value proposition:

* Evidence review without manual release of every next step.
* Visibility into student responses, roadmap pertinence, commitment, satisfaction, and points needing intervention.
* Ability to adjust or advise strategically.

What the product should not promise yet:

* Public Sales-Ready completeness from M1-only capability.
* Full PAES L1/M1/M2 operational coverage until implemented and verified.
* Expert review as instant or constant if not operationally guaranteed.
* Autonomous AI tutoring authority.
* PAES score prediction, theta, mastery, or adaptive-AI claims unless separately implemented and validated.

Constraints for MVP-Beta-Pre-Sales-Ready:

* M1 may be used as a closed lab for 2-3 students.
* Expectations must be controlled.
* Manual supervision may exist, but it must be explicitly understood as closed-lab operation.

Constraints for MVP-Beta-Sales-Ready:

* The public offer must support PAES M1, PAES M2, and Competencia Lectora L1 sufficiently.
* The public flow cannot depend on hidden technical manual setup for normal signup, payment, program assignment, or continuity.

## 4. Canonical UI / Student Flow Synthesis

Main student journey:

* Student enters through landing/signup or app/web path.
* Student understands what Bexauri is and the offer.
* Student reaches a simple dashboard, not an administrative panel.
* Dashboard shows tutoring options as clear cards/tags, such as PAES L1, M1, and M2.
* Student enrolls in a tutoria or continues an existing one.
* Student sees a calm welcome/orientation for that tutoria.
* Student starts the current learning load from a clear call to action.
* Student completes the activity, self-report, feedback, and closure inside the activity experience.
* Bexauri prepares the next useful step, or the student returns to dashboard by choice.

Expected start-of-day or session-start flow:

* Student opens Bexauri.
* Dashboard or tutoring home shows what is available now.
* `/now` or its future equivalent should orient the current step, not expose internal cycle mechanics.
* The current load should be visible with a direct action such as starting study.

Expected end-of-day or closure flow:

* The student should close a learning load inside the activity flow.
* The flow should include response submission, self-report, feedback, and completion.
* Student can choose to continue with the next load or return to dashboard.
* The student should not be sent back to `/now` just to finish an internal state.

Feedback, completion, review, and continuity:

* Feedback should be inline by question.
* Explanations should be concise, expandable, and connected to the specific response.
* Errors should be treated as learning evidence, not punishment.
* Human review may happen, but should not normally block the next useful student action.
* Continuity should be automatic when safe, rule-based at MVP if needed, and later more intelligent.

Canonical sequence informing `/now`, activity pages, completion, self-report, and next-step guidance:

* Orient the student.
* Let the student study.
* Capture response evidence.
* Capture self-report while the experience is fresh.
* Show inline feedback.
* Close the load internally.
* Prepare or show the next step.
* Keep dashboard progress orienting and non-gamified.

Tension with current direction:

* The UI flow document aligns strongly with microloads, dynamic/invisible diagnosis, inline feedback, and non-blocking continuity.
* The product definition document still contains older language around a 20-30 minute diagnostic, expert review before the next load, and later delivery of first load. Those items need reconciliation under current GOV-CONTEXT.

## 5. Visual Identity / Brand Synthesis

Brand personality:

* Calm.
* Intelligent.
* Supportive.
* Clear.
* Serious about learning quality.
* Non-punitive toward mistakes.

Tone and voice:

* Explain clearly without sounding bureaucratic.
* Reduce anxiety.
* Avoid exam-punishment framing.
* Treat mistakes as useful signals.
* Be honest about human supervision without promising constant human intervention.

Visual principles:

* The student interface should feel like an intelligent tutoring app, not an administrative task system.
* The dashboard should be simple and minimal, with a workspace and clear tutoring labels/cards.
* Progress should orient and build confidence, not create ranking pressure.
* Activity pages should be quiet, readable, and focused on learning.
* Feedback should live near the question or exercise it explains.

Color, typography, and layout principles available from sources:

* The extracted source text does not define a specific palette, typography system, logo rule, spacing scale, or component library.
* It does describe a simple dashboard with a left menu and workspace, and an aspiration toward a modern AI-dashboard feel.
* Future UI phases should treat this as directional mood and workflow guidance, not a finished visual identity specification.

Brand risks to avoid:

* Presenting M1-only as public Sales-Ready.
* Making Bexauri feel like a bureaucratic task tracker.
* Overpromising full PAES coverage before M1/M2/L1 are operational.
* Promising constant expert review or adaptive AI beyond what is implemented.
* Creating long, rigid first experiences that increase abandonment.
* Making students wait on human review as the normal path.

What should not be implemented blindly:

* A long diagnostic just because it appears in older product language.
* 20-30 minute loads as default.
* Expert review as a release gate for every next load.
* A static roadmap/calendar if it conflicts with dynamic learning evidence.
* A polished public offer that exceeds current Pre-Sales-Ready capability.

## 6. Alignment With Current GOV-CONTEXT

Current GOV-CONTEXT decisions remain active:

* M1-only is not public Sales-Ready.
* Sales-Ready requires PAES M1, PAES M2, and Competencia Lectora L1 sufficiently operational.
* Pre-Sales-Ready may use M1 as a closed lab with 2-3 students.
* Public offer must not overpromise.
* No phase may proceed from memory alone.
* Context Gate is required before design, implementation, verification, or commit.
* Human supervision should protect quality without becoming the normal bottleneck.

The Word-doc synthesis supports the GOV-CONTEXT direction where it says:

* Student learns, Bexauri regulates internally, and the supervisor protects quality.
* LearningCycles and StudyLoad states should be internal, not student administrative burden.
* Feedback should be inline and pedagogically useful.
* Diagnosis should become dynamic and invisible rather than a blocking wall.
* Supervision should not interrupt the normal learning cycle.

The Word-doc synthesis needs reconciliation where it says or implies:

* A 20-30 minute initial diagnostic.
* Expert review before the first or next load.
* A cycle that waits for review and release.
* A premium public subscription giving all tutorias before Sales-Ready coverage is operational.

## 7. Active Guidance for Future Phases

Guidance for signup/trial/access work:

* Signup should not imply immediate full tutoring access unless access, trial, payment, and program coverage are actually implemented.
* Trial states should be clear and not overpromise Sales-Ready capability.
* Access states should support the closed Pre-Sales-Ready lab without pretending to be a public Sales-Ready product.

Guidance for `/now` and student-state UI:

* `/now` should orient the next useful learning step.
* It should avoid exposing internal cycle language as student work.
* Pending/no-access states should be calm and honest.
* It should not become an administrative station required to finish activities.

Guidance for activity/completion/feedback flows:

* Activity flow should integrate answers, self-report, feedback, completion, and continuation.
* Feedback must be inline and connected to the student's answer.
* Microloads are the active preferred direction.
* The system should prepare next work without normal human-release blocking.

Guidance for tutor/admin oversight:

* Tutor/admin work should focus on monitoring, risk detection, roadmap pertinence, asynchronous questions, and strategic adjustment.
* Admin/tutor tooling should not create hidden technical manual work as the normal student path.
* Human review is quality control and accompaniment, not routine continuity gate.

Guidance for brand/UI copy:

* Use calm, clear, supportive language.
* Avoid administrative terms for students when a pedagogical term or direct action is enough.
* Do not promise constant expert intervention, complete PAES coverage, or autonomous intelligence beyond current evidence.
* Do not frame mistakes as failure.

Guidance for product/UI/brand context need:

* Any phase touching `/now`, activity UI, completion, feedback, dashboard, onboarding, trial copy, subscription copy, public offer, tutor/admin review, or brand presentation should read this synthesis before Context Gate closes.

## 8. Tensions and Reconciliation Items

Long initial diagnosis vs dynamic/invisible diagnosis:

* Classification: needs reconciliation.
* Older product definition includes an initial diagnostic of about 20-30 minutes.
* Current direction and source evolution favor invisible dynamic diagnosis through each microload.

20-30 minute loads vs microloads:

* Classification: needs reconciliation.
* Older language treats 20-30 minutes as a concentration threshold.
* Current direction favors loads around a small number of exercises, with faster cycles and less abandonment risk.

Waiting for expert review vs non-blocking continuity:

* Classification: historical/superseded for normal flow.
* Older product definition says responses go to expert review and the next load comes soon.
* Current direction says supervisor review protects quality but should not be the normal bottleneck.

Static roadmap/calendar vs adaptive/dynamic roadmap:

* Classification: active alignment with caution.
* Source docs support a roadmap, but the roadmap should be dynamically adjusted by evidence.
* Future implementation can begin with controlled rules, not autonomous AI claims.

Polished public promise vs current Pre-Sales-Ready lab state:

* Classification: unresolved for future commercial phases.
* Source docs describe landing, trial, subscription, and access to tutorias.
* GOV-CONTEXT says public Sales-Ready requires M1/M2/L1 operational and must not be M1-only.

Brand/visual aspiration vs current MVP reality:

* Classification: unresolved.
* Source docs want a simple modern AI-dashboard feel.
* The extracted docs do not provide enough visual-system detail to implement brand/UI blindly.

Student learns inside Bexauri, Bexauri regulates internally:

* Classification: active alignment.
* This is strongly repeated in the UI flow source and GOV-CONTEXT handoff.

Inline feedback and calm learning tone:

* Classification: active alignment.
* All future activity and completion work should preserve this direction.

## 9. Non-Goals and Boundaries

This document does not:

* Implement UI.
* Change runtime behavior.
* Change commercial offer.
* Declare Sales-Ready.
* Resolve every product decision.
* Replace the original source docs.
* Authorize `MVP-SALES-TRIAL-3C-FIX`.
* Copy or version the original `.docx` files.
* Replace GOV-CONTEXT governance docs.

## 10. How Future Agents Should Use This Document

1. Read Git preflight first.
2. Read GOV-CONTEXT governance docs.
3. Read the Living Memory Index.
4. Read this synthesis when product/UI/brand context matters.
5. Complete Context Gate.
6. Stop if source, product, UI, or brand context is insufficient for the proposed phase.
