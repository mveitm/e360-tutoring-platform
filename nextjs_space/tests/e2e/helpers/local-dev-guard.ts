import type { Page } from '@playwright/test'

const LOCALHOST_3000 = /^http:\/\/localhost:3000\/?$/
const LOOPBACK_WITH_PORT = /^http:\/\/127\.0\.0\.1:\d+\/?$/
const SYNTHETIC_EMAIL = /^[^@\s]+@example\.invalid$/i

export interface StudentE2ECredentials {
  baseUrl: string
  studentEmail: string
  studentPassword: string
}

function readRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name}_REQUIRED`)
  }
  return value
}

export function assertLocalDevBaseUrl(rawBaseUrl: string) {
  const baseUrl = rawBaseUrl.trim().replace(/\/+$/, '')
  if (!LOCALHOST_3000.test(baseUrl) && !LOOPBACK_WITH_PORT.test(baseUrl)) {
    throw new Error('LOCAL_DEV_BASE_URL_REQUIRED')
  }
  return baseUrl
}

export function assertSyntheticEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  if (!SYNTHETIC_EMAIL.test(normalized)) {
    throw new Error('SYNTHETIC_EMAIL_REQUIRED')
  }
  return normalized
}

export function getStudentE2ECredentials(): StudentE2ECredentials {
  const baseUrl = assertLocalDevBaseUrl(readRequiredEnv('BEXAURI_E2E_BASE_URL'))
  const studentEmail = assertSyntheticEmail(readRequiredEnv('BEXAURI_E2E_STUDENT_EMAIL'))
  const studentPassword = readRequiredEnv('BEXAURI_E2E_STUDENT_PASSWORD')

  return {
    baseUrl,
    studentEmail,
    studentPassword,
  }
}

export function localPath(baseUrl: string, path: string) {
  return new URL(path, `${baseUrl}/`).toString()
}

export function safePathname(rawUrl: string) {
  try {
    return new URL(rawUrl).pathname || '/'
  } catch {
    return 'UNREADABLE_PATH'
  }
}

export async function getSafeLoginDiagnostic(page: Page) {
  const invalidCredentials = await page.getByText(/Invalid email or password/i).isVisible().catch(() => false)
  const genericError = await page.getByText(/Something went wrong/i).isVisible().catch(() => false)

  if (invalidCredentials) {
    return 'LOGIN_ERROR_VISIBLE'
  }

  if (genericError) {
    return 'LOGIN_GENERIC_ERROR_VISIBLE'
  }

  return 'NO_LOGIN_ERROR_VISIBLE'
}

export async function getSafeVisibleHeadings(page: Page, limit = 8) {
  const headings = page.getByRole('heading')
  const count = await headings.count()
  const values: string[] = []

  for (let index = 0; index < Math.min(count, limit); index += 1) {
    const text = await headings
      .nth(index)
      .innerText()
      .catch(() => '')
    const normalized = text.trim().replace(/\s+/g, ' ')

    if (normalized) {
      values.push(normalized.slice(0, 120))
    }
  }

  return values
}

export async function waitForCredentialsCallbackStatus(page: Page, timeout = 10_000) {
  const response = await page
    .waitForResponse((candidate) => safePathname(candidate.url()) === '/api/auth/callback/credentials', {
      timeout,
    })
    .catch(() => null)

  return response?.status() ?? 'not-observed'
}

export const forbiddenClaimPatterns = [
  /puntaje garantizado/i,
  /mejora garantizada/i,
  /\btheta\b/i,
  /ia adaptativa/i,
  /suscripci[oó]n activa/i,
  /trial p[uú]blico/i,
]
