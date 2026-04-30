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
      '5. Cuando termines, vuelve a /now.\n' +
      '6. Presiona \u00abTerminar\u00bb.\n' +
      '7. Completa tu autorreporte.\n\n' +
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
      'Cuando termines, vuelve a /now para finalizar la carga y completar tu autorreporte.',
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
      '5. Cuando termines, vuelve a /now.\n' +
      '6. Presiona \u00abTerminar\u00bb.\n' +
      '7. Completa tu autorreporte.\n\n' +
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
      'Cuando termines, vuelve a /now para finalizar la carga y completar tu autorreporte.',
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