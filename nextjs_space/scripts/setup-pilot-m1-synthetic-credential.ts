type Mode = 'help' | 'plan' | 'apply'

import bcrypt from 'bcryptjs'
import { loadLocalEnvPrivate } from './lib/load-local-env-private'

const DEFAULT_TARGET_EMAIL = 'pilot.m1.001@example.invalid'
const DEFAULT_PARTICIPANT_CODE = 'PILOT_M1_001'
const PASSWORD_ENV_KEY = 'BEXAURI_SYNTHETIC_STUDENT_PASSWORD'

interface Args {
  mode: Mode
  targetClass?: string
  participantCode?: string
  email?: string
  confirmNoRealData: boolean
  confirmNoProduction: boolean
  confirmNoStaging: boolean
  confirmLocalDevMutation: boolean
}

function readValue(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag)
  if (index < 0) return undefined
  const value = argv[index + 1]
  if (!value || value.startsWith('--')) return undefined
  return value
}

function isMode(value: string | undefined): value is Mode {
  return value === 'help' || value === 'plan' || value === 'apply'
}

function parseArgs(argv: string[]): Args {
  const rawMode = readValue(argv, '--mode') ?? 'help'
  if (!isMode(rawMode)) failBlocked('Unsupported mode.')

  return {
    mode: rawMode,
    targetClass: readValue(argv, '--target-class'),
    participantCode: readValue(argv, '--participant-code'),
    email: readValue(argv, '--email')?.trim().toLowerCase(),
    confirmNoRealData: argv.includes('--confirm-no-real-data'),
    confirmNoProduction: argv.includes('--confirm-no-production'),
    confirmNoStaging: argv.includes('--confirm-no-staging'),
    confirmLocalDevMutation: argv.includes('--confirm-local-dev-mutation'),
  }
}

function printSafetyMarkers(): void {
  console.log('NO DB CONNECTION ATTEMPTED')
  console.log('NO DATA MUTATED')
  console.log('NO SECRET VALUES PRINTED')
}

function printHelp(): void {
  printSafetyMarkers()
  console.log('')
  console.log('PILOT_M1_001 synthetic credential setup helper')
  console.log('')
  console.log('Non-mutating modes:')
  console.log('  --mode help')
  console.log('  --mode plan --target-class LOCAL_DEV_CONFIRMED --participant-code PILOT_M1_001 --email pilot.m1.001@example.invalid --confirm-no-real-data --confirm-no-production --confirm-no-staging')
  console.log('')
  console.log('Future guarded apply mode:')
  console.log('  --mode apply --target-class LOCAL_DEV_CONFIRMED --participant-code PILOT_M1_001 --email pilot.m1.001@example.invalid --confirm-no-real-data --confirm-no-production --confirm-no-staging --confirm-local-dev-mutation')
  console.log('')
  console.log(`Password source for apply mode: ${PASSWORD_ENV_KEY}`)
  console.log('Password value must be provided privately in the local shell. It is never printed.')
}

function printPlan(args: Args): void {
  const email = args.email ?? DEFAULT_TARGET_EMAIL
  printSafetyMarkers()
  console.log('')
  console.log('Synthetic credential setup plan')
  console.log(`targetClass: ${args.targetClass ?? 'UNCONFIRMED'}`)
  console.log(`participantCode: ${args.participantCode ?? DEFAULT_PARTICIPANT_CODE}`)
  console.log(`targetEmail: ${email}`)
  console.log(`passwordSource: ${PASSWORD_ENV_KEY}`)
  console.log('')
  console.log('Planned guarded operation:')
  console.log('  1. Confirm local/dev target flags.')
  console.log('  2. Confirm target email is allowed synthetic data.')
  console.log('  3. Privately load local env for DB access only in apply mode.')
  console.log('  4. Locate existing User and matching Student.')
  console.log('  5. Refuse if either record is missing or non-fixture-looking.')
  console.log('  6. Hash the private synthetic password with bcrypt cost 10.')
  console.log('  7. Update only User.password for the existing synthetic User.')
  console.log('')
  console.log('Plan mode does not inspect env, connect to DB, hash a password, or mutate data.')
}

function targetEmail(args: Args): string {
  return args.email ?? DEFAULT_TARGET_EMAIL
}

function assertAllowedTarget(args: Args): { email: string; participantCode: string } {
  const email = targetEmail(args)
  const participantCode = args.participantCode ?? DEFAULT_PARTICIPANT_CODE

  if (participantCode !== DEFAULT_PARTICIPANT_CODE) {
    failBlocked('Unsupported participant code.')
  }

  if (email !== DEFAULT_TARGET_EMAIL) {
    failBlocked('Unsupported target email.')
  }

  if (!email.endsWith('@example.invalid')) {
    failBlocked('Target email is not synthetic .example.invalid data.')
  }

  return { email, participantCode }
}

function assertApplyConfirmed(args: Args): void {
  const missing: string[] = []
  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') missing.push('--target-class LOCAL_DEV_CONFIRMED')
  if (args.participantCode !== DEFAULT_PARTICIPANT_CODE) {
    missing.push(`--participant-code ${DEFAULT_PARTICIPANT_CODE}`)
  }
  if (targetEmail(args) !== DEFAULT_TARGET_EMAIL) missing.push(`--email ${DEFAULT_TARGET_EMAIL}`)
  if (!args.confirmNoRealData) missing.push('--confirm-no-real-data')
  if (!args.confirmNoProduction) missing.push('--confirm-no-production')
  if (!args.confirmNoStaging) missing.push('--confirm-no-staging')
  if (!args.confirmLocalDevMutation) missing.push('--confirm-local-dev-mutation')

  if (missing.length > 0) {
    console.error('SYNTHETIC_CREDENTIAL_SETUP_BLOCKED')
    console.error('Missing or invalid confirmation flags:')
    for (const flag of missing) console.error(`  ${flag}`)
    console.error('NO DATA MUTATED')
    console.error('NO SECRET VALUES PRINTED')
    process.exit(2)
  }
}

function assertNonProductionSignals(): void {
  const labels = [
    process.env.NODE_ENV,
    process.env.VERCEL_ENV,
    process.env.NEXT_PUBLIC_VERCEL_ENV,
  ]

  if (labels.some((value) => value === 'production' || value === 'preview' || value === 'staging')) {
    failBlocked('Runtime environment label is not allowed for local/dev credential setup.')
  }
}

function readSyntheticPassword(): string {
  const password = process.env[PASSWORD_ENV_KEY]

  if (!password) {
    failBlocked(`Missing private local password env var: ${PASSWORD_ENV_KEY}.`)
  }

  if (password.length < 8) {
    failBlocked('Synthetic password does not meet minimum length.')
  }

  return password
}

async function runApply(args: Args): Promise<void> {
  assertApplyConfirmed(args)
  const target = assertAllowedTarget(args)

  loadLocalEnvPrivate()
  assertNonProductionSignals()
  const syntheticPassword = readSyntheticPassword()

  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: target.email },
        select: { id: true, email: true, name: true },
      })

      if (!user) {
        throw new Error('Existing synthetic User was not found.')
      }

      if (user.email !== target.email || user.name !== `${target.participantCode} fixture`) {
        throw new Error('Existing User is not the expected synthetic fixture user.')
      }

      const student = await tx.student.findUnique({
        where: { email: target.email },
        select: { id: true, firstName: true, lastName: true, email: true },
      })

      if (!student) {
        throw new Error('Matching synthetic Student was not found.')
      }

      if (
        student.email !== target.email ||
        student.firstName !== target.participantCode ||
        student.lastName !== 'Fixture'
      ) {
        throw new Error('Matching Student is not the expected synthetic fixture student.')
      }

      const hashedPassword = await bcrypt.hash(syntheticPassword, 10)
      await tx.user.update({
        where: { email: target.email },
        data: { password: hashedPassword },
        select: { id: true },
      })

      return {
        userFound: true,
        studentFound: true,
        credentialUpdated: true,
      }
    })

    console.log('SYNTHETIC_CREDENTIAL_UPDATED')
    console.log(`participantCode: ${target.participantCode}`)
    console.log(`targetEmail: ${target.email}`)
    console.log(`userFound: ${result.userFound ? 'yes' : 'no'}`)
    console.log(`studentFound: ${result.studentFound ? 'yes' : 'no'}`)
    console.log(`credentialUpdated: ${result.credentialUpdated ? 'yes' : 'no'}`)
    console.log('DB MUTATION PERFORMED: LOCAL_DEV_SYNTHETIC_CREDENTIAL_ONLY')
    console.log('NO SECRET VALUES PRINTED')
  } catch (error) {
    console.error('SYNTHETIC_CREDENTIAL_SETUP_BLOCKED')
    console.error(safeError(error))
    console.error('NO SECRET VALUES PRINTED')
    process.exitCode = 1
  } finally {
    await prisma.$disconnect().catch(() => undefined)
  }
}

function safeError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)

  if (
    message.includes("Can't reach database server") ||
    message.includes('P1001') ||
    message.includes('DATABASE_URL') ||
    message.includes('database server')
  ) {
    return 'Database connection failed. Details redacted.'
  }

  if (message.includes('Environment variable not found')) {
    return 'Database configuration unavailable. Details redacted.'
  }

  if (
    message.includes('synthetic') ||
    message.includes('Synthetic') ||
    message.includes('Existing') ||
    message.includes('Matching') ||
    message.includes('Missing private local password') ||
    message.includes('minimum length')
  ) {
    return message
  }

  return 'Credential setup failed. Details redacted.'
}

function failBlocked(message: string): never {
  console.error('SYNTHETIC_CREDENTIAL_SETUP_BLOCKED')
  console.error(message)
  console.error('NO DATA MUTATED')
  console.error('NO SECRET VALUES PRINTED')
  process.exit(2)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))

  if (args.mode === 'help') {
    printHelp()
    return
  }

  if (args.mode === 'plan') {
    assertAllowedTarget(args)
    printPlan(args)
    return
  }

  await runApply(args)
}

main().catch(() => {
  console.error('SYNTHETIC_CREDENTIAL_SETUP_BLOCKED')
  console.error('Unexpected helper failure. Details redacted.')
  console.error('NO SECRET VALUES PRINTED')
  process.exit(1)
})
