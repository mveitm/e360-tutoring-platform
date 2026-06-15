type Mode = 'check'

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
  if (args.mode !== 'check') printBlocked()
  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') printBlocked()
  if (!args.confirmNoRealData) printBlocked()
  if (!args.confirmNoProduction) printBlocked()
  if (!args.confirmNoStaging) printBlocked()
  if (!args.confirmReadOnly) printBlocked()
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

  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

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

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  assertConfirmed(args)
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
