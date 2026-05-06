import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { BetaOperationsView } from './_components/beta-operations-view'

export const dynamic = 'force-dynamic'

type StudyLoadStatusLike = 'pending' | 'in_progress' | 'completed' | string

type StudyLoadLike = {
  status: StudyLoadStatusLike
}

type CycleWithStudyLoadsLike = {
  studyLoads: StudyLoadLike[]
}

export default async function BetaOperationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  /* ---- Fetch all operational data in parallel ---- */
  const [enrollments, cycles, studyLoads] = await Promise.all([
    prisma.studentProgramInstance.findMany({
      where: { status: 'active' },
      include: { student: true, program: true },
      orderBy: { lastActivityAt: 'desc' },
    }),
    prisma.learningCycle.findMany({
      where: { status: { in: ['open', 'in_progress'] } },
      include: {
        enrollment: { include: { student: true, program: true } },
        studyLoads: { select: { id: true, status: true, title: true, loadType: true, updatedAt: true } },
        cycleDecisions: { select: { id: true } },
      },
      orderBy: { openedAt: 'desc' },
    }),
    prisma.studyLoad.findMany({
      include: {
        learningCycle: {
          include: {
            enrollment: { include: { student: true, program: true } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
  ])

  /* ---- Compute counters ---- */
  const pendingLoads = studyLoads.filter((l: StudyLoadLike) => l.status === 'pending')
  const inProgressLoads = studyLoads.filter((l: StudyLoadLike) => l.status === 'in_progress')
  const completedLoads = studyLoads.filter((l: StudyLoadLike) => l.status === 'completed')

  // Cycles where all study loads are completed may be ready for review/close.
  const cyclesReadyForReview = cycles.filter((c: CycleWithStudyLoadsLike) => {
    if (c.studyLoads.length === 0) return false
    return c.studyLoads.every((sl: StudyLoadLike) => sl.status === 'completed')
  })

  const counters = {
    activeEnrollments: enrollments.length,
    openCycles: cycles.length,
    pendingLoads: pendingLoads.length,
    inProgressLoads: inProgressLoads.length,
    completedLoads: completedLoads.length,
    cyclesReadyForReview: cyclesReadyForReview.length,
  }

  /* ---- Serialize dates for client component ---- */
  const serialize = (obj: unknown) => JSON.parse(JSON.stringify(obj))

  return (
    <BetaOperationsView
      counters={counters}
      enrollments={serialize(enrollments)}
      cyclesReadyForReview={serialize(cyclesReadyForReview)}
      inProgressLoads={serialize(inProgressLoads)}
      pendingLoads={serialize(pendingLoads)}
      completedLoads={serialize(completedLoads.slice(0, 20))}
    />
  )
}
