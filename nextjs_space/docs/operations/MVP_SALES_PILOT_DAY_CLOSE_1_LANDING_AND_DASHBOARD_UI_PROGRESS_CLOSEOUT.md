# MVP-SALES-PILOT-DAY-CLOSE-1 - Landing and dashboard UI progress closeout

## Phase

```text
MVP-SALES-PILOT-DAY-CLOSE-1 - Document daily closeout after landing and dashboard UI progress
```

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Baseline

```text
HEAD = origin/main = origin/HEAD = 243905a
Latest accepted commit = 243905a - MVP-SALES-PILOT-UI-DASHBOARD-1D: refine study CTA and M1 card copy
Working tree expected clean.
```

## Summary of the day

The day consolidated the shift to Student Experience-Led Delivery and advanced the student-facing UI in a concrete sequence:

* Landing Page estudiante moved to an accepted operative v0.1 state.
* Bexauri Visual Standard v0.1 became active as living repo guidance.
* The active top-down UI deliverable moved from landing to student dashboard.
* `/now` was refined into a mobile-first student dashboard centered on tutoring access and M1 entry.

The roadmap should not keep circling around gate tests by default. The next work should continue through the student experience:

```text
dashboard -> action M1 -> activity -> feedback -> continuity
```

## Landing closure

Landing Page estudiante - Bexauri MVP is accepted as operative v0.1.

Current landing closure:

```text
LANDING-1G = functional / visual landing closeout
LANDING_PAGE_STUDENT_MVP_APPROVED_DRAFT_REFINED
```

Registered debt:

```text
Later PRO audit of landing and Bexauri Visual Standard v0.1.
```

Direction:

* Do not keep polishing the landing by default.
* Future landing work should come from a specific audit, product decision, or explicit phase.
* Landing v0.1 acceptance does not declare Sales-Ready, MVP-Beta cerrado completo, payment readiness, real trial readiness, complete subscription readiness, L1 readiness, M2 readiness, staging, or production.

## Visual standard

`nextjs_space/docs/operations/BEXAURI_VISUAL_STANDARD_V0_1.md` is documented and active.

The standard has already guided landing and dashboard work.

Bexauri should transmit a modern guided-study app:

* serious;
* close to the student;
* clear;
* progressive;
* visually competitive;
* pedagogically grounded.

## Dashboard progress

The active deliverable defined and executed during the day was:

```text
STUDENT_DASHBOARD_TUTORING_M1_DELIVERABLE
```

Progress recorded:

* `DASHBOARD-1` implemented `/now` as a student dashboard with tutoring architecture and M1 entry.
* `DASHBOARD-1A` refined the dashboard into a mobile-first contained structure between header and footer/navigation.
* `DASHBOARD-1B` fused `Tu espacio de estudio` and `Que hago ahora` to expose the tutoring carousel earlier.
* `DASHBOARD-1C` removed redundant text/containers and added minimal `Estado / Ej. / Logro` indicators.
* `DASHBOARD-1D` warmed the `Comenzar Estudio` CTA and updated the M1 card copy:

```text
Fortalece tus destrezas en los 4 ejes de Matemáticas M1
```

Current dashboard state:

* Dashboard mobile-first direction is accepted as a contained vision.
* Dashboard 1D still requires final human mobile audit.
* The next product decision is what `Comenzar Estudio` should do operationally.

## Direction decisions

* Landing v0.1 is accepted.
* Dashboard v1 mobile-first is in final refinement.
* The roadmap should not revolve around repeated door/gate tests.
* Future phases should be top-down by student experience.
* The next focus is operational and pedagogical:

```text
dashboard -> Comenzar Estudio -> M1 boundary -> activity -> feedback -> continuity
```

## Living debts

1. Later PRO audit of landing and Bexauri Visual Standard v0.1.
2. Final human mobile audit of Dashboard 1D.
3. Define the operational behavior of `Comenzar Estudio`.
4. Decide whether `Comenzar Estudio` should:
   * go to the current activity;
   * open an M1 tutoring view;
   * start tutoring selection/enrollment;
   * open an intermediate M1 screen.
5. Replace placeholder indicators when reliable data exists:
   * `Ej. 0`;
   * `Logro --%`.
6. Connect the dashboard with the real M1 student experience.
7. Prepare the path toward the full manual M1 test through StudyLoad 10.
8. Avoid repeating login `/now` gate tests unless auth/routing changes or something fails.
9. Keep Landing v0.1 without more default polish.

## Next focus

The next block should start from:

1. Human mobile audit of Dashboard 1D.
2. Product decision for `Comenzar Estudio`.
3. First operational M1 boundary:
   * enter M1 tutoring;
   * open current activity;
   * or prepare an intermediate M1 screen.
4. Runbook preparation toward the complete manual M1 test through StudyLoad 10.

## Recommended phases

Implementation path:

```text
MVP-SALES-PILOT-UI-DASHBOARD-1E - Define and implement Comenzar Estudio behavior
```

Product-decision-first path:

```text
MVP-SALES-PILOT-UI-DASHBOARD-1E-READINESS - Decide Comenzar Estudio behavior and M1 entry boundary
```

## Limits respected

This closeout is documentation-only.

No changes were made to:

* app code;
* DB/base de datos;
* schema;
* migrations;
* auth;
* credentials;
* login;
* `/now`;
* StudyLoad;
* `Empezar`;
* responses;
* submit;
* self-report;
* completion;
* StudentAccess;
* checkout;
* real payment;
* real trial;
* complete functional subscription;
* staging/production;
* secrets;
* implementation of `Comenzar Estudio`.

## Result marker

```text
DAILY_CLOSEOUT_LANDING_AND_DASHBOARD_UI_PROGRESS_DOCUMENTED
```
