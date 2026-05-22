import assert from "node:assert/strict"

import {
  LEGAL_STUDENT_ACCESS_PAIRS,
  STUDENT_ACCESS_STATUSES,
  STUDENT_TRIAL_STATUSES,
  StudentAccessValidationInput,
  isStudentAccessStatus,
  isStudentTrialStatus,
  validateStudentAccessSnapshot,
  validateStudentAccessTransition,
} from "./student-access-validation"

function test(name: string, fn: () => void): void {
  fn()
  console.log(`ok - ${name}`)
}

const now = new Date("2026-05-22T12:00:00.000Z")
const invitedAt = new Date("2026-05-20T12:00:00.000Z")
const activatedAt = new Date("2026-05-21T12:00:00.000Z")
const expiresAt = new Date("2026-05-28T12:00:00.000Z")
const usedAt = new Date("2026-05-22T10:00:00.000Z")

function validSnapshot(input: Partial<StudentAccessValidationInput>): StudentAccessValidationInput {
  return {
    accessStatus: "no_access",
    trialStatus: "none",
    subscriptionStatus: "none",
    ...input,
  }
}

function categories(input: StudentAccessValidationInput): string[] {
  return validateStudentAccessSnapshot(input, { now }).errors.map((issue) => issue.category)
}

test("legal status guards recognize only approved values", () => {
  for (const status of STUDENT_ACCESS_STATUSES) {
    assert.equal(isStudentAccessStatus(status), true)
  }

  for (const status of STUDENT_TRIAL_STATUSES) {
    assert.equal(isStudentTrialStatus(status), true)
  }

  assert.equal(isStudentAccessStatus("active"), false)
  assert.equal(isStudentTrialStatus("used"), false)
})

test("legal pair map accepts all intended first-cut pairs", () => {
  const baseFieldsByTrialStatus: Record<string, Partial<StudentAccessValidationInput>> = {
    none: {},
    invited: { trialInvitedAt: invitedAt },
    active: { trialInvitedAt: invitedAt, trialActivatedAt: activatedAt, trialExpiresAt: expiresAt },
    experience_available: { trialInvitedAt: invitedAt, trialActivatedAt: activatedAt, trialExpiresAt: expiresAt },
    experience_used: { trialInvitedAt: invitedAt, trialActivatedAt: activatedAt, trialExpiresAt: expiresAt, trialExperienceUsedAt: usedAt },
    expired: { trialInvitedAt: new Date("2026-05-09T12:00:00.000Z"), trialActivatedAt: new Date("2026-05-10T12:00:00.000Z"), trialExpiresAt: new Date("2026-05-17T12:00:00.000Z") },
  }

  for (const [accessStatus, trialStatuses] of Object.entries(LEGAL_STUDENT_ACCESS_PAIRS)) {
    for (const trialStatus of trialStatuses) {
      const snapshot = validSnapshot({
        accessStatus,
        trialStatus,
        ...baseFieldsByTrialStatus[trialStatus],
      })

      assert.equal(validateStudentAccessSnapshot(snapshot, { now }).ok, true, `${accessStatus} + ${trialStatus}`)
    }
  }
})

test("illegal pairs are rejected", () => {
  assert.ok(categories(validSnapshot({ accessStatus: "no_access", trialStatus: "active" })).includes("ILLEGAL_PAIR"))
  assert.ok(categories(validSnapshot({ accessStatus: "trial_active", trialStatus: "none" })).includes("ILLEGAL_PAIR"))
})

test("cancelled is recognized but rejected as a persisted first-cut pair", () => {
  assert.equal(isStudentTrialStatus("cancelled"), true)
  assert.ok(categories(validSnapshot({ accessStatus: "trial_active", trialStatus: "cancelled" })).includes("ILLEGAL_PAIR"))
})

test("trial_invited + invited requires trialInvitedAt and rejects active timestamps", () => {
  assert.ok(categories(validSnapshot({ accessStatus: "trial_invited", trialStatus: "invited" })).includes("MISSING_REQUIRED_FIELD"))
  assert.ok(
    categories(
      validSnapshot({
        accessStatus: "trial_invited",
        trialStatus: "invited",
        trialInvitedAt: invitedAt,
        trialActivatedAt: activatedAt,
        trialExpiresAt: expiresAt,
        trialExperienceUsedAt: usedAt,
      })
    ).includes("PROHIBITED_FIELD")
  )
})

test("trial_active + active requires trialActivatedAt and trialExpiresAt", () => {
  const result = validateStudentAccessSnapshot(validSnapshot({ accessStatus: "trial_active", trialStatus: "active", trialInvitedAt: invitedAt }), { now })
  assert.equal(result.ok, false)
  assert.ok(result.errors.some((issue) => issue.field === "trialActivatedAt"))
  assert.ok(result.errors.some((issue) => issue.field === "trialExpiresAt"))
})

test("trialExpiresAt must be after trialActivatedAt", () => {
  assert.ok(
    categories(
      validSnapshot({
        accessStatus: "trial_active",
        trialStatus: "active",
        trialInvitedAt: invitedAt,
        trialActivatedAt: activatedAt,
        trialExpiresAt: activatedAt,
      })
    ).includes("INVALID_TIMESTAMP")
  )
})

test("now at or after trialExpiresAt returns EXPIRED_STATE for active states", () => {
  assert.ok(
    categories(
      validSnapshot({
        accessStatus: "trial_active",
        trialStatus: "experience_available",
        trialInvitedAt: invitedAt,
        trialActivatedAt: new Date("2026-05-01T12:00:00.000Z"),
        trialExpiresAt: now,
      })
    ).includes("EXPIRED_STATE")
  )
})

test("experience_used requires trialExperienceUsedAt", () => {
  const result = validateStudentAccessSnapshot(
    validSnapshot({
      accessStatus: "trial_active",
      trialStatus: "experience_used",
      trialInvitedAt: invitedAt,
      trialActivatedAt: activatedAt,
      trialExpiresAt: expiresAt,
    }),
    { now }
  )

  assert.equal(result.ok, false)
  assert.ok(result.errors.some((issue) => issue.field === "trialExperienceUsedAt"))
})

test("subscriptionStatus other than none/null/undefined is rejected", () => {
  assert.equal(validateStudentAccessSnapshot(validSnapshot({ subscriptionStatus: "active" }), { now }).ok, false)
  assert.equal(validateStudentAccessSnapshot(validSnapshot({ subscriptionStatus: null }), { now }).ok, true)
  assert.equal(validateStudentAccessSnapshot(validSnapshot({ subscriptionStatus: undefined }), { now }).ok, true)
})

test("transition validation requires actor and reason where expected", () => {
  const result = validateStudentAccessTransition(
    validSnapshot({ accessStatus: "no_access", trialStatus: "none" }),
    validSnapshot({ accessStatus: "review_pending", trialStatus: "none" }),
    { now }
  )

  assert.ok(result.errors.some((issue) => issue.category === "MISSING_DECISION_CONTEXT" && issue.field === "actorType"))
  assert.ok(result.errors.some((issue) => issue.category === "MISSING_DECISION_CONTEXT" && issue.field === "reason"))
})

test("unsafe transition no_access to enrolled_active_program is rejected", () => {
  const result = validateStudentAccessTransition(
    validSnapshot({ accessStatus: "no_access", trialStatus: "none" }),
    validSnapshot({ accessStatus: "enrolled_active_program", trialStatus: "none" }),
    { now, actorType: "owner_admin", reason: "manual enrollment correction", transitionKind: "admin_decision" }
  )

  assert.ok(result.errors.some((issue) => issue.category === "INVALID_TRANSITION"))
})

test("helper test imports remain limited to node assert and local validation helper", () => {
  assert.equal(typeof validateStudentAccessSnapshot, "function")
  assert.equal(typeof validateStudentAccessTransition, "function")
})
