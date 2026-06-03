export const PAES_M1_FIRST_CAPSULE_TITLE = 'PAES M1 — Entrada balanceada inicial'

export const PAES_M1_FIRST_CAPSULE_PURPOSE =
  'Resuelve pocos ejercicios para ubicar tu punto de partida.'

const FIRST_CAPSULE_LOAD_STATUSES = ['pending', 'in_progress', 'completed'] as const

type PickableCapsule = {
  status: string
  createdAt: Date
  updatedAt: Date
  learningCycleId: string
}

function pickCapsule<T extends PickableCapsule>(loads: T[]) {
  const inProgress = loads
    .filter((load) => load.status === 'in_progress')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]
  if (inProgress) return inProgress

  const pending = loads
    .filter((load) => load.status === 'pending')
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0]
  if (pending) return pending

  return loads
    .filter((load) => load.status === 'completed')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0] ?? null
}

export async function ensurePaesM1FirstCapsuleForEnrollment(tx: any, enrollmentId: string) {
  const enrollment = await tx.studentProgramInstance.findUnique({
    where: { id: enrollmentId },
    select: {
      id: true,
      status: true,
      currentCycleId: true,
      currentContinuityState: true,
      program: { select: { code: true } },
    },
  })

  if (!enrollment || enrollment.status !== 'active' || enrollment.program.code !== 'PAES_M1') {
    throw new Error('PAES_M1_ACTIVE_ENROLLMENT_REQUIRED')
  }

  const existingLoads = await tx.studyLoad.findMany({
    where: {
      status: { in: [...FIRST_CAPSULE_LOAD_STATUSES] },
      learningCycle: { enrollmentId },
    },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      title: true,
      loadType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      learningCycleId: true,
    },
  })
  const existingCapsule = pickCapsule(existingLoads)
  if (existingCapsule) {
    if (!enrollment.currentCycleId) {
      await tx.studentProgramInstance.update({
        where: { id: enrollmentId },
        data: {
          currentCycleId: existingCapsule.learningCycleId,
          lastActivityAt: new Date(),
        },
        select: { id: true },
      })
    }
    return existingCapsule
  }

  let cycle = enrollment.currentCycleId
    ? await tx.learningCycle.findUnique({
        where: { id: enrollment.currentCycleId },
        select: { id: true, cycleNumber: true, status: true },
      })
    : null

  if (!cycle) {
    cycle = await tx.learningCycle.findFirst({
      where: { enrollmentId, status: 'open' },
      orderBy: { cycleNumber: 'asc' },
      select: { id: true, cycleNumber: true, status: true },
    })
  }

  if (!cycle) {
    const cycleCount = await tx.learningCycle.count({ where: { enrollmentId } })
    if (cycleCount > 0) {
      throw new Error('NO_SAFE_OPEN_CYCLE_FOR_FIRST_CAPSULE')
    }

    cycle = await tx.learningCycle.create({
      data: {
        enrollmentId,
        cycleNumber: 1,
        status: 'open',
      },
      select: { id: true, cycleNumber: true, status: true },
    })
  }

  if (cycle.status !== 'open') {
    throw new Error('NO_SAFE_OPEN_CYCLE_FOR_FIRST_CAPSULE')
  }

  const existingSnapshot = await tx.cycleSnapshot.findFirst({
    where: { learningCycleId: cycle.id, snapshotType: 'cycle_open' },
    select: { id: true },
  })

  if (!existingSnapshot) {
    await tx.cycleSnapshot.create({
      data: {
        learningCycleId: cycle.id,
        snapshotType: 'cycle_open',
        payload: {
          heuristic: 'mvp_sales_pilot_capsule_2_first_m1_capsule',
          reason: 'student_visible_first_capsule_from_study_page',
          selectedStudyLoadTitle: PAES_M1_FIRST_CAPSULE_TITLE,
          selectedSkillIds: [],
          skillStates: [],
          maxFirstLoads: 1,
        },
      },
    })
  }

  const capsule = await tx.studyLoad.create({
    data: {
      learningCycleId: cycle.id,
      title: PAES_M1_FIRST_CAPSULE_TITLE,
      loadType: 'practice',
      status: 'pending',
    },
    select: {
      id: true,
      title: true,
      loadType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      learningCycleId: true,
    },
  })

  await tx.studentProgramInstance.update({
    where: { id: enrollmentId },
    data: {
      currentCycleId: cycle.id,
      lastActivityAt: new Date(),
    },
    select: { id: true },
  })

  return capsule
}
