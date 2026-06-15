import { randomUUID } from 'node:crypto'
import { loadLocalEnvPrivate } from './lib/load-local-env-private'

type Mode =
  | 'confirm-local-dev'
  | 'program-check'
  | 'program-align-readiness'
  | 'check-programs'
  | 'plan-paes-m2-program'
  | 'align-paes-m2-program'
  | 'm2-access-precheck'
  | 'plan-m2-c01-access'
  | 'align-m2-c01-access'
  | 'm2-access-postcheck'

interface Args {
  mode?: string
  targetClass?: string
  phase?: string
  confirmNoProduction: boolean
  confirmNoStaging: boolean
  confirmReadOnly: boolean
  confirmMutation: boolean
  confirmProgramOnly: boolean
  confirmNoEnrollment: boolean
  confirmM2C01AccessOnly: boolean
  confirmNoPayment: boolean
  executeMutation: boolean
  targetStudentEmail?: string
  targetStudentId?: string
}

const PAES_M2_PROGRAM = {
  code: 'PAES_M2',
  name: 'PAES Matemática M2',
  vertical: 'PAES',
  status: 'active',
} as const

const PAES_M1_PROGRAM = {
  code: 'PAES_M1',
  name: 'PAES Matemática M1',
  vertical: 'PAES',
  status: 'active',
} as const

const M2_C01_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Modelacion con expresiones y funciones'

function readValue(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag)
  if (index < 0) return undefined
  const value = argv[index + 1]
  if (!value || value.startsWith('--')) return undefined
  return value
}

function parseArgs(argv: string[]): Args {
  return {
    mode: readValue(argv, '--mode'),
    targetClass: readValue(argv, '--target-class'),
    phase: readValue(argv, '--phase'),
    confirmNoProduction: argv.includes('--confirm-no-production'),
    confirmNoStaging: argv.includes('--confirm-no-staging'),
    confirmReadOnly: argv.includes('--confirm-read-only'),
    confirmMutation: argv.includes('--confirm-local-dev-mutation'),
    confirmProgramOnly: argv.includes('--confirm-program-only'),
    confirmNoEnrollment: argv.includes('--confirm-no-enrollment'),
    confirmM2C01AccessOnly: argv.includes('--confirm-m2-c01-access-only'),
    confirmNoPayment: argv.includes('--confirm-no-payment'),
    executeMutation: argv.includes('--execute-mutation'),
    targetStudentEmail: readValue(argv, '--target-student-email'),
    targetStudentId: readValue(argv, '--target-student-id'),
  }
}

function printJson(payload: Record<string, unknown>): void {
  console.log(JSON.stringify({ ...payload, secretValuesPrinted: false }, null, 2))
}

function stop(code: string, details: Record<string, unknown> = {}, exitCode = 2): never {
  printJson({
    status: code,
    detailsRedacted: true,
    dataMutated: false,
    ...details,
  })
  process.exit(exitCode)
}

function classifyError(error: unknown): Record<string, unknown> {
  const maybeError = error as { name?: unknown; code?: unknown; message?: unknown }
  const message = typeof maybeError.message === 'string' ? maybeError.message : ''
  let errorKind = 'unknown'
  if (message.includes('Environment variable not found')) errorKind = 'env_missing'
  else if (message.includes('Can\'t reach database server')) errorKind = 'db_unreachable'
  else if (message.includes('does not exist')) errorKind = 'db_object_missing'
  else if (message.includes('Invalid `prisma')) errorKind = 'prisma_client_query'
  else if (message.includes('Query engine')) errorKind = 'query_engine'

  return {
    errorName: typeof maybeError.name === 'string' ? maybeError.name : 'unknown',
    errorCode: typeof maybeError.code === 'string' ? maybeError.code : 'none',
    errorKind,
  }
}

function assertCommonGuards(args: Args): asserts args is Args & { mode: Mode } {
  if (
    args.mode !== 'confirm-local-dev' &&
    args.mode !== 'program-check' &&
    args.mode !== 'program-align-readiness' &&
    args.mode !== 'check-programs' &&
    args.mode !== 'plan-paes-m2-program' &&
    args.mode !== 'align-paes-m2-program' &&
    args.mode !== 'm2-access-precheck' &&
    args.mode !== 'plan-m2-c01-access' &&
    args.mode !== 'align-m2-c01-access' &&
    args.mode !== 'm2-access-postcheck'
  ) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', { reason: 'unsupported_mode' })
  }

  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', { reason: 'local_dev_not_confirmed' })
  }

  if (!args.confirmNoProduction || !args.confirmNoStaging) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', { reason: 'environment_guard_missing' })
  }
}

function assertReadOnlyGuards(args: Args): void {
  if (!args.confirmReadOnly) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', { reason: 'read_only_guard_missing' })
  }
  if (args.executeMutation || args.confirmMutation) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', { reason: 'mutation_flag_not_allowed_in_read_only_mode' })
  }
}

function assertMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmProgramOnly ||
    !args.confirmNoEnrollment ||
    !args.phase
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'mutation_guard_missing',
      mutationExecuted: false,
    })
  }
}

function assertM2AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C01AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_access_mutation_guard_missing',
      mutationExecuted: false,
    })
  }
}

async function createPrismaClient() {
  loadLocalEnvPrivate()

  if (!process.env.DATABASE_URL) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', {
      reason: 'database_url_absent',
      databaseUrlPresent: false,
      databaseUrlValuePrinted: false,
    })
  }

  const { PrismaClient } = await import('@prisma/client')
  return new PrismaClient()
}

interface ProgramSummary {
  code: string
  name: string
  vertical: string
  status: string
}

function summarizeProgram(program: ProgramSummary | null) {
  if (!program) return { present: false }
  return {
    present: true,
    code: program.code,
    name: program.name,
    vertical: program.vertical,
    status: program.status,
  }
}

function isAligned(
  program: ProgramSummary | null,
  expected: ProgramSummary,
): boolean {
  return Boolean(
    program &&
      program.code === expected.code &&
      program.name === expected.name &&
      program.vertical === expected.vertical &&
      program.status === expected.status,
  )
}

async function readProgramRows(prisma: Awaited<ReturnType<typeof createPrismaClient>>) {
  const rows = await prisma.$queryRaw<ProgramSummary[]>`
    SELECT code, name, vertical, status
    FROM programs
    WHERE code IN ('PAES_M1', 'PAES_M2')
    ORDER BY code ASC
  `

  return {
    PAES_M1: rows.find((program) => program.code === 'PAES_M1') ?? null,
    PAES_M2: rows.find((program) => program.code === 'PAES_M2') ?? null,
  }
}

function targetStudentWhere(args: Args) {
  if (args.targetStudentId) return { id: args.targetStudentId }
  if (args.targetStudentEmail) return { email: args.targetStudentEmail }
  return null
}

function summarizeTargetStudent(student: { id: string } | null) {
  return {
    targetStudentResolved: Boolean(student),
    targetStudentIdentifierPrinted: false,
  }
}

function summarizeAccess(access: { accessStatus: string; trialStatus: string; subscriptionStatus: string } | null) {
  if (!access) return { present: false }
  return {
    present: true,
    statusClass: access.accessStatus,
    trialStatusClass: access.trialStatus,
    subscriptionStatusClass: access.subscriptionStatus,
  }
}

function summarizeEnrollment(enrollment: { status: string; currentCycleId: string | null } | null) {
  if (!enrollment) return { present: false }
  return {
    present: true,
    status: enrollment.status,
    currentCyclePresent: Boolean(enrollment.currentCycleId),
  }
}

function summarizeCycle(cycle: { status: string; cycleNumber: number } | null) {
  if (!cycle) return { present: false }
  return {
    present: true,
    status: cycle.status,
    cycleNumber: cycle.cycleNumber,
  }
}

function summarizeStudyLoad(load: { status: string; loadType: string; title: string } | null) {
  if (!load) return { present: false }
  return {
    present: true,
    status: load.status,
    loadType: load.loadType,
    titleClass: load.title === M2_C01_STUDY_LOAD_TITLE ? 'M2_C01' : 'other',
  }
}

async function readM2AccessState(prisma: Awaited<ReturnType<typeof createPrismaClient>>, args: Args) {
  const program = await prisma.program.findUnique({
    where: { code: PAES_M2_PROGRAM.code },
    select: { id: true, code: true, name: true, vertical: true, status: true },
  })

  const where = targetStudentWhere(args)
  const student = where
    ? await prisma.student.findUnique({
        where,
        select: {
          id: true,
          access: {
            select: {
              accessStatus: true,
              trialStatus: true,
              subscriptionStatus: true,
            },
          },
        },
      })
    : null

  const enrollment = student
    ? await prisma.studentProgramInstance.findFirst({
        where: {
          studentId: student.id,
          program: { code: PAES_M2_PROGRAM.code },
        },
        orderBy: [{ startedAt: 'desc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          status: true,
          currentCycleId: true,
        },
      })
    : null

  const cycle = enrollment
    ? await prisma.learningCycle.findFirst({
        where: {
          enrollmentId: enrollment.id,
          status: 'open',
        },
        orderBy: { cycleNumber: 'asc' },
        select: {
          id: true,
          status: true,
          cycleNumber: true,
        },
      })
    : null

  const studyLoad = enrollment
    ? await prisma.studyLoad.findFirst({
        where: {
          title: M2_C01_STUDY_LOAD_TITLE,
          learningCycle: { enrollmentId: enrollment.id },
        },
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        select: {
          id: true,
          status: true,
          loadType: true,
          title: true,
        },
      })
    : null

  return {
    program,
    student,
    access: student?.access ?? null,
    enrollment,
    cycle,
    studyLoad,
  }
}

function summarizeM2AccessState(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  return {
    ...summarizeTargetStudent(state.student),
    programs: {
      PAES_M2: summarizeProgram(state.program),
    },
    studentAccess: summarizeAccess(state.access),
    paesM2StudentProgramInstance: summarizeEnrollment(state.enrollment),
    m2LearningCycle: summarizeCycle(state.cycle),
    m2C01StudyLoad: summarizeStudyLoad(state.studyLoad),
    m2C01StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.studyLoad),
    },
  }
}

function summarizeM2AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C01StudyLoad = Boolean(state.studyLoad)
  const wouldCreateStudentProgramInstance = targetStudentResolved && programActive && !state.enrollment
  const blockedByInactiveEnrollment = hasEnrollment && !hasActiveEnrollment
  const wouldCreateLearningCycle =
    targetStudentResolved &&
    programActive &&
    !blockedByInactiveEnrollment &&
    (!hasEnrollment || !hasOpenCycle)
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    !blockedByInactiveEnrollment &&
    (!hasEnrollment || !hasM2C01StudyLoad)
  const mutationRequired = Boolean(
    wouldCreateStudentProgramInstance ||
      wouldCreateLearningCycle ||
      wouldCreateStudyLoad,
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    programRequired: !programActive,
    wouldCreateStudentProgramInstance,
    wouldCreateLearningCycle,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByInactiveEnrollment,
    scopeExpansionRequired: false,
    requiresFutureAuthorization: {
      StudentProgramInstance: wouldCreateStudentProgramInstance,
      LearningCycle: wouldCreateLearningCycle,
      StudyLoad: wouldCreateStudyLoad,
      StudentAccess: false,
    },
    targetStudentRequired: !targetStudentResolved,
  }
}

async function confirmLocalDev(): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    await prisma.$queryRaw`SELECT 1`
    printJson({
      status: 'LOCAL_DEV_SAFE_DB_CONFIRMATION_COMPLETED',
      mode: 'confirm-local-dev',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      readCheck: 'passed',
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_CONFIRMATION_FAILED', {
      mode: 'confirm-local-dev',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

function summarizeReadiness(program: ProgramSummary | null) {
  if (!program) {
    return {
      state: 'absent',
      aligned: false,
      futureMutationNeeded: true,
      futureMutationType: 'create Program PAES_M2 only',
    }
  }

  const aligned = isAligned(program, PAES_M2_PROGRAM)
  return {
    state: aligned ? 'present_aligned' : 'present_not_aligned',
    aligned,
    futureMutationNeeded: !aligned,
    futureMutationType: aligned ? 'none' : 'update Program PAES_M2 metadata only',
  }
}

async function checkPrograms(): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const programs = await readProgramRows(prisma)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_COMPLETED',
      mode: 'program-check',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      programs: {
        PAES_M1: summarizeProgram(programs.PAES_M1),
        PAES_M2: summarizeProgram(programs.PAES_M2),
      },
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PROGRAM_CHECK_FAILED', {
      mode: 'program-check',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function programAlignReadiness(): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const programs = await readProgramRows(prisma)
    const readiness = summarizeReadiness(programs.PAES_M2)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_READINESS_COMPLETED',
      mode: 'program-align-readiness',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      expectedProgram: PAES_M2_PROGRAM,
      currentProgram: summarizeProgram(programs.PAES_M2),
      metadataClear: true,
      readiness,
      mutationExecuted: false,
      requiresFutureAuthorization: readiness.futureMutationNeeded,
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_READINESS_FAILED', {
      mode: 'program-align-readiness',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2AccessReadOnly(mode: 'm2-access-precheck' | 'm2-access-postcheck', args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_ACCESS_POSTCHECK_COMPLETED',
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_ACCESS_CHECK_FAILED', {
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C01Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c01-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c01-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

function summarizeProgramForPlan(program: {
  code: string
  name: string
  vertical: string
  status: string
}) {
  return program
}

function planPaesM2Program(): void {
  printJson({
    status: 'LOCAL_DEV_SAFE_DB_PLAN_COMPLETED',
    mode: 'plan-paes-m2-program',
    dataMutated: false,
    expectedProgram: PAES_M2_PROGRAM,
    referenceProgram: PAES_M1_PROGRAM,
    plannedProgram: summarizeProgramForPlan(PAES_M2_PROGRAM),
    requiresFutureAuthorization: true,
  })
}

async function alignPaesM2Program(phase: string): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    await prisma.$executeRaw`
      INSERT INTO programs (id, code, name, vertical, status, "createdAt", "updatedAt")
      VALUES (
        ${randomUUID()},
        ${PAES_M2_PROGRAM.code},
        ${PAES_M2_PROGRAM.name},
        ${PAES_M2_PROGRAM.vertical},
        ${PAES_M2_PROGRAM.status},
        NOW(),
        NOW()
      )
      ON CONFLICT (code) DO UPDATE SET
        name = EXCLUDED.name,
        vertical = EXCLUDED.vertical,
        status = EXCLUDED.status,
        "updatedAt" = NOW()
    `

    const programs = await readProgramRows(prisma)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_COMPLETED',
      mode: 'align-paes-m2-program',
      phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: true,
      mutationScope: 'Program PAES_M2 only',
      enrollmentMutated: false,
      studentAccessMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: false,
      program: summarizeProgram(programs.PAES_M2),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_FAILED', {
      mode: 'align-paes-m2-program',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignM2C01Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c01-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c01-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studentProgramInstanceMutated = false
      let learningCycleMutated = false
      let studyLoadMutated = false

      let enrollment = await tx.studentProgramInstance.findFirst({
        where: {
          studentId: state.student!.id,
          program: { code: PAES_M2_PROGRAM.code },
        },
        orderBy: [{ startedAt: 'desc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          status: true,
          currentCycleId: true,
        },
      })

      if (enrollment && enrollment.status !== 'active') {
        throw new Error('EXISTING_PAES_M2_ENROLLMENT_NOT_ACTIVE')
      }

      if (!enrollment) {
        enrollment = await tx.studentProgramInstance.create({
          data: {
            studentId: state.student!.id,
            programId: state.program!.id,
            status: 'active',
            currentCycleId: null,
            currentContinuityState: 'normal',
            lastActivityAt: new Date(),
          },
          select: {
            id: true,
            status: true,
            currentCycleId: true,
          },
        })
        studentProgramInstanceMutated = true
      }

      let cycle = await tx.learningCycle.findFirst({
        where: {
          enrollmentId: enrollment.id,
          status: 'open',
        },
        orderBy: { cycleNumber: 'asc' },
        select: {
          id: true,
          status: true,
          cycleNumber: true,
        },
      })

      if (!cycle) {
        const lastCycle = await tx.learningCycle.findFirst({
          where: { enrollmentId: enrollment.id },
          orderBy: { cycleNumber: 'desc' },
          select: { cycleNumber: true },
        })
        cycle = await tx.learningCycle.create({
          data: {
            enrollmentId: enrollment.id,
            cycleNumber: (lastCycle?.cycleNumber ?? 0) + 1,
            status: 'open',
          },
          select: {
            id: true,
            status: true,
            cycleNumber: true,
          },
        })
        learningCycleMutated = true
      }

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_C01_STUDY_LOAD_TITLE,
          learningCycle: { enrollmentId: enrollment.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: cycle.id,
            title: M2_C01_STUDY_LOAD_TITLE,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      await tx.studentProgramInstance.update({
        where: { id: enrollment.id },
        data: {
          currentCycleId: cycle.id,
          lastActivityAt: new Date(),
        },
        select: { id: true },
      })

      return {
        studentProgramInstanceMutated,
        learningCycleMutated,
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)
    const dataMutated = Boolean(
      mutationFlags.studentProgramInstanceMutated ||
        mutationFlags.learningCycleMutated ||
        mutationFlags.studyLoadMutated,
    )

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c01-access',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated,
      mutationScope: 'PAES_M2 StudentProgramInstance, M2 LearningCycle, M2-C01 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: mutationFlags.studentProgramInstanceMutated,
      studentProgramInstanceMutated: mutationFlags.studentProgramInstanceMutated,
      learningCycleMutated: mutationFlags.learningCycleMutated,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C01_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c01-access',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  assertCommonGuards(args)

  if (args.mode === 'confirm-local-dev') {
    assertReadOnlyGuards(args)
    await confirmLocalDev()
    return
  }

  if (args.mode === 'check-programs' || args.mode === 'program-check') {
    assertReadOnlyGuards(args)
    await checkPrograms()
    return
  }

  if (args.mode === 'program-align-readiness') {
    assertReadOnlyGuards(args)
    await programAlignReadiness()
    return
  }

  if (args.mode === 'plan-paes-m2-program') {
    assertReadOnlyGuards(args)
    planPaesM2Program()
    return
  }

  if (args.mode === 'm2-access-precheck' || args.mode === 'm2-access-postcheck') {
    assertReadOnlyGuards(args)
    await m2AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'plan-m2-c01-access') {
    assertReadOnlyGuards(args)
    await planM2C01Access(args)
    return
  }

  if (args.mode === 'align-m2-c01-access') {
    assertM2AccessMutationGuards(args)
    await alignM2C01Access(args)
    return
  }

  assertMutationGuards(args)
  await alignPaesM2Program(args.phase)
}

main().catch(() => {
  stop('LOCAL_DEV_SAFE_DB_TOOL_FAILED', { reason: 'unhandled_error' }, 1)
})
