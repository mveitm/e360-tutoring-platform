import { expect, test } from '@playwright/test'
import {
  forbiddenClaimPatterns,
  getStudentE2ECredentials,
  localPath,
} from './helpers/local-dev-guard'

test('PILOT_M1_001 can view completed and pending M1 pilot state without mutation', async ({ page }) => {
  const credentials = getStudentE2ECredentials()

  await page.goto(localPath(credentials.baseUrl, '/login'))
  await page.getByLabel('Email').fill(credentials.studentEmail)
  await page.getByLabel('Password').fill(credentials.studentPassword)
  await page.getByRole('button', { name: 'Ingresar' }).click()

  await page.waitForURL((url) => url.pathname === '/' || url.pathname === '/now')
  await page.goto(localPath(credentials.baseUrl, '/now'))

  await expect(page.getByText('Piloto cerrado PAES M1').first()).toBeVisible()
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
