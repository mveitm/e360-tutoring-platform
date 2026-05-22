import { PrismaClient } from "@prisma/client"
import { validateStudentAccessSnapshot, type StudentAccessValidationInput } from "../lib/student-access-validation"

type CandidateClass =
  | "no_active_enrollment"
  | "one_active_enrollment"
  | "multiple_active_enrollments"
  | "inconsistent_enrollment_state"
  | "identity_concern"
  | "existing_student_access"

type CandidateReport = {
  studentId: string
  email: string
  class: CandidateClass
  activeEnrollmentCount: number
  candidate: StudentAccessValidationInput | null
  validationOk: boolean | null
  validationErrors: string[]
  notes: string[]
}

const prisma = new PrismaClient()
const now = new Date()

function buildCandidate(accessStatus: string, trialStatus: string): StudentAccessValidationInput {
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
    lastDecisionAt: now,
    lastDecisionReason:
      accessStatus === "enrolled_active_program"
        ? "backfill_existing_active_enrollment"
        : "backfill_no_active_enrollment_no_access",
  }
}

function summarizeReport(reports: CandidateReport[], excludedNonStudentUsers: number) {
  const counts = {
    students: reports.length,
    existingStudentAccessRows: reports.filter((report) => report.class === "existing_student_access").length,
    missingStudentAccessRows: reports.filter((report) => report.class !== "existing_student_access").length,
    noActiveEnrollmentCandidates: reports.filter((report) => report.class === "no_active_enrollment").length,
    oneActiveEnrollmentCandidates: reports.filter((report) => report.class === "one_active_enrollment").length,
    ambiguousRecords: reports.filter((report) =>
      report.class === "multiple_active_enrollments" ||
      report.class === "inconsistent_enrollment_state" ||
      report.class === "identity_concern"
    ).length,
    validationFailures: reports.filter((report) => report.validationOk === false).length,
    excludedNonStudentUsers,
  }

  return {
    counts,
    stopGo:
      counts.ambiguousRecords === 0 && counts.validationFailures === 0
        ? "GO_FOR_REVIEW_ONLY_NO_WRITE"
        : "STOP_REVIEW_REQUIRED_NO_WRITE",
  }
}

async function main() {
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
            programId: true,
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

  const reports = students.map<CandidateReport>((student) => {
    const notes: string[] = []

    if (student.access) {
      return {
        studentId: student.id,
        email: student.email,
        class: "existing_student_access",
        activeEnrollmentCount: student.programInstances.filter((enrollment) => enrollment.status === "active").length,
        candidate: null,
        validationOk: null,
        validationErrors: [],
        notes: [`existing StudentAccess row: ${student.access.accessStatus} + ${student.access.trialStatus}`],
      }
    }

    if (!student.email || duplicateStudentEmails.has(student.email.toLowerCase())) {
      notes.push("student identity/email concern")
      return {
        studentId: student.id,
        email: student.email,
        class: "identity_concern",
        activeEnrollmentCount: student.programInstances.filter((enrollment) => enrollment.status === "active").length,
        candidate: null,
        validationOk: null,
        validationErrors: [],
        notes,
      }
    }

    const activeEnrollments = student.programInstances.filter((enrollment) => enrollment.status === "active")

    if (activeEnrollments.length > 1) {
      notes.push("multiple active enrollments")
      return {
        studentId: student.id,
        email: student.email,
        class: "multiple_active_enrollments",
        activeEnrollmentCount: activeEnrollments.length,
        candidate: null,
        validationOk: null,
        validationErrors: [],
        notes,
      }
    }

    const inconsistentEnrollment = activeEnrollments.some((enrollment) => {
      const currentCycleMissing =
        !!enrollment.currentCycleId &&
        !enrollment.learningCycles.some((cycle) => cycle.id === enrollment.currentCycleId)

      return !enrollment.program || enrollment.program.status !== "active" || currentCycleMissing
    })

    if (inconsistentEnrollment) {
      notes.push("active enrollment references inactive/missing program state or inconsistent current cycle state")
      return {
        studentId: student.id,
        email: student.email,
        class: "inconsistent_enrollment_state",
        activeEnrollmentCount: activeEnrollments.length,
        candidate: null,
        validationOk: null,
        validationErrors: [],
        notes,
      }
    }

    const candidate =
      activeEnrollments.length === 1
        ? buildCandidate("enrolled_active_program", "none")
        : buildCandidate("no_access", "none")
    const validation = validateStudentAccessSnapshot(candidate, { now })

    return {
      studentId: student.id,
      email: student.email,
      class: activeEnrollments.length === 1 ? "one_active_enrollment" : "no_active_enrollment",
      activeEnrollmentCount: activeEnrollments.length,
      candidate,
      validationOk: validation.ok,
      validationErrors: validation.errors.map((issue) => `${issue.category}:${issue.code}:${issue.field ?? "row"}`),
      notes,
    }
  })

  const summary = summarizeReport(reports, excludedNonStudentUsers)

  console.log(JSON.stringify({ summary, reports }, null, 2))

  if (summary.counts.ambiguousRecords > 0 || summary.counts.validationFailures > 0) {
    process.exitCode = 1
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 2
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
