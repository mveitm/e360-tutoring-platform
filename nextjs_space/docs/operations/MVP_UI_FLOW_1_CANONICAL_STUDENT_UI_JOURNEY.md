Bexauri / E360 — Secuencia canónica integrada de la experiencia estudiante MVP
Propósito del documento
Este documento consolida la secuencia canónica de la experiencia estudiante para Bexauri / E360 en su etapa MVP. Su objetivo es alinear la lógica pedagógica, la experiencia de usuario y la operación interna del Sistema Regulador del Aprendizaje antes de continuar con nuevas fases de desarrollo.
La intención no es describir una pantalla aislada ni una lista de funcionalidades sueltas. La intención es establecer cómo debe sentirse y funcionar una tutoría completa desde el punto de vista del estudiante, qué debe ocurrir internamente en Bexauri y dónde entra la supervisión humana sin transformarse en cuello de botella.
Esta secuencia se construye sobre una decisión central: Bexauri no debe comportarse como un sistema administrativo de tareas, sino como una app de tutorías inteligentes cuyo núcleo es un Sistema Regulador del Aprendizaje. El estudiante no debe administrar ciclos, estados ni tareas internas. El estudiante debe estudiar, responder, reflexionar, recibir feedback y avanzar. Bexauri debe regular por dentro.
________________________________________
Principio rector
La experiencia del estudiante en Bexauri debe estar diseñada para que el aprendizaje fluya sin fricción administrativa. El estudiante no debe preguntarse qué estado interno debe cambiar, qué ciclo debe cerrar, qué carga debe terminar desde otra pantalla o qué acción burocrática falta para poder seguir. Toda esa operación pertenece al sistema.
La regla fundamental es:
El estudiante aprende; Bexauri regula internamente; el supervisor humano cuida la calidad cuando corresponde.
Esto significa que los LearningCycles, los estados de StudyLoad, la continuidad, los registros de evidencia, las decisiones internas y los ajustes de ruta son responsabilidades de Bexauri. Pueden existir y deben existir como estructuras internas sólidas, pero no deben aparecer como carga cognitiva para el estudiante.
________________________________________
Secuencia canónica general
La experiencia comienza cuando el estudiante abre Bexauri desde su móvil. En ese primer contacto, la app debe recibirlo con un onboarding claro y liviano. El estudiante crea su cuenta, entiende qué es Bexauri y recibe una propuesta comercial simple: una prueba inicial de siete días y una suscripción mensual que le da acceso a las tutorías disponibles en el MVP.
Luego de crear su cuenta, el estudiante llega al dashboard principal de Bexauri. Este dashboard no debe parecer un panel administrativo. Debe sentirse como una puerta de entrada a sus tutorías. Allí aparecen las tutorías disponibles mediante tarjetas o etiquetas claras. Cada tarjeta representa una tutoría concreta, por ejemplo PAES Matemática M1. En etapas posteriores, estas tarjetas también mostrarán progreso simple, última carga trabajada, siguiente paso disponible y alguna señal de avance o desempeño. Ese progreso no debe buscar gamificación, ranking ni presión, sino orientación, confianza y sensación de continuidad.
Cuando el estudiante selecciona una tutoría por primera vez, entra a una pantalla de bienvenida de esa tutoría. Esta pantalla cumple una función pedagógica y emocional importante. Debe explicar brevemente qué estudiará, cómo funciona la metodología, qué hará Bexauri por dentro y qué se espera del estudiante. El mensaje debe transmitir calma y claridad. El estudiante debe entender que no está entrando a una prueba única ni a una experiencia de castigo, sino a una ruta de aprendizaje acompañada. Desde esa pantalla puede enrolarse o comenzar la tutoría.
Cuando el estudiante se enrola por primera vez en una tutoría, Bexauri debe ejecutar internamente las acciones necesarias para que el estudiante pueda empezar de inmediato. En ese momento, Bexauri crea el enrollment, crea el primer LearningCycle interno y asigna la primera StudyLoad visible. Estas acciones no deben depender de que el estudiante presione botones administrativos ni de que un tutor cree manualmente estructuras internas. El estudiante no debe ver el ciclo como entidad técnica. Puede ver una etapa pedagógica si ayuda a orientarlo, pero no debe cargar con la mecánica interna de LearningCycles.
Después del enrolamiento, el estudiante llega a la pantalla de orientación de la tutoría. En la implementación actual esta pantalla se aproxima a /now, pero conceptualmente debe entenderse como una superficie de orientación temporal dentro de una tutoría. Más adelante puede evolucionar hacia un Home de tutoría o hacia una sección del dashboard. Su función es mostrar qué toca estudiar ahora, no obligar al estudiante a completar tareas administrativas.
En esa pantalla, el estudiante ve un resumen breve de la tutoría y la primera carga disponible. Para un estudiante nuevo o early-stage de PAES_M1, la primera carga canónica es PAES M1 — Entrada balanceada inicial. Esta carga funciona como una primera señal de diagnóstico dinámico. No es un diagnóstico estático bloqueante ni una prueba final. Su propósito es observar cómo parte el estudiante y generar evidencia temprana para orientar las siguientes cargas.
La pantalla debe ofrecer un botón claro: Comenzar estudio. Ese botón lleva al estudiante a una interfaz de actividad interactiva.
________________________________________
La actividad como centro de la experiencia
La interfaz de actividad es el corazón operativo de la experiencia estudiante. Aquí el estudiante realmente estudia. Por eso debe ser tranquila, clara y pedagógicamente cuidada.
La actividad debe mostrar instrucciones breves, ejercicios sin presión de tiempo y alternativas de respuesta cuando corresponda. El tono debe invitar a resolver con calma, usar papel si es necesario y responder sin ansiedad. En el caso de la entrada balanceada inicial de PAES M1, la actividad contiene cuatro preguntas breves, cada una asociada a un eje distinto de Matemática M1: Números, Álgebra y funciones, Geometría, y Probabilidad y estadística.
El estudiante responde dentro de la misma actividad. No debe cambiar de pantalla para registrar que terminó. No debe volver a /now para completar un estado pendiente. No debe presionar un botón externo de “Terminar” después de haber enviado respuestas. Esa separación entre responder y terminar es una herencia administrativa que Bexauri debe superar.
La experiencia correcta es una sola secuencia integrada dentro de la actividad: el estudiante responde, luego presiona un botón de cierre pedagógico, completa un autorreporte breve y revisa sus respuestas con feedback. La carga queda cerrada desde esa misma experiencia.
El botón final de la actividad no debe sentirse como un examen frío. Puede llamarse Finalizar carga de estudio, Revisar mis respuestas o una variante equivalente, pero debe dejar claro que el estudiante está cerrando una experiencia de aprendizaje, no entregando una tarea administrativa.
Al finalizar la resolución, Bexauri solicita un autorreporte breve. Este autorreporte debe capturar la percepción inmediata del estudiante: cómo le fue, cuánto le costó, si se sintió seguro o inseguro. Esta información es importante porque permite cruzar desempeño objetivo con percepción subjetiva. Un estudiante que responde todo bien pero declara mucha inseguridad requiere una lectura distinta a uno que responde bien y se siente seguro. Del mismo modo, un estudiante que responde mal pero declara que le fue fácil puede mostrar una brecha de autopercepción.
El autorreporte no debe ocurrir en otra pantalla ni después de volver al dashboard. Debe estar integrado en el cierre de la actividad, cuando la experiencia todavía está fresca.
________________________________________
Feedback inline como corazón pedagógico
Después de responder y entregar el autorreporte, Bexauri registra la evidencia pertinente y muestra feedback inline por pregunta. Este feedback es el corazón pedagógico de Bexauri.
El valor de Bexauri no está solamente en decir si una respuesta fue correcta o incorrecta. Su valor aparece cuando el estudiante puede entender dónde se equivocó, por qué se equivocó y cómo debió resolver el ejercicio. El feedback debe estar pegado a cada pregunta o ejercicio. No debe enviar al estudiante a un PDF externo ni a una explicación genérica desconectada del error.
Para cada pregunta, el estudiante debe poder ver el resultado de su respuesta y, si lo desea, desplegar una explicación. Esa explicación expandible debe mostrar la resolución paso a paso o la estructura correcta del razonamiento. En Matemática, debe explicar el camino de resolución. En Lenguaje, deberá explicar cómo se identifica la evidencia textual, la inferencia o la estructura de la respuesta. En ambos casos, el objetivo es que el estudiante construya comprensión, no solo que reciba un marcador de acierto.
Este feedback debe mantener el tono de calma. Debe evitar humillar, saturar o convertir el error en castigo. El error debe presentarse como una señal útil para aprender.
Cuando el feedback queda disponible, Bexauri marca internamente la carga como completada, registra respuestas, autorreporte, resultados por ítem y estado de la StudyLoad. También actualiza la evidencia interna asociada al estudiante, la tutoría y el LearningCycle correspondiente.
________________________________________
Continuidad después de una carga
Al terminar una carga, el estudiante no debe quedar esperando una tarea administrativa interna. Bexauri debe preparar automáticamente la siguiente StudyLoad visible, salvo que exista una razón pedagógica, operativa o de seguridad para detener la continuidad.
La revisión humana puede ocurrir, pero no debe ser el cuello de botella normal para liberar la siguiente carga. El supervisor humano revisa cuando corresponde, observa señales, valida calidad, detecta riesgos y ajusta si es necesario. Pero la continuidad visible del estudiante debe ser fluida.
La pantalla final de la actividad debe ofrecer dos caminos naturales:
Continuar con la siguiente carga, si el estudiante quiere seguir estudiando.
Volver al dashboard, si el estudiante quiere cerrar la sesión o revisar su ruta general.
Esto es distinto a obligar al estudiante a volver a /now. El retorno a /now o al dashboard debe ser una opción, no un requisito administrativo. Más adelante, /now puede evolucionar hacia un Home de tutoría o integrarse dentro del dashboard general de tutorías.
Si el estudiante decide continuar, Bexauri entrega la siguiente carga en la interfaz y el ciclo visible de aprendizaje se repite: instrucciones, resolución, autorreporte, feedback, cierre y siguiente paso.
Si el estudiante decide volver al dashboard, la tarjeta de la tutoría debe actualizarse. Esa tarjeta puede mostrar el correlativo de la carga trabajada, el nombre de la última carga, el siguiente paso disponible y un progreso simple. Este progreso no debe estar orientado a gamificación compleja, rankings ni competencia. Debe servir para que el estudiante sienta orientación, avance, confianza y continuidad.
________________________________________
Operación interna de Bexauri / SRA
Mientras el estudiante vive una experiencia simple, Bexauri ejecuta internamente una operación mucho más rica.
Al primer enrolamiento, el sistema crea la estructura interna mínima para permitir continuidad inmediata: enrollment, primer LearningCycle y primera StudyLoad visible. El LearningCycle funciona como ventana interna de organización de evidencia, no como unidad que el estudiante deba administrar.
Durante la actividad, Bexauri captura respuestas, estado de avance, autorreporte y resultados por ítem. Esta evidencia alimenta el diagnóstico dinámico. Esto reemplaza la idea antigua de que el estudiante debía completar un diagnóstico inicial antes de empezar a estudiar. El diagnóstico deja de ser un muro de entrada y se transforma en una capa viva que se construye con cada interacción.
Cuando la carga termina, Bexauri actualiza el estado de la StudyLoad, registra la evidencia y prepara la siguiente carga. Esta preparación puede ser simple en el MVP. No necesita todavía un motor adaptativo avanzado ni IA autónoma. Puede basarse en reglas controladas, secuencias predefinidas, evidencia básica y supervisión humana. Lo importante es que el estudiante no quede detenido por una acción administrativa innecesaria.
Los LearningCycles siguen teniendo valor, pero su valor es interno. Permiten agrupar bucles de microcargas, observar etapas, construir evidencia, orientar decisiones y eventualmente conectar el avance con hitos del roadmap completo. Sin embargo, el cierre o apertura de un LearningCycle no debe sentirse como una tarea del estudiante. Tampoco debe bloquear la continuidad normal si Bexauri puede seguir entregando trabajo pertinente.
________________________________________
Rol del supervisor humano
El supervisor humano no desaparece. Al contrario, se vuelve más importante, pero su rol cambia.
El supervisor no debe operar como validador manual de cada paso. No debería tener que liberar cada carga para que el estudiante pueda seguir. Tampoco debería ser responsable de tareas repetitivas que Bexauri puede automatizar de forma segura.
Su rol es cuidar la calidad del aprendizaje. Revisa evidencia cuando corresponde, detecta inconsistencias, observa casos de riesgo, valida si la secuencia de cargas mantiene sentido pedagógico y ajusta cuando el sistema necesita criterio humano.
Algunos ejemplos de intervención humana son: un estudiante que responde bien pero reporta alta inseguridad, un estudiante que responde mal repetidamente en un mismo eje, una señal de abandono, una carga que parece demasiado fácil o demasiado difícil, o un contenido que requiere revisión pedagógica antes de escalar.
La supervisión humana debe operar como control de calidad y acompañamiento, no como cuello de botella. Esto permite que Bexauri mantenga una experiencia continua y, al mismo tiempo, preserve una orientación ética y humana.
________________________________________
Reglas UI derivadas
La primera regla UI es que el estudiante nunca debe convertirse en operador administrativo del sistema. Si una acción existe solo para actualizar un estado interno, Bexauri debe absorberla o integrarla naturalmente en la experiencia de aprendizaje.
La segunda regla es que cada actividad debe poder cerrarse pedagógicamente desde su propia pantalla. Responder, autorreportar, revisar feedback y completar la carga deben formar parte de un único flujo.
La tercera regla es que /now no debe ser un lugar al que se vuelve obligatoriamente para terminar algo. Debe orientar qué toca ahora, permitir reentrada a la tutoría y mostrar continuidad, pero no debe ser una estación burocrática.
La cuarta regla es que el feedback debe estar pegado al ejercicio. La explicación debe vivir donde ocurrió el error o la respuesta, para que el estudiante pueda conectar acción, resultado y aprendizaje.
La quinta regla es que el progreso debe ser orientador y no gamificado. Bexauri puede mostrar avance, desempeño simple o señales por skill, pero debe evitar rankings, presión social o sistemas de puntos que distraigan del aprendizaje.
La sexta regla es que la presencia humana debe ser honesta. Bexauri puede comunicar que el avance será revisado cuando corresponda, pero no debe prometer intervención humana constante si esa operación no está garantizada.
________________________________________
Brechas actuales identificadas
La implementación actual ya avanzó hacia esta lógica, pero todavía presenta brechas.
Primero, el enrollment inicial todavía no crea automáticamente todo el flujo ideal. En la validación local fue necesario crear o preparar manualmente estructuras que deberían emerger automáticamente: primer LearningCycle y primera StudyLoad visible.
Segundo, la pantalla /now aún muestra lenguaje de ciclo, como “Ciclo 1” y “Abierto”. Esto contradice parcialmente el principio de invisibilidad de LearningCycles. La UI estudiante debería reemplazar ese lenguaje por una etapa pedagógica o simplemente por la carga actual y el progreso de la tutoría.
Tercero, algunas instrucciones de actividad todavía indican que el estudiante debe volver a /now para terminar la carga. Ese copy está obsoleto y debe eliminarse. El cierre debe ocurrir dentro de la actividad.
Cuarto, el flujo de respuesta, autorreporte, feedback y cierre existe parcialmente, pero debe consolidarse como regla estructural de la experiencia, no como comportamiento accidental o parcial.
Quinto, el endpoint de creación de ciclo todavía genera una carga fallback llamada Initial practice cuando no hay SkillStates disponibles. En una experiencia final, la primera carga debe ser intencional y registry-matched, como PAES M1 — Entrada balanceada inicial para estudiantes PAES_M1 nuevos o early-stage.
________________________________________
Próximos pasos naturales de desarrollo
El siguiente paso no debe ser seguir agregando parches aislados. Antes de tocar nuevas piezas, conviene documentar esta lógica como secuencia canónica UI y lógica integrada de tutoría. Esa documentación debe servir como mapa para el roadmap MVP.
Los próximos pasos naturales son:
MVP-UI-FLOW-1 — Define canonical student UI journey for MVP tutoring experience. Esta fase debe documentar formalmente la experiencia descrita en este documento y convertirla en fuente de verdad para el desarrollo de la UI estudiante.
MVP-FLOW-2 — Auto-create first cycle and first StudyLoad on first enrollment. Esta fase debe hacer que el primer enrolamiento genere automáticamente la estructura interna y la primera carga visible, sin operación manual.
MVP-FLOW-3 — Consolidate activity completion into one in-activity flow. Esta fase debe unir respuestas, autorreporte, feedback y cierre de StudyLoad dentro de la página de actividad.
MVP-UI-FLOW-2 — Remove obsolete /now and cycle-facing student language. Esta fase debe eliminar lenguaje técnico visible para el estudiante y corregir instrucciones que lo mandan a volver a /now para terminar.
MVP-SUPERVISION-1 — Define evidence review surface for human supervisor. Esta fase debe diseñar cómo el supervisor revisa evidencia sin bloquear la continuidad normal del estudiante.
Gemini queda incorporado como apoyo fuerte para preparar propuestas, detectar contradicciones, sintetizar lógica y reducir fricción. ChatGPT mantiene el rol de auditor y director del proyecto. El repo, PHASE_LOG y la documentación versionada siguen siendo la fuente de verdad.
________________________________________
Cierre del día
El cierre conceptual del día es claro: Bexauri está dejando de ser una plataforma que administra tareas y se está acercando a su núcleo real como Sistema Regulador del Aprendizaje.
La secuencia canónica ya no parte desde una lógica administrativa, sino desde la experiencia del estudiante. El estudiante entra, estudia, responde, reflexiona, entiende sus errores, recibe feedback y puede continuar. Bexauri, por dentro, crea estructuras, registra evidencia, regula continuidad y permite supervisión humana cuando corresponde.
Esta alineación entre experiencia estudiante, operación interna y supervisión humana debe guiar el roadmap hacia el MVP.

---

## Phase Result

MVP-UI-FLOW-1 defines the canonical MVP student UI journey for Bexauri.

It aligns:

- student-facing experience,
- internal Bexauri/SRA operation,
- human learning supervision,
- non-blocking continuity,
- dynamic diagnosis,
- in-activity completion,
- inline expandable feedback,
- dashboard/home return logic,
- and the role of Gemini as a stronger contextual support actor.

This phase is documentation-only.

No app code, schema, database mutation, production change, deploy, Abacus work, UI change, or endpoint change was performed.

Recommended next development phases:

1. MVP-FLOW-2 — Auto-create first cycle and first StudyLoad on first enrollment.
2. MVP-FLOW-3 — Consolidate activity completion into one in-activity flow.
3. MVP-UI-FLOW-2 — Remove obsolete `/now` and cycle-facing student language.
4. MVP-SUPERVISION-1 — Define evidence review surface for human supervisor.