/**
 * CUST-AUTH-1A — Central admin authorization guard.
 *
 * Uses a server-side email allowlist from process.env.ADMIN_EMAILS.
 * No schema migration required. No role field on User model.
 *
 * Rules:
 * - Missing/empty ADMIN_EMAILS → no one is admin (deny all).
 * - Emails are comma-separated, trimmed, lowercased.
 * - The env value is never printed, logged, or exposed.
 */

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

/** Parse the allowlist once per call (env can change between deploys). */
function getAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? ''
  if (!raw.trim()) return new Set()
  return new Set(
    raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  )
}

/** Check whether a given email is in the admin allowlist. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const allowed = getAdminEmails()
  if (allowed.size === 0) return false
  return allowed.has(email.trim().toLowerCase())
}

/**
 * For server components / pages.
 * Returns the session if admin, otherwise redirects.
 * - No session → redirect to /login
 * - Session but not admin → redirect to /now
 */
export async function requireAdminSession() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login')
  }
  if (!isAdminEmail(session.user.email)) {
    redirect('/now')
  }
  return session
}

/**
 * For API routes.
 * Returns the session if admin, otherwise returns an error NextResponse.
 * - No session → 401
 * - Session but not admin → 403
 * - Admin → returns null (caller proceeds)
 */
export async function requireAdminApi(): Promise<{
  session: any
  errorResponse: NextResponse | null
}> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 },
      ),
    }
  }
  if (!isAdminEmail(session.user.email)) {
    return {
      session,
      errorResponse: NextResponse.json(
        { error: 'Acceso denegado' },
        { status: 403 },
      ),
    }
  }
  return { session, errorResponse: null }
}
