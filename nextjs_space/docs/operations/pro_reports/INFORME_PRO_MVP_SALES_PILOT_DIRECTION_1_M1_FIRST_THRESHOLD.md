# INFORME_PRO_MVP_SALES_PILOT_DIRECTION_1_M1_FIRST_THRESHOLD

Source:

```text
Informe PRO entregado por Mauricio como insumo externo obligatorio para MVP-SALES-PILOT-DIRECTION-1.
```

## Summary

Decision recommended:

```text
HYBRID_DIRECTION_WITH_PHASED_GATES
```

Key conclusions:

* Stop generic repetition of more synthetic M1-first participants.
* The four dry-runs prove a repeatable local/dev M1-first happy path for the first StudyLoad and continuity toward the second pending load.
* The four dry-runs do not prove real students, sandbox/staging, StudentAccess lifecycle, support/failure path, payment/trial/subscription, M2, L1, legal/commercial readiness, cohorts, Playwright E2E, or Sales-Ready.
* Creating a fifth participant only to reach `n=5` is not useful.
* An additional local/dev run only makes sense if it answers a new and narrow question.
* It is not appropriate to jump directly to staging/sandbox as if readiness already existed.
* The next correct threshold is to define a formal readiness gate for a closed M1-first sandbox.

The gate must separate:

1. M1-first local/dev functional confidence - achieved for the first StudyLoad happy path.
2. M1-first closed sandbox readiness - not achieved, must be prepared.
3. MVP-Beta cerrado M1/M2/L1 readiness - not achieved.

Recommended next phase:

```text
MVP-SALES-PILOT-DIRECTION-1A - Define M1-first closed sandbox readiness gate
```

Probable later phase:

```text
MVP-SALES-PILOT-HARDENING-5 - Close minimum blockers before M1-first sandbox
```

or:

```text
MVP-SALES-PILOT-SANDBOX-0 - Draft closed M1-first sandbox runbook
```

## Non-Declarations

This report does not declare:

* Sales-Ready public.
* MVP-Beta cerrado complete.
* Current sandbox readiness.
* Current staging readiness.
* L1 readiness.
* M2 readiness.
* Payment/trial/subscription readiness.
* Legal/commercial readiness.
* Cohort readiness.
* Playwright login E2E resolved.
