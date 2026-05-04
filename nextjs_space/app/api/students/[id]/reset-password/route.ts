export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'
import { recordAuditEvent } from '@/lib/audit'
import bcrypt from 'bcryptjs'

/**
 * CUST-STUDENT-AUTH-1B: Admin-mediated student password reset.
 *
 * POST /api/students/[id]/reset-password
 *
 * Accepts { password, confirmPassword } in body.
 * Resolves Student → User by email match, then updates User.password.
 *
 * Custody rules:
 * - Admin-only (requireAdminApi).
 * - No password or hash ever returned in the response.
 * - Audit log records the event with safe payloads (no credentials).
 * - The new password is provided by the human owner via the admin UI.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── Admin gate ──
  const { session, errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { password, confirmPassword } = body ?? {}

    // ── Validation ──
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'La contraseña es obligatoria.' },
        { status: 400 },
      )
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres.' },
        { status: 400 },
      )
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden.' },
        { status: 400 },
      )
    }

    // ── Resolve Student → User by email ──
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      select: { id: true, firstName: true, lastName: true, email: true },
    })
    if (!student) {
      return NextResponse.json(
        { error: 'Estudiante no encontrado.' },
        { status: 404 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: student.email },
      select: { id: true, email: true },
    })
    if (!user) {
      return NextResponse.json(
        { error: 'No existe cuenta de usuario asociada a este estudiante.' },
        { status: 404 },
      )
    }

    // ── Hash & update ──
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    })

    // ── Audit (fire-and-forget, safe payload) ──
    recordAuditEvent({
      actorType: 'admin',
      actorId: session.user?.id ?? 'unknown',
      actorEmail: session.user?.email ?? null,
      actionType: 'PASSWORD_RESET',
      domain: 'auth',
      entityType: 'User',
      entityId: user.id,
      endpoint: `/api/students/${params.id}/reset-password`,
      method: 'POST',
      beforePayload: null,
      afterPayload: { passwordChanged: true, studentId: student.id },
    }).catch((err) =>
      console.error('[audit] Failed to record PASSWORD_RESET event:', err),
    )

    // ── Safe response (no password / hash) ──
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[reset-password] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 },
    )
  }
}
