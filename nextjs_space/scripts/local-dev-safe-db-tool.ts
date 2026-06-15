import { loadLocalEnvPrivate } from './lib/load-local-env-private'

type Mode = 'check-programs' | 'plan-paes-m2-program' | 'align-paes-m2-program'

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
  name: 'PAES Matematica M2',
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

function assertCommonGuards(args: Args): asserts args is Args & { mode: Mode } {
  if (
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

function summarizeProgram(program: {
  code: string
  name: string
  vertical: string
  status: string
} | null) {
  if (!program) return { present: false }
  return {
    present: true,
    code: program.code,
    name: program.name,
    vertical: program.vertical,
    status: program.status,
  }
}

async function checkPrograms(): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const [paesM1, paesM2] = await Promise.all([
      prisma.program.findUnique({
        where: { code: 'PAES_M1' },
        select: { code: true, name: true, vertical: true, status: true },
      }),
      prisma.program.findUnique({
        where: { code: 'PAES_M2' },
        select: { code: true, name: true, vertical: true, status: true },
      }),
    ])

    printJson({
      status: 'LOCAL_DEV_SAFE_DB_CHECK_COMPLETED',
      mode: 'check-programs',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      programs: {
        PAES_M1: summarizeProgram(paesM1),
        PAES_M2: summarizeProgram(paesM2),
      },
    })
  } catch {
    stop('LOCAL_DEV_SAFE_DB_CHECK_FAILED', {
      mode: 'check-programs',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

function planPaesM2Program(): void {
  printJson({
    status: 'LOCAL_DEV_SAFE_DB_PLAN_COMPLETED',
    mode: 'plan-paes-m2-program',
    dataMutated: false,
    plannedProgram: PAES_M2_PROGRAM,
    requiresFutureAuthorization: true,
  })
}

async function alignPaesM2Program(phase: string): Promise<void> {
  const prisma = await createPrismaClient()
  try {
    const program = await prisma.program.upsert({
      where: { code: PAES_M2_PROGRAM.code },
      create: PAES_M2_PROGRAM,
      update: {
        name: PAES_M2_PROGRAM.name,
        vertical: PAES_M2_PROGRAM.vertical,
        status: PAES_M2_PROGRAM.status,
      },
      select: { code: true, name: true, vertical: true, status: true },
    })

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
      program: summarizeProgram(program),
    })
  } catch {
    stop('LOCAL_DEV_SAFE_DB_PROGRAM_ALIGNMENT_FAILED', {
      mode: 'align-paes-m2-program',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      mutationResultUnknown: true,
    }, 1)
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  assertCommonGuards(args)

  if (args.mode === 'check-programs') {
    assertReadOnlyGuards(args)
    await checkPrograms()
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
