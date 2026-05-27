# MVP-SALES-PILOT-AUTH-LOCAL-3 - Execute Guarded Synthetic Credential Setup

## 1. Baseline

Phase:

```text
MVP-SALES-PILOT-AUTH-LOCAL-3 - Execute guarded synthetic credential setup for PILOT_M1_001
```

Baseline confirmed by Git preflight:

```text
HEAD = origin/main = origin/HEAD = bc2b633
```

Latest accepted commit:

```text
bc2b633 - MVP-SALES-PILOT-AUTH-LOCAL-2: add guarded synthetic credential helper
```

Type:

```text
Human-executed local/dev credential setup / Codex-documented / no login / no runtime.
```

## 2. Objective

Prepare a CredentialsProvider-compatible synthetic credential for the existing local/dev fixture user:

```text
participantCode: PILOT_M1_001
email: pilot.m1.001@example.invalid
```

This phase documents the human-executed guarded helper apply. It does not perform login, does not open `/now`, and does not run the runtime dry-run.

## 3. Preflight

Git preflight before documentation:

```text
working tree clean
HEAD = origin/main = origin/HEAD = bc2b633
```

Required context read:

* `PHASE_LOG.md` tail.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_2_GUARDED_SYNTHETIC_CREDENTIAL_HELPER.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_AUTH_LOCAL_1_SYNTHETIC_STUDENT_AUTH_PATH.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1H_DOCUMENT_HUMAN_LOCAL_DEV_FIXTURE_APPLY.md`.
* `nextjs_space/docs/operations/MVP_SALES_PILOT_DRY_RUN_1I_EXECUTE_ONE_PARTICIPANT_LOCAL_DEV_RUNTIME_DRY_RUN.md`.
* `nextjs_space/docs/operations/CODEX_COMPACT_REPORTING_RULE.md`.
* `nextjs_space/docs/operations/MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md`.

## 4. Help/Plan Modes Verified

Codex ran non-mutating helper checks only.

`help` mode result:

```text
NO DB CONNECTION ATTEMPTED
NO DATA MUTATED
NO SECRET VALUES PRINTED
```

`plan` mode result:

```text
NO DB CONNECTION ATTEMPTED
NO DATA MUTATED
NO SECRET VALUES PRINTED
targetClass: LOCAL_DEV_CONFIRMED
participantCode: PILOT_M1_001
targetEmail: pilot.m1.001@example.invalid
passwordSource: BEXAURI_SYNTHETIC_STUDENT_PASSWORD
```

The first `npx tsx ...` invocation from repo root attempted package resolution and failed before helper execution due to local npm/cache/network permissions. Codex then used the repo-local `nextjs_space/.node_modules` helper command pattern already documented in AUTH-LOCAL-2. No helper apply was run by Codex.

## 5. Human Local Execution Confirmation

Mauricio executed the guarded helper apply locally in PowerShell after setting the synthetic password privately in the local shell.

Rules followed:

* The password was not pasted into Codex, ChatGPT, documentation, commit messages, or logs.
* No password, hash, DB URL, host, provider, token, cookie, header, `.env` value, or real student data was pasted.
* The output pasted back to Codex contained only safe helper result markers.

## 6. Safe Apply Result

Human-reported safe helper output:

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

Accepted result:

```text
SYNTHETIC_CREDENTIAL_READY_FOR_PILOT_M1_001
```

## 7. Conceptual Local/Dev DB Change

Conceptual mutation:

```text
User.password updated for existing synthetic User only
```

Scope:

```text
LOCAL_DEV_SYNTHETIC_CREDENTIAL_ONLY
```

No new `User`, `Student`, `StudentAccess`, enrollment, LearningCycle, StudyLoad, session, response, payment, trial, L1, or M2 data was created by this credential helper result.

## 8. What Was Not Done

This phase did not:

* reveal or record the synthetic password;
* reveal or record a password hash;
* inspect or print `.env` values;
* print DB URLs, connection strings, hosts, provider targets, tokens, cookies, headers, or credentials;
* run login;
* open `/now`;
* start, answer, or complete a StudyLoad;
* run browser/runtime;
* inspect admin runtime evidence;
* touch staging or production;
* use real student data;
* create `PILOT_M1_002` or `PILOT_M1_003` data;
* activate payment or trial;
* declare PAES_L1 ready;
* declare PAES_M2 ready;
* declare Sales-Ready.

## 9. Residual Risks

Residual risks:

* The next runtime phase still needs local/dev runtime/browser execution.
* Login may reveal separate session, NextAuth, or redirect blockers.
* `/now` visibility still must be verified with the synthetic user.
* StudyLoad start/response/completion and admin evidence remain untested after credential setup.
* The private synthetic password must remain local-only and non-committed.

## 10. Recommended Next Phase

Recommended next phase:

```text
MVP-SALES-PILOT-DRY-RUN-1I-RETRY - Execute one-participant local/dev runtime dry-run after synthetic credential setup
```

The next phase may attempt login for `pilot.m1.001@example.invalid` using the private synthetic password, then continue the local/dev `/now` and StudyLoad runtime path if auth succeeds.

## Result Marker

```text
MVP_SALES_PILOT_AUTH_LOCAL_3_SYNTHETIC_CREDENTIAL_READY
```
