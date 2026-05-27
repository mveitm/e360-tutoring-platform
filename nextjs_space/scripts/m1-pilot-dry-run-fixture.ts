type Mode = 'help' | 'plan' | 'dry-run' | 'apply' | 'cleanup'

interface Args {
  mode: Mode
  runId?: string
  targetClass?: string
  confirmNoRealData: boolean
  confirmNoProduction: boolean
  confirmNoStaging: boolean
}

const PARTICIPANTS = [
  {
    participantCode: 'PILOT_M1_001',
    syntheticEmail: 'pilot.m1.001@example.invalid',
  },
  {
    participantCode: 'PILOT_M1_002',
    syntheticEmail: 'pilot.m1.002@example.invalid',
  },
  {
    participantCode: 'PILOT_M1_003',
    syntheticEmail: 'pilot.m1.003@example.invalid',
  },
] as const

const CANDIDATE_STUDY_LOAD = {
  title: 'PAES M1 \u2014 Entrada balanceada inicial',
  contentKey: 'paes_m1_balanced_entry_initial',
  programCode: 'PAES_M1',
  loadType: 'practice',
  initialStatus: 'pending',
} as const

const FUTURE_REQUIRED_FLAGS = [
  '--target-class LOCAL_DEV_CONFIRMED',
  '--run-id <synthetic-run-id>',
  '--confirm-no-real-data',
  '--confirm-no-production',
  '--confirm-no-staging',
] as const

function parseArgs(argv: string[]): Args {
  const modeIndex = argv.indexOf('--mode')
  const rawMode = modeIndex >= 0 ? argv[modeIndex + 1] : 'help'

  if (!isMode(rawMode)) {
    fail(`Unsupported mode: ${rawMode ?? '<missing>'}`)
  }

  return {
    mode: rawMode,
    runId: readValue(argv, '--run-id'),
    targetClass: readValue(argv, '--target-class'),
    confirmNoRealData: argv.includes('--confirm-no-real-data'),
    confirmNoProduction: argv.includes('--confirm-no-production'),
    confirmNoStaging: argv.includes('--confirm-no-staging'),
  }
}

function isMode(value: string | undefined): value is Mode {
  return (
    value === 'help' ||
    value === 'plan' ||
    value === 'dry-run' ||
    value === 'apply' ||
    value === 'cleanup'
  )
}

function readValue(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag)
  if (index < 0) return undefined
  const value = argv[index + 1]
  if (!value || value.startsWith('--')) return undefined
  return value
}

function fixtureLabel(runId: string): string {
  return `PILOT_M1_DRY_RUN_LOCAL_DEV_${runId}`
}

function printSafetyBanner(): void {
  console.log('NO DB CONNECTION ATTEMPTED')
  console.log('NO DATA MUTATED')
  console.log('NO REAL STUDENT DATA')
}

function printHelp(): void {
  printSafetyBanner()
  console.log('')
  console.log('M1 pilot dry-run fixture helper')
  console.log('')
  console.log('Supported non-DB modes in this phase:')
  console.log('  --mode help')
  console.log('  --mode plan --run-id <synthetic-run-id> --target-class LOCAL_DEV_CONFIRMED --confirm-no-real-data --confirm-no-production --confirm-no-staging')
  console.log('')
  console.log('Future-gated modes, not executable in this phase:')
  console.log('  --mode dry-run')
  console.log('  --mode apply')
  console.log('  --mode cleanup')
  console.log('')
  console.log('Future required confirmation flags:')
  for (const flag of FUTURE_REQUIRED_FLAGS) {
    console.log(`  ${flag}`)
  }
}

function printPlan(args: Args): void {
  const runId = args.runId ?? 'SYNTHETIC_RUN_ID_REQUIRED_FOR_EXECUTION'
  printSafetyBanner()
  console.log('')
  console.log('M1 pilot fixture setup plan')
  console.log(`targetClass: ${args.targetClass ?? 'UNCONFIRMED'}`)
  console.log(`runId: ${runId}`)
  console.log(`fixtureLabel: ${fixtureLabel(runId)}`)
  console.log('')
  console.log('Participants:')
  for (const participant of PARTICIPANTS) {
    console.log(`  ${participant.participantCode}: ${participant.syntheticEmail}`)
  }
  console.log('')
  console.log('Candidate StudyLoad:')
  console.log(`  title: ${CANDIDATE_STUDY_LOAD.title}`)
  console.log(`  contentKey: ${CANDIDATE_STUDY_LOAD.contentKey}`)
  console.log(`  programCode: ${CANDIDATE_STUDY_LOAD.programCode}`)
  console.log(`  loadType: ${CANDIDATE_STUDY_LOAD.loadType}`)
  console.log(`  initialStatus: ${CANDIDATE_STUDY_LOAD.initialStatus}`)
  console.log('')
  console.log('Conceptual future fixture entity chain:')
  console.log('  1. User/account')
  console.log('  2. Student')
  console.log('  3. access source-of-truth status')
  console.log('  4. PAES_M1 enrollment')
  console.log('  5. open LearningCycle')
  console.log('  6. pending StudyLoad')
  console.log('  7. start/session')
  console.log('  8. response')
  console.log('  9. completion/self-report')
  console.log('  10. admin evidence')
  console.log('')
  console.log('This plan is descriptive only. It does not inspect env, connect to DB, write files, or create data.')
}

function assertFutureConfirmations(args: Args): void {
  const missing: string[] = []
  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') missing.push('--target-class LOCAL_DEV_CONFIRMED')
  if (!args.runId) missing.push('--run-id <synthetic-run-id>')
  if (!args.confirmNoRealData) missing.push('--confirm-no-real-data')
  if (!args.confirmNoProduction) missing.push('--confirm-no-production')
  if (!args.confirmNoStaging) missing.push('--confirm-no-staging')

  if (missing.length > 0) {
    console.error('Refusing future-gated mode. Missing confirmation flags:')
    for (const flag of missing) {
      console.error(`  ${flag}`)
    }
    process.exit(2)
  }
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

const args = parseArgs(process.argv.slice(2))

if (args.mode === 'help') {
  printHelp()
  process.exit(0)
}

if (args.mode === 'plan') {
  printPlan(args)
  process.exit(0)
}

assertFutureConfirmations(args)
console.error(`Mode "${args.mode}" is future-gated and not executable in this phase.`)
console.error('No DB connection attempted. No data mutated.')
process.exit(2)
