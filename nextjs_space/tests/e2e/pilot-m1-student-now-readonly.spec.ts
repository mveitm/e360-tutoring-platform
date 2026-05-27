import { expect, test } from '@playwright/test'
import {
  forbiddenClaimPatterns,
  getSafeLoginDiagnostic,
  getSafeVisibleHeadings,
  getStudentE2ECredentials,
  localPath,
  safePathname,
} from './helpers/local-dev-guard'

test('PILOT_M1_001 can view completed and pending M1 pilot state without mutation', async ({ page }) => {
  const credentials = getStudentE2ECredentials()

  await page.goto(localPath(credentials.baseUrl, '/login'))
  await page.getByLabel('Email').fill(credentials.studentEmail)
  await page.getByLabel('Password').fill(credentials.studentPassword)
  await page.getByRole('button', { name: 'Ingresar' }).click()

  await page.waitForURL((url) => url.pathname !== '/login', { timeout: 5_000 }).catch(() => undefined)
  await page.waitForLoadState('networkidle').catch(() => undefined)

  const pathAfterLogin = safePathname(page.url())
  console.log(`SAFE_E2E_PATH_AFTER_LOGIN: ${pathAfterLogin}`)

  if (pathAfterLogin === '/login') {
    console.log(`SAFE_E2E_LOGIN_DIAGNOSTIC: ${await getSafeLoginDiagnostic(page)}`)
    throw new Error('AUTH_NOT_ESTABLISHED_AFTER_LOGIN')
  }

  await page.goto(localPath(credentials.baseUrl, '/now'), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => undefined)

  const pathBeforeAssertions = safePathname(page.url())
  console.log(`SAFE_E2E_PATH_BEFORE_NOW_ASSERTIONS: ${pathBeforeAssertions}`)

  if (pathBeforeAssertions === '/login') {
    console.log(`SAFE_E2E_LOGIN_DIAGNOSTIC: ${await getSafeLoginDiagnostic(page)}`)
    throw new Error('AUTH_NOT_ESTABLISHED_BEFORE_NOW_ASSERTIONS')
  }

  if (pathBeforeAssertions !== '/now') {
    throw new Error('UNEXPECTED_PATH_BEFORE_NOW_ASSERTIONS')
  }

  await expect(page.getByText('Piloto cerrado PAES M1').first())
    .toBeVisible({ timeout: 5_000 })
    .catch(async () => {
      console.log(`SAFE_E2E_PATH_AT_COPY_FAILURE: ${safePathname(page.url())}`)
      console.log(`SAFE_E2E_VISIBLE_HEADINGS: ${JSON.stringify(await getSafeVisibleHeadings(page))}`)
      throw new Error('NOW_COPY_NOT_FOUND_AFTER_AUTHENTICATED_NAVIGATION')
    })
  await expect(page.getByText('PAES_M1')).toBeVisible()
  await expect(page.getByText(/No es una venta p[uú]blica ni un plan pagado/i)).toBeVisible()
  await expect(page.getByText(/L1 y M2 no est[aá]n activas/i).first()).toBeVisible()

  await expect(page.getByText('PAES M1 — Ecuaciones lineales básicas')).toBeVisible()
  await expect(page.getByText('PAES M1 — Entrada balanceada inicial')).toBeVisible()
  await expect(page.getByText(/Tu reporte:\s*Me fue bien/i)).toBeVisible()

  for (const claim of forbiddenClaimPatterns) {
    await expect(page.getByText(claim)).toHaveCount(0)
  }
})
