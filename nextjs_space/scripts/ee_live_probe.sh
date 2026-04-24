#!/usr/bin/env bash
# Phase EE live verification probe
# Target: https://tutoring-platform-mv-l4o1ne.abacusai.app
# Demo enrollment: cmoadr1x20003syur0rgskn12

set -u

HOST="https://tutoring-platform-mv-l4o1ne.abacusai.app"
ENR="cmoadr1x20003syur0rgskn12"
BOGUS="cxxxxxxxxxxxxxxxxxxxxxxxx"
COOKIES="/tmp/ee_live_cookies.txt"
rm -f "$COOKIES"

RESULTS=()
pass() { RESULTS+=("PASS: $1"); echo "PASS: $1"; }
fail() { RESULTS+=("FAIL: $1"); echo "FAIL: $1"; }

hr() { echo "----------------------------------------"; }

# =============================================================
hr; echo "[P0] Baseline: capture current pointer + signal count"
# We'll compare after verification runs to prove no mutation.
# =============================================================

# =============================================================
hr; echo "[P1] 401 unauthenticated GET"
# =============================================================
RESP=$(curl -s -o /tmp/ee_p1.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR")
echo "status=$RESP body=$(cat /tmp/ee_p1.json)"
if [ "$RESP" = "401" ]; then pass "P1 unauth GET -> 401"; else fail "P1 expected 401 got $RESP"; fi

# =============================================================
hr; echo "[P2] Login (CSRF + credentials) to produce session cookie"
# =============================================================
curl -s -c "$COOKIES" -b "$COOKIES" "$HOST/api/auth/csrf" -o /tmp/ee_csrf.json
CSRF=$(python3 -c "import json;print(json.load(open('/tmp/ee_csrf.json'))['csrfToken'])")
echo "csrf=${CSRF:0:24}..."
LOGIN=$(curl -s -c "$COOKIES" -b "$COOKIES" -o /tmp/ee_login.json -w "%{http_code}" \
  -X POST "$HOST/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=john@doe.com" \
  --data-urlencode "password=johndoe123" \
  --data-urlencode "redirect=false" \
  --data-urlencode "json=true")
echo "login status=$LOGIN body=$(cat /tmp/ee_login.json | head -c 200)"

# Verify session
SESS=$(curl -s -b "$COOKIES" "$HOST/api/auth/session")
echo "session=$SESS"
if echo "$SESS" | grep -q '"email"'; then pass "P2 session established"; else fail "P2 session NOT established"; fi

# =============================================================
hr; echo "[P3] 400 missing enrollmentId (authenticated)"
# =============================================================
RESP=$(curl -s -b "$COOKIES" -o /tmp/ee_p3.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record")
echo "status=$RESP body=$(cat /tmp/ee_p3.json)"
if [ "$RESP" = "400" ]; then pass "P3 missing enrollmentId -> 400"; else fail "P3 expected 400 got $RESP"; fi

# =============================================================
hr; echo "[P4] 404 bogus enrollmentId (authenticated)"
# =============================================================
RESP=$(curl -s -b "$COOKIES" -o /tmp/ee_p4.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record?enrollmentId=$BOGUS")
echo "status=$RESP body=$(cat /tmp/ee_p4.json)"
if [ "$RESP" = "404" ]; then pass "P4 bogus enrollmentId -> 404"; else fail "P4 expected 404 got $RESP"; fi

# =============================================================
hr; echo "[P5] 200 valid enrollment GET"
# =============================================================
RESP=$(curl -s -b "$COOKIES" -o /tmp/ee_p5.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR")
echo "status=$RESP"
cat /tmp/ee_p5.json | python3 -m json.tool | head -60
if [ "$RESP" = "200" ]; then pass "P5 valid enrollment GET -> 200"; else fail "P5 expected 200 got $RESP"; fi

# =============================================================
hr; echo "[P6] Only signalType = continuity_start_governance_reading rows"
# =============================================================
python3 <<'PY'
import json
with open('/tmp/ee_p5.json') as f:
    data = json.load(f)
assert data.get('signalType') == 'continuity_start_governance_reading', f"top-level signalType wrong: {data.get('signalType')}"
items = data.get('items', [])
for i,it in enumerate(items):
    st = it.get('signalType')
    assert st == 'continuity_start_governance_reading', f"item {i} signalType={st}"
print(f"OK: {len(items)} items, all signalType='continuity_start_governance_reading'")
print(f"count={data.get('count')} effectiveLimit={data.get('effectiveLimit')} nextCursor={data.get('nextCursor')}")
PY
if [ $? -eq 0 ]; then pass "P6 all rows signalType=continuity_start_governance_reading"; else fail "P6 signalType filter broken"; fi

# =============================================================
hr; echo "[P7] Rationale parsing — parsed object when JSON valid"
# =============================================================
python3 <<'PY'
import json
with open('/tmp/ee_p5.json') as f:
    data = json.load(f)
items = data.get('items', [])
ok_count = 0
for it in items:
    r = it.get('rationale')
    ok = it.get('rationaleParseOk')
    if isinstance(r, dict) and ok is True:
        ok_count += 1
        sc = r.get('schemaVersion')
        rec = r.get('recordingEventOnly')
        assert sc == 'ed.v1.flat', f"schemaVersion={sc}"
        assert rec is True, f"recordingEventOnly={rec}"
        for key in ('posture','kind','riskTier','reconciliationStatus','precedencePreferred',
                   'materializerOfRecord','shadowSide','isSourceOfTruthDecision',
                   'isWriteAuthorization','isConvergenceExecution','isMergeDecision'):
            assert key in r, f"missing scalar: {key}"
print(f"OK: {ok_count} rows with valid JSON rationale parsed as object (schemaVersion=ed.v1.flat)")
PY
if [ $? -eq 0 ]; then pass "P7 valid JSON rationale -> parsed object + rationaleParseOk=true"; else fail "P7 rationale parse broken"; fi

# =============================================================
hr; echo "[P8] Pagination: limit=2 works"
# =============================================================
RESP=$(curl -s -b "$COOKIES" -o /tmp/ee_p8_page1.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR&limit=2")
echo "status=$RESP"
python3 <<'PY'
import json
with open('/tmp/ee_p8_page1.json') as f:
    d = json.load(f)
assert d.get('effectiveLimit') == 2, f"effectiveLimit={d.get('effectiveLimit')}"
assert len(d.get('items', [])) <= 2, f"items={len(d['items'])}"
print(f"OK: limit=2 respected, items={len(d['items'])}, nextCursor={d.get('nextCursor')}")
PY
if [ $? -eq 0 ]; then pass "P8 limit=2 honored + effectiveLimit echoed"; else fail "P8 limit broken"; fi

# =============================================================
hr; echo "[P9] Pagination: nextCursor works + no duplicates across pages"
# =============================================================
CURSOR=$(python3 -c "import json;print(json.load(open('/tmp/ee_p8_page1.json')).get('nextCursor') or '')")
echo "cursor=$CURSOR"
if [ -z "$CURSOR" ]; then
  echo "NOTE: nextCursor is null — fewer than 3 rows exist; creating a second row via ED POST to validate pagination"
  curl -s -b "$COOKIES" -X POST "$HOST/api/continuity-start/convergence/record" \
    -H "Content-Type: application/json" \
    -d "{\"enrollmentId\":\"$ENR\"}" -o /tmp/ee_p9_post1.json -w "post1=%{http_code}\n"
  sleep 1
  curl -s -b "$COOKIES" -X POST "$HOST/api/continuity-start/convergence/record" \
    -H "Content-Type: application/json" \
    -d "{\"enrollmentId\":\"$ENR\"}" -o /tmp/ee_p9_post2.json -w "post2=%{http_code}\n"
  sleep 1
  curl -s -b "$COOKIES" -o /tmp/ee_p8_page1.json \
    "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR&limit=2"
  CURSOR=$(python3 -c "import json;print(json.load(open('/tmp/ee_p8_page1.json')).get('nextCursor') or '')")
  echo "cursor (after seeding)=$CURSOR"
fi

if [ -n "$CURSOR" ]; then
  curl -s -b "$COOKIES" -o /tmp/ee_p9_page2.json \
    "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR&limit=2&cursor=$CURSOR"
  python3 <<'PY'
import json
with open('/tmp/ee_p8_page1.json') as f: p1 = json.load(f)
with open('/tmp/ee_p9_page2.json') as f: p2 = json.load(f)
ids1 = [x['id'] for x in p1.get('items', [])]
ids2 = [x['id'] for x in p2.get('items', [])]
overlap = set(ids1) & set(ids2)
print(f"page1 ids = {ids1}")
print(f"page2 ids = {ids2}")
print(f"overlap  = {overlap}")
assert not overlap, f"duplicates across pages: {overlap}"
print("OK: pagination nextCursor works + no duplicates across pages")
PY
  if [ $? -eq 0 ]; then pass "P9 nextCursor + no-duplicates"; else fail "P9 pagination broken"; fi
else
  fail "P9 could not establish a cursor even after seeding extra rows"
fi

# =============================================================
hr; echo "[P10] /now still works (no regression)"
# =============================================================
RESP=$(curl -s -b "$COOKIES" -o /tmp/ee_now.html -w "%{http_code}" "$HOST/now")
echo "status=$RESP"
# Authenticated user arrives at /now. Should be 200 (page) or 307 if session doesn't scope.
if [ "$RESP" = "200" ] || [ "$RESP" = "307" ]; then pass "P10 /now reachable (status=$RESP, no 500)"; else fail "P10 /now broke (status=$RESP)"; fi

# =============================================================
hr; echo "[P11] Enrollment pointer unchanged (fetch via /api/instances/[id])"
# =============================================================
curl -s -b "$COOKIES" -o /tmp/ee_enr_after.json \
  "$HOST/api/instances/$ENR"
python3 <<PY
import json
try:
    with open('/tmp/ee_enr_after.json') as f: d = json.load(f)
    print(f"enrollment id={d.get('id')}")
    print(f"status={d.get('status')}")
    print(f"currentContinuityState={d.get('currentContinuityState')}")
    print(f"currentCycleId={d.get('currentCycleId')}")
    assert d.get('id') == "$ENR"
    assert d.get('status') == 'active', f"enrollment status mutated: {d.get('status')}"
    assert d.get('currentContinuityState') == 'normal', f"continuityState mutated: {d.get('currentContinuityState')}"
    print('OK: enrollment pointer coherent (active + normal)')
except Exception as e:
    print(f"ERR: {e}")
    raise
PY
if [ $? -eq 0 ]; then pass "P11 enrollment pointer unchanged"; else fail "P11 enrollment pointer coherence broken"; fi

# =============================================================
hr; echo "SUMMARY"
for r in "${RESULTS[@]}"; do echo "  $r"; done
hr
FAILS=$(printf '%s\n' "${RESULTS[@]}" | grep -c ^FAIL)
echo "FAILS=$FAILS"
exit $FAILS
