# LANDING_PAGE_STUDENT_MVP_READY - Landing Page estudiante Bexauri MVP

Required continuity phrase:

```text
Primera vertical M1-first dentro del camino hacia MVP-Beta cerrado M1/M2/L1.
```

## Status

DEFINED / ACTIVE

## Phase

```text
MVP-SALES-PILOT-UI-DELIVERABLE-1 - Fix first student landing page deliverable
```

## Human authorization

```text
AUTORIZO_FIJAR_PRIMER_ENTREGABLE_UI_LANDING_ESTUDIANTE_BEXAURI_MVP
```

## Deliverable name

```text
Landing Page estudiante - Bexauri MVP
```

## Result marker

```text
LANDING_PAGE_STUDENT_MVP_READY
```

## Observable objective

Un estudiante debe llegar a una pantalla inicial profesional, cercana y moderna, reconocer Bexauri como una experiencia de estudio, y encontrar claramente la ruta para iniciar sesion o acceder a las opciones definidas por Mauricio.

## Target user

Estudiante que entra a Bexauri para:

1. Conocer opciones de trial/suscripcion.
2. Iniciar un flujo local o ficticio de trial/suscripcion, si esta habilitado.
3. Acceder posteriormente al dashboard del estudiante, donde podra enrolarse en PAES M1.

El dashboard del estudiante sera un entregable posterior.

## Expected experience

Al abrir la app, el estudiante debe poder:

1. Reconocer la marca Bexauri.
2. Entender que esta entrando a una plataforma de estudio.
3. Ver una bienvenida clara.
4. Acceder al login.
5. Ver una opcion visible relacionada con trial/suscripcion.
6. Percibir una interfaz profesional, cercana y confiable.

## Visible content

El contenido visible sera solo el texto aprobado por Mauricio.

La landing debe contemplar espacios para:

1. Logo Bexauri provisional.
2. Mensaje principal de bienvenida.
3. Subtitulo o frase breve de propuesta de valor.
4. Boton principal: Iniciar sesion.
5. Opcion secundaria: trial/suscripcion.
6. Elemento visual simple de apoyo, si suma claridad sin retrasar implementacion.

## Text policy

No se incorporaran textos de resguardo, advertencias comerciales, explicacion de piloto cerrado ni aclaraciones legales en esta version local.

No incluir por defecto:

* "prueba cerrada"
* "piloto cerrado"
* "no es venta publica"
* "no activa pago"
* "version local"
* "L1/M2 no activas"
* mensajes defensivos o preventivos no solicitados

Cualquier texto visible debe quedar aprobado explicitamente por Mauricio antes de implementarse.

## Technical scope

La landing debe verse correctamente en:

* movil;
* tablet;
* escritorio/web.

Debe incluir:

* diseno responsive;
* jerarquia visual clara;
* boton de login evidente;
* opcion trial/suscripcion visible;
* espaciado adecuado;
* apariencia profesional;
* carga correcta en local;
* navegacion funcional hacia login.

## Appearance

La landing debe percibirse:

* profesional;
* cercana;
* moderna;
* limpia;
* sobria;
* orientada a estudiante;
* no corporativa fria;
* no infantil;
* visualmente coherente con una plataforma de estudio seria.

## Brand

* usar logo Bexauri provisional;
* no sobretrabajar branding;
* priorizar claridad y primera impresion.

## Trial / subscription

La landing debe contemplar una opcion visible para trial/suscripcion.

Alcance permitido:

* mostrar opcion trial/suscripcion;
* usar boton, enlace, tarjeta o bloque visual aprobado por Mauricio;
* permitir un flujo local/ficticio si ya existe o si puede implementarse sin checkout real;
* preparar la intencion visual de acceso futuro.

Fuera de alcance:

* checkout real;
* pago real;
* integracion con proveedor de pago;
* suscripcion funcional completa;
* trial real con logica comercial completa;
* activacion real de plan pagado.

Si se incluye una accion de trial/suscripcion, debe ser local, ficticia o preparatoria, y no debe crear dependencia de pago real.

## Acceptance criteria

1. La landing carga correctamente.
2. Se ve bien en movil, tablet y escritorio.
3. La marca Bexauri se reconoce claramente.
4. El estudiante entiende que puede iniciar su experiencia de estudio.
5. El boton de login es claro y visible.
6. La opcion trial/suscripcion es visible y comprensible.
7. El diseno se percibe profesional, cercano y moderno.
8. No hay textos no aprobados por Mauricio.
9. No se agregan disclaimers ni explicaciones de piloto cerrado.
10. No se implementan pagos reales.
11. No se toca StudyLoad, StudentAccess, DB, schema ni auth architecture.
12. La landing queda conectada conceptualmente con el siguiente entregable: dashboard del estudiante y enrolamiento en M1.

## Out of scope

* No checkout.
* No pago real.
* No suscripcion funcional completa.
* No integracion de trial real.
* No StudyLoad.
* No dashboard estudiante.
* No enrolamiento M1 todavia.
* No feedback pedagogico.
* No L1/M2.
* No produccion/staging.
* No rediseno completo de marca.
* No textos no aprobados.

## Relationship to Student Experience-Led Delivery

Este entregable es el primer driver top-down de experiencia estudiante.

Su proposito es mejorar la entrada visual y operativa a Bexauri antes de avanzar hacia el siguiente entregable: dashboard del estudiante y enrolamiento en PAES M1.

La siguiente fase puede implementar la landing, pero debe respetar:

* solo texto visible aprobado por Mauricio;
* no pago real;
* no checkout;
* no StudyLoad;
* no dashboard estudiante;
* no enrolamiento M1.

## Next recommended phase

```text
MVP-SALES-PILOT-UI-LANDING-1 - Implement student landing page MVP
```
