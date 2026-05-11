// FL-UX-1 — Static content registry for in-app StudyLoad viewer.
// FL-UX-2B — Added contentKey, contentVersion, item keys, and answer keys
//            for backend MC answer submission validation.
//
// Keyed by StudyLoad title. Content sourced from versioned docs:
// - PAES_M1_FIRST_BETA_TASK_FL_CONTENT_1.md
// - PAES_M1_FOLLOW_UP_TASK_AND_IN_APP_REQUIREMENTS_FL_CONTENT_2.md
//
// This is a no-schema approach: no new DB fields, no Prisma changes.
// When the platform supports content stored in the database, this
// registry will be replaced.

export interface StudyLoadItemOption {
  label: string  // e.g. "A", "B", "C", "D"
  text: string
}

export interface StudyLoadItem {
  key: string    // stable item identifier, e.g. "q1", "q2"
  stem: string
  options: StudyLoadItemOption[]
  correctOptionKey?: string  // e.g. "B"; undefined if answer key unavailable
}

export interface StudyLoadContent {
  contentKey: string       // stable slug, e.g. "paes_m1_linear_equations_basic"
  contentVersion: string   // e.g. "v1"
  title: string
  program: string
  topic: string
  estimatedMinutes: string
  instructions: string
  items: StudyLoadItem[]
  currentLimitationNotice: string
}

const CONTENT_REGISTRY: Record<string, StudyLoadContent> = {
  'PAES M1 \u2014 Ecuaciones lineales b\u00e1sicas': {
    contentKey: 'paes_m1_linear_equations_basic',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Ecuaciones lineales b\u00e1sicas',
    program: 'PAES_M1',
    topic: 'Ecuaciones lineales',
    estimatedMinutes: '20\u201330 minutos',
    instructions:
      'Esta actividad tiene 8 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales b\u00e1sicas.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Lee cada enunciado con atenci\u00f3n.\n' +
      '3. Resuelve la ecuaci\u00f3n paso a paso.\n' +
      '4. Selecciona la alternativa correcta.\n' +
      '5. Env\u00eda tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '7. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es intentar cada ejercicio.',
    items: [
      {
        key: 'q1',
        stem: 'x + 5 = 12',
        options: [
          { label: 'A', text: '5' },
          { label: 'B', text: '7' },
          { label: 'C', text: '12' },
          { label: 'D', text: '17' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q2',
        stem: '3x = 21',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '7' },
          { label: 'C', text: '18' },
          { label: 'D', text: '24' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q3',
        stem: '2x - 4 = 10',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '5' },
          { label: 'C', text: '7' },
          { label: 'D', text: '14' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q4',
        stem: 'x/3 = 9',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '12' },
          { label: 'C', text: '27' },
          { label: 'D', text: '6' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q5',
        stem: 'Un n\u00famero aumentado en 8 es igual a 20. \u00bfCu\u00e1l es el n\u00famero?',
        options: [
          { label: 'A', text: '8' },
          { label: 'B', text: '12' },
          { label: 'C', text: '20' },
          { label: 'D', text: '28' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q6',
        stem: 'El triple de un n\u00famero es 45. \u00bfCu\u00e1l es el n\u00famero?',
        options: [
          { label: 'A', text: '9' },
          { label: 'B', text: '15' },
          { label: 'C', text: '30' },
          { label: 'D', text: '45' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q7',
        stem: 'Si compro 5 cuadernos iguales y pago $3.500 en total, \u00bfcu\u00e1nto cuesta cada cuaderno?',
        options: [
          { label: 'A', text: '$500' },
          { label: 'B', text: '$600' },
          { label: 'C', text: '$700' },
          { label: 'D', text: '$750' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q8',
        stem: 'La edad de Pedro m\u00e1s 4 a\u00f1os ser\u00e1 igual a 18 a\u00f1os. Si x representa su edad actual, \u00bfcu\u00e1l ecuaci\u00f3n modela la situaci\u00f3n?',
        options: [
          { label: 'A', text: 'x - 4 = 18' },
          { label: 'B', text: 'x + 4 = 18' },
          { label: 'C', text: '4x = 18' },
          { label: 'D', text: 'x = 18 + 4' },
        ],
        correctOptionKey: 'B',
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta p\u00e1gina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.',
  },

  'PAES M1 \u2014 Problemas con ecuaciones lineales': {
    contentKey: 'paes_m1_linear_equations_word_problems',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Problemas con ecuaciones lineales',
    program: 'PAES_M1',
    topic: 'Ecuaciones lineales (problemas)',
    estimatedMinutes: '25\u201335 minutos',
    instructions:
      'Esta actividad tiene 8 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales, ' +
      'un paso m\u00e1s desafiantes que la pr\u00e1ctica anterior.\n\n' +
      'Algunos ejercicios incluyen par\u00e9ntesis, fracciones y problemas donde debes plantear la ecuaci\u00f3n antes de resolverla.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Lee cada enunciado con atenci\u00f3n.\n' +
      '3. Si el ejercicio es un problema, escribe primero la ecuaci\u00f3n y luego resu\u00e9lvela.\n' +
      '4. Selecciona la alternativa correcta para cada ejercicio.\n' +
      '5. Env\u00eda tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '7. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es intentar cada ejercicio y reflexionar sobre c\u00f3mo te fue.',
    items: [
      {
        key: 'q1',
        stem: '2(x + 3) = 18',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '6' },
          { label: 'C', text: '9' },
          { label: 'D', text: '12' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q2',
        stem: '4x - 5 = 2x + 11',
        options: [
          { label: 'A', text: '6' },
          { label: 'B', text: '7' },
          { label: 'C', text: '8' },
          { label: 'D', text: '9' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q3',
        stem: '(x/2) + 7 = 15',
        options: [
          { label: 'A', text: '12' },
          { label: 'B', text: '14' },
          { label: 'C', text: '16' },
          { label: 'D', text: '18' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q4',
        stem: '3(x - 4) + 6 = 24',
        options: [
          { label: 'A', text: '6' },
          { label: 'B', text: '8' },
          { label: 'C', text: '10' },
          { label: 'D', text: '12' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q5',
        stem: 'Un n\u00famero aumentado en el doble del mismo n\u00famero es igual a 36. \u00bfCu\u00e1l es el n\u00famero?',
        options: [
          { label: 'A', text: '9' },
          { label: 'B', text: '10' },
          { label: 'C', text: '12' },
          { label: 'D', text: '18' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q6',
        stem: 'La edad de una persona dentro de 5 a\u00f1os ser\u00e1 23 a\u00f1os. Si x representa su edad actual, \u00bfcu\u00e1l es su edad actual?',
        options: [
          { label: 'A', text: '16' },
          { label: 'B', text: '17' },
          { label: 'C', text: '18' },
          { label: 'D', text: '19' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q7',
        stem: 'En una librer\u00eda, 4 l\u00e1pices iguales y una goma de $600 cuestan $2.200. Si x representa el precio de un l\u00e1piz, \u00bfcu\u00e1l es el valor de x?',
        options: [
          { label: 'A', text: '$300' },
          { label: 'B', text: '$350' },
          { label: 'C', text: '$400' },
          { label: 'D', text: '$450' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q8',
        stem: 'Un plan mensual cuesta una cuota fija de $2.000 m\u00e1s $500 por cada clase asistida. Si x representa el n\u00famero de clases y el total pagado fue $5.500, \u00bfcu\u00e1l ecuaci\u00f3n modela la situaci\u00f3n?',
        options: [
          { label: 'A', text: '2.000x + 500 = 5.500' },
          { label: 'B', text: '2.000 + 500x = 5.500' },
          { label: 'C', text: '500 + 2.000x = 5.500' },
          { label: 'D', text: '2.500x = 5.500' },
        ],
        correctOptionKey: 'B',
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta p\u00e1gina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.',
  },

  'PAES M1 \u2014 Refuerzo de ecuaciones lineales': {
    contentKey: 'paes_m1_linear_equations_reinforcement',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Refuerzo de ecuaciones lineales',
    program: 'PAES_M1',
    topic: 'Ecuaciones lineales (refuerzo)',
    estimatedMinutes: '20\u201330 minutos',
    instructions:
      'Esta actividad tiene 8 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Lee cada enunciado con atenci\u00f3n.\n' +
      '3. Escribe la ecuaci\u00f3n cuando corresponda.\n' +
      '4. Resuelve paso a paso.\n' +
      '5. Selecciona la alternativa que corresponde.\n' +
      '6. Presiona \u201cEnviar respuestas\u201d.\n' +
      '7. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '8. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es intentar resolver con orden y dejar evidencia de tu trabajo.',
    items: [
      {
        key: 'q1',
        stem: '\u00bfCu\u00e1l es la soluci\u00f3n de la ecuaci\u00f3n 4x - 7 = 21?',
        options: [
          { label: 'A', text: 'x = 7' },
          { label: 'B', text: 'x = 14' },
          { label: 'C', text: 'x = 28' },
          { label: 'D', text: 'x = 3,5' },
        ],
        correctOptionKey: 'A',
      },
      {
        key: 'q2',
        stem: '\u00bfCu\u00e1l es la soluci\u00f3n de la ecuaci\u00f3n 3(x + 2) = 24?',
        options: [
          { label: 'A', text: 'x = 4' },
          { label: 'B', text: 'x = 6' },
          { label: 'C', text: 'x = 8' },
          { label: 'D', text: 'x = 10' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q3',
        stem: '\u00bfCu\u00e1l es la soluci\u00f3n de la ecuaci\u00f3n x/5 + 4 = 9?',
        options: [
          { label: 'A', text: 'x = 1' },
          { label: 'B', text: 'x = 5' },
          { label: 'C', text: 'x = 25' },
          { label: 'D', text: 'x = 45' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q4',
        stem: '\u00bfCu\u00e1l es la soluci\u00f3n de la ecuaci\u00f3n 2x + 9 = x + 17?',
        options: [
          { label: 'A', text: 'x = 4' },
          { label: 'B', text: 'x = 8' },
          { label: 'C', text: 'x = 13' },
          { label: 'D', text: 'x = 26' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q5',
        stem: '\u00bfCu\u00e1l es la soluci\u00f3n de la ecuaci\u00f3n 5x - 3 = 2x + 12?',
        options: [
          { label: 'A', text: 'x = 3' },
          { label: 'B', text: 'x = 5' },
          { label: 'C', text: 'x = 9' },
          { label: 'D', text: 'x = 15' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q6',
        stem: 'Un n\u00famero disminuido en 4, y luego multiplicado por 3, da como resultado 27. \u00bfCu\u00e1l es el n\u00famero?',
        options: [
          { label: 'A', text: '5' },
          { label: 'B', text: '9' },
          { label: 'C', text: '13' },
          { label: 'D', text: '31' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q7',
        stem: 'Una actividad cobra una entrada fija de $1.200 m\u00e1s $800 por cada hora de uso. Si una persona pag\u00f3 $5.200 en total, \u00bfcu\u00e1ntas horas us\u00f3 la actividad?',
        options: [
          { label: 'A', text: '4 horas' },
          { label: 'B', text: '5 horas' },
          { label: 'C', text: '6 horas' },
          { label: 'D', text: '7 horas' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q8',
        stem: 'Juan tiene x estampillas. Ana tiene el doble de las estampillas de Juan m\u00e1s 6. Si entre ambos tienen 36 estampillas, \u00bfcu\u00e1ntas estampillas tiene Juan?',
        options: [
          { label: 'A', text: '6' },
          { label: 'B', text: '10' },
          { label: 'C', text: '12' },
          { label: 'D', text: '18' },
        ],
        correctOptionKey: 'B',
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni retroalimentaci\u00f3n autom\u00e1tica en esta versi\u00f3n.',
  },

  'PAES M1 \u2014 Funciones lineales b\u00e1sicas': {
    contentKey: 'paes_m1_linear_functions_basic',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Funciones lineales b\u00e1sicas',
    program: 'PAES_M1',
    topic: 'Funciones lineales (inicio)',
    estimatedMinutes: '20\u201330 minutos',
    instructions:
      'Esta actividad tiene 8 ejercicios de opci\u00f3n m\u00faltiple sobre funciones lineales.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Identifica la regla de la funci\u00f3n cuando corresponda.\n' +
      '3. Calcula valores de la funci\u00f3n paso a paso.\n' +
      '4. Reconoce pendiente e intercepto cuando aparezcan.\n' +
      '5. Selecciona la alternativa que corresponde.\n' +
      '6. Presiona \u201cEnviar respuestas\u201d.\n' +
      '7. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '8. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es interpretar con orden la relaci\u00f3n entre variables.',
    items: [
      {
        key: 'q1',
        stem: 'Si f(x) = 2x + 3, \u00bfcu\u00e1l es el valor de f(4)?',
        options: [
          { label: 'A', text: '7' },
          { label: 'B', text: '11' },
          { label: 'C', text: '14' },
          { label: 'D', text: '20' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q2',
        stem: 'Si f(x) = 3x - 5 y f(x) = 10, \u00bfcu\u00e1l es el valor de x?',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '5' },
          { label: 'C', text: '10' },
          { label: 'D', text: '15' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q3',
        stem: 'Una recta pasa por los puntos (0, 2) y (3, 8). \u00bfCu\u00e1l es su pendiente?',
        options: [
          { label: 'A', text: '2' },
          { label: 'B', text: '3' },
          { label: 'C', text: '6' },
          { label: 'D', text: '8' },
        ],
        correctOptionKey: 'A',
      },
      {
        key: 'q4',
        stem: 'En la funci\u00f3n y = -2x + 6, \u00bfcu\u00e1l es el intercepto con el eje y?',
        options: [
          { label: 'A', text: '-2' },
          { label: 'B', text: '2' },
          { label: 'C', text: '6' },
          { label: 'D', text: '-6' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q5',
        stem: '\u00bfCu\u00e1l de las siguientes funciones tiene pendiente 4 e intercepto -1?',
        options: [
          { label: 'A', text: 'y = -x + 4' },
          { label: 'B', text: 'y = 4x + 1' },
          { label: 'C', text: 'y = x - 4' },
          { label: 'D', text: 'y = 4x - 1' },
        ],
        correctOptionKey: 'D',
      },
      {
        key: 'q6',
        stem: 'Un servicio cobra $1.000 fijos m\u00e1s $500 por cada hora de uso. \u00bfQu\u00e9 funci\u00f3n representa el costo C(h)?',
        options: [
          { label: 'A', text: 'C(h) = 1000 + 500h' },
          { label: 'B', text: 'C(h) = 500 + 1000h' },
          { label: 'C', text: 'C(h) = 1500h' },
          { label: 'D', text: 'C(h) = 1000h - 500' },
        ],
        correctOptionKey: 'A',
      },
      {
        key: 'q7',
        stem: 'Si f(x) = -x + 9, \u00bfcu\u00e1l es el valor de f(3)?',
        options: [
          { label: 'A', text: '3' },
          { label: 'B', text: '6' },
          { label: 'C', text: '9' },
          { label: 'D', text: '12' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q8',
        stem: 'La siguiente tabla muestra una relaci\u00f3n lineal: x = 0, 1, 2 y y = 1, 4, 7. \u00bfCu\u00e1l es la regla de la funci\u00f3n?',
        options: [
          { label: 'A', text: 'y = x + 3' },
          { label: 'B', text: 'y = 2x + 1' },
          { label: 'C', text: 'y = 3x + 1' },
          { label: 'D', text: 'y = 4x' },
        ],
        correctOptionKey: 'C',
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni retroalimentaci\u00f3n autom\u00e1tica en esta versi\u00f3n.',
  },
  'PAES M1 \u2014 Entrada balanceada inicial': {
    contentKey: 'paes_m1_balanced_entry_initial',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Entrada balanceada inicial',
    program: 'PAES_M1',
    topic: 'Entrada balanceada inicial',
    estimatedMinutes: '8\u201312 minutos',
    instructions:
      'Esta actividad tiene 4 preguntas breves de opci\u00f3n m\u00faltiple. ' +
      'Cada una observa un eje distinto de Matem\u00e1tica M1: N\u00fameros, \u00c1lgebra y funciones, Geometr\u00eda, y Probabilidad y estad\u00edstica.\n\n' +
      'No es una prueba final ni un puntaje PAES. La idea es obtener una primera se\u00f1al para orientar tus siguientes cargas de estudio.\n\n' +
      '1. Lee cada enunciado con calma.\n' +
      '2. Trabaja en tu cuaderno o en una hoja de papel si lo necesitas.\n' +
      '3. Selecciona una alternativa por pregunta.\n' +
      '4. Env\u00eda tus respuestas.\n' +
      '5. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '6. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es observar c\u00f3mo partes y decidir el siguiente paso con cuidado.',
    items: [
      {
        key: 'q1',
        stem: 'Una tienda ofrece un descuento de 20% en un producto que cuesta $15.000. \u00bfCu\u00e1nto dinero se descuenta?',
        options: [
          { label: 'A', text: '$1.500' },
          { label: 'B', text: '$2.000' },
          { label: 'C', text: '$3.000' },
          { label: 'D', text: '$12.000' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q2',
        stem: 'Un servicio de arriendo de bicicletas cobra $1.000 fijos y $500 por cada hora de uso. Si h representa la cantidad de horas, \u00bfqu\u00e9 expresi\u00f3n representa el costo total?',
        options: [
          { label: 'A', text: '1000h + 500' },
          { label: 'B', text: '1000 + 500h' },
          { label: 'C', text: '(1000 + 500)h' },
          { label: 'D', text: '1500h' },
        ],
        correctOptionKey: 'B',
      },
      {
        key: 'q3',
        stem: 'Un terreno rectangular mide 8 metros de largo y 5 metros de ancho. \u00bfCu\u00e1l es el \u00e1rea del terreno?',
        options: [
          { label: 'A', text: '13 m2' },
          { label: 'B', text: '26 m2' },
          { label: 'C', text: '40 m2' },
          { label: 'D', text: '80 m2' },
        ],
        correctOptionKey: 'C',
      },
      {
        key: 'q4',
        stem: 'En una bolsa hay 3 bolitas rojas y 2 bolitas azules, todas del mismo tama\u00f1o. Si se saca una bolita al azar, \u00bfcu\u00e1l es la probabilidad de que sea azul?',
        options: [
          { label: 'A', text: '2/3' },
          { label: 'B', text: '2/5' },
          { label: 'C', text: '3/5' },
          { label: 'D', text: '1/2' },
        ],
        correctOptionKey: 'B',
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia inicial para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni diagn\u00f3stico autom\u00e1tico en esta versi\u00f3n.',
  },
}

// Secondary index: contentKey → StudyLoadContent.
// Built once at module load time.
const CONTENT_KEY_INDEX: Record<string, StudyLoadContent> = {}
for (const entry of Object.values(CONTENT_REGISTRY)) {
  CONTENT_KEY_INDEX[entry.contentKey] = entry
}

/**
 * Look up static content for a StudyLoad by its title.
 * Returns undefined if no content is registered for that title.
 */
export function getStudyLoadContent(
  title: string,
): StudyLoadContent | undefined {
  return CONTENT_REGISTRY[title]
}

/**
 * Look up static content by its stable contentKey slug.
 * Returns undefined if no content is registered for that key.
 */
export function getStudyLoadContentByKey(
  contentKey: string,
): StudyLoadContent | undefined {
  return CONTENT_KEY_INDEX[contentKey]
}
