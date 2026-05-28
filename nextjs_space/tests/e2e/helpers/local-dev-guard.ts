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

function normalizedPathname(rawUrl: string) {
  const path = safePathname(rawUrl)
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function createSafeAuthRequestRecorder(page: Page) {
  const events: string[] = []

  page.on('request', (request) => {
    const path = normalizedPathname(request.url())
    if (path.startsWith('/api/auth/')) {
      events.push(`${request.method()} ${path}`)
    }
  })

  return {
    summary() {
      return events.length > 0 ? events.join(', ') : 'none'
    },
  }
}

export async function getSafeLoginFormState(page: Page) {
  return page
    .locator('form')
    .first()
    .evaluate((form) => {
      const email = form.querySelector<HTMLInputElement>('#email')
      const password = form.querySelector<HTMLInputElement>('#password')
      const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')

      return {
        emailInputPresent: Boolean(email),
        passwordInputPresent: Boolean(password),
        submitButtonPresent: Boolean(submitButton),
        submitButtonType: submitButton?.getAttribute('type') ?? 'missing',
        emailHasValue: Boolean(email?.value),
        passwordHasValue: Boolean(password?.value),
        submitButtonDisabled: Boolean(submitButton?.disabled),
      }
    })
    .catch(() => ({
      emailInputPresent: false,
      passwordInputPresent: false,
      submitButtonPresent: false,
      submitButtonType: 'unreadable',
      emailHasValue: false,
      passwordHasValue: false,
      submitButtonDisabled: true,
    }))
}

export async function getSafeLoginFormStructure(page: Page) {
  return page
    .locator('form')
    .first()
    .evaluate((form) => {
      const email = form.querySelector<HTMLInputElement>('#email')
      const password = form.querySelector<HTMLInputElement>('#password')
      const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')

      return {
        formCount: document.querySelectorAll('form').length,
        emailInsideForm: Boolean(email && form.contains(email)),
        passwordInsideForm: Boolean(password && form.contains(password)),
        submitButtonInsideForm: Boolean(submitButton && form.contains(submitButton)),
        submitButtonType: submitButton?.getAttribute('type') ?? 'missing',
      }
    })
    .catch(() => ({
      formCount: 0,
      emailInsideForm: false,
      passwordInsideForm: false,
      submitButtonInsideForm: false,
      submitButtonType: 'unreadable',
    }))
}

export async function getSafeActiveElementCategory(page: Page) {
  return page
    .evaluate(() => {
      const active = document.activeElement

      if (!active) {
        return 'none'
      }

      if (active.id === 'email') {
        return 'email'
      }

      if (active.id === 'password') {
        return 'password'
      }

      if (active instanceof HTMLButtonElement && active.type === 'submit') {
        return 'submit-button'
      }

      if (active instanceof HTMLInputElement) {
        return 'input-other'
      }

      if (active instanceof HTMLButtonElement) {
        return 'button-other'
      }

      return active.tagName ? active.tagName.toLowerCase() : 'other'
    })
    .catch(() => 'unreadable')
}

export async function getSafeSubmitButtonBoxState(page: Page) {
  const button = page.locator('form').first().locator('button[type="submit"]').first()
  const box = await button.boundingBox().catch(() => null)

  return {
    visibleBox: Boolean(box && box.width > 0 && box.height > 0),
  }
}

export async function installSafeSubmitEventProbe(page: Page) {
  await page.evaluate(() => {
    const targetWindow = window as typeof window & { __bexauriSafeSubmitCount?: number }
    targetWindow.__bexauriSafeSubmitCount = 0
    document.addEventListener(
      'submit',
      () => {
        targetWindow.__bexauriSafeSubmitCount = (targetWindow.__bexauriSafeSubmitCount ?? 0) + 1
      },
      true,
    )
  })
}

export async function getSafeSubmitEventCount(page: Page) {
  return page
    .evaluate(() => {
      const targetWindow = window as typeof window & { __bexauriSafeSubmitCount?: number }
      return targetWindow.__bexauriSafeSubmitCount ?? 0
    })
    .catch(() => 0)
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
    .waitForResponse(
      (candidate) => normalizedPathname(candidate.url()) === '/api/auth/callback/credentials',
      { timeout },
    )
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
