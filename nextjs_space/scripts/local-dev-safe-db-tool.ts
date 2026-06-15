import { randomUUID } from 'node:crypto'
import { loadLocalEnvPrivate } from './lib/load-local-env-private'

type Mode =
  | 'confirm-local-dev'
  | 'program-check'
  | 'program-align-readiness'
  | 'check-programs'
  | 'plan-paes-m2-program'
  | 'align-paes-m2-program'

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
  executeMutation: boolean
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
    executeMutation: argv.includes('--execute-mutation'),
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
    args.mode !== 'align-paes-m2-program'
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

  assertMutationGuards(args)
  await alignPaesM2Program(args.phase)
}

main().catch(() => {
  stop('LOCAL_DEV_SAFE_DB_TOOL_FAILED', { reason: 'unhandled_error' }, 1)
})
