# MVP-STUDENT-REQ-1 — Student Experience Triage for MVP-Beta and MVP-Alfa

## Status

PASSED — direction and product requirements triage.

## Purpose

Document and classify the owner vision for the student experience in Bexauri.

This document uses two inputs:

1. Owner draft: student experience vision for Bexauri MVP.
2. Gemini / Deep Research optimization: adaptive pedagogy, ZDP, scaffolding, response latency, mastery thresholds, and roadmap suggestions.

The goal is not to implement everything immediately.

The goal is to transform the student experience vision into a staged roadmap that preserves:

- architecture,
- operativity,
- pedagogical logic,
- MVP discipline,
- and the core E360 / Bexauri learning-regulation model.

## Product evolution terminology

From this point forward, the MVP roadmap should distinguish three stages.

### MVP-Beta

MVP-Beta is the first monetizable product.

It is guided, controlled, manually operated where necessary, and honest in its promises.

It should prove that a student or apoderado can pay for a weekly guided PAES learning loop.

MVP-Beta may use manual operations behind the scenes.

MVP-Beta should not pretend to be fully adaptive, autonomous, AI-driven, or complete.

### MVP-Alfa

MVP-Alfa is the final mature MVP.

It is still MVP, but more complete, robust, repeatable, and productized.

It should reduce manual friction, improve student experience, strengthen feedback, broaden coverage, and make the service easier to operate.

MVP-Alfa is the mature version of the MVP, not the final platform.

### Post-MVP

Everything after MVP-Alfa is no longer MVP.

Post-MVP includes advanced platform capabilities such as autonomous adaptation, AI agents, robust analytics, multi-area coverage, automated onboarding, parent dashboards, and broader scale.

## North Star student experience

The owner vision describes a future student experience where the student can:

- arrive through a landing page,
- understand Bexauri,
- start a free trial or subscription,
- use the product on web, mobile, or tablet,
- access a simple dashboard,
- see PAES tutoring areas L1, M1, and M2,
- access tools such as Ensayos,
- enroll in a tutoring path,
- take diagnostics,
- receive adaptive study loads,
- complete exercises,
- receive feedback,
- review explanations,
- continue through cycles,
- take practice exams,
- eventually close a tutoring path after reaching target skills.

This is the correct product north star.

However, it is not the immediate development scope.

## Core chain that must be preserved

Every phase must protect this chain:

diagnostic / initial state
-> learning cycle
-> study load
-> student execution
-> evidence capture
-> human/admin review
-> pedagogical decision
-> continuity

If a feature does not strengthen this chain, it should not be prioritized for MVP-Beta unless it removes a critical operational blocker.

## MVP-Beta definition

MVP-Beta should be:

Guided PAES M1 weekly learning-regulation loop.

Initial operating shape:

- PAES_M1 only.
- 2 to 4 week guided pilot.
- 1 active tutoring path.
- 1 cycle per week.
- 1 registry-matched interactive StudyLoad per cycle.
- MC submission.
- Self-report.
- Admin evidence review.
- Manual evidence-backed CycleDecision.
- Manual cycle close.
- Manual continuity.
- Manual preparation of next cycle/load.

MVP-Beta should be monetizable as a guided service, not as a fully automated platform.

## MVP-Alfa definition

MVP-Alfa should be the mature MVP experience.

It may include:

- more polished student dashboard,
- clearer student onboarding,
- student-facing diagnostic experience,
- better post-answer feedback,
- visible review states,
- clearer study history,
- coherent PAES M1 sequence,
- first expansion to L1 or M2 if content exists,
- lighter manual friction,
- better admin review workflow,
- basic notifications or reminders,
- stronger paid pilot operations.

MVP-Alfa should still avoid overclaiming AI, adaptivity, or full PAES automation.

## Post-MVP definition

Post-MVP may include:

- true adaptive engine,
- latent ability estimation,
- response latency as algorithmic signal,
- mastery thresholds by skill,
- scaffolding levels,
- AI-generated explanations,
- AI-generated next loads,
- autonomous tutor agents,
- full PAES L1 / M1 / M2 coverage,
- Ensayos at scale,
- NEM calculator,
- apoderado dashboard,
- subscription automation,
- app store mobile release,
- analytics and cohort scaling.

These are valid product directions, but they should not contaminate MVP-Beta development.

## Requirement triage

### Landing page, trial, and subscription

Owner requirement:
Student receives a link, reaches landing page, understands Bexauri, starts 7-day free trial or buys subscription.

Classification:
MVP-Beta: manual or lightweight external operation.
MVP-Alfa: simple landing and guided onboarding.
Post-MVP: full subscription automation.

Decision:
Do not prioritize in app core immediately.

Reason:
MVP-Beta can be monetized manually or with external payment links while the learning loop is validated.

### Mobile app

Owner requirement:
Student can download mobile app and follow the same path as web.

Classification:
MVP-Beta: responsive web only.
MVP-Alfa: mobile-first web experience.
Post-MVP: native app store release.

Decision:
Do not build native app now.

Reason:
Current focus should be web/mobile responsive operation, not app distribution.

### Dashboard similar to Gemini

Owner requirement:
Simple dashboard with left sidebar and workspace, aesthetically similar to Gemini.

Classification:
MVP-Beta: strengthen /now as student work hub.
MVP-Alfa: fuller student dashboard.
Post-MVP: advanced workspace with tools and tutoring navigation.

Decision:
Do not build full dashboard now.

Immediate development target:
Student /now MVP clarity.

### PAES L1, M1, M2 tutoring menu

Owner requirement:
Minimalist tutoring labels for PAES L1, M1, and M2.

Classification:
MVP-Beta: PAES_M1 only.
MVP-Alfa: add second area after registry content exists.
Post-MVP: full L1/M1/M2 coverage.

Decision:
Do not expose L1/M2 as active tutoring paths until content and flow are ready.

Reason:
Showing unavailable tutoring areas creates product debt and user disappointment.

### Ensayos tool

Owner requirement:
Student can take interactive PAES practice tests at any time, regardless of tutoring enrollment.

Classification:
MVP-Beta: out of scope.
MVP-Alfa: limited diagnostic/mini-essay concept.
Post-MVP: full Ensayos module.

Decision:
Do not implement free Ensayos tool now.

Reason:
Ensayos are strategically important but can distract from the weekly learning-regulation loop.

### Continuous tutoring lifecycle

Owner requirement:
Tutoring does not stop unless student cancels, subscription ends, or objective skills are reached.

Classification:
MVP-Beta: manual continuity.
MVP-Alfa: clearer tutoring state and closure logic.
Post-MVP: automated lifecycle and subscription-aware state.

Decision:
Keep manual continuity for MVP-Beta.

Reason:
The platform already supports cycles, close, and continuity. The priority is rehearsing the loop, not automating the full lifecycle.

### Welcome and explanation of cycle

Owner requirement:
After enrolling, student receives a welcome and summarized explanation of how the cycle works.

Classification:
MVP-Beta: yes, high priority.
MVP-Alfa: richer onboarding.
Post-MVP: personalized onboarding.

Decision:
Pass to development soon.

Suggested phase:
MVP-STUDENT-UX-1 — Student /now onboarding and cycle explanation.

### Diagnostic

Owner requirement:
Student starts diagnostic, receives summary, and is told answers will be reviewed and first load will be ready soon.

Classification:
MVP-Beta: yes, but simple.
MVP-Alfa: richer diagnostic summary.
Post-MVP: adaptive diagnostic engine.

Decision:
Pass to roadmap.

Suggested phase:
MVP-DIAGNOSTIC-1 — Student-facing diagnostic entrypoint and completion state.

### ZDP / next difficulty

Owner requirement:
First load should be based on current level plus slightly higher difficulty, using constructivism, ZDP, and scaffolding.

Classification:
MVP-Beta: manual expert judgment.
MVP-Alfa: documented decision rules.
Post-MVP: algorithmic/adaptive engine.

Decision:
Do not implement algorithm now.

Reason:
The concept is central, but automatic difficulty selection requires research, modeling, governance, and data.

MVP-Beta implementation:
Human/admin chooses next load based on evidence.

### Feedback after answering

Owner requirement:
Student can see whether each answer was correct and open step-by-step explanation, with summarized and expanded modes.

Classification:
MVP-Beta: basic correctness and short explanation.
MVP-Alfa: expandable explanations.
Post-MVP: full scaffolding levels and AI-assisted explanations.

Decision:
Pass to roadmap, but in reduced form.

Suggested phase:
MVP-FEEDBACK-1 — Basic post-submission feedback.

### Expert review state

Owner requirement:
After completing a load, student is told it will be reviewed and next load will arrive soon.

Classification:
MVP-Beta: yes, high priority.
MVP-Alfa: richer review dashboard.
Post-MVP: notifications and active micro-challenges.

Decision:
Pass to development soon.

Suggested phase:
MVP-STUDENT-UX-2 — Student review state after load completion.

### Skill update and next load determination

Owner requirement:
Review updates student skill level and determines next load.

Classification:
MVP-Beta: manual CycleDecision.
MVP-Alfa: structured decision rubric.
Post-MVP: automated skill inference.

Decision:
Use manual evidence-backed CycleDecision for MVP-Beta.

Suggested phase:
MVP-DECISION-1 — Evidence-backed decision language and student-facing summary.

### Tutoring closure

Owner requirement:
If student reaches target skills, the tutoring path closes and report is delivered.

Classification:
MVP-Beta: out of scope except manual note.
MVP-Alfa: manual closure report.
Post-MVP: automated completion criteria.

Decision:
Do not prioritize for first paid pilot.

Reason:
The first MVP-Beta validates short-cycle continuity, not full tutoring completion.

### Recommending Ensayos periodically

Owner requirement:
After progress, recommend taking Ensayo.

Classification:
MVP-Beta: manual recommendation only.
MVP-Alfa: limited recommendation state.
Post-MVP: integrated Ensayos engine.

Decision:
Do not implement now.

### Calculadora NEM

Owner requirement:
Student can calculate NEM.

Classification:
MVP-Beta: out of scope.
MVP-Alfa: optional lightweight tool.
Post-MVP: full tools section.

Decision:
Do not implement now.

## Gemini / Deep Research optimization triage

### Latent ability theta

Classification:
Post-MVP.

Decision:
Do not implement in MVP-Beta or MVP-Alfa unless a formal model is designed later.

### Mastery thresholds 80%, 95-98%

Classification:
MVP-Alfa as documented rubric; Post-MVP as algorithm.

Decision:
Do not hardcode now.

### Response latency

Classification:
Post-MVP algorithmic signal.

MVP-Beta:
Could record timestamps later if already easy, but should not drive decisions now.

### Productive struggle 60-75% success probability

Classification:
MVP-Alfa as pedagogical principle; Post-MVP as adaptive algorithm.

MVP-Beta:
Use as human review guideline only.

### Scaffolding levels

Classification:
MVP-Beta: basic explanation.
MVP-Alfa: expandable explanation.
Post-MVP: full 4-level scaffolding.

### 48-hour review mitigation

Classification:
MVP-Beta: clear review state.
MVP-Alfa: simple reminders.
Post-MVP: micro-challenges and push notifications.

## Recommended roadmap from here

### Phase 1: MVP-STUDENT-REQ-1

This document.

Outcome:
Student experience requirements classified into MVP-Beta, MVP-Alfa, and Post-MVP.

### Phase 2: MVP-LOCAL-2

Guided MVP gap audit.

Outcome:
Compare current app against MVP-Beta needs.

### Phase 3: MVP-STUDENT-UX-1

Strengthen /now as MVP-Beta student work hub.

Likely scope:
- welcome/cycle explanation,
- clearer next action,
- review state language,
- completed state language.

### Phase 4: MVP-CONTENT-1

Create 4-week PAES_M1 content sequence using existing registry activities.

### Phase 5: MVP-DECISION-1

Define evidence-backed decision language and student-facing review summary.

### Phase 6: MVP-FEEDBACK-1

Add basic post-submission feedback per item.

### Phase 7: MVP-OPS-1

Define guided paid-pilot operations protocol.

## Development priority

Immediate development should focus on:

1. Student clarity in /now.
2. Diagnostic as visible first step.
3. Review state after completion.
4. Basic feedback after MC submission.
5. Admin decision and student-facing summary.
6. 4-week PAES_M1 sequence.

Do not develop yet:

- full dashboard,
- native app,
- L1/M2 active tutoring,
- Ensayos,
- NEM calculator,
- AI tutor,
- adaptive algorithm,
- latent ability model,
- full scaffolding,
- notifications,
- payment automation.

## Final verdict

The owner vision is valid and should remain the north star.

For MVP-Beta, the product should become:

Guided PAES M1 weekly learning-regulation service.

For MVP-Alfa, the product should become:

A more complete and polished MVP with stronger student dashboard, feedback, sequencing, and operational maturity.

Everything after that should be treated as Post-MVP platform evolution.

The next development work should be selected only if it strengthens the core chain:

diagnostic / initial state
-> learning cycle
-> study load
-> student execution
-> evidence capture
-> human/admin review
-> pedagogical decision
-> continuity