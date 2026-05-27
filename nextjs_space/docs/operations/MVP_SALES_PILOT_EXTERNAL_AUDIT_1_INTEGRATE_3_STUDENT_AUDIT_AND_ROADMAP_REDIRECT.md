# MVP-SALES-PILOT-EXTERNAL-AUDIT-1 - Integrate 3-student pilot audit and roadmap redirect

## 1. Purpose

This document integrates an independent external audit into Bexauri development documentation.

It redirects development away from automatic long validation chains that do not close the commercial-pedagogical circuit.

## 2. Source audit

* Source name: `informe_auditoria_externa_bexauri_piloto_3_estudiantes.md`
* Audit type: External read-only product / technology / process / strategy audit.
* Horizon: MVP-Beta / Sales-Ready closed pilot with 3 controlled students.
* Verdict: `NO_LISTO`.

## 3. Baseline context

Baseline before redirect:

```text
HEAD = origin/main = origin/HEAD = aaa6742
```

Latest accepted commit:

```text
aaa6742 - MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2B: define fixture readiness protocol
```

`MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2B` is accepted as useful Block 7 / L1 documentation, but it does not authorize direct continuation into DB-backed fixture execution as the default next path.

## 4. Audit findings to preserve

* Bexauri is not ready for a closed 3-student pilot representative of the real Sales-Ready target.
* M1 is partial but real.
* L1 is promising but internal-only and not ready for student/product use.
* M2 is not evidenced as a real route and blocks a full L1/M1/M2 pilot.
* `/now` appears single-program oriented and blocks a triad pilot unless scope is narrowed.
* Trial/access, payment/subscription, plan/access mapping, and payment reconciliation are not operational.
* Admin/tutor evidence exists partially, but multi-student operations are incomplete.
* Legal/support/payment boundaries remain incomplete.
* The process risks over-validating partial strands, especially L1, instead of closing the vertical commercial-pedagogical circuit.
* The first useful development milestone must be vertical and integrated.

## 5. Directional decision

Decision marker:

```text
PAUSE_AUTOMATIC_L1_VALIDATION_CHAIN_AS_NEXT_DEFAULT
```

Do not open `MVP-COMMERCIAL-L1-STUDYLOAD-INTERNAL-VALIDATION-2D` automatically.

L1 fixture/script work remains useful only if the closed-pilot scope explicitly requires it as a direct blocker.

Future validation phases must be justified by direct relationship to the first closed 3-student vertical milestone.

## 6. First development milestone

```text
MVP-SALES-PILOT-MILESTONE-1 - Closed 3-student vertical pilot skeleton
```

Core circuit:

```text
student enters -> access state is defined -> enrollment scope is defined -> /now shows the correct pilot experience -> student completes work -> feedback/evidence is captured -> admin/tutor can review -> support/payment/legal boundary is explicit -> go/no-go can be decided
```

## 7. Milestone 1 acceptance criteria

* Pilot scope explicit: full triad L1/M1/M2 or deliberately narrowed first pilot.
* Narrowed scope must not imply full L1/M1/M2 Sales-Ready.
* 3 controlled student accounts can be created or activated through an approved non-technical-normal path.
* Each controlled student has an access state that is visible or operationally recorded.
* `/now` supports selected scope or honestly shows reduced scope.
* At least one real StudyLoad can be completed through app in selected scope.
* Feedback/evidence captured in app.
* Admin/tutor can inspect evidence without direct technical DB workflow as normal operation.
* Payment/trial decision explicit: no payment, manual controlled payment, or trial-only.
* Legal/support/minor/payment boundaries documented enough for closed pilot.
* No PAES score/theta/mastery/adaptive AI/complete coverage/guaranteed improvement claims.
* Go/no-go can be produced from pilot dry-run evidence.

## 8. Updated short roadmap to Milestone 1

1. Step 1: `MVP-SALES-PILOT-SCOPE-1` - Lock closed 3-student pilot scope and first vertical milestone.
2. Step 2: `MVP-SALES-CONTENT-TRIAD-1` - Binary readiness decision for L1/M1/M2: `PILOT_USABLE` / `INTERNAL_ONLY` / `WAITLIST_OR_EXCLUDED`.
3. Step 3: `MVP-SALES-NOW-1A/1B/1C` - Audit/design/implement minimum `/now` experience required by selected pilot scope.
4. Step 4: `MVP-SALES-TRIAL-ACCESS-SANDBOX-1` - Define closed-pilot access/payment/trial boundary.
5. Step 5: `MVP-SALES-PILOT-DRY-RUN-1` - Controlled vertical dry-run with three controlled students or fixture-equivalent accounts using approved app/process surfaces.

## 9. Validation budget rule

Validation is allowed only if it directly unblocks one of:

* signup/access state;
* enrollment scope;
* `/now` pilot view;
* completion/feedback/evidence;
* admin/tutor visibility;
* access/payment/support boundary;
* go/no-go evidence.

Isolated internal validation should be deferred unless the pilot scope proves it is a blocker.

## 10. Roadmap impact

The Sales-Ready roadmap remains active, but the next path should close a controlled vertical milestone and explicitly narrow what is not ready.

## 11. Current program posture after audit

```text
M1 = PARTIAL_BUT_REAL
L1 = INTERNAL_ONLY_NOT_READY
M2 = NOT_EVIDENCED_NOT_READY
Triad experience = NOT_READY
Sales-Ready closed pilot = NO_LISTO
```

## 12. Recommended immediate next phase

Recommended next phase:

```text
MVP-SALES-PILOT-SCOPE-1 - Lock closed 3-student pilot scope and first vertical milestone
```

Gate:

* Roadmap block: 10 - Internal pilot and sales-ready go/no-go, with dependencies on blocks 4, 5, 7, 8, and 9.
* Sales-ready relevance: direct/high.
* Dependency: external audit integrated; current L1 validation chain paused as default.
* What it advances: first concrete vertical milestone for a controlled 3-student pilot.
* What it does not advance: it does not yet implement `/now`, access, payment, content, or pilot execution.
* Priority verdict: `APPROVED_NEXT_PHASE_AFTER_AUDIT_REDIRECT`.
* Authorization status: requires Mauricio explicit authorization before execution.

## 13. Result marker

```text
MVP_SALES_PILOT_EXTERNAL_AUDIT_1_REDIRECT_ACCEPTED
```
