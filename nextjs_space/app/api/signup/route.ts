export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/admin-guard'
import bcrypt from 'bcryptjs'

/**
 * CUST-AUTH-1A: Signup is now admin-only.
 * Only an authenticated admin can create new user accounts.
 * Public self-registration is disabled.
 */
export async function POST(req: NextRequest) {
  // Admin-only: prevent public account creation
  const { errorResponse } = await requireAdminApi()
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { email, password, name } = body ?? {}

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name ?? '' },
    })

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Internal error' }, { status: 500 })
  }
}
