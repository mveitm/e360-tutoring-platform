/**
 * Phase ED rescue v1 offline probe.
 *
 * Exercises POST /api/continuity-start/convergence/record against a
 * locally running dev server at http://localhost:3000 with
 * admin credentials.
 *
 * Flat scalar-only payload shape is verified (no deep-walk
 * assertions on a nested `ec` object — rescue v1 does NOT persist
 * that).
 *
 * Assertions:
 *   PD0  unauthenticated POST          → 401
 *   PD1  authed POST, missing body      → 400
 *   PD2  authed POST, bogus enrollment  → 404
 *   PD3  authed POST, valid enrollment  → 200 + exactly one new row
 *                                         + flat scalar payload shape
 *   PD4  authed POST, same enrollment   → 200 + one MORE new row
 *                                         (no idempotency by design)
 *   PD5  no other tables mutated around PD3 + PD4
 *   PD6  enrollment pointer unchanged around PD3 + PD4
 */

import { PrismaClient } from '@prisma/client'

const BASE = 'http://localhost:3000'
const ADMIN_EMAIL = 'john@doe.com'
const ADMIN_PASSWORD = 'johndoe123'

const DEMO_ENROLLMENT_ID = 'cmoadr1x20003syur0rgskn12'
const BOGUS_ENROLLMENT_ID = 'cmoadr1x20003syur0rgskn99'

const prisma = new PrismaClient()

class CookieJar {
  private cookies = new Map<string, string>()
  absorb(res: Response) {
    const getSetCookie = (res.headers as any).getSetCookie as undefined | (() => string[])
    const raws: string[] = getSetCookie
      ? getSetCookie.call(res.headers)
      : ((res.headers.get('set-cookie') ?? '').split(/,(?=[^ ]|$)/).filter(Boolean))
    for (const raw of raws) {
      const [pair] = raw.split(';')
      const [name, ...vparts] = pair.split('=')
      if (name && vparts.length > 0) {
        this.cookies.set(name.trim(), vparts.join('=').trim())
      }
    }
  }
  header(): string {
    return [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ')
  }
}

let pass = 0
let fail = 0
function assert(cond: any, msg: string) {
  if (cond) {
    console.log(`  PASS  ${msg}`)
    pass++
  } else {
    console.log(`  FAIL  ${msg}`)
    fail++
  }
}

async function login(): Promise<CookieJar> {
  const jar = new CookieJar()
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  jar.absorb(csrfRes)
  const { csrfToken } = await csrfRes.json()
  const form = new URLSearchParams({
    csrfToken,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    callbackUrl: `${BASE}/admin`,
    json: 'true',
  })
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: jar.header(),
    },
    body: form,
    redirect: 'manual',
  })
  jar.absorb(loginRes)
  const sessionRes = await fetch(`${BASE}/api/auth/session`, {
    headers: { cookie: jar.header() },
  })
  jar.absorb(sessionRes)
  const session = await sessionRes.json()
  if (!session?.user) {
    throw new Error(`Login failed. Session=${JSON.stringify(session)}`)
  }
  return jar
}

async function postRecord(jar: CookieJar | null, body: any): Promise<{ status: number, json: any }> {
  const res = await fetch(`${BASE}/api/continuity-start/convergence/record`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(jar ? { cookie: jar.header() } : {}),
    },
    body: JSON.stringify(body ?? {}),
  })
  let json: any = null
  try { json = await res.json() } catch {}
  return { status: res.status, json }
}

async function countAll() {
  return {
    studyLoads: await prisma.studyLoad.count(),
    cycleSnapshots: await prisma.cycleSnapshot.count(),
    continuitySignals: await prisma.continuitySignal.count(),
    learningCycles: await prisma.learningCycle.count(),
    enrollments: await prisma.studentProgramInstance.count(),
  }
}

async function enrollmentFingerprint(id: string) {
  const e = await prisma.studentProgramInstance.findUnique({
    where: { id },
    select: {
      status: true,
      currentCycleId: true,
      currentContinuityState: true,
      lastActivityAt: true,
    },
  })
  return {
    status: e?.status ?? null,
    currentCycleId: e?.currentCycleId ?? null,
    currentContinuityState: e?.currentContinuityState ?? null,
    lastActivityAt: e?.lastActivityAt?.toISOString() ?? null,
  }
}

async function main() {
  console.log('Phase ED rescue v1 probe starting against', BASE)

  console.log('\n--- baseline ---')
  const baselineCounts = await countAll()
  const baselinePointer = await enrollmentFingerprint(DEMO_ENROLLMENT_ID)
  console.log('baseline counts:', baselineCounts)
  console.log('baseline enrollment pointer:', baselinePointer)

  console.log('\n--- PD0: unauthenticated POST → 401 ---')
  const pd0 = await postRecord(null, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(pd0.status === 401, `PD0: status 401 (got ${pd0.status})`)

  const jar = await login()
  console.log('login ok.')

  console.log('\n--- PD1: authed POST missing enrollmentId → 400 ---')
  const pd1 = await postRecord(jar, {})
  assert(pd1.status === 400, `PD1: status 400 (got ${pd1.status})`)
  assert(
    typeof pd1.json?.error === 'string' && /enrollmentid/i.test(pd1.json.error),
    'PD1: error mentions enrollmentId'
  )

  console.log('\n--- PD2: authed POST bogus enrollmentId → 404 ---')
  const pd2 = await postRecord(jar, { enrollmentId: BOGUS_ENROLLMENT_ID })
  assert(pd2.status === 404, `PD2: status 404 (got ${pd2.status})`)

  const beforePD3 = await countAll()

  console.log('\n--- PD3: authed POST valid enrollmentId → 200 + 1 new row ---')
  const pd3 = await postRecord(jar, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(pd3.status === 200, `PD3: status 200 (got ${pd3.status})`)
  assert(typeof pd3.json?.id === 'string', 'PD3: response.id is a string')
  assert(pd3.json?.signalType === 'continuity_start_governance_reading', "PD3: signalType")
  assert(pd3.json?.schemaVersion === 'ed.v1.flat', 'PD3: schemaVersion ed.v1.flat')
  assert(pd3.json?.recordingEventOnly === true, 'PD3: recordingEventOnly true')
  assert(typeof pd3.json?.posture === 'string', 'PD3: posture scalar')
  assert(typeof pd3.json?.kind === 'string', 'PD3: kind scalar')
  assert(typeof pd3.json?.riskTier === 'string', 'PD3: riskTier scalar')
  assert(typeof pd3.json?.reconciliationStatus === 'string', 'PD3: reconciliationStatus scalar')
  assert(typeof pd3.json?.precedencePreferred === 'string', 'PD3: precedencePreferred scalar')

  const afterPD3 = await countAll()
  assert(
    afterPD3.continuitySignals === beforePD3.continuitySignals + 1,
    `PD3: exactly one new ContinuitySignal (before=${beforePD3.continuitySignals}, after=${afterPD3.continuitySignals})`
  )
  assert(
    afterPD3.studyLoads === beforePD3.studyLoads &&
    afterPD3.cycleSnapshots === beforePD3.cycleSnapshots &&
    afterPD3.learningCycles === beforePD3.learningCycles &&
    afterPD3.enrollments === beforePD3.enrollments,
    'PD5 (part 1): no other tables mutated by PD3'
  )

  // Inspect the persisted row's rationale scalars
  const row = await prisma.continuitySignal.findUnique({
    where: { id: pd3.json.id },
    select: {
      id: true,
      signalType: true,
      enrollmentId: true,
      learningCycleId: true,
      evaluationId: true,
      rationale: true,
    },
  })
  assert(row !== null, 'PD3: signal row found in DB')
  assert(row?.signalType === 'continuity_start_governance_reading', 'PD3 row signalType')
  assert(row?.enrollmentId === DEMO_ENROLLMENT_ID, 'PD3 row enrollmentId')
  assert(row?.evaluationId === null, 'PD3 row evaluationId is null')
  // `rationale` is stored as a JSON-encoded string (schema: String?).
  assert(typeof row?.rationale === 'string', 'PD3 row rationale is a string (JSON-encoded)')
  let rat: any = null
  try { rat = JSON.parse((row?.rationale ?? 'null') as string) } catch {}
  assert(rat !== null && typeof rat === 'object', 'PD3 row rationale JSON parses to object')
  assert(rat?.schemaVersion === 'ed.v1.flat', 'PD3 rationale.schemaVersion ed.v1.flat')
  assert(rat?.phase === 'ED', 'PD3 rationale.phase ED')
  assert(rat?.recordingEventOnly === true, 'PD3 rationale.recordingEventOnly true')
  assert(
    typeof rat?.semanticClarification === 'string' && /recording event only/i.test(rat.semanticClarification),
    'PD3 rationale.semanticClarification literal present'
  )
  assert(
    /does NOT mean workflow transition, state transition, authorization, trigger/.test(rat?.semanticClarification ?? ''),
    'PD3 rationale.semanticClarification contains mandatory NOT-clause'
  )
  // FLAT payload shape: no nested `ec` object, no nested `source` object
  assert(rat?.ec === undefined, 'PD3 rationale.ec is absent (flat payload)')
  assert(rat?.source === undefined, 'PD3 rationale.source is absent (flat payload)')
  // scalar EC fields
  assert(typeof rat?.posture === 'string', 'PD3 rationale.posture is a scalar string')
  assert(typeof rat?.kind === 'string', 'PD3 rationale.kind is a scalar string')
  assert(typeof rat?.riskTier === 'string', 'PD3 rationale.riskTier is a scalar string')
  assert(typeof rat?.reconciliationStatus === 'string', 'PD3 rationale.reconciliationStatus is a scalar string')
  assert(typeof rat?.precedencePreferred === 'string', 'PD3 rationale.precedencePreferred is a scalar string')
  // six constant contract anchors
  assert(rat?.materializerOfRecord === 'structural_dn_du', 'PD3 rationale.materializerOfRecord structural_dn_du')
  assert(rat?.shadowSide === 'dz_shadow_block', 'PD3 rationale.shadowSide dz_shadow_block')
  assert(rat?.isSourceOfTruthDecision === false, 'PD3 rationale.isSourceOfTruthDecision false')
  assert(rat?.isWriteAuthorization === false, 'PD3 rationale.isWriteAuthorization false')
  assert(rat?.isConvergenceExecution === false, 'PD3 rationale.isConvergenceExecution false')
  assert(rat?.isMergeDecision === false, 'PD3 rationale.isMergeDecision false')
  assert(typeof rat?.evaluatedAt === 'string', 'PD3 rationale.evaluatedAt string')

  const beforePD4 = await countAll()

  console.log('\n--- PD4: re-invoke → 200 + 1 MORE new row (no idempotency) ---')
  const pd4 = await postRecord(jar, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(pd4.status === 200, `PD4: status 200 (got ${pd4.status})`)
  assert(typeof pd4.json?.id === 'string', 'PD4: response.id is a string')
  assert(pd4.json.id !== pd3.json.id, 'PD4: new row id differs from PD3')

  const afterPD4 = await countAll()
  assert(
    afterPD4.continuitySignals === beforePD4.continuitySignals + 1,
    `PD4: exactly one MORE ContinuitySignal row (before=${beforePD4.continuitySignals}, after=${afterPD4.continuitySignals})`
  )
  assert(
    afterPD4.studyLoads === beforePD4.studyLoads &&
    afterPD4.cycleSnapshots === beforePD4.cycleSnapshots &&
    afterPD4.learningCycles === beforePD4.learningCycles &&
    afterPD4.enrollments === beforePD4.enrollments,
    'PD5 (part 2): no other tables mutated by PD4'
  )

  console.log('\n--- PD6: enrollment pointer unchanged end-to-end ---')
  const afterPointer = await enrollmentFingerprint(DEMO_ENROLLMENT_ID)
  assert(
    afterPointer.status === baselinePointer.status &&
    afterPointer.currentCycleId === baselinePointer.currentCycleId &&
    afterPointer.currentContinuityState === baselinePointer.currentContinuityState &&
    afterPointer.lastActivityAt === baselinePointer.lastActivityAt,
    'PD6: StudentProgramInstance pointer (status/currentCycleId/currentContinuityState/lastActivityAt) unchanged'
  )

  console.log(`\n============================`)
  console.log(`PASS=${pass}  FAIL=${fail}`)
  console.log(`============================`)
  if (fail > 0) process.exit(1)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
