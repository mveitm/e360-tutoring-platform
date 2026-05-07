# MVP-LOCAL-2 — Guided MVP Gap Audit

## 1. Phase type

Documentation / direction only.

No app code, no schema, no database mutation, no production operation, no Abacus, no deploy, no endpoint changes, no UI changes, no secrets, no long scripts.

## 2. Starting point

Repository state at phase start:

- HEAD = origin/main = 5aa5bf1
- Commit: MVP-STUDENT-REQ-1: triage student experience requirements
- Working tree clean
- Branch main up to date with origin/main

Recent closed milestones:

- BETA-SECOND-STUDENT-LOCAL-2: validate second local student flow
- BETA-LOCAL-OPS-1: document local student fixture recipe
- MVP-LOCAL-1: define guided MVP operating slice
- MVP-STUDENT-REQ-1: triage student experience requirements

## 3. Product frame

E360 / Bexauri is an intelligent learning-regulation platform.

The core learning chain must remain intact:

diagnostic / initial state
→ learning cycle
→ StudyLoad
→ student execution
→ evidence
→ human/admin review
→ pedagogical decision
→ continuity

## 4. Roadmap vocabulary

- MVP-Beta: first monetizable product, guided/manual where needed, honest in scope.
- MVP-Alfa: mature/final MVP, more complete, more repeatable, less manual.
- Post-MVP: later product stage with AI agents, advanced adaptation, deep automation, dashboards, scale, native mobile app, etc.

## 5. Executive verdict

MVP-Beta is viable as a guided/manual monetizable product, but not yet ready for broader student-facing beta expansion until immediate student-experience gaps are addressed.

The product already has enough structural foundation to continue toward MVP-Beta without redesigning the architecture.

## 6. Gap audit matrix

| Area | Current product status | MVP-Beta classification | Required action |
|---|---|---|---|
| Student login and local flow | Validated locally with student fixture flows | Ready for MVP-Beta foundation | Preserve; do not redesign |
| /now student entry point | Exists and supports current/pending/completed StudyLoad flow | Requires immediate UX/copy hardening | Make /now explain what the student must do now, why, and what happens next |
| StudyLoad start flow | Validated: pending → in_progress | Ready for MVP-Beta foundation | Preserve |
| StudyLoad MC viewer | Validated with registry-matched PAES_M1 activity | Ready for MVP-Beta foundation | Preserve; refine copy only if needed |
| MC answer submission | Validated locally | Ready for MVP-Beta foundation | Preserve |
| Completion / self-report | Validated locally | Ready for MVP-Beta foundation | Preserve; improve student-facing explanation |
| Admin evidence review | Validated locally with item-level evidence and self-report | Ready for MVP-Beta foundation | Preserve as human-guided review mechanism |
| Human pedagogical decision | Exists conceptually/operationally through admin decision flow | Ready for MVP-Beta if kept manual | Preserve manual-first approach |
| Diagnostic as visible first step | Not sufficiently visible as a student-facing starting point | Requires immediate development | Add a minimal diagnostic / initial-state card or state in /now |
| Review pending state | Not sufficiently explicit after a completed load | Requires immediate development | Add student-facing “in review” state after completion |
| Basic post-MC feedback | Not yet sufficient for MVP-Beta student experience | Requires immediate development | Add basic non-adaptive feedback: answered count, correct count, general message |
| Student-facing decision summary | Not yet sufficiently visible to student | Requires immediate development | Add a simple “review / next step” summary |
| PAES_M1 four-week map | Not yet represented as a student-facing map | Requires content + light UX | Define week 1–4 structure and show it simply |
| PAES_M1 content registry | Has enough foundation for initial guided beta | Requires content expansion | Prepare minimum four-week content map |
| L1/M2 active operation | Not required for immediate MVP-Beta | MVP-Alfa | Defer |
| Complete dashboard | Valuable but not required now | MVP-Alfa | Defer |
| Native mobile app | Not required now | Post-MVP | Defer |
| AI tutor | Not required now and risky before governance | Post-MVP | Defer |
| Adaptive theta / algorithmic adaptation | Not required now and risky before evidence depth | Post-MVP | Defer |
| Automated pedagogical decisions | Not recommended yet | Not recommended now | Keep human/admin decision as source of truth |
| PAES score claims from small MC activities | Risky | Not recommended now | Use correct count only, not PAES score |
| Payments automation | Not needed for guided MVP-Beta | Post-MVP or later MVP-Alfa | Handle manually for now |
| Push notifications | Not needed for guided MVP-Beta | Post-MVP | Defer |

## 7. MVP-Beta ready foundation

The following components are already strong enough to preserve:

1. Local development workflow with VS Code, repo local, Neon dev, and local browser.
2. Student login and /now flow.
3. StudyLoad status progression.
4. Registry-matched PAES_M1 MC activity rendering.
5. Student MC answer submission.
6. Student completion and self-report.
7. Admin evidence visibility.
8. Manual human/admin review.
9. Manual pedagogical decision as governance anchor.
10. Documentation and phase custody discipline.

These should not be redesigned in the next phase.

## 8. Immediate development candidates after MVP-LOCAL-2

The next development block should focus only on the minimum student-facing gaps required for MVP-Beta.

Recommended sequence:

### MVP-LOCAL-3 — Student /now clarity pass

Goal:
Make /now understandable as the student’s main operating page.

Must clarify:

- current cycle;
- current task;
- task status;
- what the student should do now;
- what happens after completion;
- whether the tutor/admin is reviewing.

No new adaptive logic.

### MVP-LOCAL-4 — Review pending state

Goal:
After a student completes a StudyLoad, the student should clearly see that the work is waiting for review.

Possible student-facing language:

“Actividad enviada. Tu tutor revisará la evidencia y definirá el siguiente paso.”

No automatic decision.

### MVP-LOCAL-5 — Basic post-MC feedback

Goal:
Show basic, honest feedback after MC submission/completion.

Allowed:

- answered count;
- correct count;
- simple message;
- “this is not a PAES score”.

Not allowed:

- PAES score estimate;
- adaptive placement;
- automatic advance/reinforce decision.

### MVP-LOCAL-6 — Student decision summary

Goal:
When an admin/human decision exists, show a simple student-facing summary.

Examples:

- “Next step: advance”
- “Next step: reinforce”
- “Your tutor has reviewed this cycle”
- “New activity suggested”

No AI explanation yet.

### MVP-LOCAL-7 — PAES_M1 four-week map

Goal:
Define and expose a simple four-week learning map for MVP-Beta.

Minimum:

- Week 1
- Week 2
- Week 3
- Week 4
- topic per week
- expected type of activity
- manual/admin-controlled progression

This may begin as documentation/content before UI.

## 9. Manual/operational items acceptable for MVP-Beta

The following may remain manual in MVP-Beta:

- student onboarding;
- payment handling;
- password reset / account setup;
- choosing the next StudyLoad;
- reviewing evidence;
- writing or selecting a pedagogical decision;
- deciding whether to advance, reinforce, hold, or redirect;
- weekly continuity;
- parent/student communication outside the app if needed.

This is acceptable because MVP-Beta is explicitly guided/manual where necessary.

## 10. MVP-Alfa candidates

Move to MVP-Alfa:

- broader dashboard;
- more complete student progress view;
- L1/M2 activation;
- more complete diagnostic surfaces;
- more repeatable onboarding;
- richer weekly progress summaries;
- reduced manual admin burden;
- stronger content coverage;
- more complete cycle history.

## 11. Post-MVP candidates

Move to Post-MVP:

- AI tutor;
- agentic pedagogy;
- adaptive theta;
- deep automation;
- native mobile app;
- push notifications;
- automatic payment system;
- large-scale dashboards;
- predictive risk models;
- automated recommendations without human review.

## 12. Things not recommended yet

Do not implement yet:

1. Automatic cycle decisions from MC count.
2. PAES score estimates from short StudyLoads.
3. AI-generated tutor feedback inside the main product.
4. Adaptive algorithm claims.
5. Multi-program expansion before PAES_M1 MVP-Beta is stable.
6. Native mobile app.
7. Large dashboard before /now is clear.
8. Full automation before manual workflow is reliable.

## 13. Direction decision

The next product work should not expand breadth.

It should deepen the minimum PAES_M1 student experience required for MVP-Beta:

1. make /now clearer;
2. make diagnostic / starting point visible;
3. make post-completion review state visible;
4. add basic honest MC feedback;
5. show human/admin decision summary;
6. define the PAES_M1 four-week map.

## 14. Phase result

MVP-LOCAL-2 closes as a direction and gap-audit phase.

Recommended next phase:

MVP-LOCAL-3 — Student /now clarity pass.

Scope of MVP-LOCAL-3 should be small and UI/copy-focused, preserving current architecture and avoiding schema changes unless a later audit proves they are necessary.