import { PrismaClient } from "@prisma/client"
import { validateStudentAccessSnapshot, type StudentAccessValidationInput } from "../lib/student-access-validation"

const CONFIRM_WRITE_FLAG = "--confirm-write-student-access-backfill"
const CONFIRM_BACKUP_OR_OWNER_ACCEPTANCE_FLAG = "--confirm-backup-or-owner-acceptance"
const REQUIRED_WRITE_FLAGS = [CONFIRM_WRITE_FLAG, CONFIRM_BACKUP_OR_OWNER_ACCEPTANCE_FLAG] as const

const EXPECTED_COUNTS = {
  students: 12,
  existingStudentAccessRows: 0,
  missingStudentAccessRows: 12,
  noActiveEnrollmentCandidates: 3,
  oneActiveEnrollmentCandidates: 9,
  ambiguousRecords: 0,
  validationFailures: 0,
} as const

type CandidateClass =
  | "no_active_enrollment"
  | "one_active_enrollment"
  | "multiple_active_enrollments"
  | "inconsistent_enrollment_state"
  | "identity_concern"
  | "existing_student_access"

type Candidate = {
  studentId: string
  email: string
  class: CandidateClass
  activeEnrollmentCount: number
  row: StudentAccessValidationInput | null
  validationOk: boolean | null
  validationErrors: string[]
  notes: string[]
}

type Counts = {
  students: number
  existingStudentAccessRows: number
  missingStudentAccessRows: number
  noActiveEnrollmentCandidates: number
  oneActiveEnrollmentCandidates: number
  ambiguousRecords: number
  validationFailures: number
  excludedNonStudentUsers: number
}

function buildCandidate(accessStatus: string, trialStatus: string, decisionInstant: Date): StudentAccessValidationInput {
  return {
    accessStatus,
    trialStatus,
    subscriptionStatus: "none",
    trialInvitedAt: null,
    trialActivatedAt: null,
    trialExpiresAt: null,
    trialExperienceUsedAt: null,
    tutoringDirection: null,
    continuityTarget: null,
    lastDecisionBy: "system",
    lastDecisionAt: decisionInstant,
    lastDecisionReason:
      accessStatus === "enrolled_active_program"
        ? "backfill_existing_active_enrollment"
        : "backfill_no_active_enrollment_no_access",
  }
}

function summarize(candidates: Candidate[], excludedNonStudentUsers: number): Counts {
  return {
    students: candidates.length,
    existingStudentAccessRows: candidates.filter((candidate) => candidate.class === "existing_student_access").length,
    missingStudentAccessRows: candidates.filter((candidate) => candidate.class !== "existing_student_access").length,
    noActiveEnrollmentCandidates: candidates.filter((candidate) => candidate.class === "no_active_enrollment").length,
    oneActiveEnrollmentCandidates: candidates.filter((candidate) => candidate.class === "one_active_enrollment").length,
    ambiguousRecords: candidates.filter((candidate) =>
      candidate.class === "multiple_active_enrollments" ||
      candidate.class === "inconsistent_enrollment_state" ||
      candidate.class === "identity_concern"
    ).length,
    validationFailures: candidates.filter((candidate) => candidate.validationOk === false).length,
    excludedNonStudentUsers,
  }
}

function countAssertionFailures(counts: Counts): string[] {
  const failures: string[] = []

  for (const [key, expected] of Object.entries(EXPECTED_COUNTS)) {
    const actual = counts[key as keyof typeof EXPECTED_COUNTS]
    if (actual !== expected) {
      failures.push(`${key}: expected ${expected}, got ${actual}`)
    }
  }

  const candidateCount = counts.noActiveEnrollmentCandidates + counts.oneActiveEnrollmentCandidates
  if (candidateCount !== EXPECTED_COUNTS.missingStudentAccessRows) {
    failures.push(`candidateCount: expected ${EXPECTED_COUNTS.missingStudentAccessRows}, got ${candidateCount}`)
  }

  return failures
}

function previewNoWrite() {
  console.log(
    JSON.stringify(
      {
        mode: "preview_no_write",
        writeConfirmed: false,
        dbAccessPerformed: false,
        expectedCounts: EXPECTED_COUNTS,
        countsSource: "accepted_expected_counts_from_2X_2Y_not_current_db_state",
        missingFlags: REQUIRED_WRITE_FLAGS,
        stopGo: "NO_WRITE_CONFIRMATION_FLAGS_NOT_PROVIDED",
        candidateSummary: {
          noActiveEnrollment: "3 candidates -> no_access + none",
          oneActiveEnrollment: "9 candidates -> enrolled_active_program + none",
        },
        insertedRowIds: [],
        message:
          `No DB read or write was performed. Counts shown are accepted expected counts from 2X/2Y, not current DB state. Re-run with ${REQUIRED_WRITE_FLAGS.join(" ")} only in a separately authorized controlled write phase after target and backup/owner acceptance confirmation.`,
      },
      null,
      2
    )
  )
}

function reportMissingWriteGuards(missingFlags: readonly string[]): void {
  console.log(
    JSON.stringify(
      {
        mode: "write_guard_missing",
        writeConfirmed: false,
        dbAccessPerformed: false,
        missingFlags,
        requiredFlags: REQUIRED_WRITE_FLAGS,
        expectedCounts: EXPECTED_COUNTS,
        countsSource: "accepted_expected_counts_from_2X_2Y_not_current_db_state",
        stopGo: "STOP_WRITE_GUARD_MISSING",
        insertedRowIds: [],
        message: "No PrismaClient was created. No DB read or write was performed because one or more required write guards were missing.",
      },
      null,
      2
    )
  )
}

async function classifyCandidates(prisma: PrismaClient, decisionInstant: Date): Promise<{ candidates: Candidate[]; counts: Counts }> {
  const [students, users] = await Promise.all([
    prisma.student.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        access: { select: { id: true, accessStatus: true, trialStatus: true } },
        programInstances: {
          select: {
            id: true,
            status: true,
            currentCycleId: true,
            program: { select: { id: true, status: true } },
            learningCycles: { select: { id: true, status: true } },
          },
        },
      },
    }),
    prisma.user.findMany({
      where: { email: { not: null } },
      select: { id: true, email: true },
    }),
  ])

  const studentEmails = new Set(students.map((student) => student.email.toLowerCase()))
  const excludedNonStudentUsers = users.filter((user) => user.email && !studentEmails.has(user.email.toLowerCase())).length
  const seenEmails = new Set<string>()
  const duplicateStudentEmails = new Set<string>()

  for (const student of students) {
    const email = student.email.toLowerCase()
    if (seenEmails.has(email)) {
      duplicateStudentEmails.add(email)
    }
    seenEmails.add(email)
  }

  const candidates = students.map<Candidate>((student) => {
    const notes: string[] = []
    const activeEnrollments = student.programInstances.filter((enrollment) => enrollment.status === "active")

    if (student.access) {
      return {
        studentId: student.id,
        email: student.email,
        class: "existing_student_access",
        activeEnrollmentCount: activeEnrollments.length,
        row: null,
        validationOk: null,
        validationErrors: [],
        notes: [`existing StudentAccess row preserved: ${student.access.accessStatus} + ${student.access.trialStatus}`],
      }
    }

    if (!student.email || duplicateStudentEmails.has(student.email.toLowerCase())) {
      return {
        studentId: student.id,
        email: student.email,
        class: "identity_concern",
        activeEnrollmentCount: activeEnrollments.length,
        row: null,
        validationOk: null,
        validationErrors: [],
        notes: ["student identity/email concern"],
      }
    }

    if (activeEnrollments.length > 1) {
      return {
        studentId: student.id,
        email: student.email,
        class: "multiple_active_enrollments",
        activeEnrollmentCount: activeEnrollments.length,
        row: null,
        validationOk: null,
        validationErrors: [],
        notes: ["multiple active enrollments"],
      }
    }

    const inconsistentEnrollment = activeEnrollments.some((enrollment) => {
      const currentCycleMissing =
        !!enrollment.currentCycleId &&
        !enrollment.learningCycles.some((cycle) => cycle.id === enrollment.currentCycleId)

      return !enrollment.program || enrollment.program.status !== "active" || currentCycleMissing
    })

    if (inconsistentEnrollment) {
      return {
        studentId: student.id,
        email: student.email,
        class: "inconsistent_enrollment_state",
        activeEnrollmentCount: activeEnrollments.length,
        row: null,
        validationOk: null,
        validationErrors: [],
        notes: ["active enrollment references inactive/missing program state or inconsistent current cycle state"],
      }
    }

    const row =
      activeEnrollments.length === 1
        ? buildCandidate("enrolled_active_program", "none", decisionInstant)
        : buildCandidate("no_access", "none", decisionInstant)
    const validation = validateStudentAccessSnapshot(row, { now: decisionInstant })

    return {
      studentId: student.id,
      email: student.email,
      class: activeEnrollments.length === 1 ? "one_active_enrollment" : "no_active_enrollment",
      activeEnrollmentCount: activeEnrollments.length,
      row,
      validationOk: validation.ok,
      validationErrors: validation.errors.map((issue) => `${issue.category}:${issue.code}:${issue.field ?? "row"}`),
      notes,
    }
  })

  return {
    candidates,
    counts: summarize(candidates, excludedNonStudentUsers),
  }
}

async function writeCandidates(prisma: PrismaClient, candidates: Candidate[]) {
  const writableCandidates = candidates.filter((candidate) => candidate.row && candidate.validationOk === true)

  return prisma.$transaction(
    writableCandidates.map((candidate) =>
      prisma.studentAccess.create({
        data: {
          studentId: candidate.studentId,
          accessStatus: candidate.row!.accessStatus,
          trialStatus: candidate.row!.trialStatus,
          subscriptionStatus: candidate.row!.subscriptionStatus ?? "none",
          trialInvitedAt: candidate.row!.trialInvitedAt as Date | null,
          trialActivatedAt: candidate.row!.trialActivatedAt as Date | null,
          trialExpiresAt: candidate.row!.trialExpiresAt as Date | null,
          trialExperienceUsedAt: candidate.row!.trialExperienceUsedAt as Date | null,
          tutoringDirection: candidate.row!.tutoringDirection ?? null,
          continuityTarget: candidate.row!.continuityTarget ?? null,
          lastDecisionBy: candidate.row!.lastDecisionBy ?? "system",
          lastDecisionAt: candidate.row!.lastDecisionAt as Date,
          lastDecisionReason: candidate.row!.lastDecisionReason ?? null,
        },
        select: {
          id: true,
          studentId: true,
          lastDecisionReason: true,
        },
      })
    )
  )
}

async function main() {
  const providedFlags = new Set(process.argv.slice(2))
  const requestedWriteMode = REQUIRED_WRITE_FLAGS.some((flag) => providedFlags.has(flag))
  const missingWriteFlags = REQUIRED_WRITE_FLAGS.filter((flag) => !providedFlags.has(flag))

  if (!requestedWriteMode) {
    previewNoWrite()
    return
  }

  if (missingWriteFlags.length > 0) {
    reportMissingWriteGuards(missingWriteFlags)
    process.exitCode = 1
    return
  }

  const prisma = new PrismaClient()
  const decisionInstant = new Date()

  try {
    const { candidates, counts } = await classifyCandidates(prisma, decisionInstant)
    const assertionFailures = countAssertionFailures(counts)
    const invalidCandidates = candidates.filter((candidate) => candidate.validationOk === false)
    const stopGo =
      assertionFailures.length === 0 && invalidCandidates.length === 0
        ? "WRITE_GUARDS_PASSED"
        : "STOP_PRE_WRITE_GUARD_FAILED"

    if (assertionFailures.length > 0 || invalidCandidates.length > 0) {
      console.log(
        JSON.stringify(
          {
            mode: "write_confirmed",
            counts,
            expectedCounts: EXPECTED_COUNTS,
            stopGo,
            assertionFailures,
            validationFailures: invalidCandidates.map((candidate) => ({
              studentId: candidate.studentId,
              class: candidate.class,
              validationErrors: candidate.validationErrors,
            })),
            insertedRowIds: [],
            message: "No write was performed because pre-write guards failed.",
          },
          null,
          2
        )
      )
      process.exitCode = 1
      return
    }

    const insertedRows = await writeCandidates(prisma, candidates)
    const countByReason = insertedRows.reduce<Record<string, number>>((acc, row) => {
      const reason = row.lastDecisionReason ?? "unknown"
      acc[reason] = (acc[reason] ?? 0) + 1
      return acc
    }, {})

    console.log(
      JSON.stringify(
        {
          mode: "write_confirmed",
          counts,
          expectedCounts: EXPECTED_COUNTS,
          stopGo: "WRITE_COMPLETED",
          candidateSummary: {
            noActiveEnrollment: counts.noActiveEnrollmentCandidates,
            oneActiveEnrollment: counts.oneActiveEnrollmentCandidates,
          },
          insertedCount: insertedRows.length,
          insertedRowIds: insertedRows.map((row) => row.id),
          insertedStudentIds: insertedRows.map((row) => row.studentId),
          countByLastDecisionReason: countByReason,
        },
        null,
        2
      )
    )
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 2
})
