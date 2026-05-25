export const REAFFIRM_NO_ACCESS_COMMAND = "reaffirm_no_access" as const
export const KEEP_NO_ACCESS_ALIAS = "keep_no_access" as const
export const MAX_STUDENT_ACCESS_DECISION_REASON_LENGTH = 500

export type ReaffirmNoAccessCommand = typeof REAFFIRM_NO_ACCESS_COMMAND

export type NoAccessExpectedState = {
  accessStatus: "no_access"
  trialStatus: "none"
  subscriptionStatus: "none"
}

export type ReaffirmNoAccessValidationSuccess = {
  ok: true
  command: ReaffirmNoAccessCommand
  expectedPreviousState: NoAccessExpectedState
  decisionReason: string
}

export type ReaffirmNoAccessValidationFailure = {
  ok: false
  error: string
  message: string
}

export type ReaffirmNoAccessValidationResult =
  | ReaffirmNoAccessValidationSuccess
  | ReaffirmNoAccessValidationFailure

export const NO_ACCESS_EXPECTED_STATE: NoAccessExpectedState = {
  accessStatus: "no_access",
  trialStatus: "none",
  subscriptionStatus: "none",
}

export function normalizeReaffirmNoAccessCommand(command: unknown): ReaffirmNoAccessCommand | null {
  if (command === REAFFIRM_NO_ACCESS_COMMAND || command === KEEP_NO_ACCESS_ALIAS) {
    return REAFFIRM_NO_ACCESS_COMMAND
  }

  return null
}

export function validateReaffirmNoAccessRequest(body: unknown): ReaffirmNoAccessValidationResult {
  if (!isRecord(body)) {
    return failure("invalid_body", "Request body must be a JSON object.")
  }

  const command = normalizeReaffirmNoAccessCommand(body.command)
  if (!command) {
    return failure("unknown_command", "Unsupported StudentAccess transition command.")
  }

  if (!isRecord(body.expectedPreviousState)) {
    return failure("missing_expected_previous_state", "expectedPreviousState is required.")
  }

  if (!studentAccessStateMatchesExpected(body.expectedPreviousState, NO_ACCESS_EXPECTED_STATE)) {
    return failure("invalid_expected_previous_state", "expectedPreviousState must be no_access, none, none.")
  }

  if (typeof body.decisionReason !== "string") {
    return failure("missing_decision_reason", "decisionReason is required.")
  }

  const decisionReason = body.decisionReason.trim()
  if (!decisionReason) {
    return failure("missing_decision_reason", "decisionReason is required.")
  }

  if (decisionReason.length > MAX_STUDENT_ACCESS_DECISION_REASON_LENGTH) {
    return failure("decision_reason_too_long", "decisionReason is too long.")
  }

  return {
    ok: true,
    command,
    expectedPreviousState: NO_ACCESS_EXPECTED_STATE,
    decisionReason,
  }
}

export function studentAccessStateMatchesExpected(
  current: unknown,
  expected: NoAccessExpectedState,
): current is NoAccessExpectedState {
  return (
    isRecord(current) &&
    current.accessStatus === expected.accessStatus &&
    current.trialStatus === expected.trialStatus &&
    current.subscriptionStatus === expected.subscriptionStatus
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function failure(error: string, message: string): ReaffirmNoAccessValidationFailure {
  return { ok: false, error, message }
}
