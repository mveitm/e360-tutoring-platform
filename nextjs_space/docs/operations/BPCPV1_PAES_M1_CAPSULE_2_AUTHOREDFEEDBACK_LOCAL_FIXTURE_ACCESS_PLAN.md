# BPCPv1 PAES M1 Capsule 2 AuthoredFeedback Local Fixture Access Plan

## 1. Executive verdict

Verdict:

```text
LOCAL_FIXTURE_ACCESS_PLAN_BLOCKED_BY_AUTH_ACCESS
```

Result:

```text
M1_CAPSULE_2_AUTHOREDFEEDBACK_LOCAL_FIXTURE_ACCESS_PLAN_DEFINED
```

Recommended route:

```text
Route C: BLOCKED_LOCAL_STATE_DIAGNOSTIC with primary auth-access handoff
```

Recommended next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-AUTH-ACCESS-HUMAN-HANDOFF-1
```

This phase defines the safe access/fixture route for a later student-UI smoke. It does not execute smoke, start the app, log in, call APIs, inspect secrets, mutate fixtures, reset DB, or edit code.

## 2. Purpose

Define the minimum safe path to obtain a local/dev student session and an accessible StudyLoad for PAES_M1 capsule 2 so a later phase can verify authoredFeedback display through the existing student UI.

The plan answers:

```text
What safe route can provide a local/dev account/session and a capsule 2 StudyLoad for manual UI smoke without secrets, DB reset, broad fixture mutation, code changes, browser automation, or API-only tests?
```

## 3. Baseline and current blocker

Baseline before this phase:

```text
a1e97a8
```

Current blocker carried from smoke evidence repair:

- No authenticated local/dev student UI session was available.
- No human browser login handoff was available.
- No `/now` observation was made.
- No capsule 2 StudyLoad was opened by UI.
- No q1-q4 UI submission occurred.
- No brief/complete feedback was observed in the student UI.

The current primary blocker is auth/access handoff, because fixture availability cannot be safely confirmed through the student UI until a human can log in locally without sharing credentials.

## 4. Governance basis / documentos leidos

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CURRENT_AGENT_HANDOFF_MVP_M1.md`
- `nextjs_space/docs/operations/DOCUMENTATION_INDEX_MVP_M1.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_AUTHOREDFEEDBACK_SMOKE_EVIDENCE_REPAIR.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_AUTHOREDFEEDBACK_SMOKE_REVIEW.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_AUTHOREDFEEDBACK_MANUAL_LOCAL_SMOKE.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_AUTHOREDFEEDBACK_SMOKE_READINESS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULE_2_CODE_PHASE_A_REVIEW.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_CODE_PHASE_AUTHORIZATION_REVIEW.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_NARROW_IMPLEMENTATION_PLAN.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_UI_API_LIFECYCLE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FEEDBACK_DATA_SHAPE_GUARDRAILS.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_KEY_VALIDATION.md`
- `nextjs_space/docs/operations/BPCPV1_PAES_M1_CAPSULES_2_3_5_FINAL_AUTHORING.md`

## 5. Read-only technical surface inspected

- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`
- `nextjs_space/app/api/study-loads/[id]/responses/route.ts`
- `nextjs_space/app/api/study-loads/[id]/complete/route.ts`

Read-only search was run for local/dev, fixture, authoredFeedback, StudyLoad, login/access, seed, secret, credential, and prior smoke blocker terms across allowed project paths.

Observed technical facts:

- `StudyLoadAuthoredFeedback` supports `briefId`, `completeId`, `version`, `brief`, and `complete`.
- `StudyLoadItem` supports optional `authoredFeedback`.
- `paes_m1_linear_equations_basic` exists in the static content registry with `contentVersion: v1`.
- q1-q4 have authoredFeedback in source.
- The answer form can render brief feedback and expandable complete feedback after response feedback is returned.
- The responses route creates or replaces `mc_submission`, returns feedback, and does not complete the StudyLoad.
- The complete route remains separate, requires self-report, completes the StudyLoad, and invokes continuity only after completion.

## 6. Current known-good evidence

- Capsule 2 source exists: `paes_m1_linear_equations_basic`.
- q1-q4 have authoredFeedback in source.
- Existing answer form can render brief and complete feedback.
- Responses route uses `mc_submission` and does not complete StudyLoad.
- Complete route remains separate and self-report based.
- Prior code review passed.
- Prior smoke-readiness passed.
- Prior smoke evidence repair preserved scope safety.

## 7. Current missing evidence

- No authenticated local/dev student UI session.
- No `/now` observation.
- No capsule 2 StudyLoad opened by UI.
- No q1-q4 submitted by UI.
- No brief/complete feedback observed by UI.
- No lifecycle behavior observed by UI after submission.
- No UI leakage/claims observation.

## 8. Safe access principles

- The human may type credentials locally, but must not paste them into chat.
- Codex must not receive or print credentials.
- No cookies, tokens, DB URLs, provider secrets, `.env` values, or screenshots containing credentials may be copied into chat.
- Prefer an already approved local/dev account.
- Prefer an existing StudyLoad assignment.
- Do not reset DB.
- Do not mutate fixtures in this planning phase.
- Do not use API-only probing to compensate for missing UI evidence.
- Do not use browser automation.
- Do not inspect `.env`.

## 9. Candidate route A: human-assisted existing session

Route:

```text
HUMAN_ASSISTED_EXISTING_SESSION
```

Use when:

- A human can open the local app manually.
- A human can log in locally without sharing credentials.
- The account is approved for local/dev testing.
- The account can open `/now`.
- The account can access a StudyLoad with contentKey `paes_m1_linear_equations_basic` or title `PAES M1 - Ecuaciones lineales basicas`.

Expected next phase if Route A is confirmed:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-MANUAL-LOCAL-SMOKE-RETRY-1
```

Route A is the preferred operational path once a human confirms access without exposing secrets.

## 10. Candidate route B: narrow fixture prep authorization

Route:

```text
NARROW_FIXTURE_PREP_AUTHORIZATION
```

Use when:

- No suitable StudyLoad is available in UI.
- Local/dev data can be safely prepared in a future phase.
- The future phase receives explicit authorization.
- The future phase avoids DB reset, secrets, broad mutation, production/staging, and unrelated content.
- The future phase prepares or selects only a minimal local/dev Student/Enrollment/StudyLoad state for `paes_m1_linear_equations_basic`.

Expected next phase:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-NARROW-FIXTURE-PREP-AUTHORIZATION-1
```

Route B is not authorized by this phase. It requires a separate prompt defining exact fixture actions and safety gates.

## 11. Candidate route C: blocked diagnostic path

Route:

```text
BLOCKED_LOCAL_STATE_DIAGNOSTIC
```

Use when:

- Local data state is unknown.
- No human login is available.
- Safe fixture preparation cannot be authorized yet.
- Progress would require secrets, `.env`, DB reset, broad DB inspection, API-only probing, browser automation, or code changes.

Expected next phase for unknown local state:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-LOCAL-STATE-DIAGNOSTIC-1
```

Current selection:

```text
Route C, with primary auth-access handoff.
```

Because the immediate missing gate is a safe human-authenticated local/dev student session, the recommended next phase is the auth-access human handoff phase rather than a fixture mutation phase.

## 12. Decision matrix

| Condition | Verdict | Recommended next phase |
|---|---|---|
| Human can log in and capsule 2 StudyLoad is already available | `LOCAL_FIXTURE_ACCESS_PLAN_READY_FOR_HUMAN_ASSISTED_SMOKE` | `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-MANUAL-LOCAL-SMOKE-RETRY-1` |
| Human can log in but capsule 2 StudyLoad is not available | `LOCAL_FIXTURE_ACCESS_PLAN_NEEDS_NARROW_FIXTURE_PREP_AUTHORIZATION` | `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-NARROW-FIXTURE-PREP-AUTHORIZATION-1` |
| No human login/session exists but local fixture can be safely planned | `LOCAL_FIXTURE_ACCESS_PLAN_NEEDS_NARROW_FIXTURE_PREP_AUTHORIZATION` | `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-NARROW-FIXTURE-PREP-AUTHORIZATION-1` |
| Local state is unknown and cannot be checked safely | `LOCAL_FIXTURE_ACCESS_PLAN_BLOCKED_BY_UNKNOWN_LOCAL_DATA_STATE` | `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-LOCAL-STATE-DIAGNOSTIC-1` |
| Auth/login is the primary blocker | `LOCAL_FIXTURE_ACCESS_PLAN_BLOCKED_BY_AUTH_ACCESS` | `MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-AUTH-ACCESS-HUMAN-HANDOFF-1` |

This phase selects:

```text
LOCAL_FIXTURE_ACCESS_PLAN_BLOCKED_BY_AUTH_ACCESS
```

## 13. Minimum evidence required before rerunning smoke

Before a manual local smoke retry, collect:

- Human confirms local app can be opened.
- Human confirms login can be performed locally without sharing secrets.
- Human confirms account is approved for local/dev testing.
- Human confirms `/now` can be opened.
- Human confirms StudyLoad title or contentKey corresponds to capsule 2.
- No DB reset was used.
- No secrets were shared.

## 14. Exact human instructions, without asking for secrets

For the next human-assisted phase:

1. Open the local/dev app manually using the already-approved local procedure.
2. Log in locally with an approved local/dev student account.
3. Do not paste passwords, tokens, cookies, DB URLs, provider secrets, `.env` values, screenshots containing credentials, or terminal output containing secrets.
4. Navigate to `/now`.
5. Confirm whether the visible StudyLoad is `PAES M1 - Ecuaciones lineales basicas` or otherwise safely identifies `paes_m1_linear_equations_basic`.
6. Report only non-secret status: login available or blocked; `/now` available or blocked; capsule 2 StudyLoad available or missing.

If capsule 2 is available, the next phase can rerun the manual local smoke. If capsule 2 is not available, stop and request narrow fixture prep authorization.

## 15. Stop conditions

Stop any future access/smoke attempt if:

- Credentials would need to be shared in chat.
- Cookies, tokens, DB URLs, provider secrets, or `.env` values would need to be exposed.
- Login requires browser automation.
- The local app cannot be opened without troubleshooting outside the authorized scope.
- Capsule 2 is not available and making it available would require DB/script/seed/code work not separately authorized.
- Progress would require DB reset or broad fixture mutation.
- Progress would require API-only testing instead of student UI.
- Progress would touch capsules 3/5, capsules 4/6, continuity, route-order, UI/API/schema/DB, or registry entries.

## 16. What remains prohibited

- Starting the app in this phase.
- Logging in in this phase.
- Executing smoke in this phase.
- Calling APIs.
- Browser automation or Playwright.
- API-only tests.
- DB reset.
- Seed scripts.
- Direct DB edits.
- Fixture mutation.
- User or StudyLoad creation.
- Code edits.
- UI/API route edits.
- Prisma/schema/DB edits.
- Registry edits.
- Continuity or route-order edits.
- `.env` inspection.
- Secret, password, token, cookie, DB URL, or credential printing.
- Capsules 3/5 authorization.
- Sales-Ready claims.
- Adaptive AI claims.

## 17. Recommended next phase

Because auth/access is the primary blocker:

```text
MVP-SALES-PILOT-PEDAGOGY-M1-CAPSULE-2-AUTHOREDFEEDBACK-AUTH-ACCESS-HUMAN-HANDOFF-1
```

Purpose:

```text
Coordinate a safe human-assisted local/dev login handoff without secrets, confirm whether /now and capsule 2 StudyLoad are available, and decide whether to retry manual smoke or request narrow fixture prep authorization.
```

## 18. What remains blocked

- Capsule 2 authoredFeedback local UI verification remains blocked.
- Manual local smoke retry remains blocked until human auth/access evidence exists.
- Fixture preparation remains blocked until a separate narrow authorization phase.
- Capsules 3/5 registry insertion remains blocked.
- UI/API/schema/DB, continuity, route-order, and broader implementation remain blocked.

## 19. Final verdict

```text
LOCAL_FIXTURE_ACCESS_PLAN_BLOCKED_BY_AUTH_ACCESS
```

The safe next move is a human-assisted auth/access handoff. This phase does not authorize fixture mutation, smoke execution, code changes, API-only tests, browser automation, DB reset, or any expansion beyond capsule 2 authoredFeedback UI evidence collection.
