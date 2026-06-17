# MVP-GOV-LOCAL-DEV-SAFE-DB-M2-C04-ACCESS-TOOLING-1

## Phase

MVP-GOV-LOCAL-DEV-SAFE-DB-M2-C04-ACCESS-TOOLING-1

## Baseline before

```text
HEAD = origin/main = eedcba94f70ab7285a7642e11570c8db7543f4a1
working tree clean
```

Context Gate passed before edits:

```text
git status --short: clean
git rev-parse HEAD: eedcba94f70ab7285a7642e11570c8db7543f4a1
git log --oneline --decorate -n 5: baseline confirmed
```

## Objective

Extend the existing safe LOCAL_DEV DB tooling to support PAES_M2 / M2-C04 access checks and future human-local alignment, without Codex executing or mutating DB.

## Scope

Allowed:

- Read prior M2-C04 readiness/static review reports and M2-C03 tooling precedents.
- Modify only the existing safe LOCAL_DEV tooling needed for M2-C04.
- Update operational documentation.

Forbidden:

- DB execution or mutation by Codex.
- Running the LOCAL_DEV access tooling modes.
- Schema, migration, UI, asset, payment/subscription, StudentAccess, pedagogical content or authoredFeedback changes.
- Production or staging access.
- Secret, env value, DB URL or credential printing.

## Files read

- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C04_LOCAL_DEV_ACCESS_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_HUMAN_UI_SMOKE_READINESS_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_STATIC_REVIEW_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C04_AUTHORED_IMPLEMENT_1.md`
- `nextjs_space/docs/operations/MVP_CONTENT_PAES_M2_C03_HUMAN_UI_SMOKE_1.md`
- `nextjs_space/docs/operations/MVP_SALES_PILOT_M2_C03_CLOSEOUT_1.md`
- `nextjs_space/lib/study-load-content.ts`
- `nextjs_space/scripts/local-dev-safe-db-tool.ts`

Checked optional path:

- `nextjs_space/lib/local-dev-safe-db-tool.ts`: not present.

## Files changed

- `nextjs_space/scripts/local-dev-safe-db-tool.ts`
- `PHASE_LOG.md`
- `nextjs_space/docs/operations/CODEX_LATEST_COMPACT_REPORT.md`
- `nextjs_space/docs/operations/MVP_GOV_LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_TOOLING_1.md`

## Tooling implementation summary

M2-C04 support was added to the existing safe LOCAL_DEV tool in `nextjs_space/scripts/local-dev-safe-db-tool.ts`, following the existing C02/C03 access pattern.

Capsule identity:

```text
Capsule: M2-C04
Title: PAES M2 - Geometria analitica y relaciones
StudyLoad title: PAES M2 — Geometria analitica y relaciones
contentKey: paes_m2_analytic_geometry_relations_entry
```

Supported M2-C04 modes:

```text
m2-c04-access-precheck
plan-m2-c04-access
align-m2-c04-access
m2-c04-access-postcheck
```

Required C04 mutation guard added:

```text
--confirm-m2-c04-access-only
```

## Confirm-only/read-only behavior

The read-only modes are:

```text
m2-c04-access-precheck
plan-m2-c04-access
m2-c04-access-postcheck
```

These modes require:

```text
--target-class LOCAL_DEV_CONFIRMED
--confirm-no-production
--confirm-no-staging
--confirm-read-only
--target-student-email <target>
```

They report sanitized state only. They do not mutate DB.

## Mutating mode

The mutating mode is:

```text
align-m2-c04-access
```

This mode is present only for future human-local authorized execution. It was not executed by Codex.

Required guards:

```text
--target-class LOCAL_DEV_CONFIRMED
--confirm-no-production
--confirm-no-staging
--confirm-local-dev-mutation
--confirm-m2-c04-access-only
--confirm-no-payment
--phase <authorized phase>
--execute-mutation
--target-student-email <target>
```

Mutation scope:

```text
M2-C04 StudyLoad only
```

The mode requires:

- Target student resolved.
- PAES_M2 program active.
- PAES_M2 enrollment active.
- M2 LearningCycle open.
- M2-C03 StudyLoad present.
- M2-C03 StudyLoad completed.

If these conditions fail, the tool blocks instead of expanding scope.

The mode explicitly reports:

- `studentAccessMutated: false`
- `enrollmentMutated: false`
- `studentProgramInstanceMutated: false`
- `learningCycleMutated: false`
- `paymentMutated: false`
- `prodTouched: false`
- `stagingTouched: false`

## Sanitized output contract

M2-C04 outputs include:

- `databaseUrlPresent`
- `databaseUrlValuePrinted: false`
- `targetStudentIdentifierPrinted: false`
- `expectedContentKey: paes_m2_analytic_geometry_relations_entry`
- M2-C01/M2-C02/M2-C03/M2-C04 StudyLoad summaries.
- M2-C04 reachable candidate summary.
- `secretValuesPrinted: false`

The tool does not print DB URLs, env values, target identifiers, credentials or secrets.

## Validation

Validation executed:

```text
npx.cmd tsc --noEmit
git diff --check
secret-pattern scan over modified files
```

Results:

```text
npx.cmd tsc --noEmit: passed
git diff --check: passed
secret-pattern scan: passed
```

No build was executed. No DB command or DB-reading/writing tooling mode was executed.

## Security notes

- DB execution by Codex: NOT_EXECUTED_BY_CODEX.
- DB mutation by Codex: NOT_EXECUTED_BY_CODEX.
- The new modes are restricted by the same LOCAL_DEV, no-production and no-staging guards as the existing safe tool.
- C04 mutation requires explicit C04-only guard and human-local authorization in a later phase.
- No secrets were printed.

## Explicit non-changes

- Schema changes: NOT_PERFORMED.
- UI changes: NOT_PERFORMED.
- Asset changes: NOT_PERFORMED.
- Pedagogical capsule content changes: NOT_PERFORMED.
- AuthoredFeedback changes: NOT_PERFORMED.
- Payment/subscription changes: NOT_PERFORMED.
- StudentAccess changes: NOT_PERFORMED.
- Production/staging action: NOT_PERFORMED.

## Human execution instructions for later phase

Do not execute the new M2-C04 modes until a human authorization phase documents permission.

Recommended later sequence:

```text
1. m2-c04-access-precheck, read-only.
2. plan-m2-c04-access, read-only.
3. align-m2-c04-access, only if authorized and plan requires it.
4. m2-c04-access-postcheck, read-only.
```

All evidence returned by the human must be sanitized and must not include secrets, DB URLs, cookies, tokens, credentials or private identifiers.

## Result

```text
M2_C04_LOCAL_DEV_SAFE_ACCESS_TOOLING_READY
```

## Follow-up/blocker

```text
MVP-SALES-PILOT-M2-C04-LOCAL-DEV-ACCESS-HUMAN-AUTHORIZATION-1
```
