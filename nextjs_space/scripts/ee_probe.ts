/**
 * Phase EE offline probe.
 *
 * Exercises GET /api/continuity-start/convergence/record against a
 * locally running dev server at http://localhost:3000 with admin
 * credentials.
 *
 * CONSULTATION SURFACE ONLY. This probe verifies a read/inspection
 * layer. It does NOT validate:
 *   - workflow integration
 *   - behavioral dependency
 *   - gating dependency
 *   - operational decision source
 *   - replacement of direct DB inspection for broader ContinuitySignal
 *     semantics
 *
 * During EE, no other code path is allowed to depend on this endpoint
 * for workflow behavior, gating, or operational decisions. The probe
 * is therefore strictly a shape/contract/tolerance test on the GET
 * handler plus a strict demo-state custody check.
 *
 * Assertions:
 *   PE0   unauth GET                                 → 401
 *   PE1   authed GET missing enrollmentId            → 400
 *   PE2   authed GET bogus enrollmentId              → 404
 *   PE3   authed GET valid enrollment (baseline)      → 200, contract shape
 *   PE4   POST 3 ED rows, GET → 200 + exactly 3 MORE ED items
 *           for this enrollment, in createdAt DESC order,
 *           each item carries the flat payload scalars + six anchors
 *   PE5   every PE4 item contains the six constant anchors inside
 *           rationale, top-level signalType is ED
 *   PE6   GET ?limit=2 → 200, count 2, nextCursor equals items[1].id
 *   PE7   GET ?limit=2&cursor=<PE6.nextCursor> → 200, count 1,
 *           union(PE6, PE7) equals PE4 set, no duplicates
 *   PE8   GET ?limit=9999 → clamped to 50, effectiveLimit=50, no error
 *   PE9   direct-insert one non-ED noise ContinuitySignal row via
 *           Prisma; GET MUST NOT return it (strict signalType filter)
 *   PE10  total table counts did NOT change as a result of any GET call
 *           (only PE4 POSTs and PE9 / PE11 direct inserts should move
 *           counts; GET calls are pure reads)
 *   PE11  direct-insert one ED-typed row with rationale='not-json';
 *           GET → 200 (no 500); that item present with rationale as raw
 *           string and rationaleParseOk=false; others parse normally
 *   PE12  delete every probe-inserted row (PE4 + PE9 + PE11); GET
 *           returns exactly to the PE3 baseline
 *   PE13  StudentProgramInstance pointer
 *           (status/currentCycleId/currentContinuityState/lastActivityAt)
 *           byte-identical before PE3 and after PE12
 */

import { PrismaClient } from '@prisma/client'

const BASE = process.env.EE_PROBE_BASE ?? 'http://localhost:3000'
const ADMIN_EMAIL = 'john@doe.com'
const ADMIN_PASSWORD = 'johndoe123'

const DEMO_ENROLLMENT_ID = 'cmoadr1x20003syur0rgskn12'
const BOGUS_ENROLLMENT_ID = 'cmoadr1x20003syur0rgskn99'

const ED_SIGNAL_TYPE = 'continuity_start_governance_reading'
const NOISE_SIGNAL_TYPE = 'ee_probe_non_ed_noise'

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

async function httpGet(
  jar: CookieJar | null,
  path: string,
): Promise<{ status: number; json: any }> {
  const res = await fetch(`${BASE}${path}`, {
    headers: jar ? { cookie: jar.header() } : {},
  })
  let json: any = null
  try { json = await res.json() } catch {}
  return { status: res.status, json }
}

async function httpPostRecord(
  jar: CookieJar,
  body: any,
): Promise<{ status: number; json: any }> {
  const res = await fetch(`${BASE}/api/continuity-start/convergence/record`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: jar.header(),
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

// Rows inserted by this probe — collected so PE12 can clean up even on
// partial failure. Populated as POSTs / direct inserts happen.
const probeCreatedIds: Set<string> = new Set()

async function cleanup() {
  const ids = Array.from(probeCreatedIds)
  if (ids.length > 0) {
    await prisma.continuitySignal.deleteMany({ where: { id: { in: ids } } })
  }
  // Defense in depth: delete any ee_probe_non_ed_noise rows for the
  // demo enrollment that may have leaked from a previous failed run.
  await prisma.continuitySignal.deleteMany({
    where: { enrollmentId: DEMO_ENROLLMENT_ID, signalType: NOISE_SIGNAL_TYPE },
  })
}

async function main() {
  console.log('Phase EE probe starting against', BASE)

  // ----- baseline -----
  console.log('\n--- baseline ---')
  const baselineCounts = await countAll()
  const baselinePointer = await enrollmentFingerprint(DEMO_ENROLLMENT_ID)
  const baselineEdCount = await prisma.continuitySignal.count({
    where: { enrollmentId: DEMO_ENROLLMENT_ID, signalType: ED_SIGNAL_TYPE },
  })
  const baselineEdIds = new Set(
    (await prisma.continuitySignal.findMany({
      where: { enrollmentId: DEMO_ENROLLMENT_ID, signalType: ED_SIGNAL_TYPE },
      select: { id: true },
    })).map((r: any) => r.id),
  )
  console.log('baseline counts:', baselineCounts)
  console.log('baseline enrollment pointer:', baselinePointer)
  console.log('baseline ED rows for demo enrollment:', baselineEdCount)

  // ----- PE0 -----
  console.log('\n--- PE0: unauth GET → 401 ---')
  const pe0 = await httpGet(null, `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}`)
  assert(pe0.status === 401, `PE0: status 401 (got ${pe0.status})`)

  const jar = await login()
  console.log('login ok.')

  // ----- PE1 -----
  console.log('\n--- PE1: authed GET missing enrollmentId → 400 ---')
  const pe1 = await httpGet(jar, `/api/continuity-start/convergence/record`)
  assert(pe1.status === 400, `PE1: status 400 (got ${pe1.status})`)
  assert(
    typeof pe1.json?.error === 'string' && /enrollmentid/i.test(pe1.json.error),
    'PE1: error mentions enrollmentId',
  )

  // ----- PE2 -----
  console.log('\n--- PE2: authed GET bogus enrollmentId → 404 ---')
  const pe2 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${BOGUS_ENROLLMENT_ID}`,
  )
  assert(pe2.status === 404, `PE2: status 404 (got ${pe2.status})`)

  // ----- PE3 -----
  console.log('\n--- PE3: authed GET valid enrollment, baseline shape ---')
  const countsBeforePE3 = await countAll()
  const pe3 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}`,
  )
  const countsAfterPE3 = await countAll()
  assert(pe3.status === 200, `PE3: status 200 (got ${pe3.status})`)
  assert(pe3.json?.enrollmentId === DEMO_ENROLLMENT_ID, 'PE3: echoes enrollmentId')
  assert(pe3.json?.signalType === ED_SIGNAL_TYPE, 'PE3: echoes hard-coded signalType')
  assert(Array.isArray(pe3.json?.items), 'PE3: items is an array')
  assert(typeof pe3.json?.count === 'number', 'PE3: count is a number')
  assert(pe3.json?.count === pe3.json?.items?.length, 'PE3: count === items.length')
  assert(pe3.json?.count === baselineEdCount, `PE3: count equals baseline ED rows for enrollment (got ${pe3.json?.count}, expected ${baselineEdCount})`)
  assert(pe3.json?.effectiveLimit === 20, 'PE3: default effectiveLimit is 20')
  assert(pe3.json?.nextCursor === null || typeof pe3.json?.nextCursor === 'string', 'PE3: nextCursor is null or string')
  assert(
    JSON.stringify(countsBeforePE3) === JSON.stringify(countsAfterPE3),
    'PE3: GET caused no table mutation',
  )

  // ----- PE4 -----
  console.log('\n--- PE4: POST 3 ED rows, GET → 3 MORE ED items, DESC ordered ---')
  const post1 = await httpPostRecord(jar, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(post1.status === 200, `PE4: POST#1 status 200 (got ${post1.status})`)
  if (post1.json?.id) probeCreatedIds.add(post1.json.id)
  await new Promise((r) => setTimeout(r, 15))
  const post2 = await httpPostRecord(jar, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(post2.status === 200, `PE4: POST#2 status 200 (got ${post2.status})`)
  if (post2.json?.id) probeCreatedIds.add(post2.json.id)
  await new Promise((r) => setTimeout(r, 15))
  const post3 = await httpPostRecord(jar, { enrollmentId: DEMO_ENROLLMENT_ID })
  assert(post3.status === 200, `PE4: POST#3 status 200 (got ${post3.status})`)
  if (post3.json?.id) probeCreatedIds.add(post3.json.id)

  const pe4 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=50`,
  )
  assert(pe4.status === 200, `PE4 GET: status 200 (got ${pe4.status})`)
  assert(pe4.json?.count === baselineEdCount + 3, `PE4: count === baseline+3 (got ${pe4.json?.count}, expected ${baselineEdCount + 3})`)
  // Order check: createdAt DESC across items
  const createdAts: string[] = (pe4.json?.items ?? []).map((i: any) => i.createdAt)
  let orderedDesc = true
  for (let i = 1; i < createdAts.length; i++) {
    if (createdAts[i - 1] < createdAts[i]) { orderedDesc = false; break }
  }
  assert(orderedDesc, 'PE4: items sorted by createdAt DESC')
  // The three newest items must be the three we just POSTed
  const topThreeIds = (pe4.json?.items ?? []).slice(0, 3).map((i: any) => i.id)
  const postedIds = [post3.json?.id, post2.json?.id, post1.json?.id]
  assert(
    JSON.stringify(topThreeIds) === JSON.stringify(postedIds),
    `PE4: top-3 items are the 3 POSTed ids in reverse insertion order`,
  )
  // All returned items must be ED-typed
  const allEd = (pe4.json?.items ?? []).every((i: any) => i.signalType === ED_SIGNAL_TYPE)
  assert(allEd, 'PE4: every returned item has signalType = continuity_start_governance_reading')

  // ----- PE5 -----
  console.log('\n--- PE5: six anchors + flat payload on every new item ---')
  for (const [idx, id] of postedIds.entries()) {
    const it = (pe4.json?.items ?? []).find((i: any) => i.id === id)
    assert(it !== undefined, `PE5: POSTed item #${idx + 1} present`)
    assert(it?.rationaleParseOk === true, `PE5: item #${idx + 1} rationaleParseOk true`)
    const r = it?.rationale
    assert(r?.schemaVersion === 'ed.v1.flat', `PE5: item #${idx + 1} rationale.schemaVersion`)
    assert(r?.phase === 'ED', `PE5: item #${idx + 1} rationale.phase ED`)
    assert(r?.recordingEventOnly === true, `PE5: item #${idx + 1} rationale.recordingEventOnly true`)
    assert(
      typeof r?.semanticClarification === 'string' && /recording event only/i.test(r.semanticClarification),
      `PE5: item #${idx + 1} rationale.semanticClarification literal`,
    )
    assert(r?.materializerOfRecord === 'structural_dn_du', `PE5: item #${idx + 1} anchor materializerOfRecord`)
    assert(r?.shadowSide === 'dz_shadow_block', `PE5: item #${idx + 1} anchor shadowSide`)
    assert(r?.isSourceOfTruthDecision === false, `PE5: item #${idx + 1} anchor isSourceOfTruthDecision`)
    assert(r?.isWriteAuthorization === false, `PE5: item #${idx + 1} anchor isWriteAuthorization`)
    assert(r?.isConvergenceExecution === false, `PE5: item #${idx + 1} anchor isConvergenceExecution`)
    assert(r?.isMergeDecision === false, `PE5: item #${idx + 1} anchor isMergeDecision`)
    // flat payload — no nested ec / source objects
    assert(r?.ec === undefined, `PE5: item #${idx + 1} rationale.ec absent (flat)`)
    assert(r?.source === undefined, `PE5: item #${idx + 1} rationale.source absent (flat)`)
  }

  // ----- PE6 -----
  console.log('\n--- PE6: GET ?limit=2 → page 1 ---')
  const pe6 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=2`,
  )
  assert(pe6.status === 200, `PE6: status 200 (got ${pe6.status})`)
  assert(pe6.json?.count === 2, `PE6: count 2 (got ${pe6.json?.count})`)
  assert(pe6.json?.effectiveLimit === 2, `PE6: effectiveLimit 2`)
  assert(typeof pe6.json?.nextCursor === 'string' && pe6.json.nextCursor.length > 0, 'PE6: nextCursor present as non-empty string')
  assert(pe6.json?.nextCursor === pe6.json?.items?.[1]?.id, 'PE6: nextCursor equals items[1].id')

  // ----- PE7 -----
  console.log('\n--- PE7: GET ?limit=2&cursor=<PE6.nextCursor> → page 2 ---')
  const pe7 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=2&cursor=${pe6.json.nextCursor}`,
  )
  assert(pe7.status === 200, `PE7: status 200 (got ${pe7.status})`)
  assert(typeof pe7.json?.count === 'number' && pe7.json.count >= 1, `PE7: count >= 1 (got ${pe7.json?.count})`)
  // No duplicates across PE6 + PE7
  const idsP6 = (pe6.json?.items ?? []).map((i: any) => i.id)
  const idsP7 = (pe7.json?.items ?? []).map((i: any) => i.id)
  const union = new Set([...idsP6, ...idsP7])
  assert(union.size === idsP6.length + idsP7.length, 'PE7: no duplicates across PE6 and PE7 pages')

  // ----- PE8 -----
  console.log('\n--- PE8: GET ?limit=9999 → clamped to 50 ---')
  const pe8 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=9999`,
  )
  assert(pe8.status === 200, `PE8: status 200 (got ${pe8.status})`)
  assert(pe8.json?.effectiveLimit === 50, `PE8: effectiveLimit clamped to 50 (got ${pe8.json?.effectiveLimit})`)
  assert(Array.isArray(pe8.json?.items), 'PE8: items still an array')

  // ----- PE9 -----
  console.log('\n--- PE9: direct-insert non-ED noise row; GET must NOT return it ---')
  const noise = await prisma.continuitySignal.create({
    data: {
      enrollmentId: DEMO_ENROLLMENT_ID,
      learningCycleId: null,
      evaluationId: null,
      signalType: NOISE_SIGNAL_TYPE,
      rationale: JSON.stringify({ note: 'ee probe non-ED noise; must be invisible to GET' }),
    },
    select: { id: true },
  })
  probeCreatedIds.add(noise.id)

  const pe9 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=50`,
  )
  assert(pe9.status === 200, `PE9: status 200 (got ${pe9.status})`)
  const noiseLeaked = (pe9.json?.items ?? []).some((i: any) => i.id === noise.id)
  assert(!noiseLeaked, 'PE9: non-ED noise row does NOT appear in GET output')
  const allStillEd = (pe9.json?.items ?? []).every((i: any) => i.signalType === ED_SIGNAL_TYPE)
  assert(allStillEd, 'PE9: every returned item still has signalType = continuity_start_governance_reading')
  assert(pe9.json?.count === baselineEdCount + 3, `PE9: count unchanged at baseline+3 (got ${pe9.json?.count})`)

  // ----- PE10 -----
  console.log('\n--- PE10: GET calls caused no table mutation ---')
  // Snapshot counts, fire multiple GETs, verify no drift
  const snap1 = await countAll()
  for (let i = 0; i < 4; i++) {
    await httpGet(jar, `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=5`)
  }
  const snap2 = await countAll()
  assert(
    JSON.stringify(snap1) === JSON.stringify(snap2),
    'PE10: 4x GET caused zero drift in table counts',
  )

  // ----- PE11 -----
  console.log('\n--- PE11: corrupt-rationale tolerance ---')
  const corrupt = await prisma.continuitySignal.create({
    data: {
      enrollmentId: DEMO_ENROLLMENT_ID,
      learningCycleId: null,
      evaluationId: null,
      signalType: ED_SIGNAL_TYPE,
      rationale: 'not-json',
    },
    select: { id: true },
  })
  probeCreatedIds.add(corrupt.id)

  const pe11 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=50`,
  )
  assert(pe11.status === 200, `PE11: status 200 (got ${pe11.status}) — single corrupt row did not 500 the list`)
  const corruptItem = (pe11.json?.items ?? []).find((i: any) => i.id === corrupt.id)
  assert(corruptItem !== undefined, 'PE11: corrupt-rationale row present in output')
  assert(corruptItem?.rationale === 'not-json', 'PE11: corrupt item rationale returned as raw string')
  assert(corruptItem?.rationaleParseOk === false, 'PE11: corrupt item rationaleParseOk=false')
  // Other items still parse normally
  const otherItems = (pe11.json?.items ?? []).filter((i: any) => i.id !== corrupt.id)
  const othersAllParse = otherItems.every((i: any) => i.rationaleParseOk === true || i.rationale === null)
  assert(othersAllParse, 'PE11: other items still parse normally (rationaleParseOk=true)')

  // ----- PE12 -----
  console.log('\n--- PE12: cleanup; GET returns to baseline ---')
  await cleanup()
  probeCreatedIds.clear()
  const pe12 = await httpGet(
    jar,
    `/api/continuity-start/convergence/record?enrollmentId=${DEMO_ENROLLMENT_ID}&limit=50`,
  )
  assert(pe12.status === 200, `PE12: status 200 (got ${pe12.status})`)
  assert(pe12.json?.count === baselineEdCount, `PE12: count returned to baseline (got ${pe12.json?.count}, expected ${baselineEdCount})`)
  const pe12Ids = new Set((pe12.json?.items ?? []).map((i: any) => i.id))
  let sameSet = pe12Ids.size === baselineEdIds.size
  if (sameSet) {
    for (const id of baselineEdIds) {
      if (!pe12Ids.has(id)) { sameSet = false; break }
    }
  }
  assert(sameSet, 'PE12: returned row ids exactly equal baseline row ids')

  const finalCounts = await countAll()
  assert(
    JSON.stringify(finalCounts) === JSON.stringify(baselineCounts),
    `PE12: final table counts equal baseline (baseline=${JSON.stringify(baselineCounts)}, final=${JSON.stringify(finalCounts)})`,
  )

  // ----- PE13 -----
  console.log('\n--- PE13: enrollment pointer unchanged end-to-end ---')
  const finalPointer = await enrollmentFingerprint(DEMO_ENROLLMENT_ID)
  assert(
    finalPointer.status === baselinePointer.status &&
      finalPointer.currentCycleId === baselinePointer.currentCycleId &&
      finalPointer.currentContinuityState === baselinePointer.currentContinuityState &&
      finalPointer.lastActivityAt === baselinePointer.lastActivityAt,
    'PE13: StudentProgramInstance pointer byte-identical before PE3 and after PE12',
  )

  console.log(`\n============================`)
  console.log(`PASS=${pass}  FAIL=${fail}`)
  console.log(`============================`)
  if (fail > 0) process.exit(1)
}

main()
  .catch(async (e) => {
    console.error(e)
    try { await cleanup() } catch {}
    process.exit(1)
  })
  .finally(async () => {
    try { await cleanup() } catch {}
    await prisma.$disconnect()
  })
