export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'

export async function GET() {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const instances = await prisma.studentProgramInstance.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
        // Phase EG — minimal admin-only read of the latest persisted
        // continuity_start_governance_reading record per enrollment.
        // Advisory only. Not a workflow decision, not a write path,
        // not a source-of-truth resolution, not a materializer-of-record
        // change. Hard-coded signalType filter is intentional: EG is
        // strictly scoped to ED-typed rows; widening requires code edits.
        continuitySignals: {
          where: {
            signalType: {
              in: [
                'continuity_start_governance_reading',
                'attention_acknowledged',
              ],
            },
          },
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: { signalType: true, rationale: true, createdAt: true },
        },
      },
    })

    // Derive `latestGovernancePosture` and `attentionAcknowledged` per
    // enrollment and strip the raw signals array from the response shape.
    const withPosture = instances.map((inst: any) => {
      const latestReading = inst.continuitySignals?.find(
        (s: any) => s.signalType === 'continuity_start_governance_reading'
      )
      const latestAck = inst.continuitySignals?.find(
        (s: any) => s.signalType === 'attention_acknowledged'
      )
      let latestGovernancePosture: string | null = null
      if (latestReading?.rationale) {
        try {
          const parsed = JSON.parse(latestReading.rationale)
          if (typeof parsed?.posture === 'string') {
            latestGovernancePosture = parsed.posture
          }
        } catch {
          latestGovernancePosture = null
        }
      }
      // Acknowledged if there is an ack signal created AFTER the latest
      // governance reading (or if there is an ack but no governance reading).
      const attentionAcknowledged =
        latestAck != null &&
        (latestReading == null ||
          new Date(latestAck.createdAt) >= new Date(latestReading.createdAt))
      const { continuitySignals: _discarded, ...rest } = inst
      return { ...rest, latestGovernancePosture, attentionAcknowledged }
    })

    return NextResponse.json(withPosture)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}

// AGENT-OPS-1B: Candidate endpoint for MVP-FLOW-2 first-enrollment automatic cycle and StudyLoad creation.
export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { studentId, programId, status, startedAt, endedAt, lastActivityAt, currentCycleId, currentContinuityState } = body ?? {}

    if (!studentId || !programId) {
      return NextResponse.json({ error: 'studentId and programId are required' }, { status: 400 })
    }

    const program = await prisma.program.findUnique({
      where: { id: programId },
      select: { id: true, code: true, name: true },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    const effectiveStatus = status ?? 'active'
    const effectiveContinuityState = currentContinuityState ?? 'normal'
    const shouldCreateFirstCycle =
      program.code === 'PAES_M1' &&
      effectiveStatus === 'active' &&
      effectiveContinuityState === 'normal' &&
      !currentCycleId

    if (shouldCreateFirstCycle) {
      const instance = await prisma.$transaction(async (tx) => {
        const newInstance = await tx.studentProgramInstance.create({
          data: {
            studentId,
            programId,
            status: effectiveStatus,
            startedAt: startedAt ? new Date(startedAt) : undefined,
            endedAt: endedAt ? new Date(endedAt) : null,
            lastActivityAt: lastActivityAt ? new Date(lastActivityAt) : null,
            currentCycleId: null,
            currentContinuityState: effectiveContinuityState,
          },
        })

        const newCycle = await tx.learningCycle.create({
          data: {
            enrollmentId: newInstance.id,
            cycleNumber: 1,
            status: 'open',
          },
        })

        await tx.cycleSnapshot.create({
          data: {
            learningCycleId: newCycle.id,
            snapshotType: 'cycle_open',
            payload: {
              heuristic: 'mvp_flow_2_first_enrollment_balanced_entry',
              reason: 'auto_created_first_cycle_and_first_study_load_on_first_paes_m1_enrollment',
              selectedStudyLoadTitle: 'PAES M1 — Entrada balanceada inicial',
              selectedSkillIds: [],
              skillStates: [],
              maxFirstLoads: 1,
            },
          },
        })

        await tx.studyLoad.create({
          data: {
            learningCycleId: newCycle.id,
            title: 'PAES M1 — Entrada balanceada inicial',
            loadType: 'practice',
            status: 'pending',
          },
        })

        return tx.studentProgramInstance.update({
          where: { id: newInstance.id },
          data: {
            currentCycleId: newCycle.id,
            lastActivityAt: new Date(),
          },
          include: {
            student: { select: { id: true, firstName: true, lastName: true, email: true } },
            program: { select: { id: true, code: true, name: true } },
          },
        })
      })

      return NextResponse.json(instance, { status: 201 })
    }

    const instance = await prisma.studentProgramInstance.create({
      data: {
        studentId,
        programId,
        status: effectiveStatus,
        startedAt: startedAt ? new Date(startedAt) : undefined,
        endedAt: endedAt ? new Date(endedAt) : null,
        lastActivityAt: lastActivityAt ? new Date(lastActivityAt) : null,
        currentCycleId: currentCycleId || null,
        currentContinuityState: effectiveContinuityState,
      },
      include: {
        student: { select: { id: true, firstName: true, lastName: true, email: true } },
        program: { select: { id: true, code: true, name: true } },
      },
    })
    return NextResponse.json(instance, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
