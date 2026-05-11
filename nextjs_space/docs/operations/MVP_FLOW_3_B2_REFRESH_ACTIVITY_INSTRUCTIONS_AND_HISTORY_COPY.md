# MVP-FLOW-3-B2 - Refresh activity instructions and history copy

## Purpose

Update student-facing copy so the visible flow matches in-activity completion. Students can now send answers, leave an autorreporte, and finish the StudyLoad from the activity page.

## Scope

This was a copy-only phase for the student activity and `/now` history surfaces.

## Exact code files changed

- `nextjs_space/app/now/page.tsx`
- `nextjs_space/lib/study-load-content.ts`

## Student-facing behavior changed

- Replaced completed-history copy from `Lo que hiciste en este ciclo` to `Actividades registradas`.
- Replaced nearby copy that referenced what the student did in the cycle with activity-centered language.
- Updated activity instructions that previously told students to return to `/now`.
- Removed instructions to press `Terminar` from `/now`.
- Removed separate `Completa tu autorreporte` instructions.
- Added in-activity flow copy telling students to send answers, leave an autorreporte, and finish the activity on the same page.
- Added clarification that students do not need to return to `/now` to close the activity.

## Validation performed

- Visual verification passed in `/now`.
- `/now` showed `Actividades registradas`.
- `/now` no longer showed `Lo que hiciste en este ciclo`.
- Visual verification passed in `Ver actividad`.
- Activity instructions now tell the student to send answers, leave autorreporte, and finish inside the same page.
- Activity instructions no longer tell the student to return to `/now`, press `Terminar`, or complete autorreporte separately.
- `npm run build` passed.

## Non-goals preserved

- No endpoint changes.
- No schema changes.
- No StudyLoad lifecycle logic changes.
- No answer submission logic changes.
- No self-report option changes.
- No scoring or evidence logic changes.
- No registry structure changes.
- No content keys, versions, item keys, answer keys, titles, options, or `correctOptionKey` changes.

## Result

MVP-FLOW-3-B2 passed. Student-facing copy now matches the in-activity completion flow and avoids exposing LearningCycle language in the completed-history section.

## Next recommended step

MVP-FLOW-3-C - Decide whether to remove or de-emphasize the legacy `/now` Terminar button for in-progress loads.
