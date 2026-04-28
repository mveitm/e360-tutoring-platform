export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const enrollmentId = searchParams.get('enrollmentId')

  try {
    const cycles = await prisma.learningCycle.findMany({
      where: enrollmentId ? { enrollmentId } : undefined,
      orderBy: [{ enrollmentId: 'asc' }, { cycleNumber: 'asc' }],
      include: {
        enrollment: {
          select: {
            id: true,
            status: true,
            student: { select: { id: true, firstName: true, lastName: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        },
        _count: { select: { cycleDecisions: true, studyLoads: true, cycleEvaluations: true } },
      },
    })
    return NextResponse.json(cycles)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { enrollmentId } = body ?? {}

    if (!enrollmentId) {
      return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    }

    // --- P1: Enrollment must exist and be active ---
    const enrollment = await prisma.studentProgramInstance.findUnique({
      where: { id: enrollmentId },
      select: { id: true, status: true, currentContinuityState: true, programId: true },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }
    if (enrollment.status !== 'active') {
      return NextResponse.json(
        { error: 'Enrollment must be active to open a cycle' },
        { status: 400 }
      )
    }

    // --- P2: currentContinuityState must be "normal" ---
    if (enrollment.currentContinuityState !== 'normal') {
      return NextResponse.json(
        { error: 'Enrollment continuity state must be normal to open a cycle' },
        { status: 400 }
      )
    }

    // --- P3: No other open cycle for this enrollment ---
    const openCycle = await prisma.learningCycle.findFirst({
      where: { enrollmentId, status: 'open' },
      select: { id: true },
    })
    if (openCycle) {
      return NextResponse.json(
        { error: 'An open cycle already exists for this enrollment' },
        { status: 409 }
      )
    }

    // --- Determine next cycle number and apply P4a/P4b ---
    const lastCycle = await prisma.learningCycle.findFirst({
      where: { enrollmentId },
      orderBy: { cycleNumber: 'desc' },
      select: { id: true, cycleNumber: true, status: true },
    })
    const nextCycleNumber = (lastCycle?.cycleNumber ?? 0) + 1

    if (nextCycleNumber === 1) {
      // --- P4a: First cycle requires a completed initial diagnostic ---
      const completedDiagnostic = await prisma.diagnostic.findFirst({
        where: { enrollmentId, diagnosticType: 'initial', status: 'completed' },
        select: { id: true },
      })
      if (!completedDiagnostic) {
        return NextResponse.json(
          { error: 'A completed initial diagnostic is required before the first cycle' },
          { status: 400 }
        )
      }
    } else {
      // --- P4b: Subsequent cycles require previous cycle closed + continue signal ---
      if (lastCycle!.status !== 'closed') {
        return NextResponse.json(
          { error: 'The previous cycle must be closed before opening a new one' },
          { status: 400 }
        )
      }
      const continueSignal = await prisma.continuitySignal.findFirst({
        where: { enrollmentId, learningCycleId: lastCycle!.id, signalType: 'continue' },
        select: { id: true },
      })
      if (!continueSignal) {
        return NextResponse.json(
          { error: 'A continue signal is required from the previous cycle before opening a new one' },
          { status: 400 }
        )
      }
    }

    // --- Create cycle + update enrollment pointer in a transaction (SE-2, SE-9) ---
    const includeBlock = {
      enrollment: {
        select: {
          id: true,
          status: true,
          student: { select: { id: true, firstName: true, lastName: true } },
          program: { select: { id: true, code: true, name: true } },
        },
      },
      _count: { select: { cycleDecisions: true, studyLoads: true, cycleEvaluations: true } },
    }

    // --- DU: Load prior-cycle selectedSkillIds (only when nextCycleNumber > 1) ---
    // Scope: exclusion applies ONLY to the first generation pass that creates the
    // initial StudyLoad set of the new cycle. It is NOT a product-wide prohibition
    // on reusing prior-cycle skills elsewhere or in later phases.
    let duExcludedSkillIds: string[] = []
    if (nextCycleNumber > 1 && lastCycle) {
      const priorOpenSnapshot = await prisma.cycleSnapshot.findFirst({
        where: { learningCycleId: lastCycle.id, snapshotType: 'cycle_open' },
        orderBy: { createdAt: 'desc' },
        select: { payload: true },
      })
      const priorPayload = (priorOpenSnapshot?.payload as any) ?? null
      if (priorPayload && Array.isArray(priorPayload.selectedSkillIds)) {
        duExcludedSkillIds = (priorPayload.selectedSkillIds as unknown[]).filter(
          (v): v is string => typeof v === 'string'
        )
      }
    }

    const cycle = await prisma.$transaction(async (tx: any) => {
      const newCycle = await tx.learningCycle.create({
        data: {
          enrollmentId,
          cycleNumber: nextCycleNumber,
          status: 'open',
        },
        include: includeBlock,
      })

      // --- DN: Read SkillStates scoped to this enrollment's program ---
      const skillStates = await tx.skillState.findMany({
        where: {
          enrollmentId,
          skill: { programId: enrollment.programId },
        },
        include: {
          skill: { select: { id: true, code: true, name: true } },
        },
      })

      // --- DN: Deterministic heuristic ---
      // Sort by: needsReinforcement (true first), then masteryLevel ASC, then skillId ASC
      const sorted = [...skillStates].sort((a, b) => {
        if (a.needsReinforcement !== b.needsReinforcement) {
          return a.needsReinforcement ? -1 : 1
        }
        if (a.masteryLevel !== b.masteryLevel) {
          return a.masteryLevel < b.masteryLevel ? -1 : 1
        }
        return a.skillId < b.skillId ? -1 : 1
      })

      // --- DU: Apply prior-cycle skill exclusion to the first generation pass only ---
      const excludedSet = new Set(duExcludedSkillIds)
      const applyExclusion = nextCycleNumber > 1 && excludedSet.size > 0
      const filteredCandidates = applyExclusion
        ? sorted.filter((s) => !excludedSet.has(s.skillId))
        : sorted
      const exclusionRelaxed = applyExclusion && filteredCandidates.length === 0
      const candidatesAfterDU = exclusionRelaxed ? sorted : filteredCandidates

      const MAX_FIRST_LOADS = 3
      const selected = candidatesAfterDU.slice(0, MAX_FIRST_LOADS)

      // --- DN: Emit opening snapshot (cycle_open) ---
      // Captures the exact SkillStates that informed the selection decision.
      // DU extends the payload with an auditable exclusion trace.
      await tx.cycleSnapshot.create({
        data: {
          learningCycleId: newCycle.id,
          snapshotType: 'cycle_open',
          payload: {
            heuristic: 'needsReinforcement_desc__masteryLevel_asc__skillId_asc__top3',
            maxFirstLoads: MAX_FIRST_LOADS,
            skillStates: skillStates.map((s: any) => ({
              skillId: s.skillId,
              skillCode: s.skill.code,
              masteryLevel: s.masteryLevel,
              confidenceLevel: s.confidenceLevel,
              needsReinforcement: s.needsReinforcement,
            })),
            selectedSkillIds: selected.map((s) => s.skillId),
            // DU: auditable differentiation trace (first-load scope only)
            excludedSkillIds: applyExclusion ? duExcludedSkillIds : [],
            exclusionRule: 'skip_prior_cycle_selected_first_load_only',
            exclusionRelaxed,
          },
        },
      })

      // --- DN: Generate first adaptive StudyLoads ---
      if (selected.length > 0) {
        await tx.studyLoad.createMany({
          data: selected.map((s) => ({
            learningCycleId: newCycle.id,
            loadType: 'practice',
            title: `Practice: ${s.skill.name}`,
            status: 'pending',
          })),
        })
      } else {
        // Fallback: ensure the student always has one pending unit of work at cycle open
        await tx.studyLoad.create({
          data: {
            learningCycleId: newCycle.id,
            loadType: 'practice',
            title: 'Initial practice',
            status: 'pending',
          },
        })
      }

      // SE-2: Update currentCycleId | SE-9: Update lastActivityAt
      await tx.studentProgramInstance.update({
        where: { id: enrollmentId },
        data: {
          currentCycleId: newCycle.id,
          lastActivityAt: new Date(),
        },
      })

      return newCycle
    })

    return NextResponse.json(cycle, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'This cycle number already exists for this enrollment' }, { status: 409 })
    }
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
