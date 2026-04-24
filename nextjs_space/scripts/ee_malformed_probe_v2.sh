#!/usr/bin/env bash
# Malformed-rationale live resilience probe.
# Uses prisma (shared DB) to insert a bad row, curl to hit live GET,
# python3 for JSON parsing, prisma to cleanup.

set -u

cd /home/ubuntu/tutoring_platform_mvp/nextjs_space
set -a; source .env; set +a

HOST="https://tutoring-platform-mv-l4o1ne.abacusai.app"
ENR="cmoadr1x20003syur0rgskn12"
COOKIES="/tmp/ee_live_cookies.txt"
MARKER="::EE_MALFORMED_PROBE::{not-json}"

if [ ! -f "$COOKIES" ]; then
  echo "ERROR: expected $COOKIES from prior probe run"; exit 1
fi

echo "[SETUP] inserting malformed row via prisma..."
BAD_ID=$(npx tsx -e "
import { prisma } from './lib/prisma';
(async () => {
  const r = await prisma.continuitySignal.create({
    data: {
      enrollmentId: '$ENR',
      signalType: 'continuity_start_governance_reading',
      rationale: '$MARKER',
    },
    select: { id: true },
  });
  console.log(r.id);
  await prisma.\$disconnect();
})();
" 2>&1 | tail -1)
echo "[SETUP] inserted id=$BAD_ID"

cleanup() {
  echo "[CLEANUP] deleting row $BAD_ID..."
  npx tsx -e "
import { prisma } from './lib/prisma';
(async () => {
  try { await prisma.continuitySignal.delete({ where: { id: '$BAD_ID' } }); console.log('deleted'); }
  catch (e: any) { console.log('already deleted or error:', e?.message); }
  finally { await prisma.\$disconnect(); }
})();
" 2>&1 | tail -1
}
trap cleanup EXIT

echo "[QUERY] hitting live GET..."
STATUS=$(curl -s -b "$COOKIES" -o /tmp/ee_mal.json -w "%{http_code}" \
  "$HOST/api/continuity-start/convergence/record?enrollmentId=$ENR&limit=50")
echo "[QUERY] status=$STATUS"

if [ "$STATUS" = "500" ]; then
  echo "[FAIL] LIVE endpoint 500'd on malformed rationale"; exit 2
fi
if [ "$STATUS" != "200" ]; then
  echo "[FAIL] LIVE endpoint returned $STATUS (expected 200)"; exit 2
fi

python3 <<PY
import json
with open('/tmp/ee_mal.json') as f:
    d = json.load(f)
items = d.get('items', [])
bad_id = '$BAD_ID'
target = [it for it in items if it.get('id') == bad_id]
assert len(target) == 1, f'malformed row not returned; count={len(target)}'
it = target[0]
assert it['rationaleParseOk'] is False, f'rationaleParseOk={it["rationaleParseOk"]}'
assert it['rationale'] == '$MARKER', f'rationale not preserved; got={it["rationale"]}'

# Confirm sibling rows still parse OK (cross-row isolation).
siblings = [it for it in items if it.get('id') != bad_id]
parsed_ok = [it for it in siblings if it.get('rationaleParseOk') is True]
print(f'[CHECK] malformed row: rationaleParseOk={it["rationaleParseOk"]}, rationale preserved raw')
print(f'[CHECK] sibling rows: {len(parsed_ok)}/{len(siblings)} parsed OK (no cross-row contamination)')
assert len(parsed_ok) >= 1 or len(siblings) == 0, 'siblings broke'
print('[PASS] malformed rationale resilience verified on LIVE')
PY
EXIT=$?
if [ $EXIT -ne 0 ]; then echo "[FAIL] validation failed"; exit 2; fi
exit 0
