# MVP-SALES-PILOT-SANDBOX-0M-CODE - Login UI clean-server observation and port-confusion closeout

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Status

Documented / login and `/now` visibility observed / pending separate StudyLoad execution authorization

## Type

```text
Level B/C operational closeout: human-observed LOCAL_DEV login UI/runtime state, no code repair applied.
```

## Scope

This phase documents the human observation that `/login` renders correctly when LOCAL_DEV is started from a single clean server process.

It does not authorize:

* DB mutation;
* schema changes;
* credential handling;
* secret inspection or printing;
* StudyLoad execution;
* pressing `Empezar`;
* manually opening or interacting with authenticated `/now`;
* response submission;
* completion flow;
* StudentAccess lifecycle changes;
* staging or production work.

## Human-observed state

Sanitized observation reported by Mauricio:

| Observation | Result |
|---|---|
| Node processes before server | none |
| Dev server URL | `http://localhost:3000` |
| Login UI visual defects | no |
| Login page accessible | yes |
| Main styling/layout appears restored | yes |
| Secret exposure | no |
| Admin login | success |
| Login error visible after admin login | no |
| Admin login unexpected state | none |
| Student login | success |
| Login error visible after student login | no |
| Student login unexpected state | redirected_to_now_without_interaction |
| `/now` page visible | yes |
| Student identity visible or expected | unknown |
| PAES_M1 visible | yes |
| Closed PAES_M1 pilot content visible | yes |
| Initial StudyLoad visible | yes |
| Pending practice StudyLoad count visible | one |
| Pending practice StudyLoad title | `PAES M1 — Entrada balanceada inicial` |
| StudyLoad title status | expected |
| `Ver actividad` visible | yes |
| `Empezar` visible | yes |
| StudyLoad | visible but not touched |
| `Empezar` | not clicked |
| `Ver actividad` | not clicked |
| Responses | none |

## Operational finding

Finding:

```text
old_node_process_or_port_confusion_probable
```

Interpretation:

The earlier login UI defect signal is now downgraded as a likely LOCAL_DEV process/port confusion issue, because a clean single server on `http://localhost:3000` renders login correctly with restored styling/layout.

This closeout does not prove end-to-end auth readiness. It only removes the current login UI rendering defect as the primary blocker under the clean-server condition.

Admin login has now been observed successfully on the same clean-server condition with no visible login error and no secret exposure. This supports the operational finding that the earlier blocker was not a general login UI rendering failure under clean LOCAL_DEV conditions.

Student login has also now been observed successfully on the same clean-server condition with no visible login error and no secret exposure. The browser redirected to `/now` automatically after login. This is recorded as route transition evidence only, not as authorized `/now` inspection, StudyLoad interaction, or execution.

The redirected `/now` page has now been observed in visibility-only mode. Visible content confirms the closed PAES_M1 pilot and one pending practice StudyLoad: `PAES M1 — Entrada balanceada inicial`. The `Ver actividad` and `Empezar` controls are visible, but neither was clicked. The student identity signal remains unknown from the sanitized observation. No `Empezar` click, `Ver actividad` click, StudyLoad viewer interaction, response, self-report, completion, or continuity action occurred.

## Current blocker status

Resolved or downgraded:

* login page accessibility blocker;
* login main styling/layout defect under clean single-server condition;
* probable stale Node process / wrong-port confusion.
* admin login under clean single-server condition.
* student login under clean single-server condition.
* automatic post-login redirect to `/now`.
* visibility-only `/now` page load.
* PAES_M1 visible on `/now`.
* expected initial StudyLoad visible on `/now`.
* closed PAES_M1 pilot content visible on `/now`.
* one pending practice StudyLoad visible.
* `Ver actividad` and `Empezar` visible but not clicked.

Still pending:

* student identity visual confirmation, if needed;
* any StudyLoad execution path.

## Requested next human observation

Admin login observation received:

```text
admin_login: success
login_error_visible: no
secret_exposure: no
unexpected_state: none
```

Student login observation received:

```text
student_login: success
login_error_visible: no
secret_exposure: no
unexpected_state: redirected_to_now_without_interaction
```

`/now` visibility observation received:

```text
now_page_visible: yes
student_identity_visible_or_expected: unknown
paes_m1_visible: yes
closed_paes_m1_pilot_visible: yes
initial_studyload_visible: yes
pending_practice_studyload_count_visible: one
pending_practice_studyload_title: PAES M1 — Entrada balanceada inicial
studyload_title_status: expected
ver_actividad_visible: yes
ver_actividad_clicked: no
empezar_visible: yes
empezar_clicked: no
responses: none
secret_exposure: no
unexpected_state: none
```

Next action requires a separate authorization decision:

```text
StudyLoad execution path: press `Empezar`, click `Ver actividad`, open the StudyLoad viewer, submit responses, self-report, complete a load, or continue toward later loads.
```

Do not paste passwords, cookies, tokens, request bodies, response bodies, env values, DB URLs, hashes, or secrets.

Do not click `Empezar`, click `Ver actividad`, open a StudyLoad viewer, submit responses, self-report, complete a load, or continue to StudyLoad execution unless a later scoped step explicitly authorizes that path.

## Scope safety

This closeout did not:

* touch DB/schema/credentials;
* inspect or print secrets;
* manually open `/now`;
* start or complete a StudyLoad;
* press `Empezar`;
* click `Ver actividad`;
* submit responses;
* alter app code;
* alter auth code;
* run migrations;
* deploy.

## Result marker

```text
MVP_SALES_PILOT_SANDBOX_0M_CODE_LOGIN_UI_CLEAN_SERVER_PORT_CONFUSION_CLOSEOUT_DOCUMENTED
```
