type Mode = 'check' | 'program-check' | 'program-align-readiness'

import { loadLocalEnvPrivate } from './lib/load-local-env-private'

interface Args {
  mode?: string
  targetClass?: string
  confirmNoRealData: boolean
  confirmNoProduction: boolean
  confirmNoStaging: boolean
  confirmReadOnly: boolean
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
    confirmNoRealData: argv.includes('--confirm-no-real-data'),
    confirmNoProduction: argv.includes('--confirm-no-production'),
    confirmNoStaging: argv.includes('--confirm-no-staging'),
    confirmReadOnly: argv.includes('--confirm-read-only'),
  }
}

function printSafeStatus(lines: string[]): void {
  for (const line of lines) {
    console.log(line)
  }
}

function printJson(payload: Record<string, unknown>): void {
  console.log(JSON.stringify({ ...payload, secretValuesPrinted: false }, null, 2))
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

function printBlocked(extraLines: string[] = []): never {
  printSafeStatus([
    'LOCAL_DEV_DB_CHECK_BLOCKED',
    'DETAILS_REDACTED',
    ...extraLines,
    'NO DATA MUTATED',
    'NO SECRET VALUES PRINTED',
  ])
  process.exit(2)
}

function assertConfirmed(args: Args): asserts args is Args & { mode: Mode } {
  if (
    args.mode !== 'check' &&
    args.mode !== 'program-check' &&
    args.mode !== 'program-align-readiness'
  ) {
    printBlocked()
  }
  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') printBlocked()
  if (!args.confirmNoRealData) printBlocked()
  if (!args.confirmNoProduction) printBlocked()
  if (!args.confirmNoStaging) printBlocked()
  if (!args.confirmReadOnly) printBlocked()
}

interface ProgramSummary {
  code: string
  name: string
  vertical: string
  status: string
}

const PAES_M2_PROGRAM = {
  code: 'PAES_M2',
  name: 'PAES Matemática M2',
  vertical: 'PAES',
  status: 'active',
} as const

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

function isPaesM2Aligned(program: ProgramSummary | null): boolean {
  return Boolean(
    program &&
      program.code === PAES_M2_PROGRAM.code &&
      program.name === PAES_M2_PROGRAM.name &&
      program.vertical === PAES_M2_PROGRAM.vertical &&
      program.status === PAES_M2_PROGRAM.status,
  )
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

  const aligned = isPaesM2Aligned(program)
  return {
    state: aligned ? 'present_aligned' : 'present_not_aligned',
    aligned,
    futureMutationNeeded: !aligned,
    futureMutationType: aligned ? 'none' : 'update Program PAES_M2 metadata only',
  }
}

async function readPrograms(prisma: Awaited<ReturnType<typeof createPrisma>>) {
  const rows = await prisma.program.findMany({
    where: { code: { in: ['PAES_M1', 'PAES_M2'] } },
    select: { code: true, name: true, vertical: true, status: true },
    orderBy: { code: 'asc' },
  })

  return {
    PAES_M1: rows.find((program) => program.code === 'PAES_M1') ?? null,
    PAES_M2: rows.find((program) => program.code === 'PAES_M2') ?? null,
  }
}

async function createPrisma() {
  const { PrismaClient } = await import('@prisma/client')
  return new PrismaClient()
}

async function runReadOnlyCheck(): Promise<void> {
  const envLoadResult = loadLocalEnvPrivate()
  const databaseUrlPresent = Boolean(process.env.DATABASE_URL)

  const signalLines = [
    `localEnvFilePresent: ${envLoadResult.localEnvFilePresent ? 'yes' : 'no'}`,
    `databaseUrlPresent: ${databaseUrlPresent ? 'yes' : 'no'}`,
    'databaseUrlValuePrinted: no',
  ]

  if (!databaseUrlPresent) {
    printBlocked(signalLines)
  }

  const prisma = await createPrisma()

  try {
    await prisma.user.count()
    printSafeStatus([
      'LOCAL_DEV_DB_AVAILABLE',
      ...signalLines,
      'readCheck: passed',
      'NO DATA MUTATED',
      'NO SECRET VALUES PRINTED',
    ])
  } catch {
    printSafeStatus([
      'LOCAL_DEV_DB_UNAVAILABLE',
      'DETAILS_REDACTED',
      ...signalLines,
      'readCheck: failed',
      'NO DATA MUTATED',
      'NO SECRET VALUES PRINTED',
    ])
    process.exitCode = 1
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function runProgramCheck(): Promise<void> {
  loadLocalEnvPrivate()
  const databaseUrlPresent = Boolean(process.env.DATABASE_URL)

  if (!databaseUrlPresent) {
    printBlocked([
      'localEnvFilePresent: unknown',
      'databaseUrlPresent: no',
      'databaseUrlValuePrinted: no',
    ])
  }

  const prisma = await createPrisma()

  try {
    await prisma.user.count()
    const programs = await readPrograms(prisma)
    printJson({
      status: 'LOCAL_DEV_DB_PROGRAM_CHECK_COMPLETED',
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
    printJson({
      status: 'LOCAL_DEV_DB_PROGRAM_CHECK_FAILED',
      detailsRedacted: true,
      mode: 'program-check',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...classifyError(error),
    })
    process.exitCode = 1
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function runProgramAlignReadiness(): Promise<void> {
  loadLocalEnvPrivate()
  const databaseUrlPresent = Boolean(process.env.DATABASE_URL)

  if (!databaseUrlPresent) {
    printBlocked([
      'localEnvFilePresent: unknown',
      'databaseUrlPresent: no',
      'databaseUrlValuePrinted: no',
    ])
  }

  const prisma = await createPrisma()

  try {
    await prisma.user.count()
    const programs = await readPrograms(prisma)
    const readiness = summarizeReadiness(programs.PAES_M2)
    printJson({
      status: 'LOCAL_DEV_DB_PROGRAM_ALIGNMENT_READINESS_COMPLETED',
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
    printJson({
      status: 'LOCAL_DEV_DB_PROGRAM_ALIGNMENT_READINESS_FAILED',
      detailsRedacted: true,
      mode: 'program-align-readiness',
      databaseUrlPresent: true,
      databaseUrlValuePrinted: false,
      dataMutated: false,
      ...classifyError(error),
    })
    process.exitCode = 1
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  assertConfirmed(args)
  if (args.mode === 'program-check') {
    await runProgramCheck()
    return
  }
  if (args.mode === 'program-align-readiness') {
    await runProgramAlignReadiness()
    return
  }
  await runReadOnlyCheck()
}

main().catch(() => {
  printSafeStatus([
    'LOCAL_DEV_DB_CHECK_BLOCKED',
    'DETAILS_REDACTED',
    'NO DATA MUTATED',
    'NO SECRET VALUES PRINTED',
  ])
  process.exit(1)
})
