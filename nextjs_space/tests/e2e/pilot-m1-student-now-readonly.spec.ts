import { expect, test } from '@playwright/test'
import {
  createSafeAuthRequestRecorder,
  forbiddenClaimPatterns,
  getSafeActiveElementCategory,
  getSafeLoginFormStructure,
  getSafeLoginFormState,
  getSafeLoginDiagnostic,
  getSafeSubmitButtonBoxState,
  getSafeSubmitEventCount,
  getSafeVisibleHeadings,
  getStudentE2ECredentials,
  installSafeSubmitEventProbe,
  localPath,
  safePathname,
  waitForCredentialsCallbackStatus,
} from './helpers/local-dev-guard'

test('PILOT_M1_001 can view completed and pending M1 pilot state without mutation', async ({ page }) => {
  const credentials = getStudentE2ECredentials()

  await page.goto(localPath(credentials.baseUrl, '/login'), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => undefined)
  const loginForm = page.locator('form').first()
  const emailInput = page.getByLabel('Email')
  const passwordInput = page.getByLabel('Password')
  const submitButton = loginForm.getByRole('button', { name: 'Ingresar' })

  await expect(emailInput).toBeVisible()
  await expect(passwordInput).toBeVisible()
  await expect(submitButton).toBeVisible()

  console.log(`SAFE_E2E_LOGIN_FORM_STRUCTURE: ${JSON.stringify(await getSafeLoginFormStructure(page))}`)

  await emailInput.fill(credentials.studentEmail)
  await passwordInput.fill(credentials.studentPassword)

  const formStateBeforeSubmit = await getSafeLoginFormState(page)
  console.log(`SAFE_E2E_LOGIN_FORM_STATE_BEFORE_SUBMIT: ${JSON.stringify(formStateBeforeSubmit)}`)
  if (
    !formStateBeforeSubmit.emailInputPresent ||
    !formStateBeforeSubmit.passwordInputPresent ||
    !formStateBeforeSubmit.submitButtonPresent ||
    !formStateBeforeSubmit.emailHasValue ||
    !formStateBeforeSubmit.passwordHasValue ||
    formStateBeforeSubmit.submitButtonDisabled
  ) {
    throw new Error('LOGIN_FORM_NOT_READY_FOR_SUBMIT')
  }

  await installSafeSubmitEventProbe(page)
  const authRequestRecorder = createSafeAuthRequestRecorder(page)
  const credentialsCallbackStatus = waitForCredentialsCallbackStatus(page)
  await expect(submitButton).toBeEnabled()
  await submitButton.scrollIntoViewIfNeeded()
  await submitButton.focus()
  console.log(`SAFE_E2E_ACTIVE_ELEMENT_BEFORE_SUBMIT: ${await getSafeActiveElementCategory(page)}`)
  console.log(`SAFE_E2E_SUBMIT_BUTTON_BOX_VISIBLE: ${(await getSafeSubmitButtonBoxState(page)).visibleBox ? 'yes' : 'no'}`)
  await submitButton.click()
  console.log('SAFE_E2E_LOGIN_SUBMIT_TRIGGER: form-submit-button-click')
  console.log('SAFE_E2E_SUBMIT_BUTTON_RECEIVES_CLICK: attempted')
  console.log('SAFE_E2E_LOGIN_SUBMIT_ATTEMPTED: yes')

  const callbackStatus = await credentialsCallbackStatus
  const submitEventCount = await getSafeSubmitEventCount(page)
  console.log(`SAFE_E2E_FORM_SUBMIT_EVENT_COUNT: ${submitEventCount}`)
  console.log(`SAFE_E2E_FORM_SUBMIT_EVENT_OBSERVED: ${submitEventCount > 0 ? 'yes' : 'no'}`)
  console.log(`SAFE_E2E_CREDENTIALS_CALLBACK_STATUS: ${callbackStatus}`)
  console.log(`SAFE_E2E_AUTH_REQUESTS_AFTER_SUBMIT: ${authRequestRecorder.summary()}`)
  await page.waitForLoadState('networkidle').catch(() => undefined)

  const pathAfterLogin = safePathname(page.url())
  console.log(`SAFE_E2E_PATH_AFTER_LOGIN: ${pathAfterLogin}`)

  const loginDiagnostic = await getSafeLoginDiagnostic(page)
  if (loginDiagnostic !== 'NO_LOGIN_ERROR_VISIBLE') {
    console.log(`SAFE_E2E_LOGIN_DIAGNOSTIC: ${loginDiagnostic}`)
    throw new Error('AUTH_LOGIN_ERROR_VISIBLE_AFTER_SUBMIT')
  }

  if (typeof callbackStatus === 'number' && callbackStatus >= 400) {
    console.log(`SAFE_E2E_LOGIN_DIAGNOSTIC: ${await getSafeLoginDiagnostic(page)}`)
    throw new Error('AUTH_CALLBACK_FAILED_AFTER_SUBMIT')
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
