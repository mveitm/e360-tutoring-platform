type Mode = 'help' | 'plan' | 'dry-run' | 'apply' | 'cleanup'

interface Args {
  mode: Mode
  runId?: string
  targetClass?: string
  participantCode?: string
  confirmNoRealData: boolean
  confirmNoProduction: boolean
  confirmNoStaging: boolean
  confirmLocalDevMutation: boolean
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

type Participant = (typeof PARTICIPANTS)[number]

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

const APPLY_REQUIRED_FLAGS = [
  ...FUTURE_REQUIRED_FLAGS,
  '--participant-code PILOT_M1_001',
  '--confirm-local-dev-mutation',
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
    participantCode: readValue(argv, '--participant-code'),
    confirmNoRealData: argv.includes('--confirm-no-real-data'),
    confirmNoProduction: argv.includes('--confirm-no-production'),
    confirmNoStaging: argv.includes('--confirm-no-staging'),
    confirmLocalDevMutation: argv.includes('--confirm-local-dev-mutation'),
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
  console.log('')
  console.log('Apply mode, if explicitly authorized in a future phase, additionally requires:')
  console.log('  --participant-code PILOT_M1_001')
  console.log('  --confirm-local-dev-mutation')
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

function assertApplyConfirmations(args: Args): void {
  const missing: string[] = []
  if (args.targetClass !== 'LOCAL_DEV_CONFIRMED') missing.push('--target-class LOCAL_DEV_CONFIRMED')
  if (!args.runId) missing.push('--run-id <synthetic-run-id>')
  if (args.participantCode !== 'PILOT_M1_001') missing.push('--participant-code PILOT_M1_001')
  if (!args.confirmNoRealData) missing.push('--confirm-no-real-data')
  if (!args.confirmNoProduction) missing.push('--confirm-no-production')
  if (!args.confirmNoStaging) missing.push('--confirm-no-staging')
  if (!args.confirmLocalDevMutation) missing.push('--confirm-local-dev-mutation')

  if (missing.length > 0) {
    console.error('Refusing apply mode. Missing or invalid confirmation flags:')
    for (const flag of missing) {
      console.error(`  ${flag}`)
    }
    process.exit(2)
  }
}

function getApplyParticipant(args: Args): Participant {
  const participant = PARTICIPANTS.find(
    (candidate) => candidate.participantCode === args.participantCode,
  )

  if (!participant || participant.participantCode !== 'PILOT_M1_001') {
    fail('Apply mode is restricted to participant code PILOT_M1_001.')
  }

  return participant
}

function assertSyntheticEmail(email: string): void {
  if (!email.endsWith('@example.invalid')) {
    fail('Refusing apply mode because participant email is not synthetic .example.invalid data.')
  }
}

async function runApply(args: Args): Promise<void> {
  assertApplyConfirmations(args)
  const participant = getApplyParticipant(args)
  assertSyntheticEmail(participant.syntheticEmail)

  const runId = args.runId as string
  const label = fixtureLabel(runId)
  const fixtureName = `${participant.participantCode} fixture`

  const { getStudyLoadContentByKey } = await import('../lib/study-load-content')
  const content = getStudyLoadContentByKey(CANDIDATE_STUDY_LOAD.contentKey)

  if (!content || content.title !== CANDIDATE_STUDY_LOAD.title || content.program !== 'PAES_M1') {
    fail('Candidate PAES_M1 StudyLoad content could not be resolved safely before mutation.')
  }

  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  const actions: string[] = []

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({
        where: { email: participant.syntheticEmail },
        select: { id: true, name: true, email: true },
      })

      if (existingUser && existingUser.name !== fixtureName) {
        throw new Error('Synthetic user email collides with non-fixture user data.')
      }

      const user = existingUser
        ? existingUser
        : await tx.user.create({
            data: {
              name: fixtureName,
              email: participant.syntheticEmail,
            },
            select: { id: true, name: true, email: true },
          })
      actions.push(existingUser ? 'user=located' : 'user=created')

      const existingStudent = await tx.student.findUnique({
        where: { email: participant.syntheticEmail },
        select: { id: true, firstName: true, lastName: true, email: true },
      })

      if (
        existingStudent &&
        (existingStudent.firstName !== participant.participantCode ||
          existingStudent.lastName !== 'Fixture')
      ) {
        throw new Error('Synthetic student email collides with non-fixture student data.')
      }

      const student = existingStudent
        ? existingStudent
        : await tx.student.create({
            data: {
              firstName: participant.participantCode,
              lastName: 'Fixture',
              email: participant.syntheticEmail,
              status: 'active',
            },
            select: { id: true, firstName: true, lastName: true, email: true },
          })
      actions.push(existingStudent ? 'student=located' : 'student=created')

      const existingAccess = await tx.studentAccess.findUnique({
        where: { studentId: student.id },
        select: {
          id: true,
          accessStatus: true,
          trialStatus: true,
          subscriptionStatus: true,
          lastDecisionReason: true,
        },
      })

      if (
        existingAccess &&
        (existingAccess.accessStatus !== 'no_access' ||
          existingAccess.trialStatus !== 'none' ||
          existingAccess.subscriptionStatus !== 'none')
      ) {
        throw new Error('Existing StudentAccess state is not the safe no-access fixture baseline.')
      }

      const studentAccess = existingAccess
        ? existingAccess
        : await tx.studentAccess.create({
            data: {
              studentId: student.id,
              accessStatus: 'no_access',
              trialStatus: 'none',
              subscriptionStatus: 'none',
              tutoringDirection: 'closed_lab_no_payment',
              continuityTarget: 'PAES_M1_ONLY',
              lastDecisionBy: 'm1-pilot-dry-run-fixture',
              lastDecisionAt: new Date(),
              lastDecisionReason: label,
            },
            select: {
              id: true,
              accessStatus: true,
              trialStatus: true,
              subscriptionStatus: true,
              lastDecisionReason: true,
            },
          })
      actions.push(existingAccess ? 'studentAccess=located' : 'studentAccess=created')

      const existingProgram = await tx.program.findUnique({
        where: { code: CANDIDATE_STUDY_LOAD.programCode },
        select: { id: true, code: true, name: true, vertical: true },
      })

      const program = existingProgram
        ? existingProgram
        : await tx.program.create({
            data: {
              code: CANDIDATE_STUDY_LOAD.programCode,
              name: 'PAES M1',
              vertical: 'matematica',
              status: 'active',
            },
            select: { id: true, code: true, name: true, vertical: true },
          })
      actions.push(existingProgram ? 'program=located' : 'program=created')

      const existingEnrollment = await tx.studentProgramInstance.findFirst({
        where: {
          studentId: student.id,
          programId: program.id,
          status: 'active',
        },
        orderBy: { startedAt: 'desc' },
        select: {
          id: true,
          currentCycleId: true,
          currentContinuityState: true,
        },
      })

      if (
        existingEnrollment &&
        existingEnrollment.currentContinuityState !== 'normal'
      ) {
        throw new Error('Existing PAES_M1 enrollment is not in normal continuity state.')
      }

      const enrollment = existingEnrollment
        ? existingEnrollment
        : await tx.studentProgramInstance.create({
            data: {
              studentId: student.id,
              programId: program.id,
              status: 'active',
              currentContinuityState: 'normal',
            },
            select: {
              id: true,
              currentCycleId: true,
              currentContinuityState: true,
            },
          })
      actions.push(existingEnrollment ? 'enrollment=located' : 'enrollment=created')

      const existingCycle = await tx.learningCycle.findFirst({
        where: {
          enrollmentId: enrollment.id,
          cycleNumber: 1,
          status: 'open',
        },
        select: { id: true, cycleNumber: true, status: true },
      })

      const cycle = existingCycle
        ? existingCycle
        : await tx.learningCycle.create({
            data: {
              enrollmentId: enrollment.id,
              cycleNumber: 1,
              status: 'open',
            },
            select: { id: true, cycleNumber: true, status: true },
          })
      actions.push(existingCycle ? 'learningCycle=located' : 'learningCycle=created')

      if (enrollment.currentCycleId && enrollment.currentCycleId !== cycle.id) {
        throw new Error('Existing enrollment points to a different current cycle.')
      }

      if (!enrollment.currentCycleId) {
        await tx.studentProgramInstance.update({
          where: { id: enrollment.id },
          data: { currentCycleId: cycle.id, lastActivityAt: new Date() },
          select: { id: true },
        })
        actions.push('enrollmentCurrentCycle=updated')
      } else {
        actions.push('enrollmentCurrentCycle=located')
      }

      const existingStudyLoad = await tx.studyLoad.findFirst({
        where: {
          learningCycleId: cycle.id,
          title: CANDIDATE_STUDY_LOAD.title,
        },
        orderBy: { createdAt: 'asc' },
        select: { id: true, title: true, status: true, loadType: true },
      })

      if (
        existingStudyLoad &&
        (existingStudyLoad.status !== CANDIDATE_STUDY_LOAD.initialStatus ||
          existingStudyLoad.loadType !== CANDIDATE_STUDY_LOAD.loadType)
      ) {
        throw new Error('Existing candidate StudyLoad is not pending practice fixture data.')
      }

      const studyLoad = existingStudyLoad
        ? existingStudyLoad
        : await tx.studyLoad.create({
            data: {
              learningCycleId: cycle.id,
              loadType: CANDIDATE_STUDY_LOAD.loadType,
              title: CANDIDATE_STUDY_LOAD.title,
              status: CANDIDATE_STUDY_LOAD.initialStatus,
              releasedAt: new Date(),
            },
            select: { id: true, title: true, status: true, loadType: true },
          })
      actions.push(existingStudyLoad ? 'studyLoad=located' : 'studyLoad=created')

      return {
        user,
        student,
        studentAccess,
        program,
        enrollment,
        cycle,
        studyLoad,
      }
    })

    console.log('DB MUTATION PERFORMED: LOCAL_DEV_FIXTURE_ONLY')
    console.log(`participantCode: ${participant.participantCode}`)
    console.log(`fixtureLabel: ${label}`)
    console.log(`syntheticEmail: ${participant.syntheticEmail}`)
    console.log(`candidateStudyLoadTitle: ${CANDIDATE_STUDY_LOAD.title}`)
    console.log(`candidateStudyLoadContentKey: ${CANDIDATE_STUDY_LOAD.contentKey}`)
    console.log('records:')
    for (const action of actions) {
      console.log(`  ${action}`)
    }
    console.log('readyForNextPhase: /now visibility and StudyLoad start runtime dry-run')

    void result
  } catch (error) {
    console.error('APPLY FAILED: LOCAL_DEV_FIXTURE_SETUP_BLOCKED')
    console.error(safeApplyError(error))
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

function safeApplyError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)

  if (
    message.includes("Can't reach database server") ||
    message.includes('P1001') ||
    message.includes('DATABASE_URL') ||
    message.includes('database server')
  ) {
    return 'Database connection failed before fixture setup. Details redacted to avoid printing target or secret-derived material.'
  }

  if (message.includes('Environment variable not found')) {
    return 'Database configuration was unavailable. Details redacted to avoid printing env-derived material.'
  }

  if (
    message.includes('Synthetic') ||
    message.includes('Existing') ||
    message.includes('Candidate') ||
    message.includes('Apply mode')
  ) {
    return message
  }

  return 'Apply failed before completion. Details redacted to avoid printing target or secret-derived material.'
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))

  if (args.mode === 'help') {
    printHelp()
    process.exit(0)
  }

  if (args.mode === 'plan') {
    printPlan(args)
    process.exit(0)
  }

  if (args.mode === 'apply') {
    await runApply(args)
    process.exit(process.exitCode ?? 0)
  }

  assertFutureConfirmations(args)
  console.error(`Mode "${args.mode}" is future-gated and not executable in this phase.`)
  console.error('No DB connection attempted. No data mutated.')
  process.exit(2)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Unexpected helper failure.')
  process.exit(1)
})
