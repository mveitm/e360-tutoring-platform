import { randomUUID } from 'node:crypto'
import { loadLocalEnvPrivate } from './lib/load-local-env-private'
import { getStudyLoadContentByKey } from '../lib/study-load-content'

type Mode =
  | 'confirm-local-dev'
  | 'program-check'
  | 'program-align-readiness'
  | 'check-programs'
  | 'plan-paes-m2-program'
  | 'align-paes-m2-program'
  | 'paes-l1-program-precheck'
  | 'plan-paes-l1-program'
  | 'align-paes-l1-program'
  | 'paes-l1-program-postcheck'
  | 'm2-access-precheck'
  | 'plan-m2-c01-access'
  | 'align-m2-c01-access'
  | 'm2-access-postcheck'
  | 'm2-c02-access-precheck'
  | 'plan-m2-c02-access'
  | 'align-m2-c02-access'
  | 'm2-c02-access-postcheck'
  | 'm2-c03-access-precheck'
  | 'plan-m2-c03-access'
  | 'align-m2-c03-access'
  | 'm2-c03-access-postcheck'
  | 'm2-c04-access-precheck'
  | 'plan-m2-c04-access'
  | 'align-m2-c04-access'
  | 'm2-c04-access-postcheck'
  | 'm2-c05-access-precheck'
  | 'plan-m2-c05-access'
  | 'align-m2-c05-access'
  | 'm2-c05-access-postcheck'
  | 'm2-c06-access-precheck'
  | 'plan-m2-c06-access'
  | 'align-m2-c06-access'
  | 'm2-c06-access-postcheck'
  | 'm2-c07-access-precheck'
  | 'plan-m2-c07-access'
  | 'align-m2-c07-access'
  | 'm2-c07-access-postcheck'
  | 'm2-c08-access-precheck'
  | 'plan-m2-c08-access'
  | 'align-m2-c08-access'
  | 'm2-c08-access-postcheck'
  | 'l1-c01-access-precheck'
  | 'plan-l1-c01-access'
  | 'align-l1-c01-access'
  | 'l1-c01-access-postcheck'

interface Args {
  mode?: string
  targetClass?: string
  phase?: string
  confirmNoProduction: boolean
  confirmNoStaging: boolean
  confirmReadOnly: boolean
  confirmMutation: boolean
  confirmProgramOnly: boolean
  confirmPaesL1ProgramOnly: boolean
  confirmNoEnrollment: boolean
  confirmM2C01AccessOnly: boolean
  confirmM2C02AccessOnly: boolean
  confirmM2C03AccessOnly: boolean
  confirmM2C04AccessOnly: boolean
  confirmM2C05AccessOnly: boolean
  confirmM2C06AccessOnly: boolean
  confirmM2C07AccessOnly: boolean
  confirmM2C08AccessOnly: boolean
  confirmL1C01AccessOnly: boolean
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
const M2_C02_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Analisis de datos y probabilidad en tabla'
const M2_C03_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Funciones y comportamiento grafico inicial'
const M2_C04_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Geometria analitica y relaciones'
const M2_C05_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Sistemas y restricciones en contexto'
const M2_C06_STUDY_LOAD_TITLE = 'PAES M2 \u2014 Estadistica comparativa simple'
const M2_C07_STUDY_LOAD_TITLE = 'PAES M2 - Geometria con figura compuesta'
const M2_C08_STUDY_LOAD_TITLE = 'PAES M2 - Funcion cuadratica o no lineal inicial'
const M2_C04_CONTENT_KEY = 'paes_m2_analytic_geometry_relations_entry'
const M2_C05_CONTENT_KEY = 'paes_m2_systems_restrictions_context_entry'
const M2_C06_CONTENT_KEY = 'paes_m2_simple_comparative_statistics_entry'
const M2_C07_CONTENT_KEY = 'paes_m2_composite_geometry_figures_entry'
const M2_C08_CONTENT_KEY = 'paes_m2_quadratic_nonlinear_initial_entry'
const L1_C01_CONTENT_KEY = 'l1_locating_information_pilot_set_01'
const L1_C01_STUDY_LOAD_TITLE = 'PAES L1 - Localizacion de informacion - Piloto interno 01'
const L1_C01_CONTINUITY_POLICY = 'no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set'

const PAES_L1_PROGRAM = {
  code: 'PAES_L1',
  name: 'PAES Competencia Lectora',
  vertical: 'PAES',
  status: 'active',
} as const

type M2StudyLoadKey = 'C01' | 'C02' | 'C03' | 'C04' | 'C05' | 'C06' | 'C07' | 'C08'

const M2_STUDY_LOADS: Record<M2StudyLoadKey, { title: string; titleClass: string }> = {
  C01: {
    title: M2_C01_STUDY_LOAD_TITLE,
    titleClass: 'M2_C01',
  },
  C02: {
    title: M2_C02_STUDY_LOAD_TITLE,
    titleClass: 'M2_C02',
  },
  C03: {
    title: M2_C03_STUDY_LOAD_TITLE,
    titleClass: 'M2_C03',
  },
  C04: {
    title: M2_C04_STUDY_LOAD_TITLE,
    titleClass: 'M2_C04',
  },
  C05: {
    title: M2_C05_STUDY_LOAD_TITLE,
    titleClass: 'M2_C05',
  },
  C06: {
    title: M2_C06_STUDY_LOAD_TITLE,
    titleClass: 'M2_C06',
  },
  C07: {
    title: M2_C07_STUDY_LOAD_TITLE,
    titleClass: 'M2_C07',
  },
  C08: {
    title: M2_C08_STUDY_LOAD_TITLE,
    titleClass: 'M2_C08',
  },
}

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
    confirmPaesL1ProgramOnly: argv.includes('--confirm-paes-l1-program-only'),
    confirmNoEnrollment: argv.includes('--confirm-no-enrollment'),
    confirmM2C01AccessOnly: argv.includes('--confirm-m2-c01-access-only'),
    confirmM2C02AccessOnly: argv.includes('--confirm-m2-c02-access-only'),
    confirmM2C03AccessOnly: argv.includes('--confirm-m2-c03-access-only'),
    confirmM2C04AccessOnly: argv.includes('--confirm-m2-c04-access-only'),
    confirmM2C05AccessOnly: argv.includes('--confirm-m2-c05-access-only'),
    confirmM2C06AccessOnly: argv.includes('--confirm-m2-c06-access-only'),
    confirmM2C07AccessOnly: argv.includes('--confirm-m2-c07-access-only'),
    confirmM2C08AccessOnly: argv.includes('--confirm-m2-c08-access-only'),
    confirmL1C01AccessOnly: argv.includes('--confirm-l1-c01-access-only'),
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
    args.mode !== 'paes-l1-program-precheck' &&
    args.mode !== 'plan-paes-l1-program' &&
    args.mode !== 'align-paes-l1-program' &&
    args.mode !== 'paes-l1-program-postcheck' &&
    args.mode !== 'm2-access-precheck' &&
    args.mode !== 'plan-m2-c01-access' &&
    args.mode !== 'align-m2-c01-access' &&
    args.mode !== 'm2-access-postcheck' &&
    args.mode !== 'm2-c02-access-precheck' &&
    args.mode !== 'plan-m2-c02-access' &&
    args.mode !== 'align-m2-c02-access' &&
    args.mode !== 'm2-c02-access-postcheck' &&
    args.mode !== 'm2-c03-access-precheck' &&
    args.mode !== 'plan-m2-c03-access' &&
    args.mode !== 'align-m2-c03-access' &&
    args.mode !== 'm2-c03-access-postcheck' &&
    args.mode !== 'm2-c04-access-precheck' &&
    args.mode !== 'plan-m2-c04-access' &&
    args.mode !== 'align-m2-c04-access' &&
    args.mode !== 'm2-c04-access-postcheck' &&
    args.mode !== 'm2-c05-access-precheck' &&
    args.mode !== 'plan-m2-c05-access' &&
    args.mode !== 'align-m2-c05-access' &&
    args.mode !== 'm2-c05-access-postcheck' &&
    args.mode !== 'm2-c06-access-precheck' &&
    args.mode !== 'plan-m2-c06-access' &&
    args.mode !== 'align-m2-c06-access' &&
    args.mode !== 'm2-c06-access-postcheck' &&
    args.mode !== 'm2-c07-access-precheck' &&
    args.mode !== 'plan-m2-c07-access' &&
    args.mode !== 'align-m2-c07-access' &&
    args.mode !== 'm2-c07-access-postcheck' &&
    args.mode !== 'm2-c08-access-precheck' &&
    args.mode !== 'plan-m2-c08-access' &&
    args.mode !== 'align-m2-c08-access' &&
    args.mode !== 'm2-c08-access-postcheck' &&
    args.mode !== 'l1-c01-access-precheck' &&
    args.mode !== 'plan-l1-c01-access' &&
    args.mode !== 'align-l1-c01-access' &&
    args.mode !== 'l1-c01-access-postcheck'
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

function assertTargetStudentEmail(args: Args): void {
  if (!args.targetStudentEmail) {
    stop('LOCAL_DEV_SAFE_DB_TOOL_BLOCKED', {
      reason: 'target_student_email_required',
      targetStudentIdentifierPrinted: false,
    })
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

function assertPaesL1ProgramMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmPaesL1ProgramOnly ||
    !args.confirmNoEnrollment ||
    !args.confirmNoPayment ||
    !args.phase
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'paes_l1_program_mutation_guard_missing',
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

function assertM2C02AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C02AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c02_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C03AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C03AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c03_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C04AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C04AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c04_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C05AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C05AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c05_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C06AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C06AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c06_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C07AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C07AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c07_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertM2C08AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmM2C08AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'm2_c08_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
    })
  }
}

function assertL1C01AccessMutationGuards(args: Args): asserts args is Args & { phase: string } {
  if (
    !args.executeMutation ||
    !args.confirmMutation ||
    !args.confirmL1C01AccessOnly ||
    !args.confirmNoPayment ||
    !args.phase ||
    !args.targetStudentEmail
  ) {
    stop('LOCAL_DEV_SAFE_DB_MUTATION_BLOCKED', {
      reason: 'l1_c01_access_mutation_guard_missing',
      mutationExecuted: false,
      targetStudentIdentifierPrinted: false,
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
    WHERE code IN ('PAES_M1', 'PAES_M2', 'PAES_L1')
    ORDER BY code ASC
  `

  return {
    PAES_M1: rows.find((program) => program.code === 'PAES_M1') ?? null,
    PAES_M2: rows.find((program) => program.code === 'PAES_M2') ?? null,
    PAES_L1: rows.find((program) => program.code === 'PAES_L1') ?? null,
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

function classifyM2StudyLoadTitle(title: string) {
  if (title === M2_STUDY_LOADS.C01.title) return M2_STUDY_LOADS.C01.titleClass
  if (title === M2_STUDY_LOADS.C02.title) return M2_STUDY_LOADS.C02.titleClass
  if (title === M2_STUDY_LOADS.C03.title) return M2_STUDY_LOADS.C03.titleClass
  if (title === M2_STUDY_LOADS.C04.title) return M2_STUDY_LOADS.C04.titleClass
  if (title === M2_STUDY_LOADS.C05.title) return M2_STUDY_LOADS.C05.titleClass
  if (title === M2_STUDY_LOADS.C06.title) return M2_STUDY_LOADS.C06.titleClass
  if (title === M2_STUDY_LOADS.C07.title) return M2_STUDY_LOADS.C07.titleClass
  if (title === M2_STUDY_LOADS.C08.title) return M2_STUDY_LOADS.C08.titleClass
  if (title === L1_C01_STUDY_LOAD_TITLE) return 'L1_C01'
  return 'other'
}

function summarizeStudyLoad(load: { status: string; loadType: string; title: string } | null) {
  if (!load) return { present: false }
  return {
    present: true,
    status: load.status,
    loadType: load.loadType,
    titleClass: classifyM2StudyLoadTitle(load.title),
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

  const readStudyLoad = async (title: string) => (
    enrollment
      ? prisma.studyLoad.findFirst({
          where: {
            title,
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
  )

  const m2C01StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C01.title)
  const m2C02StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C02.title)
  const m2C03StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C03.title)
  const m2C04StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C04.title)
  const m2C05StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C05.title)
  const m2C06StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C06.title)
  const m2C07StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C07.title)
  const m2C08StudyLoad = await readStudyLoad(M2_STUDY_LOADS.C08.title)

  return {
    program,
    student,
    access: student?.access ?? null,
    enrollment,
    cycle,
    m2C01StudyLoad,
    m2C02StudyLoad,
    m2C03StudyLoad,
    m2C04StudyLoad,
    m2C05StudyLoad,
    m2C06StudyLoad,
    m2C07StudyLoad,
    m2C08StudyLoad,
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
    m2C01StudyLoad: summarizeStudyLoad(state.m2C01StudyLoad),
    m2C01StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C01StudyLoad),
    },
    m2C02StudyLoad: summarizeStudyLoad(state.m2C02StudyLoad),
    m2C02StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C02StudyLoad),
    },
    m2C03StudyLoad: summarizeStudyLoad(state.m2C03StudyLoad),
    m2C03StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C03StudyLoad),
    },
    m2C04ExpectedContentKey: M2_C04_CONTENT_KEY,
    m2C04StudyLoad: summarizeStudyLoad(state.m2C04StudyLoad),
    m2C04StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C04StudyLoad),
    },
    m2C05ExpectedContentKey: M2_C05_CONTENT_KEY,
    m2C05StudyLoad: summarizeStudyLoad(state.m2C05StudyLoad),
    m2C05StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C05StudyLoad),
    },
    m2C06ExpectedContentKey: M2_C06_CONTENT_KEY,
    m2C06StudyLoad: summarizeStudyLoad(state.m2C06StudyLoad),
    m2C06StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C06StudyLoad),
    },
    m2C07ExpectedContentKey: M2_C07_CONTENT_KEY,
    m2C07StudyLoad: summarizeStudyLoad(state.m2C07StudyLoad),
    m2C07StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C07StudyLoad),
    },
    m2C08ExpectedContentKey: M2_C08_CONTENT_KEY,
    m2C08StudyLoad: summarizeStudyLoad(state.m2C08StudyLoad),
    m2C08StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.m2C08StudyLoad),
    },
  }
}

function summarizeM2AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C01StudyLoad = Boolean(state.m2C01StudyLoad)
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

function summarizeM2C02AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C02StudyLoad = Boolean(state.m2C02StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByExistingM2C02 = hasM2C02StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    !hasM2C02StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByExistingM2C02,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C03AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C02StudyLoad = Boolean(state.m2C02StudyLoad)
  const hasCompletedM2C02StudyLoad = Boolean(state.m2C02StudyLoad && state.m2C02StudyLoad.status === 'completed')
  const hasM2C03StudyLoad = Boolean(state.m2C03StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C02 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C02StudyLoad
  const blockedByIncompleteM2C02 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C02StudyLoad &&
    !hasCompletedM2C02StudyLoad
  const blockedByExistingM2C03 = hasM2C03StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C02StudyLoad &&
    !hasM2C03StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C02,
    blockedByIncompleteM2C02,
    blockedByExistingM2C03,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C04AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C03StudyLoad = Boolean(state.m2C03StudyLoad)
  const hasCompletedM2C03StudyLoad = Boolean(state.m2C03StudyLoad && state.m2C03StudyLoad.status === 'completed')
  const hasM2C04StudyLoad = Boolean(state.m2C04StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C03 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C03StudyLoad
  const blockedByIncompleteM2C03 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C03StudyLoad &&
    !hasCompletedM2C03StudyLoad
  const blockedByExistingM2C04 = hasM2C04StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C03StudyLoad &&
    !hasM2C04StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: M2_C04_CONTENT_KEY,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C03,
    blockedByIncompleteM2C03,
    blockedByExistingM2C04,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C05AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C04StudyLoad = Boolean(state.m2C04StudyLoad)
  const hasCompletedM2C04StudyLoad = Boolean(state.m2C04StudyLoad && state.m2C04StudyLoad.status === 'completed')
  const hasM2C05StudyLoad = Boolean(state.m2C05StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C04 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C04StudyLoad
  const blockedByIncompleteM2C04 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C04StudyLoad &&
    !hasCompletedM2C04StudyLoad
  const blockedByExistingM2C05 = hasM2C05StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C04StudyLoad &&
    !hasM2C05StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: M2_C05_CONTENT_KEY,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C04,
    blockedByIncompleteM2C04,
    blockedByExistingM2C05,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C06AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C05StudyLoad = Boolean(state.m2C05StudyLoad)
  const hasCompletedM2C05StudyLoad = Boolean(state.m2C05StudyLoad && state.m2C05StudyLoad.status === 'completed')
  const hasM2C06StudyLoad = Boolean(state.m2C06StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C05 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C05StudyLoad
  const blockedByIncompleteM2C05 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C05StudyLoad &&
    !hasCompletedM2C05StudyLoad
  const blockedByExistingM2C06 = hasM2C06StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C05StudyLoad &&
    !hasM2C06StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: M2_C06_CONTENT_KEY,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C05,
    blockedByIncompleteM2C05,
    blockedByExistingM2C06,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C07AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C06StudyLoad = Boolean(state.m2C06StudyLoad)
  const hasCompletedM2C06StudyLoad = Boolean(state.m2C06StudyLoad && state.m2C06StudyLoad.status === 'completed')
  const hasM2C07StudyLoad = Boolean(state.m2C07StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C06 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C06StudyLoad
  const blockedByIncompleteM2C06 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C06StudyLoad &&
    !hasCompletedM2C06StudyLoad
  const blockedByExistingM2C07 = hasM2C07StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C06StudyLoad &&
    !hasM2C07StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: M2_C07_CONTENT_KEY,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C06,
    blockedByIncompleteM2C06,
    blockedByExistingM2C07,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeM2C08AccessPlan(state: Awaited<ReturnType<typeof readM2AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const programActive = Boolean(state.program && state.program.status === PAES_M2_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasM2C07StudyLoad = Boolean(state.m2C07StudyLoad)
  const hasCompletedM2C07StudyLoad = Boolean(state.m2C07StudyLoad && state.m2C07StudyLoad.status === 'completed')
  const hasM2C08StudyLoad = Boolean(state.m2C08StudyLoad)
  const blockedByMissingM2Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingM2Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByMissingM2C07 = targetStudentResolved && programActive && hasActiveEnrollment && hasOpenCycle && !hasM2C07StudyLoad
  const blockedByIncompleteM2C07 =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasM2C07StudyLoad &&
    !hasCompletedM2C07StudyLoad
  const blockedByExistingM2C08 = hasM2C08StudyLoad
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    hasCompletedM2C07StudyLoad &&
    !hasM2C08StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      programActive &&
      (!hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: M2_C08_CONTENT_KEY,
    programRequired: !programActive,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    mutationRequired,
    blockedByMissingM2Enrollment,
    blockedByMissingM2Cycle,
    blockedByMissingM2C07,
    blockedByIncompleteM2C07,
    blockedByExistingM2C08,
    scopeExpansionRequired,
    requiresFutureAuthorization: Boolean(mutationRequired || scopeExpansionRequired),
    targetStudentRequired: !targetStudentResolved,
  }
}

function summarizeL1C01Artifact() {
  const content = getStudyLoadContentByKey(L1_C01_CONTENT_KEY)
  const approval = content?.approvalMetadata
  const readingText = content?.readingText

  return {
    present: Boolean(content),
    contentKey: content?.contentKey ?? L1_C01_CONTENT_KEY,
    contentType: content?.contentType ?? null,
    titleClass: content?.title === L1_C01_STUDY_LOAD_TITLE ? 'L1_C01' : 'unexpected_title',
    itemCount: content?.items.length ?? 0,
    readingTextPresent: Boolean(readingText),
    textIdPresent: Boolean(readingText?.textId),
    sourceClass: readingText?.sourceClass ?? null,
    rightsBasis: readingText?.rightsBasis ?? null,
    officialSourceDependency: readingText?.officialSourceDependency ?? null,
    copyrightedSourceDependency: readingText?.copyrightedSourceDependency ?? null,
    reviewStatus: readingText?.reviewStatus ?? null,
    approvalMetadataPresent: Boolean(approval),
    registryScope: approval?.registryScope ?? null,
    studentUseApproved: approval?.studentUseApproved ?? null,
    productUseApproved: approval?.productUseApproved ?? null,
    salesReadyImplication: approval?.salesReadyImplication ?? null,
    continuityPolicy: approval?.continuityPolicy ?? null,
  }
}

function l1C01ArtifactReadyForAccess() {
  const artifact = summarizeL1C01Artifact()
  return Boolean(
    artifact.present &&
      artifact.contentType === 'reading_l1_locating_information' &&
      artifact.titleClass === 'L1_C01' &&
      artifact.itemCount === 3 &&
      artifact.readingTextPresent &&
      artifact.officialSourceDependency === 'none' &&
      artifact.copyrightedSourceDependency === 'none' &&
      artifact.studentUseApproved === false &&
      artifact.productUseApproved === false &&
      artifact.salesReadyImplication === 'none' &&
      artifact.continuityPolicy === L1_C01_CONTINUITY_POLICY,
  )
}

async function readL1C01AccessState(prisma: Awaited<ReturnType<typeof createPrismaClient>>, args: Args) {
  const program = await prisma.program.findUnique({
    where: { code: PAES_L1_PROGRAM.code },
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
          program: { code: PAES_L1_PROGRAM.code },
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

  const l1C01StudyLoad = enrollment
    ? await prisma.studyLoad.findFirst({
        where: {
          title: L1_C01_STUDY_LOAD_TITLE,
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
    l1C01StudyLoad,
    artifact: summarizeL1C01Artifact(),
  }
}

function summarizeL1C01AccessState(state: Awaited<ReturnType<typeof readL1C01AccessState>>) {
  return {
    ...summarizeTargetStudent(state.student),
    expectedContentKey: L1_C01_CONTENT_KEY,
    l1C01Artifact: state.artifact,
    l1C01ArtifactReadyForAccess: l1C01ArtifactReadyForAccess(),
    programs: {
      PAES_L1: summarizeProgram(state.program),
    },
    studentAccess: summarizeAccess(state.access),
    paesL1StudentProgramInstance: summarizeEnrollment(state.enrollment),
    l1LearningCycle: summarizeCycle(state.cycle),
    l1C01StudyLoad: summarizeStudyLoad(state.l1C01StudyLoad),
    l1C01StudyLoadReachableCandidate: {
      present: Boolean(state.enrollment && state.cycle && state.l1C01StudyLoad),
    },
    approvalMetadataMutated: false,
    registryMutated: false,
    continuityPolicy: L1_C01_CONTINUITY_POLICY,
  }
}

function summarizeL1C01AccessPlan(state: Awaited<ReturnType<typeof readL1C01AccessState>>) {
  const targetStudentResolved = Boolean(state.student)
  const artifactReady = l1C01ArtifactReadyForAccess()
  const programActive = Boolean(state.program && state.program.status === PAES_L1_PROGRAM.status)
  const hasEnrollment = Boolean(state.enrollment)
  const hasActiveEnrollment = Boolean(state.enrollment && state.enrollment.status === 'active')
  const hasOpenCycle = Boolean(state.cycle && state.cycle.status === 'open')
  const hasL1C01StudyLoad = Boolean(state.l1C01StudyLoad)
  const blockedByMissingL1Artifact = !artifactReady
  const blockedByMissingTargetStudent = !targetStudentResolved
  const blockedByMissingL1Program = targetStudentResolved && !programActive
  const blockedByMissingL1Enrollment = targetStudentResolved && programActive && !hasActiveEnrollment
  const blockedByMissingL1Cycle =
    targetStudentResolved &&
    programActive &&
    hasActiveEnrollment &&
    !hasOpenCycle
  const blockedByExistingL1C01 = hasL1C01StudyLoad
  const blockedByStaticReviewMissing = false
  const blockedByApprovalContinuity = !artifactReady
  const wouldCreateStudyLoad =
    targetStudentResolved &&
    artifactReady &&
    programActive &&
    hasActiveEnrollment &&
    hasOpenCycle &&
    !hasL1C01StudyLoad
  const mutationRequired = Boolean(wouldCreateStudyLoad)
  const scopeExpansionRequired = Boolean(
    targetStudentResolved &&
      artifactReady &&
      (!programActive || !hasEnrollment || !hasActiveEnrollment || !hasOpenCycle),
  )

  return {
    targetStudentResolved,
    targetStudentIdentifierPrinted: false,
    expectedContentKey: L1_C01_CONTENT_KEY,
    mutationRequired,
    wouldCreateStudyLoad,
    wouldMutateStudentAccess: false,
    wouldMutateEnrollment: false,
    wouldMutateProgram: false,
    wouldMutateApprovalMetadata: false,
    wouldMutateRegistry: false,
    blockers: {
      missingL1Artifact: blockedByMissingL1Artifact,
      missingTargetStudent: blockedByMissingTargetStudent,
      missingCompatibleProgram: blockedByMissingL1Program,
      missingCompatibleEnrollment: blockedByMissingL1Enrollment,
      missingCompatibleCycle: blockedByMissingL1Cycle,
      existingL1C01StudyLoad: blockedByExistingL1C01,
      staticReviewMissing: blockedByStaticReviewMissing,
      approvalOrContinuityBlocker: blockedByApprovalContinuity,
    },
    scopeExpansionRequired,
    requiresFutureAuthorization: true,
    studentUseApproved: false,
    productUseApproved: false,
    continuityPolicy: L1_C01_CONTINUITY_POLICY,
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

async function m2C02AccessReadOnly(
  mode: 'm2-c02-access-precheck' | 'm2-c02-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c02-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_POSTCHECK_COMPLETED',
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_CHECK_FAILED', {
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C03AccessReadOnly(
  mode: 'm2-c03-access-precheck' | 'm2-c03-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c03-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_POSTCHECK_COMPLETED',
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_CHECK_FAILED', {
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C04AccessReadOnly(
  mode: 'm2-c04-access-precheck' | 'm2-c04-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c04-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_POSTCHECK_COMPLETED',
      mode,
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C05AccessReadOnly(
  mode: 'm2-c05-access-precheck' | 'm2-c05-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c05-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_POSTCHECK_COMPLETED',
      mode,
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C06AccessReadOnly(
  mode: 'm2-c06-access-precheck' | 'm2-c06-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c06-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_POSTCHECK_COMPLETED',
      mode,
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C07AccessReadOnly(
  mode: 'm2-c07-access-precheck' | 'm2-c07-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c07-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_POSTCHECK_COMPLETED',
      mode,
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function m2C08AccessReadOnly(
  mode: 'm2-c08-access-precheck' | 'm2-c08-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: mode === 'm2-c08-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_POSTCHECK_COMPLETED',
      mode,
      expectedContentKey: M2_C08_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: M2_C08_CONTENT_KEY,
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

async function planM2C02Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c02-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C02AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c02-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C03Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c03-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C03AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c03-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C04Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c04-access',
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C04AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c04-access',
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C05Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c05-access',
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C05AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c05-access',
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C06Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c06-access',
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C06AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c06-access',
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C07Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c07-access',
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C07AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c07-access',
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planM2C08Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_PLAN_COMPLETED',
      mode: 'plan-m2-c08-access',
      expectedContentKey: M2_C08_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeM2AccessState(state),
      plan: summarizeM2C08AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_PLAN_FAILED', {
      mode: 'plan-m2-c08-access',
      expectedContentKey: M2_C08_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function l1C01AccessReadOnly(
  mode: 'l1-c01-access-precheck' | 'l1-c01-access-postcheck',
  args: Args,
): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readL1C01AccessState(prisma, args)

    printJson({
      status: mode === 'l1-c01-access-precheck'
        ? 'LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_POSTCHECK_COMPLETED',
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      studentUseApprovedChanged: false,
      productUseApprovedChanged: false,
      continuityChanged: false,
      ...summarizeL1C01AccessState(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_CHECK_FAILED', {
      mode,
      expectedContentKey: L1_C01_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planL1C01Access(args: Args): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readL1C01AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_PLAN_COMPLETED',
      mode: 'plan-l1-c01-access',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...summarizeL1C01AccessState(state),
      plan: summarizeL1C01AccessPlan(state),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_PLAN_FAILED', {
      mode: 'plan-l1-c01-access',
      expectedContentKey: L1_C01_CONTENT_KEY,
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

function summarizePaesL1ProgramPlan(program: ProgramSummary | null) {
  const metadataMatches = isAligned(program, PAES_L1_PROGRAM)
  const programPresent = Boolean(program)
  return {
    programPresent,
    metadataMatches,
    mutationRequired: !metadataMatches,
    wouldCreateProgram: !programPresent,
    wouldAlignProgramMetadata: programPresent && !metadataMatches,
    scopeExpansionRequired: false,
    requiresFutureAuthorization: !metadataMatches,
    wouldMutateProgram: !metadataMatches,
    wouldMutateEnrollment: false,
    wouldMutateStudentAccess: false,
    wouldMutateStudentProgramInstance: false,
    wouldMutateLearningCycle: false,
    wouldMutateStudyLoad: false,
    wouldMutateAxis: false,
    wouldMutateSkill: false,
    wouldMutateApprovalMetadata: false,
    wouldMutateRegistry: false,
    wouldMutatePayment: false,
  }
}

async function paesL1ProgramReadOnly(mode: 'paes-l1-program-precheck' | 'paes-l1-program-postcheck'): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const programs = await readProgramRows(prisma)
    const program = programs.PAES_L1
    const metadataMatches = isAligned(program, PAES_L1_PROGRAM)

    printJson({
      status: mode === 'paes-l1-program-precheck'
        ? 'LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_PRECHECK_COMPLETED'
        : 'LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_POSTCHECK_COMPLETED',
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      expectedProgram: PAES_L1_PROGRAM,
      programPresent: Boolean(program),
      metadataMatches,
      program: summarizeProgram(program),
      postcheckReady: mode === 'paes-l1-program-postcheck' ? metadataMatches : undefined,
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_READ_ONLY_FAILED', {
      mode,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function planPaesL1Program(): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const programs = await readProgramRows(prisma)
    const program = programs.PAES_L1

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_PLAN_COMPLETED',
      mode: 'plan-paes-l1-program',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      expectedProgram: PAES_L1_PROGRAM,
      currentProgram: summarizeProgram(program),
      plan: summarizePaesL1ProgramPlan(program),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_PLAN_FAILED', {
      mode: 'plan-paes-l1-program',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignPaesL1Program(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const before = await readProgramRows(prisma)
    const programMutated = !isAligned(before.PAES_L1, PAES_L1_PROGRAM)

    if (programMutated) {
      await prisma.$executeRaw`
        INSERT INTO programs (id, code, name, vertical, status, "createdAt", "updatedAt")
        VALUES (
          ${randomUUID()},
          ${PAES_L1_PROGRAM.code},
          ${PAES_L1_PROGRAM.name},
          ${PAES_L1_PROGRAM.vertical},
          ${PAES_L1_PROGRAM.status},
          NOW(),
          NOW()
        )
        ON CONFLICT (code) DO UPDATE SET
          name = EXCLUDED.name,
          vertical = EXCLUDED.vertical,
          status = EXCLUDED.status,
          "updatedAt" = NOW()
      `
    }

    const after = await readProgramRows(prisma)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_ALIGNMENT_COMPLETED',
      mode: 'align-paes-l1-program',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: programMutated,
      mutationScope: 'Program PAES_L1 only',
      programMutated,
      enrollmentMutated: false,
      studentAccessMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: false,
      axisMutated: false,
      skillMutated: false,
      approvalMetadataMutated: false,
      registryMutated: false,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      program: summarizeProgram(after.PAES_L1),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_PAES_L1_PROGRAM_ALIGNMENT_FAILED', {
      mode: 'align-paes-l1-program',
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

async function alignM2C02Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c02-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c02-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c02-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c02-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C02.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C02.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c02-access',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C02 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C02_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c02-access',
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

async function alignM2C03Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C02StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'm2_c02_study_load_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C02StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c03-access',
        phase: args.phase,
        reason: 'm2_c02_completed_required',
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C03.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C03.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c03-access',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C03 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C03_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c03-access',
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

async function alignM2C04Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C03StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'm2_c03_study_load_required',
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C03StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c04-access',
        phase: args.phase,
        reason: 'm2_c03_completed_required',
        expectedContentKey: M2_C04_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C04.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C04.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c04-access',
      phase: args.phase,
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C04 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C04_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c04-access',
      phase: args.phase,
      expectedContentKey: M2_C04_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignM2C05Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C04StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'm2_c04_study_load_required',
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C04StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c05-access',
        phase: args.phase,
        reason: 'm2_c04_completed_required',
        expectedContentKey: M2_C05_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C05.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C05.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c05-access',
      phase: args.phase,
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C05 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C05_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c05-access',
      phase: args.phase,
      expectedContentKey: M2_C05_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignM2C06Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C05StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'm2_c05_study_load_required',
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C05StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c06-access',
        phase: args.phase,
        reason: 'm2_c05_completed_required',
        expectedContentKey: M2_C06_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C06.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C06.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c06-access',
      phase: args.phase,
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C06 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C06_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c06-access',
      phase: args.phase,
      expectedContentKey: M2_C06_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignM2C07Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C06StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'm2_c06_study_load_required',
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C06StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c07-access',
        phase: args.phase,
        reason: 'm2_c06_completed_required',
        expectedContentKey: M2_C07_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C07.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C07.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c07-access',
      phase: args.phase,
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C07 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C07_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c07-access',
      phase: args.phase,
      expectedContentKey: M2_C07_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignM2C08Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readM2AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.program || state.program.status !== PAES_M2_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'paes_m2_program_not_active',
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'active_paes_m2_enrollment_required',
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'open_m2_learning_cycle_required',
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.m2C07StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'm2_c07_study_load_required',
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (state.m2C07StudyLoad.status !== 'completed') {
      stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-m2-c08-access',
        phase: args.phase,
        reason: 'm2_c07_completed_required',
        expectedContentKey: M2_C08_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      let studyLoadMutated = false

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          title: M2_STUDY_LOADS.C08.title,
          learningCycle: { enrollmentId: state.enrollment!.id },
        },
        select: { id: true },
      })

      if (!existingStudyLoad) {
        await tx.studyLoad.create({
          data: {
            learningCycleId: state.cycle!.id,
            title: M2_STUDY_LOADS.C08.title,
            loadType: 'practice',
            status: 'pending',
          },
          select: { id: true },
        })
        studyLoadMutated = true
      }

      return {
        studyLoadMutated,
      }
    })

    const finalState = await readM2AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-m2-c08-access',
      phase: args.phase,
      expectedContentKey: M2_C08_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'M2-C08 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeM2AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_M2_C08_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-m2-c08-access',
      phase: args.phase,
      expectedContentKey: M2_C08_CONTENT_KEY,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
      ...classifyError(error),
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function alignL1C01Access(args: Args & { phase: string }): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const state = await readL1C01AccessState(prisma, args)

    if (!state.student) {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'target_student_unresolved',
        targetStudentIdentifierPrinted: false,
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
      })
    }

    if (!l1C01ArtifactReadyForAccess()) {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'l1_c01_artifact_or_guardrails_not_ready',
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    if (!state.program || state.program.status !== PAES_L1_PROGRAM.status) {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'paes_l1_program_not_active',
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.enrollment || state.enrollment.status !== 'active') {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'active_paes_l1_enrollment_required',
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (!state.cycle || state.cycle.status !== 'open') {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'open_l1_learning_cycle_required',
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: true,
      })
    }

    if (state.l1C01StudyLoad) {
      stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_BLOCKED', {
        mode: 'align-l1-c01-access',
        phase: args.phase,
        reason: 'l1_c01_study_load_already_exists',
        expectedContentKey: L1_C01_CONTENT_KEY,
        databaseUrlPresent: true,
        databaseUrlValuePrinted: false,
        scopeExpansionRequired: false,
      })
    }

    const mutationFlags = await prisma.$transaction(async (tx) => {
      await tx.studyLoad.create({
        data: {
          learningCycleId: state.cycle!.id,
          title: L1_C01_STUDY_LOAD_TITLE,
          loadType: 'practice',
          status: 'pending',
        },
        select: { id: true },
      })

      return {
        studyLoadMutated: true,
      }
    })

    const finalState = await readL1C01AccessState(prisma, args)

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_COMPLETED',
      mode: 'align-l1-c01-access',
      phase: args.phase,
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: mutationFlags.studyLoadMutated,
      mutationScope: 'L1-C01 StudyLoad only',
      studentAccessMutated: false,
      enrollmentMutated: false,
      studentProgramInstanceMutated: false,
      learningCycleMutated: false,
      programMutated: false,
      studyLoadMutated: mutationFlags.studyLoadMutated,
      paymentMutated: false,
      prodTouched: false,
      stagingTouched: false,
      ...summarizeL1C01AccessState(finalState),
    })
  } catch (error) {
    stop('LOCAL_DEV_SAFE_DB_L1_C01_ACCESS_ALIGNMENT_FAILED', {
      mode: 'align-l1-c01-access',
      phase: args.phase,
      expectedContentKey: L1_C01_CONTENT_KEY,
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

  if (args.mode === 'paes-l1-program-precheck' || args.mode === 'paes-l1-program-postcheck') {
    assertReadOnlyGuards(args)
    await paesL1ProgramReadOnly(args.mode)
    return
  }

  if (args.mode === 'plan-paes-l1-program') {
    assertReadOnlyGuards(args)
    await planPaesL1Program()
    return
  }

  if (args.mode === 'm2-access-precheck' || args.mode === 'm2-access-postcheck') {
    assertReadOnlyGuards(args)
    await m2AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c02-access-precheck' || args.mode === 'm2-c02-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C02AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c03-access-precheck' || args.mode === 'm2-c03-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C03AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c04-access-precheck' || args.mode === 'm2-c04-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C04AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c05-access-precheck' || args.mode === 'm2-c05-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C05AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c06-access-precheck' || args.mode === 'm2-c06-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C06AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c07-access-precheck' || args.mode === 'm2-c07-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C07AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'm2-c08-access-precheck' || args.mode === 'm2-c08-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await m2C08AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'l1-c01-access-precheck' || args.mode === 'l1-c01-access-postcheck') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await l1C01AccessReadOnly(args.mode, args)
    return
  }

  if (args.mode === 'plan-m2-c01-access') {
    assertReadOnlyGuards(args)
    await planM2C01Access(args)
    return
  }

  if (args.mode === 'plan-m2-c02-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C02Access(args)
    return
  }

  if (args.mode === 'plan-m2-c03-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C03Access(args)
    return
  }

  if (args.mode === 'plan-m2-c04-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C04Access(args)
    return
  }

  if (args.mode === 'plan-m2-c05-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C05Access(args)
    return
  }

  if (args.mode === 'plan-m2-c06-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C06Access(args)
    return
  }

  if (args.mode === 'plan-m2-c07-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C07Access(args)
    return
  }

  if (args.mode === 'plan-m2-c08-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planM2C08Access(args)
    return
  }

  if (args.mode === 'plan-l1-c01-access') {
    assertReadOnlyGuards(args)
    assertTargetStudentEmail(args)
    await planL1C01Access(args)
    return
  }

  if (args.mode === 'align-m2-c01-access') {
    assertM2AccessMutationGuards(args)
    await alignM2C01Access(args)
    return
  }

  if (args.mode === 'align-m2-c02-access') {
    assertM2C02AccessMutationGuards(args)
    await alignM2C02Access(args)
    return
  }

  if (args.mode === 'align-m2-c03-access') {
    assertM2C03AccessMutationGuards(args)
    await alignM2C03Access(args)
    return
  }

  if (args.mode === 'align-m2-c04-access') {
    assertM2C04AccessMutationGuards(args)
    await alignM2C04Access(args)
    return
  }

  if (args.mode === 'align-m2-c05-access') {
    assertM2C05AccessMutationGuards(args)
    await alignM2C05Access(args)
    return
  }

  if (args.mode === 'align-m2-c06-access') {
    assertM2C06AccessMutationGuards(args)
    await alignM2C06Access(args)
    return
  }

  if (args.mode === 'align-m2-c07-access') {
    assertM2C07AccessMutationGuards(args)
    await alignM2C07Access(args)
    return
  }

  if (args.mode === 'align-m2-c08-access') {
    assertM2C08AccessMutationGuards(args)
    await alignM2C08Access(args)
    return
  }

  if (args.mode === 'align-l1-c01-access') {
    assertL1C01AccessMutationGuards(args)
    await alignL1C01Access(args)
    return
  }

  if (args.mode === 'align-paes-l1-program') {
    assertPaesL1ProgramMutationGuards(args)
    await alignPaesL1Program(args)
    return
  }

  assertMutationGuards(args)
  await alignPaesM2Program(args.phase)
}

main().catch(() => {
  stop('LOCAL_DEV_SAFE_DB_TOOL_FAILED', { reason: 'unhandled_error' }, 1)
})
