export const STUDENT_ACCESS_STATUSES = [
  "no_access",
  "review_pending",
  "trial_invited",
  "trial_active",
  "trial_expired_blocked",
  "subscription_pending",
  "subscribed_access_active",
  "enrollment_setup_pending",
  "enrolled_active_program",
] as const

export const STUDENT_TRIAL_STATUSES = [
  "none",
  "invited",
  "active",
  "experience_available",
  "experience_used",
  "expired",
  "cancelled",
] as const

export type StudentAccessStatus = (typeof STUDENT_ACCESS_STATUSES)[number]
export type StudentTrialStatus = (typeof STUDENT_TRIAL_STATUSES)[number]

export type StudentAccessValidationInput = {
  accessStatus: string
  trialStatus: string
  subscriptionStatus?: string | null
  trialInvitedAt?: Date | string | null
  trialActivatedAt?: Date | string | null
  trialExpiresAt?: Date | string | null
  trialExperienceUsedAt?: Date | string | null
  tutoringDirection?: string | null
  continuityTarget?: string | null
  lastDecisionBy?: string | null
  lastDecisionAt?: Date | string | null
  lastDecisionReason?: string | null
}

export type StudentAccessValidationOptions = {
  now: Date
}

export type StudentAccessValidationIssueCategory =
  | "UNKNOWN_STATUS"
  | "ILLEGAL_PAIR"
  | "MISSING_REQUIRED_FIELD"
  | "PROHIBITED_FIELD"
  | "INVALID_TIMESTAMP"
  | "EXPIRED_STATE"
  | "INVALID_TRANSITION"
  | "MISSING_DECISION_CONTEXT"
  | "SUBSCRIPTION_POLICY_UNDEFINED"
  | "SCOPE_VIOLATION"

export type StudentAccessValidationIssue = {
  code: string
  category: StudentAccessValidationIssueCategory
  field?: string
  message: string
}

export type StudentAccessValidationResult = {
  ok: boolean
  errors: StudentAccessValidationIssue[]
  warnings: StudentAccessValidationIssue[]
}

export type StudentAccessTransitionContext = StudentAccessValidationOptions & {
  actorType?: "system" | "owner_admin"
  actorId?: string
  reason?: string
  transitionKind?: "create" | "admin_decision" | "system_expiration" | "correction"
}

export const LEGAL_STUDENT_ACCESS_PAIRS: Record<StudentAccessStatus, readonly StudentTrialStatus[]> = {
  no_access: ["none"],
  review_pending: ["none"],
  trial_invited: ["invited"],
  trial_active: ["active", "experience_available", "experience_used"],
  trial_expired_blocked: ["expired"],
  subscription_pending: ["none", "expired", "experience_used"],
  subscribed_access_active: ["none", "expired", "experience_used"],
  enrollment_setup_pending: ["none", "expired", "experience_used"],
  enrolled_active_program: ["none"],
}

type DateField =
  | "trialInvitedAt"
  | "trialActivatedAt"
  | "trialExpiresAt"
  | "trialExperienceUsedAt"
  | "lastDecisionAt"

type ParsedDates = Partial<Record<DateField, Date>>

const ACCESS_STATUS_SET = new Set<string>(STUDENT_ACCESS_STATUSES)
const TRIAL_STATUS_SET = new Set<string>(STUDENT_TRIAL_STATUSES)
const ACTIVE_TRIAL_STATUSES = new Set<string>(["active", "experience_available", "experience_used"])

export function isStudentAccessStatus(value: string): value is StudentAccessStatus {
  return ACCESS_STATUS_SET.has(value)
}

export function isStudentTrialStatus(value: string): value is StudentTrialStatus {
  return TRIAL_STATUS_SET.has(value)
}

export function validateStudentAccessSnapshot(
  input: StudentAccessValidationInput,
  options: StudentAccessValidationOptions
): StudentAccessValidationResult {
  const errors: StudentAccessValidationIssue[] = []
  const warnings: StudentAccessValidationIssue[] = []
  const now = parseDateValue("now", options?.now, errors)
  const dates = parseInputDates(input, errors)

  const accessStatusKnown = isStudentAccessStatus(input.accessStatus)
  const trialStatusKnown = isStudentTrialStatus(input.trialStatus)

  if (!accessStatusKnown) {
    addIssue(errors, "UNKNOWN_ACCESS_STATUS", "UNKNOWN_STATUS", "accessStatus", "Unknown accessStatus.")
  }

  if (!trialStatusKnown) {
    addIssue(errors, "UNKNOWN_TRIAL_STATUS", "UNKNOWN_STATUS", "trialStatus", "Unknown trialStatus.")
  }

  if (accessStatusKnown && trialStatusKnown) {
    const legalTrialStatuses = LEGAL_STUDENT_ACCESS_PAIRS[input.accessStatus]

    if (!legalTrialStatuses.includes(input.trialStatus)) {
      addIssue(errors, "ILLEGAL_STATUS_PAIR", "ILLEGAL_PAIR", "trialStatus", "Illegal accessStatus + trialStatus pair.")
    }

    validateFieldInvariants(input, dates, errors, warnings)
    validateTimestampOrdering(input, dates, errors)
    validateExpirationState(input, dates, now, errors)
  }

  validateSubscriptionStatus(input, errors)

  return result(errors, warnings)
}

export function validateStudentAccessTransition(
  current: StudentAccessValidationInput,
  next: StudentAccessValidationInput,
  context: StudentAccessTransitionContext
): StudentAccessValidationResult {
  const errors: StudentAccessValidationIssue[] = []
  const warnings: StudentAccessValidationIssue[] = []
  const currentResult = validateStudentAccessSnapshot(current, context)
  const nextResult = validateStudentAccessSnapshot(next, context)

  errors.push(...prefixIssues("CURRENT", currentResult.errors))
  errors.push(...prefixIssues("NEXT", nextResult.errors))
  warnings.push(...prefixIssues("CURRENT", currentResult.warnings))
  warnings.push(...prefixIssues("NEXT", nextResult.warnings))

  if (!parseDateValue("now", context?.now, errors)) {
    return result(errors, warnings)
  }

  const hasStateChange = current.accessStatus !== next.accessStatus || current.trialStatus !== next.trialStatus

  if (hasStateChange && !context?.actorType) {
    addIssue(errors, "MISSING_ACTOR", "MISSING_DECISION_CONTEXT", "actorType", "Transition requires an actor type.")
  }

  if (hasStateChange && !hasText(context?.reason)) {
    addIssue(errors, "MISSING_REASON", "MISSING_DECISION_CONTEXT", "reason", "Transition requires a decision reason.")
  }

  if (current.trialStatus === "cancelled" || next.trialStatus === "cancelled") {
    addIssue(errors, "CANCELLED_TRANSITION_UNDEFINED", "INVALID_TRANSITION", "trialStatus", "Cancelled transitions are deferred until cancellation policy exists.")
  }

  if (context?.transitionKind === "create" && isUnsafeCreateTarget(next)) {
    addIssue(errors, "UNSAFE_CREATE_TARGET", "INVALID_TRANSITION", "accessStatus", "Create/default transition cannot start in trial, subscription, enrollment, or work-like access states.")
  }

  if (current.accessStatus === "no_access" && next.accessStatus === "trial_active") {
    addIssue(errors, "NO_ACCESS_DIRECT_TO_TRIAL_ACTIVE", "INVALID_TRANSITION", "accessStatus", "Trial activation must pass through invitation and explicit activation context.")
  }

  if (current.accessStatus === "no_access" && next.accessStatus === "enrolled_active_program") {
    addIssue(errors, "NO_ACCESS_DIRECT_TO_ENROLLED", "INVALID_TRANSITION", "accessStatus", "StudentAccess cannot move directly from no access to enrolled active program.")
  }

  if (current.accessStatus === "trial_invited" && next.accessStatus === "trial_active" && context?.transitionKind !== "admin_decision" && context?.transitionKind !== "correction") {
    addIssue(errors, "TRIAL_TIMER_WITHOUT_ACTIVATION_CONTEXT", "INVALID_TRANSITION", "accessStatus", "Trial invitation cannot start the timer without explicit activation context.")
  }

  if (current.accessStatus === "trial_expired_blocked" && (next.accessStatus === "trial_active" || next.accessStatus === "enrolled_active_program")) {
    addIssue(errors, "EXPIRED_DIRECT_TO_ACTIVE_WORK", "INVALID_TRANSITION", "accessStatus", "Expired blocked access cannot move directly to active work-like access.")
  }

  return result(errors, warnings)
}

function validateSubscriptionStatus(input: StudentAccessValidationInput, errors: StudentAccessValidationIssue[]): void {
  if (input.subscriptionStatus === undefined || input.subscriptionStatus === null || input.subscriptionStatus === "none") {
    return
  }

  addIssue(errors, "SUBSCRIPTION_STATUS_UNDEFINED", "SUBSCRIPTION_POLICY_UNDEFINED", "subscriptionStatus", "Only none/null/undefined subscriptionStatus is allowed in the first-cut policy.")
}

function validateFieldInvariants(
  input: StudentAccessValidationInput,
  dates: ParsedDates,
  errors: StudentAccessValidationIssue[],
  warnings: StudentAccessValidationIssue[]
): void {
  const pair = `${input.accessStatus}:${input.trialStatus}`

  if (pair === "no_access:none" || pair === "review_pending:none") {
    prohibitDate(input, "trialInvitedAt", errors)
    prohibitDate(input, "trialActivatedAt", errors)
    prohibitDate(input, "trialExpiresAt", errors)
    prohibitDate(input, "trialExperienceUsedAt", errors)
    return
  }

  if (pair === "trial_invited:invited") {
    requireDate(dates, "trialInvitedAt", errors)
    prohibitDate(input, "trialActivatedAt", errors)
    prohibitDate(input, "trialExpiresAt", errors)
    prohibitDate(input, "trialExperienceUsedAt", errors)
    return
  }

  if (input.accessStatus === "trial_active") {
    if (!dates.trialInvitedAt) {
      addIssue(warnings, "MISSING_TRIAL_INVITED_AT_FOR_ACTIVE", "MISSING_REQUIRED_FIELD", "trialInvitedAt", "Active trial should preserve invitation timestamp unless this is an audited correction.")
    }

    requireDate(dates, "trialActivatedAt", errors)
    requireDate(dates, "trialExpiresAt", errors)

    if (input.trialStatus === "experience_used") {
      requireDate(dates, "trialExperienceUsedAt", errors)
    } else {
      prohibitDate(input, "trialExperienceUsedAt", errors)
    }

    return
  }

  if (pair === "trial_expired_blocked:expired") {
    requireDate(dates, "trialActivatedAt", errors)
    requireDate(dates, "trialExpiresAt", errors)
    return
  }

  if (input.trialStatus === "experience_used") {
    requireDate(dates, "trialActivatedAt", errors)
    requireDate(dates, "trialExpiresAt", errors)
    requireDate(dates, "trialExperienceUsedAt", errors)
  }

  if (input.trialStatus === "expired") {
    requireDate(dates, "trialActivatedAt", errors)
    requireDate(dates, "trialExpiresAt", errors)
  }
}

function validateTimestampOrdering(input: StudentAccessValidationInput, dates: ParsedDates, errors: StudentAccessValidationIssue[]): void {
  if (dates.trialInvitedAt && dates.trialActivatedAt && dates.trialInvitedAt.getTime() > dates.trialActivatedAt.getTime()) {
    addIssue(errors, "TRIAL_INVITED_AFTER_ACTIVATED", "INVALID_TIMESTAMP", "trialInvitedAt", "trialInvitedAt must not be after trialActivatedAt.")
  }

  if (dates.trialActivatedAt && dates.trialExpiresAt && dates.trialExpiresAt.getTime() <= dates.trialActivatedAt.getTime()) {
    addIssue(errors, "TRIAL_EXPIRES_NOT_AFTER_ACTIVATED", "INVALID_TIMESTAMP", "trialExpiresAt", "trialExpiresAt must be after trialActivatedAt.")
  }

  if (dates.trialActivatedAt && dates.trialExperienceUsedAt && dates.trialExperienceUsedAt.getTime() < dates.trialActivatedAt.getTime()) {
    addIssue(errors, "EXPERIENCE_USED_BEFORE_ACTIVATED", "INVALID_TIMESTAMP", "trialExperienceUsedAt", "trialExperienceUsedAt must not be before trialActivatedAt.")
  }

  if (dates.trialExpiresAt && dates.trialExperienceUsedAt && dates.trialExperienceUsedAt.getTime() > dates.trialExpiresAt.getTime()) {
    addIssue(errors, "EXPERIENCE_USED_AFTER_EXPIRY", "INVALID_TIMESTAMP", "trialExperienceUsedAt", "trialExperienceUsedAt must not be after trialExpiresAt.")
  }

  if (input.accessStatus === "trial_expired_blocked" && dates.trialExpiresAt) {
    return
  }
}

function validateExpirationState(input: StudentAccessValidationInput, dates: ParsedDates, now: Date | null, errors: StudentAccessValidationIssue[]): void {
  if (!now || !dates.trialExpiresAt) {
    return
  }

  if (input.accessStatus === "trial_active" && ACTIVE_TRIAL_STATUSES.has(input.trialStatus) && now.getTime() >= dates.trialExpiresAt.getTime()) {
    addIssue(errors, "ACTIVE_TRIAL_IS_EXPIRED", "EXPIRED_STATE", "trialExpiresAt", "Active trial state is expired at the supplied now value.")
  }

  if (input.accessStatus === "trial_expired_blocked" && input.trialStatus === "expired" && now.getTime() < dates.trialExpiresAt.getTime()) {
    addIssue(errors, "EXPIRED_STATE_BEFORE_EXPIRY", "INVALID_TIMESTAMP", "trialExpiresAt", "Expired blocked state requires now to be at or after trialExpiresAt.")
  }
}

function parseInputDates(input: StudentAccessValidationInput, errors: StudentAccessValidationIssue[]): ParsedDates {
  return {
    trialInvitedAt: parseDateValue("trialInvitedAt", input.trialInvitedAt, errors) ?? undefined,
    trialActivatedAt: parseDateValue("trialActivatedAt", input.trialActivatedAt, errors) ?? undefined,
    trialExpiresAt: parseDateValue("trialExpiresAt", input.trialExpiresAt, errors) ?? undefined,
    trialExperienceUsedAt: parseDateValue("trialExperienceUsedAt", input.trialExperienceUsedAt, errors) ?? undefined,
    lastDecisionAt: parseDateValue("lastDecisionAt", input.lastDecisionAt, errors) ?? undefined,
  }
}

function parseDateValue(field: DateField | "now", value: Date | string | null | undefined, errors: StudentAccessValidationIssue[]): Date | null {
  if (value === undefined || value === null) {
    if (field === "now") {
      addIssue(errors, "MISSING_NOW", "MISSING_REQUIRED_FIELD", "now", "Validation requires a deterministic now value.")
    }
    return null
  }

  const parsed = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    addIssue(errors, `INVALID_${field.toUpperCase()}`, "INVALID_TIMESTAMP", field, `${field} must be a valid Date or date string.`)
    return null
  }

  return parsed
}

function requireDate(dates: ParsedDates, field: DateField, errors: StudentAccessValidationIssue[]): void {
  if (!dates[field]) {
    addIssue(errors, `MISSING_${field.toUpperCase()}`, "MISSING_REQUIRED_FIELD", field, `${field} is required for this status pair.`)
  }
}

function prohibitDate(input: StudentAccessValidationInput, field: DateField, errors: StudentAccessValidationIssue[]): void {
  if (input[field] !== undefined && input[field] !== null) {
    addIssue(errors, `PROHIBITED_${field.toUpperCase()}`, "PROHIBITED_FIELD", field, `${field} must be null for this status pair.`)
  }
}

function isUnsafeCreateTarget(input: StudentAccessValidationInput): boolean {
  return (
    input.accessStatus === "trial_active" ||
    input.accessStatus === "subscription_pending" ||
    input.accessStatus === "subscribed_access_active" ||
    input.accessStatus === "enrollment_setup_pending" ||
    input.accessStatus === "enrolled_active_program" ||
    input.trialStatus === "active" ||
    input.trialStatus === "experience_available" ||
    input.trialStatus === "experience_used" ||
    input.trialStatus === "expired"
  )
}

function hasText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0
}

function addIssue(
  issues: StudentAccessValidationIssue[],
  code: string,
  category: StudentAccessValidationIssueCategory,
  field: string | undefined,
  message: string
): void {
  issues.push({ code, category, field, message })
}

function prefixIssues(prefix: string, issues: StudentAccessValidationIssue[]): StudentAccessValidationIssue[] {
  return issues.map((issue) => ({
    ...issue,
    code: `${prefix}_${issue.code}`,
  }))
}

function result(errors: StudentAccessValidationIssue[], warnings: StudentAccessValidationIssue[]): StudentAccessValidationResult {
  return {
    ok: errors.length === 0,
    errors,
    warnings,
  }
}
