# BETA-LOCAL-OPS-1 — Local Student Fixture Recipe

## Status

PASSED — documentation-only operational recipe.

## Purpose

Document the repeatable local workflow for creating and validating a student fixture in E360 / Bexauri using the real local app UI/API flow.

This recipe was derived from the successful Ana Local-M1 validation performed in BETA-SECOND-STUDENT-LOCAL-2.

## Scope

Applies only to:

- Local app environment.
- Neon dev database.
- Known internal test fixtures.
- Manual MVP/beta preparation.
- Controlled local validation.

Does not apply to:

- Production.
- Public beta onboarding.
- Real student account creation.
- Automated seed/reset flows.
- Schema changes.
- Deploy operations.

## Core principle

Use real app UI/API flows wherever possible.

Avoid long pasted PowerShell/Node mutation scripts because they are fragile, hard to review, and prone to syntax deformation during copy/paste.

Preferred order:

1. Real app UI.
2. Existing authenticated local API calls from the browser console.
3. Small visible/reviewable scripts created as files in VS Code before execution.
4. Gemini Code Assist or similar tools only after stable behavior is confirmed.

## Validated recipe

1. Start from clean Git state.
2. Run the local app with `npm run dev`.
3. Login as local admin.
4. Create Student through admin UI.
5. Create matching User through local `/api/signup` using authenticated admin session.
6. Create PAES_M1 Enrollment through admin UI.
7. Open Enrollment and create completed initial Diagnostic through local `/api/diagnostics`.
8. Create Cycle 1 through admin UI.
9. Open Cycle 1 detail.
10. Curate fallback StudyLoad from `Initial practice` to a registry-matched title.
11. Login as the student in an incognito/private browser.
12. Validate `/now`.
13. Validate `Ver actividad` before start.
14. Click `Empezar`.
15. Validate activity form after start.
16. Submit MC answers.
17. Complete StudyLoad with self-report.
18. Verify admin evidence.

## Validated Ana Local-M1 fixture

- Student: Ana Local-M1
- Email: ana.local.m1@bexauri.dev
- Program: PAES_M1
- Cycle: 1
- StudyLoad: PAES M1 — Funciones lineales básicas
- Final StudyLoad status: completed
- Self-report: Me fue bien
- MC evidence: 8/8 answered, 8/8 correct
- Content: paes_m1_linear_functions_basic (v1)

## Required local API calls

### Create matching User

Use browser console while authenticated as admin:

(async () => {
  const password = prompt("Local student password, minimum 8 characters:");
  if (!password || password.length < 8) {
    console.log("Password missing or too short. User not created.");
    return;
  }

  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "ana.local.m1@bexauri.dev",
      password,
      name: "Ana Local-M1"
    })
  });

  const data = await res.json().catch(() => null);
  console.log({ status: res.status, ok: res.ok, data });
})();

Expected: `status: 201`, `ok: true`.

### Create completed initial Diagnostic

Use browser console from the Enrollment detail page:

(async () => {
  const enrollmentId = window.location.pathname.split("/").filter(Boolean).at(-1);

  const res = await fetch("/api/diagnostics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      enrollmentId,
      diagnosticType: "initial",
      status: "completed",
      resultSummary: "Local dev prerequisite diagnostic for student fixture Cycle 1."
    })
  });

  const data = await res.json().catch(() => null);
  console.log({ enrollmentId, status: res.status, ok: res.ok, data });
})();

Expected: `status: 201`, `ok: true`.

## Guardrails

Never do the following during this recipe:

- Do not use production.
- Do not use Abacus.
- Do not deploy.
- Do not run schema commands.
- Do not run Prisma migration or db push.
- Do not run direct SQL.
- Do not paste long mutation scripts into PowerShell.
- Do not print passwords, hashes, `.env`, `DATABASE_URL`, tokens, or connection strings.
- Do not create CycleDecision unless explicitly scoped.
- Do not close the cycle unless explicitly scoped.
- Do not authorize continuity unless explicitly scoped.

## Recommended future use

Use this recipe when preparing:

- second local student validation.
- local multi-student MVP checks.
- local demo fixtures.
- pre-production beta rehearsals.

For PAES_L1 or PAES_M2, first ensure a registry-matched content activity exists for that program.
