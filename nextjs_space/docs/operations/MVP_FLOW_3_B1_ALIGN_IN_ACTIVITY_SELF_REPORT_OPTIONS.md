# MVP-FLOW-3-B1 - Align in-activity self-report options

## Purpose

Align the self-report options shown inside the activity page with the options already accepted by the StudyLoad complete endpoint.

## Scope

This was a narrow client copy alignment for the in-activity completion flow. It did not change server behavior or StudyLoad lifecycle logic.

## Exact code file changed

- `nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx`

## Behavior changed

- The in-activity self-report option `No estoy seguro` was replaced with the endpoint-compatible option `No la termine`.
- The visible option now matches the allowed completion self-report set used by `nextjs_space/app/api/study-loads/[id]/complete/route.ts`.
- The activity page still submits answers first, then lets the student select a self-report, then completes the StudyLoad from inside the activity page.

## Validation performed

- `npm run build` passed.
- Local student flow was tested end-to-end.
- Student opened `/now`.
- Student started `PAES M1 - Entrada balanceada inicial`.
- Student opened `Ver actividad`.
- Student submitted answers.
- Student selected `No la termine`.
- Student clicked `Finalizar actividad`.
- `/complete` accepted the self-report.
- No `Autorreporte invalido` error appeared.
- `/now` showed `Actividad registrada`.
- Completed history showed `Tu reporte: No la termine`.

## Non-goals preserved

- No endpoint changes.
- No `/complete` behavior changes.
- No response submission behavior changes.
- No StudyLoad lifecycle logic changes.
- No new self-report options.
- No data fetching changes.
- No routing changes.
- No status logic changes.
- No schema changes.
- No registry changes.
- No `/now` page changes.

## Observed UX debt

- The activity instructions still tell the student to return to `/now` and press `Terminar`.
- The `/now` completed-history copy still says `Lo que hiciste en este ciclo`.
- These are intentionally outside B1 and should be handled in MVP-FLOW-3-B2.

## Result

MVP-FLOW-3-B1 passed. The in-activity self-report option set now aligns with the complete endpoint, so students can finish the activity without hitting the invalid self-report path.

## Next recommended step

MVP-FLOW-3-B2 - Refresh activity instructions and completed-history copy.
