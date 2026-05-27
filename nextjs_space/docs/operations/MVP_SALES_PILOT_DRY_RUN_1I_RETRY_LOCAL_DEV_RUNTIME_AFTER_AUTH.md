# MVP-SALES-PILOT-DRY-RUN-1I-RETRY - Local Runtime After Auth

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-DRY-RUN-1I-RETRY - Execute one-participant local/dev runtime dry-run after synthetic credential setup
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = a69622c
```

Latest accepted commit:

```text
a69622c - MVP-SALES-PILOT-AUTH-LOCAL-3: execute guarded synthetic credential setup
```

Type:

```text
Human-executed local/dev runtime dry-run / Codex-documented / no code changes.
```

## 2. Motive for Retry

The previous runtime attempt was blocked because `PILOT_M1_001` had local/dev fixture structure but no usable CredentialsProvider credential.

`AUTH-LOCAL-3` resolved that auth blocker:

```text
SYNTHETIC_CREDENTIAL_UPDATED
participantCode: PILOT_M1_001
targetEmail: pilot.m1.001@example.invalid
userFound: yes
studentFound: yes
credentialUpdated: yes
DB MUTATION PERFORMED: LOCAL_DEV_SYNTHETIC_CREDENTIAL_ONLY
NO SECRET VALUES PRINTED
```

This retry tests the local/dev runtime path using the synthetic credential without exposing it.

## 3. Preflight

Git preflight:

```text
working tree clean
HEAD = origin/main = origin/HEAD = a69622c
```

Required context read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_3_EXECUTE_GUARDED_SYNTHETIC_CREDENTIAL_SETUP.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_2_GUARDED_SYNTHETIC_CREDENTIAL_HELPER.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1I_EXECUTE_ONE_PARTICIPANT_LOCAL_DEV_RUNTIME_DRY_RUN.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_0_PREPARE_CLOSED_M1_FIRST_DRY_RUN_PLAN.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* `nextjs_space/docs/operations/MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.

## 4. Auth State Inherited from AUTH-LOCAL-3

Synthetic participant:

```text
PILOT_M1_001
pilot.m1.001@example.invalid
```

Auth state:

```text
SYNTHETIC_CREDENTIAL_READY_FOR_PILOT_M1_001
```

No password, hash, token, cookie, header, DB URL, host, provider, env value, or real student data was recorded in repo.

## 5. Steps Executed

Human-executed local/dev steps:

1. Opened local `/login`.
2. Logged in manually as `pilot.m1.001@example.invalid` using the private synthetic local password.
3. Opened `/now`.
4. Verified closed PAES M1 pilot copy and scope boundaries.
5. Verified the expected M1 StudyLoad was visible as pending.
6. Started/opened the StudyLoad.
7. Rendered the activity.
8. Submitted synthetic controlled answers.
9. Completed the activity with self-report `Me fue bien`.
10. Returned to `/now`.
11. Verified completed work visibility and next pending M1 activity.

Admin evidence was not checked in this phase.

## 6. Result by Step

```text
login: successful
/now: loaded
pilot copy: ok
scope boundaries: ok
StudyLoad visible: yes, state=pending
activity start/open: ok
activity render: ok
response submit: ok
completion/self-report: ok
post-completion /now: ok
admin evidence: not checked
```

Result state:

```text
RUNTIME_DRY_RUN_ONE_PARTICIPANT_PASSED_WITH_ADMIN_EVIDENCE_DEFERRED
```

## 7. Safe Evidence Observed

Observed:

* `/now` showed closed PAES M1 pilot copy.
* No active L1/M2 implication was observed.
* No payment, subscription, or public trial implication was observed.
* No PAES score, mastery/theta, adaptive AI, or guaranteed improvement claim was observed.
* `PAES M1 — Entrada balanceada inicial` was visible as the pending activity.
* The activity started/opened and rendered.
* Response submission worked.
* Completion/self-report worked with `Me fue bien`.
* After completion, `/now` showed `PAES M1 — Entrada balanceada inicial` under registered activities.
* After completion, `/now` showed the expected automatic next M1 activity as pending:

```text
PAES M1 — Ecuaciones lineales básicas
```

No screenshots, cookies, tokens, headers, session details, IDs, DB URLs, env values, passwords, hashes, or real student data were committed.

## 8. Local/Dev Mutations Performed by Normal Flow

Allowed local/dev mutations performed by normal student-product flow:

* local login/session behavior;
* StudyLoad start/open transition;
* MC response submission;
* StudyLoad completion;
* self-report recording;
* completed-work visibility state;
* expected automatic next M1 StudyLoad continuity.

No manual SQL, Prisma CLI, DB reset, schema change, fixture creation for other participants, payment, trial, L1, M2, staging, or production mutation occurred.

## 9. Findings

Primary finding:

```text
ONE_PARTICIPANT_M1_RUNTIME_PATH_PASSED
```

Extended finding:

```text
EXPECTED_M1_CONTINUITY_OBSERVED_AFTER_COMPLETION
```

Deferred finding:

```text
ADMIN_EVIDENCE_NOT_CHECKED
```

The automatic next M1 StudyLoad appears consistent with the known M1 continuity behavior and was documented without intervention.

## 10. Go/No-go for Next Phase

Recommendation:

```text
PARTIAL_GO_FIX_ADMIN_REVIEW
```

Rationale:

The core one-participant local/dev student runtime path passed from login through `/now`, StudyLoad start/render, response submission, completion, self-report, and completed/next-action visibility. Admin/tutor evidence review remains deferred and should be verified before repeating for additional participants or moving toward staging.

## 11. Residual Risks

* Admin/tutor evidence visibility was not checked.
* The path has passed for only one synthetic participant.
* The next pending M1 activity was created by continuity and should be accepted or reviewed in the next evidence phase.
* The private synthetic password must remain local-only and non-committed.
* No staging or production dry-run has been performed.
* This does not approve real student use, payment/trial, L1/M2 readiness, or Sales-Ready status.

## 12. Explicit Non-actions

This phase did not:

* expose or record password, hash, cookie, token, header, DB URL, host, provider, or env value;
* use real student data;
* touch staging or production;
* run Prisma CLI or SQL;
* reset DB;
* edit app code;
* edit schema;
* create `PILOT_M1_002` or `PILOT_M1_003`;
* activate payment;
* activate public trial;
* activate L1 or M2;
* inspect admin evidence;
* approve product/student use;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## Result Marker

```text
MVP_SALES_PILOT_DRY_RUN_1I_RETRY_ONE_PARTICIPANT_RUNTIME_PASSED
```
