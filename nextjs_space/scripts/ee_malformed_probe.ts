/**
 * Phase EE live resilience probe:
 *  - inserts 1 ContinuitySignal row with a malformed (non-JSON) rationale
 *  - queries the LIVE GET endpoint
 *  - verifies the endpoint does NOT 500
 *  - verifies the malformed row is returned with rationaleParseOk=false
 *    and rationale preserved as the raw string
 *  - deletes the test row before exit (idempotent cleanup)
 */
import { prisma } from '../lib/prisma'

const HOST = 'https://tutoring-platform-mv-l4o1ne.abacusai.app'
const ENR = 'cmoadr1x20003syur0rgskn12'
// Sentinel marker so we can find & clean up only this row.
const MALFORMED_RATIONALE = '::EE_MALFORMED_PROBE::{not-json}'

async function login(): Promise<string> {
  // NextAuth CSRF + credentials on live.
  const csrfRes = await fetch(`${HOST}/api/auth/csrf`)
  const cookies1 = csrfRes.headers.get('set-cookie') ?? ''
  const csrfJson: any = await csrfRes.json()
  const csrfToken = csrfJson.csrfToken

  const body = new URLSearchParams()
  body.set('csrfToken', csrfToken)
  body.set('email', 'john@doe.com')
  body.set('password', 'johndoe123')
  body.set('redirect', 'false')
  body.set('json', 'true')

  const loginRes = await fetch(`${HOST}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookies1,
    },
    body,
    redirect: 'manual',
  })
  const cookies2 = loginRes.headers.get('set-cookie') ?? ''
  // Merge all Set-Cookie values into a single Cookie header.
  const jar = [cookies1, cookies2]
    .join(',')
    .split(/,(?=[^ ;]+=)/)
    .map((c) => c.split(';')[0].trim())
    .filter(Boolean)
    .filter((c) => c.includes('='))
  return jar.join('; ')
}

async function main() {
  // 1) Insert malformed row (signalType matches EE filter).
  const bad = await prisma.continuitySignal.create({
    data: {
      enrollmentId: ENR,
      signalType: 'continuity_start_governance_reading',
      rationale: MALFORMED_RATIONALE,
    },
    select: { id: true },
  })
  console.log('[SETUP] inserted malformed row id=', bad.id)

  try {
    const cookie = await login()
    const headers = { Cookie: cookie, Accept: 'application/json' }

    // 2) Query LIVE endpoint with a limit large enough to include the row.
    const res = await fetch(
      `${HOST}/api/continuity-start/convergence/record?enrollmentId=${ENR}&limit=50`,
      { headers }
    )
    console.log('[QUERY] status=', res.status)
    if (res.status === 500) {
      throw new Error('LIVE endpoint returned 500 on malformed rationale (resilience FAIL)')
    }
    if (res.status !== 200) {
      throw new Error(`LIVE endpoint expected 200 got ${res.status}`)
    }
    const data: any = await res.json()
    console.log('[QUERY] count=', data.count, 'signalType=', data.signalType)

    // 3) Find our malformed row in the items list.
    const malformedItem = data.items.find((it: any) => it.id === bad.id)
    if (!malformedItem) {
      throw new Error(`malformed row id=${bad.id} not returned by live endpoint`)
    }
    console.log('[CHECK] rationaleParseOk=', malformedItem.rationaleParseOk)
    console.log('[CHECK] rationale (raw)=', JSON.stringify(malformedItem.rationale))

    if (malformedItem.rationaleParseOk !== false) {
      throw new Error(
        `rationaleParseOk expected=false got=${malformedItem.rationaleParseOk}`
      )
    }
    if (malformedItem.rationale !== MALFORMED_RATIONALE) {
      throw new Error(
        `rationale should be preserved as raw string; got=${JSON.stringify(
          malformedItem.rationale
        )}`
      )
    }

    // 4) Verify other rows in same response still parsed OK (no cross-row impact).
    const otherOk = data.items.filter(
      (it: any) => it.id !== bad.id && it.rationaleParseOk === true
    )
    console.log(
      `[CHECK] sibling rows parsed OK: ${otherOk.length} / ${data.items.length - 1}`
    )
    if (otherOk.length === 0 && data.items.length > 1) {
      throw new Error('no sibling rows parsed OK — cross-row contamination suspected')
    }

    console.log('[PASS] live endpoint is resilient to malformed rationale row')
  } finally {
    // 5) Cleanup — always delete the test row, even on failure.
    await prisma.continuitySignal.delete({ where: { id: bad.id } })
    console.log('[CLEANUP] deleted malformed probe row')
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error('[FAIL]', e?.message ?? e)
  process.exit(1)
})
