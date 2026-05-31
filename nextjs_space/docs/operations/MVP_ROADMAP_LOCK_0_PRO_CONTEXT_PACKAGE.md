# MVP-ROADMAP-LOCK-0 - Paquete de contexto vivo para auditoria Pro

Estado: CONTEXT_PACKAGE_FOR_PRO_AUDIT

Este documento es seguro para pegar en un chat Pro. Resume evidencia documental versionada del repo para auditar y blindar la semantica del roadmap MVP-Beta cerrado / Sales-Ready cerrado. No decide el roadmap y no reemplaza Git preflight.

## 1. Baseline Git

Preflight de esta fase:

```text
git status --short: clean
HEAD = origin/main = origin/HEAD = c5ee32e
```

Ultimo commit aceptado:

```text
c5ee32e - MVP-SALES-PILOT-UI-AUTOMATION-18: diagnose auth request sequence
```

Ultimos commits relevantes observados:

```text
c5ee32e MVP-SALES-PILOT-UI-AUTOMATION-18: diagnose auth request sequence
32ede12 MVP-SALES-PILOT-UI-AUTOMATION-17: run login testability selector check
3815001 MVP-SALES-PILOT-UI-AUTOMATION-16: add login testability selectors
d137a27 MVP-SALES-PILOT-UI-AUTOMATION-15: decide login testability path
755b50d MVP-SALES-PILOT-UI-AUTOMATION-14: run form submit button click check
3bb1739 MVP-SALES-PILOT-UI-AUTOMATION-13: fix form submit trigger
f6ca38c MVP-SALES-PILOT-UI-AUTOMATION-12: run submit reachability diagnostic
e392596 MVP-SALES-PILOT-UI-AUTOMATION-11: diagnose login submit reachability
bd88b39 MVP-SALES-PILOT-UI-AUTOMATION-10: run password enter submit check
45617de MVP-SALES-PILOT-UI-AUTOMATION-9: fix E2E login submit trigger
```

Nota de custodia: varios documentos contienen baselines historicos obsoletos. La regla viva es que Git preflight gana sobre memoria, handoffs, `PHASE_LOG.md` o documentos versionados cuando haya contradiccion.

## 2. Documentos leidos

| Archivo | Rol | Relevancia roadmap | Evidencia principal |
|---|---|---|---|
| `PHASE_LOG.md` tail | Ledger de fases recientes | Alta | Secuencia dry-run, auth local, UI automation, proximo admin evidence |
| `MVP_SALES_READY_ACTIVE_CONTEXT.md` | Brujula viva | Alta | Sales-Ready `NOT_READY`, target autonomo-basico, gate de roadmap |
| `MVP_SALES_READY_ROADMAP.md` | Mapa ejecutivo | Alta | Bloques 0-10, fase gate, piloto cerrado como bloque 10 |
| `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md` | Firewall de autorizacion | Alta | Toda fase debe mapear a bloque de roadmap |
| `MVP_SALES_READY_ROADMAP_1_FULL_ROADMAP_DEVIATION_AUDIT_AND_HANDOFF_ALIGNMENT.md` | Fuente detallada Sales-Ready | Alta | Roadmap completo y correccion anti-deriva |
| `MVP_BETA_SCOPE_1_IMPLEMENTATION_BETA_SCOPE_REVIEW_L1_M1_M2.md` | Revision de alcance L1/M1/M2 | Alta | MVP-Beta sostenido, L1/M2 no listos, M1 parcial |
| `MVP_BETA_SCOPE_2_SALES_READY_ACCEPTANCE_CRITERIA_AND_MACRO_ROADMAP.md` | Criterios Sales-Ready | Alta | Must-haves comerciales, pedagogicos, legales y operativos |
| `MVP_BETA_TARGET_1_AUTONOMOUS_SALES_READY_TARGET_AND_HANDOFF_PROPAGATION.md` | Lock de objetivo MVP-Beta v1 | Alta | MVP-Beta no es demo ni beta manual por estudiante |
| `MVP_SALES_PILOT_EXTERNAL_AUDIT_1_INTEGRATE_3_STUDENT_AUDIT_AND_ROADMAP_REDIRECT.md` | Integracion auditoria externa | Alta | Veredicto `NO_LISTO`, primer hito vertical |
| `MVP_SALES_PILOT_SCOPE_1_LOCK_CLOSED_3_STUDENT_PILOT_SCOPE.md` | Scope de piloto cerrado | Alta | Decision `NARROWED_FIRST_VERTICAL_PILOT`, M1-first |
| `MVP_SALES_PILOT_ACCESS_1_CLOSED_PILOT_ACCESS_PAYMENT_TRIAL_BOUNDARY.md` | Boundary acceso/pago/trial | Alta | `STAGED_NO_PAYMENT_THEN_PAYMENT_SANDBOX` |
| `MVP_SALES_PILOT_ACCESS_3_CLOSED_PILOT_ACCESS_REGISTER_TEMPLATE_AND_ADMIN_SURFACE_READINESS.md` | Registro piloto y admin readiness | Alta | Template versionado, registro real privado/no commit |
| `MVP_SALES_NOW_PILOT_1A_AUDIT_NOW_FOR_NARROWED_M1_FIRST_PILOT.md` | Auditoria `/now` M1-first | Alta | `/now` single-program usable solo con scope honesto |
| `MVP_SALES_NOW_PILOT_1B_DESIGN_M1_FIRST_NOW_COPY_AND_STRUCTURE.md` | Diseno copy `/now` | Alta | Frases permitidas/prohibidas para piloto M1 cerrado |
| `MVP_SALES_PILOT_DRY_RUN_0_PREPARE_CLOSED_M1_FIRST_DRY_RUN_PLAN.md` | Plan dry-run | Alta | Circuito vertical esperado y stop rules |
| `MVP_SALES_PILOT_DRY_RUN_1I_RETRY_LOCAL_DEV_RUNTIME_AFTER_AUTH.md` | Evidencia runtime local | Alta | Un participante paso login/manual, `/now`, StudyLoad, completion |
| `MVP_SALES_PILOT_AUTH_LOCAL_1_SYNTHETIC_STUDENT_AUTH_PATH.md` | Decision auth local | Media/alta | Dos tracks: signup futuro y credencial sintetica guardada |
| `MVP_SALES_PILOT_AUTH_LOCAL_3_EXECUTE_GUARDED_SYNTHETIC_CREDENTIAL_SETUP.md` | Closeout credencial sintetica | Media/alta | Credencial local lista sin imprimir secretos |
| `MVP_SALES_PILOT_UI_AUTOMATION_1_LOCAL_DEV_PLAYWRIGHT_HARNESS.md` | Harness Playwright | Media | Guardrails locales, spec readonly, no browser humano |
| `MVP_SALES_PILOT_UI_AUTOMATION_18_DIAGNOSE_AUTH_REQUEST_SEQUENCE.md` | Diagnostico E2E auth | Media/alta | Login E2E pausado; volver a admin evidence |
| `MVP_SALES_TRIAL_2A_TRIAL_AND_ACCESS_CONTROL_BOUNDARY.md` | Boundary trial/acceso | Alta | Trial 7 dias como objetivo futuro, no automatico |
| `MVP_SALES_TRIAL_2G_IMPLEMENT_MINIMAL_STUDENT_ACCESS_SCHEMA.md` | StudentAccess schema | Media/alta | Scaffold de acceso/trial/subscription sin runtime |
| `MVP_SALES_TRIAL_3B_STUDENT_ACCESS_BACKFILL_CLOSEOUT_AND_SIGNUP_DEFAULT_ROW_READINESS.md` | StudentAccess lifecycle | Media/alta | Default `no_access / none / none`, no enrollment ni trabajo |
| `MVP_SALES_TRIAL_3G_IMPLEMENT_ADMIN_STUDENT_DETAIL_READ_ONLY_STUDENT_ACCESS_VISIBILITY.md` | Admin read-only access | Media | Visibilidad admin sin mutacion ni enforcement |
| `MVP_SALES_READY_BLOCK_7_PEDAGOGICAL_LAYER_ANCHOR.md` | Anchor pedagogico L1/M1/M2 | Alta | Cadena fuente oficial -> taxonomia -> evidencia -> revision |
| `CURRENT_AGENT_HANDOFF_MVP_M1.md` | Handoff historico-operativo | Media | M1 no es Sales-Ready publico; handoff subordinado a Sales-Ready docs |
| `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md` | Protocolo continuidad | Alta | Git preflight, no drift, handoff robusto |
| `DOCUMENTATION_INDEX_MVP_M1.md` | Indice documental | Media/alta | Jerarquia docs, M1 parcial, guardrails |
| `CODEX_COMPACT_REPORTING_RULE.md` | Gobernanza reportes | Alta | Reportes compactos, no transcripts completos |
| `MVP_COMMERCIAL_L1_CODEX_PROMPTING_STANDARD_1_PRESERVE_PROMPT_DEPTH_IN_HANDOFF.md` | Standard prompts Codex | Alta | Prompts completos, safety, commit/push explicito |

## 3. Estado estrategico actual

Se esta construyendo la primera version comercial autonomo-basica de Bexauri, no solo una beta operacional. El objetivo amplio sigue siendo MVP-Beta v1 publicado, multi-estudiante, capaz de operar L1/M1/M2, con acceso/pago/suscripcion, evidencia, tutor/admin y supervision humana sin intervencion tecnica normal por estudiante.

Estado actual:

* Sales-Ready: `NOT_READY`.
* Roadmap: `READY_FOR_PHASED_EXECUTION`, pero con piloto cerrado como hito vertical previo.
* MVP-SALES-PILOT: redirigido por auditoria externa a un primer hito vertical cerrado.
* M1-first: seleccionado para el primer piloto por ser `PARTIAL_BUT_REAL` y `PILOT_USABLE_WITH_LIMITS`.
* L1: `INTERNAL_ONLY_NOT_READY`; no usar como producto/estudiante en el primer piloto.
* M2: `NOT_EVIDENCED_NOT_READY`; excluido o waitlist para primer piloto.
* Piloto cerrado: M1-only, 3 participantes controlados, no publico, no pago inicial, no trial publico, no full triad.
* Sales-Ready publico: explicitamente no declarado.

No esta explicitamente declarado:

* Que MVP-Beta cerrado equivalga a Sales-Ready publico.
* Que M1-first reduzca el objetivo final L1/M1/M2.
* Que L1 o M2 esten listos para venta.
* Que exista trial publico operativo.
* Que exista suscripcion/pago publico operativo.
* Que Playwright login E2E este resuelto.
* Que admin evidence haya sido verificado despues del dry-run manual de un participante.

## 4. Definiciones encontradas

MVP-Beta: version comercial inicial, guiada y supervisada, con acceso, evidencia, operacion admin/tutor y limites honestos. En su lock mas reciente debe ser autonomo-basica: multi-estudiante, L1/M1/M2-capable, payment/subscription-capable y sin ensamblaje tecnico normal por estudiante.

MVP-Alfa: etapa posterior mas productizada, con menor friccion manual, mejor onboarding, mas contenido, feedback mas fuerte y mayor repetibilidad.

Sales-Ready: estado en que Bexauri puede recibir estudiantes serios o pagados con login estable, acceso correcto, contenido minimo por programa vendido, evidencia, admin/tutor, soporte, pago/acceso, privacidad/legal y claims honestos. Hoy esta `NOT_READY`.

Piloto cerrado: experimento controlado, no publico, con participantes conocidos/consentidos, scope honesto, fuente de verdad de acceso, circuito estudiante-producto-admin, soporte/falla y go/no-go.

Sandbox: en la documentacion del piloto significa un espacio posterior y separado para probar pago manual/controlado o flujo de pago, no activado en el primer dry-run ni en el primer piloto M1.

Trial: objetivo futuro de 7 dias, una experiencia de tutoria, bloqueable al expirar y desbloqueable por suscripcion. Actualmente no debe confundirse con el piloto cerrado; trial publico no esta implementado ni activado.

StudentAccess: scaffold de estado de acceso/trial/subscription. Existe como modelo y visibilidad admin read-only; signup/backfill historico establecen default seguro `no_access / none / none`. No es enforcement runtime completo ni activacion de trial/pago.

M1/M2/L1: M1 es parcial pero real; L1 es estrategicamente necesario pero interno/no listo; M2 no esta evidenciado como ruta real. El objetivo final Sales-Ready exige no vender programas sin ruta minima honesta.

Continuidad: en M1 existe continuidad rule-based para ciertos StudyLoads y evidencia de secuencia operativa. No equivale a selector inteligente, adaptive AI ni roadmap completo.

Evidencia: respuestas MC, correctness/resumen, self-report, estado StudyLoad/sesion y visibilidad admin/tutor. La evidencia debe ser capturada en app y revisable.

Intervencion humana: la revision humana puede ser manual y central, pero no debe convertirse en bottleneck tecnico o gate normal de continuidad.

Autonomia estudiante: el estudiante debe poder avanzar en acciones basicas sin que un operador tenga que ensamblar tecnicamente cada paso; la supervision humana mejora y corrige en paralelo.

## 5. Tensiones o ambiguedades detectadas

Estas tensiones se identifican para que Pro las resuelva despues; este paquete no las cierra:

* M1-first vs alcance M1/M2/L1: el primer hito usa M1 por evidencia disponible, pero el target final sigue siendo L1/M1/M2.
* Piloto cerrado vs Sales-Ready publico: el piloto puede producir evidencia vertical sin habilitar oferta publica.
* Beta cerrada vs venta publica: MVP-Beta cerrado necesita lenguaje distinto a suscripcion/trial/comercial abierto.
* Flujo manual vs automatizacion: supervision humana es aceptable; setup tecnico manual por estudiante no debe quedar como normalidad Sales-Ready.
* Deuda Playwright login E2E: el camino manual paso, pero automatizacion de login sigue pausada.
* Alcance pedagogico minimo vs sofisticacion futura: M1 parcial valida un circuito, no PAES completo, selector inteligente ni adaptividad.
* Payment/sandbox vs suscripcion publica: no pago inicial y sandbox futuro no deben implicar pago/suscripcion publicos listos.

## 6. Estado tecnico-operativo reciente

Auth local:

* Se decidio politica de dos tracks: signup local/dev para futuros participantes cuando corresponda, y helper guardado solo para completar credencial sintetica de fixture existente.
* La credencial sintetica de `PILOT_M1_001` quedo lista por ejecucion humana local/dev, sin registrar password/hash/token/header/cookie/DB/env.

PILOT_M1_001 y dry-run:

* Fixture local/dev para `PILOT_M1_001` fue documentado por ejecucion humana.
* El primer intento runtime quedo bloqueado por auth.
* Tras auth local, un dry-run manual local/dev de un participante paso desde login hasta `/now`, StudyLoad, respuestas, completion/self-report y siguiente StudyLoad M1 pendiente.
* Admin evidence quedo diferido.

Completion/self-report y continuidad:

* El StudyLoad inicial quedo completado.
* El self-report registrado fue seguro y sintetico.
* La continuidad M1 genero/verifico el siguiente StudyLoad M1 esperado como pendiente.

UI automation:

* Se creo harness Playwright local/dev readonly con guardrails.
* Se agregaron selectores y diagnosticos seguros.
* Login E2E no alcanzo submit/auth request; clasificacion final: no hay fix claro de harness.
* Decision reciente: pausar login E2E y volver a admin evidence.

Proximo recomendado por evidencia viva:

```text
MVP-SALES-PILOT-ADMIN-EVIDENCE-1 - Verify local admin/tutor evidence for PILOT_M1_001 dry-run
```

## 7. Evidencia validada

Evidencias confirmadas en docs recientes:

* Preflight vivo de esta fase: limpio en `c5ee32e`.
* Piloto cerrado M1-first scope locked.
* Access/payment/trial boundary: no pago inicial, no trial publico, payment sandbox diferido.
* Template de registro de acceso cerrado existe; registro real debe ser privado/no commit.
* `/now` fue auditado como single-program y luego ajustado para copy M1 cerrado.
* Login manual estudiante sintetico para `PILOT_M1_001` paso.
* `/now` cargo para el participante sintetico.
* Copy de piloto cerrado PAES M1 visible.
* Sin implicacion activa L1/M2 observada.
* Sin implicacion pago/subscripcion/trial publico observada.
* StudyLoad inicial M1 visible como pendiente.
* Start/open de actividad funciono.
* Actividad renderizo.
* Respuestas sinteticas se enviaron.
* Completion/self-report funciono.
* Trabajo completado visible en `/now`.
* Siguiente StudyLoad M1 pendiente observado.
* Harness Playwright local/dev creado.
* Diagnosticos Playwright seguros agregados.
* Login E2E pausado como deuda acotada.

## 8. Pendientes principales

Bloqueante para piloto cerrado:

* Verificar admin/tutor evidence para `PILOT_M1_001`.
* Definir si se repite dry-run para `PILOT_M1_002` y `PILOT_M1_003` o si primero se corrigen gaps admin.
* Mantener registro privado real de piloto fuera del repo antes de estudiantes reales.
* Confirmar soporte/failure path y go/no-go operativo.

Bloqueante para MVP-Beta cerrado:

* Resolver semantica formal de "M1-first" sin reducir target L1/M1/M2.
* Definir gates minimos por tutoria y evidencia minima.
* Definir continuidad entre piloto cerrado, beta cerrada y Sales-Ready.
* Evitar que acceso/trial/pago sean solo memoria o notas informales.

Bloqueante para Sales-Ready publico:

* Signup/account bootstrap sin intervencion tecnica normal.
* Trial 7 dias real con expiracion/bloqueo.
* Pago/suscripcion/acceso funcional.
* Enrollment self-serve o controlado sin DB manual normal.
* Dashboard multi-programa L1/M1/M2.
* L1 ruta minima y politica legal de textos.
* M2 ruta minima o exclusion explicita del plan.
* Legal/privacidad/soporte/refund/cancelacion.
* Go/no-go final.

Deuda no bloqueante inmediata:

* Login E2E Playwright.
* Automatizacion admin evidence futura.
* Selector inteligente/adaptativo.
* Expert review y cobertura M1 amplia.
* Dashboard rico/analytics.

## 9. Reglas de gobernanza y continuidad

Reglas vigentes:

* Siempre ejecutar Git preflight antes de confiar en documentos.
* `PHASE_LOG.md` es ledger, no brujula unica.
* La brujula Sales-Ready es `MVP_SALES_READY_ACTIVE_CONTEXT.md`.
* El mapa es `MVP_SALES_READY_ROADMAP.md`.
* El firewall es `MVP_SALES_READY_PHASE_GATE_PROTOCOL.md`.
* Toda fase debe identificar bloque de roadmap, relevancia, dependencia, avance, no-avance, verdict y autorizacion.
* Trabajo off-roadmap requiere `ROADMAP_CHANGE_REQUEST`.
* Reportes Codex deben ser compactos y no pegar transcripts completos salvo bug/conflicto/error.
* Prompts Codex deben conservar profundidad: baseline, scope, prohibiciones, docs, validacion, commit/push, reporting.
* No secretos, no `.env`, no valores raw, no credenciales, no cookies/tokens/headers, no datos reales.
* No mutacion DB sin autorizacion explicita y target confirmado.
* No staging/produccion/deploy salvo fase explicita.
* Cambio de chat debe preservar handoff con Git live truth, docs canonicos, guardrails y proxima fase.
* Jerarquia: Git preflight > active context/roadmap/gate > phase docs > handoff historico > memoria de chat.
* Anti-desviacion: no inferir proxima fase solo por `PHASE_LOG.md`; no convertir M1-only en Sales-Ready publico.

## 10. Preguntas que Pro debe resolver

1. Como definir formalmente M1-first sin reducir MVP-Beta cerrado?
2. Que significa MVP-Beta cerrado con M1/M2/L1?
3. Que gates deben existir entre dry-run local, piloto cerrado, beta cerrada y Sales-Ready publico?
4. Que evidencia minima debe existir por tutoria antes de declararla usable?
5. Que frases deben prohibirse en docs, UI, handoffs y reportes?
6. Que frases deben usarse para describir piloto cerrado, beta cerrada y Sales-Ready sin sobreprometer?
7. Que documentos deben ser fuente de verdad y en que jerarquia?
8. Como evitar perdida de roadmap entre chats y evitar que el ultimo PHASE_LOG arrastre la direccion?
9. Que proxima fase debe ejecutar Codex despues de este paquete?
10. Como clasificar `MVP-SALES-PILOT-ADMIN-EVIDENCE-1`: bloqueante para piloto cerrado, deuda o gate?
11. Cuando debe reabrirse Playwright login E2E y bajo que criterio de prioridad?
12. Como separar pago sandbox, trial publico y suscripcion Sales-Ready en lenguaje y gates?

## 11. INSTRUCCIONES PARA PEGAR EN PRO

Usa este paquete como evidencia versionada viva, no como decision final. La tarea de Pro es ejecutar `MVP-ROADMAP-LOCK-1 - Lock MVP-Beta closed roadmap semantics and continuity protocol`.

Pide a Pro:

* Auditar la semantica de MVP-Beta cerrado, piloto cerrado M1-first y Sales-Ready publico.
* Resolver tensiones sin inventar evidencia fuera de los docs.
* Definir jerarquia documental, gates, frases permitidas/prohibidas y continuidad entre chats.
* Proponer la siguiente fase Codex con bloque de roadmap, alcance, prohibiciones, docs a leer, validacion y reporte compacto.
* Mantener como no-declarado todo lo que la evidencia no cierre: Sales-Ready publico, L1 ready, M2 ready, trial publico, pago/suscripcion publica, login E2E resuelto.

No uses este paquete para autorizar DB, runtime, staging, produccion, browser, tests o cambios de codigo. Es solo insumo estrategico-documental para Lock-1.

## 12. Non-actions de esta fase

Esta fase no leyo `.env`, no imprimio secretos, no toco DB, no ejecuto tests, no abrio browser, no cambio codigo de app, no cambio schema, no ejecuto runtime, no uso staging/produccion, no decidio roadmap y no declaro Sales-Ready.

Result marker:

```text
MVP_ROADMAP_LOCK_0_PRO_CONTEXT_PACKAGE_CREATED
```
