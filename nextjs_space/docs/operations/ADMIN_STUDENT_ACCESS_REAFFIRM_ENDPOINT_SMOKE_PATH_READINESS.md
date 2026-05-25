# Admin StudentAccess Reaffirm Endpoint Smoke Path Readiness

## 1. Phase

* Phase: `MVP-SALES-TRIAL-3M-C`.
* Type: readiness / smoke-path design / documentation-only.
* Baseline: `ed5891d`.
* No implementation authorized.
* No smoke executed.
* No DB mutation authorized.
* Product horizon: `MVP-Beta-Pre-Sales-Ready`, closed laboratory only.

## 2. Relationship to 3M-A and 3M-B

`MVP-SALES-TRIAL-3M-A` implemented the admin `StudentAccess` reaffirm endpoint.

`MVP-SALES-TRIAL-3M-B` attempted a controlled smoke but was `BLOCKED`.

The 3M-B blocker was that no safe authenticated admin path was available without exposing cookies, tokens, headers, authorization values, session payloads, secrets, or raw environment values.

3M-C exists to define a safe smoke pathway before retrying the smoke in a future explicitly opened phase.

## 3. Current endpoint to smoke

Endpoint:

```text
POST /api/admin/students/[id]/access-transitions
```

Allowed command:

```text
reaffirm_no_access
```

Implemented alias:

```text
keep_no_access
```

The alias is normalized internally to `reaffirm_no_access`.

Non-permission behavior:

* `accessStatus` remains `no_access`.
* `trialStatus` remains `none`.
* `subscriptionStatus` remains `none`.

Allowed mutation on a valid command:

* `lastDecisionBy`.
* `lastDecisionReason`.
* `lastDecisionAt`.

Forbidden:

* Trial activation.
* Runtime enforcement.
* Billing, subscription, or payment.
* `/now`.
* Student UI.
* Admin UI buttons/forms.
* Repair/autocreate.
* Schema changes.
* Migrations.
* Deploy.

## 4. Smoke path options evaluated

### Option A - Human operator browser + DevTools/fetch

Description:

The human operator uses an already-authenticated local admin browser session. The operator runs the request from the browser context or observes Network without copying cookies, tokens, or headers.

Pros:

* Uses the real admin session and the real `requireAdminApi` path.
* No cookies or tokens are shared with Codex or ChatGPT.
* Similar in spirit to the earlier human-operated admin smoke pattern.
* Does not require a code change, test-only bypass, or auth harness.

Cons:

* Manual.
* Requires careful operator instructions.
* Must avoid pasting raw JSON with personal data.
* Needs a known local/dev student id and expected `StudentAccess` state.

Decision:

Recommended path for the next smoke if the operator is available.

### Option B - Codex/scripted HTTP request with copied cookies/tokens

Decision:

Rejected.

Reason:

This requires exposing cookies, tokens, headers, authorization values, or session payloads to Codex, the shell, the transcript, or a script. That violates the smoke safety rule.

### Option C - Temporary bypass/backdoor/test-only auth

Decision:

Rejected.

Reason:

This creates security risk and drifts into implementation. It is not allowed unless a future explicit high-level review authorizes a formal test harness or auth test strategy.

### Option D - Direct DB mutation/check only

Decision:

Rejected for smoke.

Reason:

Direct DB work does not test the endpoint or admin auth path. Safe DB reads may support later verification only if separately authorized, non-sensitive, and already within the future smoke scope. DB mutation is not allowed for smoke-path setup.

### Option E - Dedicated safe local admin smoke harness

Decision:

Candidate future path.

Reason:

A dedicated harness could be useful later, but it requires its own implementation/design phase. If it changes auth behavior, test credentials, session handling, or security assumptions, it may require high-level review before implementation.

## 5. Recommended smoke method

Recommended path: Option A, human operator browser-authenticated smoke.

Recommended future smoke phase:

```text
MVP-SALES-TRIAL-3M-D - Human-operated admin StudentAccess reaffirm endpoint smoke
```

The human operator must:

* Use a local/dev browser already authenticated as admin.
* Not copy cookies.
* Not copy tokens.
* Not copy headers.
* Not copy authorization values.
* Not copy session payloads.
* Not expose secrets.
* Use a known existing student with an existing `StudentAccess` row.
* Report only non-sensitive status, response-shape, and state evidence.

## 6. Human operator smoke procedure

1. Preflight Git:

```powershell
git status --short
git log --oneline --decorate --graph -8
```

2. Start the local app if needed:

```powershell
cd nextjs_space
npm.cmd run dev
```

3. Open a browser already authenticated as admin.

4. Navigate to:

```text
/admin/students/[id]
```

5. Confirm the student has `StudentAccess` row present and:

* `accessStatus = no_access`.
* `trialStatus = none`.
* `subscriptionStatus = none`.

6. Open DevTools > Console or Network.

7. Execute the request from browser context without copying cookies, tokens, headers, authorization values, or session payloads:

```javascript
fetch("/api/admin/students/<studentId>/access-transitions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    command: "reaffirm_no_access",
    expectedPreviousState: {
      accessStatus: "no_access",
      trialStatus: "none",
      subscriptionStatus: "none"
    },
    decisionReason: "3M-D controlled smoke reaffirm no access"
  })
})
  .then((r) => r.json().then((body) => ({ status: r.status, body })))
  .then(console.log)
```

Important:

* This runs inside the authenticated browser context.
* Do not copy request headers.
* Do not copy cookies.
* Do not copy tokens.
* Do not paste full response bodies if they contain personal data.
* Report only non-sensitive fields.

8. Confirm response:

* HTTP status indicates success.
* `ok = true`.
* `command = reaffirm_no_access`.
* `previous.accessStatus = no_access`.
* `previous.trialStatus = none`.
* `previous.subscriptionStatus = none`.
* `next.accessStatus = no_access`.
* `next.trialStatus = none`.
* `next.subscriptionStatus = none`.
* Decision fields are present.
* No secrets are present in the response.

9. Refresh admin detail or use `GET /api/students/[id]` from the same browser context to confirm:

* `accessStatus` remains `no_access`.
* `trialStatus` remains `none`.
* `subscriptionStatus` remains `none`.
* `lastDecisionReason` updated.
* `lastDecisionBy` updated or present.
* `lastDecisionAt` updated or present.
* No trial timestamps activated.
* No billing/subscription/payment changed.
* No enrollment, program, cycle, or load created.
* No `/now` or student UI touched.

10. Final Git status:

```powershell
git status --short
```

## 7. Human operator compact evidence template

Future operator should report only:

```text
3M-D HUMAN SMOKE EVIDENCE

Preflight:
- git status before:
- HEAD/origin:

Target:
- local URL:
- route:
- student id: redacted/partial
- authenticated admin browser: yes
- secrets/cookies/tokens/headers exposed: no

Before state:
- StudentAccess row:
- accessStatus:
- trialStatus:
- subscriptionStatus:

Request:
- method:
- endpoint:
- command:
- decisionReason used:

Response:
- HTTP status:
- ok:
- command:
- previous accessStatus/trialStatus/subscriptionStatus:
- next accessStatus/trialStatus/subscriptionStatus:
- decision fields present:

After state:
- accessStatus:
- trialStatus:
- subscriptionStatus:
- lastDecisionReason:
- lastDecisionBy:
- lastDecisionAt:
- trial timestamps changed:
- billing/subscription/payment changed:
- enrollment/program/cycle/load created:
- /now or student UI changed:

Final git status:

Conclusion:
PASS / FAIL / BLOCKED
```

## 8. What the future smoke must not include

The future smoke must not include:

* Copied cookies.
* Copied tokens.
* Copied request headers.
* Copied authorization values.
* Raw session payloads.
* Raw environment values.
* `.env` reads.
* Passwords.
* Secrets.
* Direct DB mutation.
* Student creation.
* `StudentAccess` creation.
* `StudentAccess` repair/autocreate.
* Trial activation.
* Runtime enforcement.
* Billing/subscription/payment.
* `/now` changes.
* Student UI changes.
* Admin UI buttons/forms.
* Schema changes.
* Migrations.
* Deploy.

## 9. Future failure checks

Optional failure checks may be run only if the human browser-authenticated path is already safe and the operator can avoid exposing secrets:

* Unknown command returns a controlled error and no mutation.
* Stale `expectedPreviousState` returns a controlled error and no mutation.
* Missing `decisionReason` returns a controlled error and no mutation.

Do not create a missing-row case.
Do not delete or modify rows to simulate repair.
Do not attempt repair/autocreate.

## 10. Conclusion

3M-C defines the safe future smoke path only.

No smoke was executed.
No endpoint was invoked.
No code was changed.
No DB mutation was performed.
No runtime, trial, billing, `/now`, student UI, admin UI, repair/autocreate, schema, migration, or deploy behavior was changed.

Result marker:

```text
MVP_SALES_TRIAL_3M_C_SAFE_ADMIN_AUTH_SMOKE_PATH_DEFINED
```
