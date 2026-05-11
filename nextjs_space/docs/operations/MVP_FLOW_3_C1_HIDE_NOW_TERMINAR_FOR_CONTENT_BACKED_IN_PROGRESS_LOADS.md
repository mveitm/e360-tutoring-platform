# MVP-FLOW-3-C1 - Hide /now Terminar for content-backed in-progress loads

## Purpose

Reduce competing completion paths for in-progress StudyLoads that already have registered activity content. For those loads, the activity page should remain the completion path.

## Scope

This was a narrow render-only change in the `/now` in-progress StudyLoad card. It used the existing `hasContent` value already computed by the page.

## Exact code file changed

- `nextjs_space/app/now/page.tsx`

## Behavior changed

- For in-progress StudyLoads with registered content:
  - `/now` still shows `Ver actividad`.
  - `/now` no longer shows the legacy `Terminar` button.
  - The activity page remains the completion path.
- For in-progress StudyLoads without registered content:
  - `/now` still shows `Terminar` as fallback.
  - Existing fallback completion behavior is preserved.

## Validation performed

- `npm run build` passed.
- `/now` visual smoke check passed with the existing completed local fixture.
- The code diff was reviewed and confirmed to be a minimal render condition:
  - `!hasContent && <CompleteLoadButton loadId={load.id} />`

## Validation limitation

No direct visual validation of an in-progress content-backed load was available because the current local Flow2 fixture had already been completed. This is acceptable for C1 because the code change is a minimal render condition using existing `hasContent` and does not touch lifecycle, endpoints, data fetching, or backend behavior.

## Non-goals preserved

- No endpoint changes.
- No schema changes.
- No registry changes.
- No StudyLoad lifecycle logic changes.
- No answer submission logic changes.
- No self-report option changes.
- No data fetching changes.
- No pending-load behavior changes.
- No completed-history behavior changes.
- No `CompleteLoadButton` behavior changes.

## Result

MVP-FLOW-3-C1 passed. `/now` now hides the legacy `Terminar` button for content-backed in-progress loads while preserving the fallback for loads without registered content.

## Next recommended step

MVP-FLOW-3-C2 - Validate in_progress content-backed `/now` behavior with a fresh local StudyLoad fixture.
