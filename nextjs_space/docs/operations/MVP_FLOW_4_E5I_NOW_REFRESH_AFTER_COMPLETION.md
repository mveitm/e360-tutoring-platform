# MVP-FLOW-4-E5I - Refresh /now After Activity Completion

## 1. Purpose

Record the UX/runtime issue found during E5H validation and define the minimal fix.

After the student presses `Finalizar actividad`, the backend correctly completes the StudyLoad and creates the next pending StudyLoad. However, the immediate navigation back to `/now` may render stale client/router state. A manual browser refresh then shows the correct state.

## 2. Evidence from E5H validation

Student fixture:

```text
FlowE5F.Cierre@bexauri.dev
```

Validated path:

```text
Entrada balanceada inicial
-> Ecuaciones lineales basicas
-> Problemas con ecuaciones lineales
-> Refuerzo de ecuaciones lineales
-> Funciones lineales basicas
```

Admin verified after completing reinforcement:

- Cycle remains open.
- Total loads: 5.
- Completed loads: 4.
- Pending loads: 1.
- Pending load: `PAES M1 - Funciones lineales basicas`.
- CycleDecision count: 0.
- CycleEvaluation count: 0.
- No new LearningCycle.

Student `/now` immediately after `Finalizar actividad` initially appeared stale; after manual refresh it displayed the correct pending functions load and four completed activities.

## 3. Root cause hypothesis

The issue is likely client-side navigation/router cache staleness after completion. `/now` is already a dynamic server page and backend state is correct.

Current relevant client behavior in:

```text
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

is:

```ts
if (res.ok) {
  setCompleteSuccess(true)
  startTransition(() => router.push('/now'))
}
```

This can navigate to `/now` before the client fetch/render reflects the just-mutated server state.

## 4. Minimal intended fix

Change only the post-completion success branch to force an internal refresh around the `/now` navigation.

Recommended minimal patch:

```ts
if (res.ok) {
  setCompleteSuccess(true)
  startTransition(() => {
    router.push('/now')
    router.refresh()
  })
}
```

Alternative if this is insufficient in local validation:

```ts
if (res.ok) {
  setCompleteSuccess(true)
  startTransition(() => {
    router.replace(`/now?completed=${studyLoadId}`)
    router.refresh()
  })
}
```

The first option is cleaner and should be tried first.

## 5. Scope guardrails

- Client UX/navigation only.
- Do not change backend complete endpoint.
- Do not change continuity map.
- Do not change content registry.
- Do not change schema.
- Do not use SQL.
- Do not use Prisma CLI.
- Do not deploy.
- Do not touch production.
- Do not alter CycleDecision, CycleEvaluation, LearningCycle close, or new-cycle behavior.

## 6. Validation criteria

Using a local/dev fixture only:

1. Complete a StudyLoad that has a next continuity edge.
2. Press `Finalizar actividad`.
3. Confirm the app navigates to `/now`.
4. Confirm `/now` immediately shows the newly created pending next StudyLoad without manual browser refresh.
5. Confirm the completed load appears under `Actividades registradas`.
6. Confirm admin still shows no CycleDecision, no CycleEvaluation, no cycle close, and no new LearningCycle.

## 7. Tooling note

During this phase, the GitHub update tool blocked a full-file rewrite of `study-load-answer-form.tsx`. Because the intended code change is tiny but the file is large, avoid full-file overwrites through constrained tools. Prefer a local patch or narrow editor change.

## 8. Suggested local patch workflow

From repo root, after pulling latest main:

```powershell
git status --short
```

Edit:

```text
nextjs_space/app/now/study-loads/[id]/_components/study-load-answer-form.tsx
```

Replace:

```ts
if (res.ok) {
  setCompleteSuccess(true)
  startTransition(() => router.push('/now'))
}
```

with:

```ts
if (res.ok) {
  setCompleteSuccess(true)
  startTransition(() => {
    router.push('/now')
    router.refresh()
  })
}
```

Then run:

```powershell
cd .\nextjs_space
npm.cmd run build
```

Do not deploy.
