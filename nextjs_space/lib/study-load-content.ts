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

export interface StudyLoadAuthoredFeedback {
  briefId: string
  completeId: string
  version: string
  brief: string
  complete: string
}

export interface StudyLoadTableStimulus {
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface StudyLoadItem {
  key: string    // stable item identifier, e.g. "q1", "q2"
  stem: string
  tableStimulus?: StudyLoadTableStimulus
  options: StudyLoadItemOption[]
  correctOptionKey?: string  // e.g. "B"; undefined if answer key unavailable
  authoredFeedback?: StudyLoadAuthoredFeedback
  basedOnTextId?: string
}

export interface StudyLoadPedagogicalMetadata {
  programCode: 'PAES_M1' | 'PAES_L1'
  sliceId: 'BALANCED_ENTRY' | 'AS1' | 'PE1' | 'L1_LOCATING_INFORMATION_01'
  sliceName: string
  axis: 'balanced_entry' | 'algebra_functions' | 'data_probability' | 'competencia_lectora'
  roadmapNodes: string[]
  officialSkillRefs: string[]
  difficultyBand: 'entry' | 'basic' | 'reinforcement' | 'transition' | 'low_moderate'
  primaryPurpose: 'diagnose' | 'practice' | 'reinforce' | 'validate' | 'bridge'
  evidenceType: 'mc_submission'
  estimatedMinutes: number
  reviewStatus: 'internal_provisional'
  expertReviewed: false
  routingStatus: 'available_not_universal'
}

export interface StudyLoadReadingTextAsset {
  textId: string
  textVersion: string
  title: string
  body: string
  sourceClass: 'original_bexauri_created_candidate'
  rightsBasis: 'original_bexauri_created'
  officialSourceDependency: 'none'
  copyrightedSourceDependency: 'none'
  reviewStatus: 'reviewed_for_internal_pilot'
}

export interface StudyLoadApprovalMetadata {
  registryScope: 'internal_pilot_candidate_only'
  studentUseApproved: false
  productUseApproved: false
  salesReadyImplication: 'none'
  continuityPolicy: 'no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set'
}

export interface StudyLoadContent {
  contentKey: string       // stable slug, e.g. "paes_m1_linear_equations_basic"
  contentVersion: string   // e.g. "v1"
  contentType?: string
  title: string
  program: string
  skillFamily?: string
  topic: string
  estimatedMinutes: string
  instructions: string
  items: StudyLoadItem[]
  currentLimitationNotice: string
  pedagogicalMetadata?: StudyLoadPedagogicalMetadata
  readingText?: StudyLoadReadingTextAsset
  approvalMetadata?: StudyLoadApprovalMetadata
}

export interface SafeStudyLoadItem {
  key: string
  stem: string
  tableStimulus?: StudyLoadTableStimulus
  options: StudyLoadItemOption[]
}

export interface StudyLoadSubmittedAnswer {
  itemKey: string
  selectedOptionKey: string
}

export interface StudyLoadFeedbackItem {
  itemKey: string
  selectedOptionKey?: string
  selectedOptionText?: string
  correctOptionKey?: string
  correctOptionText?: string
  isCorrect?: boolean
  authoredFeedbackBrief?: string
  authoredFeedbackComplete?: string
  authoredFeedbackBriefId?: string
  authoredFeedbackCompleteId?: string
  authoredFeedbackVersion?: string
}

export interface StudyLoadFeedback {
  answeredCount: number
  totalItemCount: number
  correctCount: number
  hasAnswerKey: boolean
  items: StudyLoadFeedbackItem[]
}

export function isL1ReadingStudyLoadContent(content: StudyLoadContent): boolean {
  return content.program === 'PAES_L1' && content.contentType === 'reading_l1_locating_information'
}

export function getSafeStudyLoadItems(content: StudyLoadContent): SafeStudyLoadItem[] {
  return content.items.map((item) => ({
    key: item.key,
    stem: item.stem,
    tableStimulus: item.tableStimulus
      ? {
          caption: item.tableStimulus.caption,
          headers: [...item.tableStimulus.headers],
          rows: item.tableStimulus.rows.map((row) => [...row]),
        }
      : undefined,
    options: item.options.map((option) => ({
      label: option.label,
      text: option.text,
    })),
  }))
}

const STUDY_LOAD_VISIBLE_CORRELATIVES_BY_CONTENT_KEY: Record<string, string> = {
  paes_m1_balanced_entry_initial: 'M1-C01',
  paes_m1_linear_equations_basic: 'M1-C02',
  paes_m1_linear_equations_word_problems: 'M1-C03',
  paes_m1_linear_equations_reinforcement: 'M1-C04',
  paes_m1_linear_functions_basic: 'M1-C05',
  paes_m1_linear_functions_basic_ii: 'M1-C06',
  paes_m1_data_representation_entry: 'M1-C07',
  paes_m1_data_representation_entry_ii: 'M1-C08',
}

function getStudyLoadDisplayBaseTitle(content: StudyLoadContent): string {
  return content.title
    .replace(/^PAES M1\s+(?:\u2014|-)\s+/, '')
    .replace(/^PAES L1\s+(?:\u2014|-)\s+/, '')
}

export function getStudyLoadVisibleCorrelative(
  content: StudyLoadContent,
): string | undefined {
  return STUDY_LOAD_VISIBLE_CORRELATIVES_BY_CONTENT_KEY[content.contentKey]
}

export function getStudyLoadDisplayTitle(content: StudyLoadContent): string {
  const visibleCorrelative = getStudyLoadVisibleCorrelative(content)
  if (!visibleCorrelative) {
    return content.title
  }

  return `${visibleCorrelative} \u2014 ${getStudyLoadDisplayBaseTitle(content)}`
}

export function buildStudyLoadFeedback(
  content: StudyLoadContent,
  submittedAnswers: StudyLoadSubmittedAnswer[],
): StudyLoadFeedback {
  const answerMap = new Map(
    submittedAnswers.map((answer) => [answer.itemKey, answer.selectedOptionKey]),
  )

  const items = content.items.map((item) => {
    const selectedOptionKey = answerMap.get(item.key)
    const selectedOption = selectedOptionKey
      ? item.options.find((option) => option.label === selectedOptionKey)
      : undefined
    const correctOption = item.correctOptionKey
      ? item.options.find((option) => option.label === item.correctOptionKey)
      : undefined
    const isCorrect =
      selectedOptionKey && item.correctOptionKey
        ? selectedOptionKey === item.correctOptionKey
        : undefined

    return {
      itemKey: item.key,
      selectedOptionKey,
      selectedOptionText: selectedOption?.text,
      correctOptionKey: item.correctOptionKey,
      correctOptionText: correctOption?.text,
      isCorrect,
      authoredFeedbackBrief: selectedOptionKey ? item.authoredFeedback?.brief : undefined,
      authoredFeedbackComplete: selectedOptionKey ? item.authoredFeedback?.complete : undefined,
      authoredFeedbackBriefId: selectedOptionKey ? item.authoredFeedback?.briefId : undefined,
      authoredFeedbackCompleteId: selectedOptionKey ? item.authoredFeedback?.completeId : undefined,
      authoredFeedbackVersion: selectedOptionKey ? item.authoredFeedback?.version : undefined,
    }
  })

  return {
    answeredCount: submittedAnswers.length,
    totalItemCount: content.items.length,
    correctCount: items.filter((item) => item.isCorrect).length,
    hasAnswerKey: content.items.some((item) => item.correctOptionKey !== undefined),
    items,
  }
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
      'Esta actividad tiene 4 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales b\u00e1sicas.\n\n' +
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_basic_q1_brief_bpcpv1_v1',
          completeId: 'paes_m1_linear_equations_basic_q1_complete_bpcpv1_v1',
          version: 'bpcpv1-capsule2-feedback-v1',
          brief:
            'Revisa la operacion inversa: resta 5 a ambos lados y comprueba el valor en la ecuacion.',
          complete:
            'El item pide encontrar el valor que hace verdadera la ecuacion x + 5 = 12. Paso 1: identifica que a x se le suma 5. Paso 2: deshaz esa suma restando 5 a ambos lados. Paso 3: calcula 12 - 5 = 7. Paso 4: comprueba que 7 + 5 = 12. Si elegiste otra opcion, puede sugerir que conviene revisar como usar operaciones inversas en ecuaciones de un paso.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_basic_q2_brief_bpcpv1_v1',
          completeId: 'paes_m1_linear_equations_basic_q2_complete_bpcpv1_v1',
          version: 'bpcpv1-capsule2-feedback-v1',
          brief:
            'El foco es deshacer la multiplicacion: divide 21 por 3 y verifica multiplicando de nuevo.',
          complete:
            'El item pide resolver una ecuacion donde x esta multiplicada por 3. Paso 1: interpreta 3x como 3 * x. Paso 2: divide ambos lados por 3. Paso 3: calcula 21 / 3 = 7. Paso 4: comprueba que 3 * 7 = 21. Si elegiste otra opcion, puede sugerir que conviene revisar la division como operacion inversa de la multiplicacion.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_basic_q3_brief_bpcpv1_v1',
          completeId: 'paes_m1_linear_equations_basic_q3_complete_bpcpv1_v1',
          version: 'bpcpv1-capsule2-feedback-v1',
          brief:
            'En una ecuacion de dos pasos, primero deshaz la resta y despues la multiplicacion. Luego comprueba.',
          complete:
            'El item pide resolver 2x - 4 = 10. Paso 1: deshaz la resta sumando 4 a ambos lados. Paso 2: obtienes 2x = 14. Paso 3: divide ambos lados por 2. Paso 4: obtienes x = 7. Paso 5: comprueba que 2 * 7 - 4 = 10. Si elegiste otra opcion, puede sugerir que conviene revisar el orden de las operaciones inversas.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_basic_q4_brief_bpcpv1_v1',
          completeId: 'paes_m1_linear_equations_basic_q4_complete_bpcpv1_v1',
          version: 'bpcpv1-capsule2-feedback-v1',
          brief:
            'Si x esta dividido por 3, la operacion inversa es multiplicar por 3. Despues verifica.',
          complete:
            'El item pide resolver x/3 = 9. Paso 1: identifica que x esta dividida por 3. Paso 2: multiplica ambos lados por 3. Paso 3: calcula 9 * 3 = 27. Paso 4: comprueba que 27 / 3 = 9. Si elegiste otra opcion, puede sugerir que conviene revisar como deshacer una division dentro de una ecuacion.',
        },
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta p\u00e1gina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'AS1',
      sliceName: 'AS1 algebra/functions - initial corridor',
      axis: 'algebra_functions',
      roadmapNodes: ['internal:as1_linear_equations_basic', 'internal:as1_equation_mechanics'],
      officialSkillRefs: ['internal:resolver_problemas', 'internal:representar'],
      difficultyBand: 'basic',
      primaryPurpose: 'practice',
      evidenceType: 'mc_submission',
      estimatedMinutes: 25,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },

  'PAES M1 - Porcentaje y proporcionalidad en contexto': {
    contentKey: 'paes_m1_numbers_percentage_proportionality_entry',
    contentVersion: 'v1',
    title: 'PAES M1 - Porcentaje y proporcionalidad en contexto',
    program: 'PAES_M1',
    topic: 'Porcentaje y proporcionalidad',
    estimatedMinutes: '20-30 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opcion multiple sobre porcentaje y proporcionalidad en contexto.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Lee cada enunciado con atencion.\n' +
      '3. Identifica la cantidad base, la proporcion o la relacion que se mantiene.\n' +
      '4. Calcula paso a paso antes de elegir una alternativa.\n' +
      '5. Envia tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma pagina.\n' +
      '7. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presion por la perfeccion. Lo importante es intentar cada ejercicio con orden.',
    items: [
      {
        key: 'q1',
        stem:
          'En un curso hay 40 estudiantes. El 25% participa en el taller de ciencias. ' +
          '\u00bfCuantos estudiantes participan en ese taller?',
        options: [
          { label: 'A', text: '8' },
          { label: 'B', text: '10' },
          { label: 'C', text: '15' },
          { label: 'D', text: '25' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_numbers_percentage_proportionality_entry_q1_brief_bpcpv1_v1',
          completeId: 'paes_m1_numbers_percentage_proportionality_entry_q1_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Reconoce la base: el 25% se calcula sobre 40. Como es un cuarto, conviene revisar 40 / 4.',
          complete:
            'El item pide calcular una parte de un total: 25% de 40 estudiantes. La opcion candidata funciona porque 25% equivale a un cuarto, y 40 / 4 = 10. Las otras opciones pueden ser tentadoras si se usa otro porcentaje, si se suma un valor parcial, o si se toma 25 como cantidad de estudiantes. Esta respuesta puede sugerir revisar la relacion parte-todo, pero un item no permite concluir desempeno general en porcentajes.',
        },
      },
      {
        key: 'q2',
        stem:
          'Una botella tenia 600 ml de agua. Despues de beber, queda un 20% menos que al inicio. ' +
          '\u00bfCuanta agua queda en la botella?',
        options: [
          { label: 'A', text: '120 ml' },
          { label: 'B', text: '480 ml' },
          { label: 'C', text: '580 ml' },
          { label: 'D', text: '720 ml' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_numbers_percentage_proportionality_entry_q2_brief_bpcpv1_v1',
          completeId: 'paes_m1_numbers_percentage_proportionality_entry_q2_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Separa cuanto disminuye de cuanto queda: calcula el 20% de 600 y restalo al total inicial.',
          complete:
            'El item pregunta por la cantidad que queda, no solo por la disminucion. La opcion candidata funciona porque 20% de 600 ml es 120 ml, y al quedar 20% menos se calcula 600 - 120 = 480 ml. Las otras opciones pueden aparecer si se informa solo la disminucion, si se resta 20 como cantidad fija, o si se aumenta en vez de disminuir. Esta respuesta puede sugerir revisar base, porcentaje y significado de "queda".',
        },
      },
      {
        key: 'q3',
        stem:
          'En una tienda, 3 cuadernos cuestan $2.400. En otra tienda, 5 cuadernos cuestan $4.500. ' +
          'Si los cuadernos son iguales, \u00bfen que tienda conviene comprar si se busca el menor precio por cuaderno?',
        options: [
          { label: 'A', text: 'En la primera tienda, porque cada cuaderno cuesta $800' },
          { label: 'B', text: 'En la segunda tienda, porque cada cuaderno cuesta $900' },
          { label: 'C', text: 'En la primera tienda, porque 3 cuadernos son menos que 5' },
          { label: 'D', text: 'En la segunda tienda, porque el total es mayor' },
        ],
        correctOptionKey: 'A',
        authoredFeedback: {
          briefId: 'paes_m1_numbers_percentage_proportionality_entry_q3_brief_bpcpv1_v1',
          completeId: 'paes_m1_numbers_percentage_proportionality_entry_q3_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Para comparar ofertas, conviene comparar precio por cuaderno. Calcula cada precio unitario y elige el menor.',
          complete:
            'El item pide decidir donde conviene comprar si se busca menor precio por cuaderno. La opcion candidata funciona porque en la primera tienda cada cuaderno cuesta $800 y en la segunda cuesta $900. Comparar solo el total o solo la cantidad de cuadernos no basta, porque las ofertas tienen cantidades distintas. Esta respuesta puede sugerir revisar precio unitario y comparacion proporcional.',
        },
      },
      {
        key: 'q4',
        stem:
          'Para preparar jugo, una receta usa 2 vasos de concentrado por cada 5 vasos de agua. ' +
          'Si se usan 4 vasos de concentrado y se mantiene la misma proporcion, \u00bfcuantos vasos de agua se necesitan?',
        options: [
          { label: 'A', text: '7' },
          { label: 'B', text: '8' },
          { label: 'C', text: '10' },
          { label: 'D', text: '20' },
        ],
        correctOptionKey: 'C',
        authoredFeedback: {
          briefId: 'paes_m1_numbers_percentage_proportionality_entry_q4_brief_bpcpv1_v1',
          completeId: 'paes_m1_numbers_percentage_proportionality_entry_q4_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'El foco es mantener la misma proporcion: si el concentrado se duplica, el agua tambien debe duplicarse.',
          complete:
            'El item pide mantener una relacion proporcional entre concentrado y agua. La opcion candidata funciona porque pasar de 2 a 4 vasos de concentrado multiplica por 2, por lo que los 5 vasos de agua tambien se multiplican por 2: 5 * 2 = 10. Las otras opciones pueden surgir si se suma en vez de multiplicar o si se combinan numeros visibles sin conservar la relacion. Esta respuesta puede sugerir revisar escalamiento multiplicativo.',
        },
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta pagina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma pagina.',
  },

  'PAES M1 - Area, perimetro y medida en figuras simples': {
    contentKey: 'paes_m1_geometry_area_measure_entry',
    contentVersion: 'v1',
    title: 'PAES M1 - Area, perimetro y medida en figuras simples',
    program: 'PAES_M1',
    topic: 'Area, perimetro y medida',
    estimatedMinutes: '20-30 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opcion multiple sobre area, perimetro y medidas en figuras simples.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Lee cada enunciado con atencion.\n' +
      '3. Decide si la pregunta pide borde, superficie, conversion o comparacion.\n' +
      '4. Calcula paso a paso antes de elegir una alternativa.\n' +
      '5. Envia tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma pagina.\n' +
      '7. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presion por la perfeccion. Lo importante es interpretar la medida que pide cada situacion.',
    items: [
      {
        key: 'q1',
        stem:
          'Un jardin rectangular mide 6 m de largo y 4 m de ancho. Se quiere poner una reja alrededor de todo el borde. ' +
          '\u00bfQue medida se necesita calcular?',
        options: [
          { label: 'A', text: 'El area: 6 x 4' },
          { label: 'B', text: 'El perimetro: 6 + 4 + 6 + 4' },
          { label: 'C', text: 'La diagonal: 6 + 4' },
          { label: 'D', text: 'El volumen: 6 x 4 x 2' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_geometry_area_measure_entry_q1_brief_bpcpv1_v1',
          completeId: 'paes_m1_geometry_area_measure_entry_q1_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'La palabra clave es "alrededor del borde": eso apunta a perimetro. Revisa si la pregunta pide borde o superficie.',
          complete:
            'El item pregunta que medida se necesita para poner una reja alrededor del borde de un rectangulo. La opcion candidata funciona porque el borde completo se calcula con el perimetro: 6 + 4 + 6 + 4. El area serviria para cubrir superficie, no para rodear el borde. La diagonal y el volumen no responden a esta situacion. Esta respuesta puede sugerir revisar la diferencia entre borde y superficie.',
        },
      },
      {
        key: 'q2',
        stem:
          'Una sala con forma de L ya esta dividida en dos rectangulos: uno mide 5 m por 3 m y el otro mide 2 m por 4 m. ' +
          '\u00bfCual es el area total de la sala?',
        options: [
          { label: 'A', text: '14 m2' },
          { label: 'B', text: '23 m2' },
          { label: 'C', text: '30 m2' },
          { label: 'D', text: '40 m2' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_geometry_area_measure_entry_q2_brief_bpcpv1_v1',
          completeId: 'paes_m1_geometry_area_measure_entry_q2_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Como la sala ya esta dividida en dos rectangulos, calcula cada area y despues suma las dos partes.',
          complete:
            'El item pide el area total de una sala en forma de L ya separada en dos rectangulos. La opcion candidata funciona porque el primer rectangulo tiene area 5 * 3 = 15 m2 y el segundo 2 * 4 = 8 m2; juntas suman 23 m2. Las otras opciones pueden aparecer si se suman solo dimensiones visibles, si se duplica una parte, o si se multiplican medidas que no forman un mismo rectangulo. Esta respuesta puede sugerir revisar area compuesta por partes.',
        },
      },
      {
        key: 'q3',
        stem:
          'Una cinta mide 2 metros. Para un trabajo se necesitan trozos de 25 centimetros. ' +
          '\u00bfCuantos trozos completos de 25 cm se pueden cortar?',
        options: [
          { label: 'A', text: '4' },
          { label: 'B', text: '8' },
          { label: 'C', text: '25' },
          { label: 'D', text: '50' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_geometry_area_measure_entry_q3_brief_bpcpv1_v1',
          completeId: 'paes_m1_geometry_area_measure_entry_q3_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Antes de dividir, usa la misma unidad: 2 metros son 200 centimetros. Luego calcula cuantos trozos de 25 cm caben.',
          complete:
            'El item pide cuantos trozos completos de 25 cm se pueden cortar desde una cinta de 2 metros. La opcion candidata funciona porque primero hay que convertir 2 m = 200 cm, y luego dividir 200 / 25 = 8. Las otras opciones pueden aparecer si se trabaja con unidades mezcladas, si se copia 25, o si se multiplica en vez de dividir. Esta respuesta puede sugerir revisar consistencia de unidades antes de calcular.',
        },
      },
      {
        key: 'q4',
        stem:
          'Dos zonas rectangulares se quieren cubrir con pasto. La zona A mide 4 m de largo y 3 m de ancho. ' +
          'La zona B mide 5 m de largo y 2 m de ancho. \u00bfCual zona tiene mayor superficie?',
        options: [
          { label: 'A', text: 'La zona A, porque su area es 12 m2' },
          { label: 'B', text: 'La zona B, porque su area es 10 m2' },
          { label: 'C', text: 'Las dos zonas tienen la misma area' },
          { label: 'D', text: 'No se puede saber sin calcular el perimetro' },
        ],
        correctOptionKey: 'A',
        authoredFeedback: {
          briefId: 'paes_m1_geometry_area_measure_entry_q4_brief_bpcpv1_v1',
          completeId: 'paes_m1_geometry_area_measure_entry_q4_complete_bpcpv1_v1',
          version: 'bpcpv1-capsules3-5-feedback-v1',
          brief:
            'Para comparar superficies, calcula el area de cada zona y compara los resultados. No basta mirar solo un lado mas largo.',
          complete:
            'El item pide comparar la superficie de dos rectangulos. La opcion candidata funciona porque la zona A tiene area 4 * 3 = 12 m2, mientras que la zona B tiene area 5 * 2 = 10 m2; por eso la zona A tiene mayor superficie. Las otras opciones pueden aparecer si se elige el lado mas largo, si se asume igualdad sin calcular, o si se confunde superficie con perimetro. Esta respuesta puede sugerir revisar comparacion de areas rectangulares.',
        },
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta pagina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma pagina.',
  },

  'PAES M1 \u2014 Problemas con ecuaciones lineales': {
    contentKey: 'paes_m1_linear_equations_word_problems',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Problemas con ecuaciones lineales',
    program: 'PAES_M1',
    topic: 'Ecuaciones lineales (problemas)',
    estimatedMinutes: '25\u201335 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales, ' +
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_word_problems_q1_brief_m1c03_v1',
          completeId: 'paes_m1_linear_equations_word_problems_q1_complete_m1c03_v1',
          version: 'm1-c03-authored-feedback-v1',
          brief:
            'Primero reparte el 2 en el parentesis o divide ambos lados por 2. Luego despeja x paso a paso.',
          complete:
            'La ecuacion es 2(x + 3) = 18. Puedes partir dividiendo ambos lados por 2: x + 3 = 9. Luego resta 3 en ambos lados: x = 6. Tambien puedes distribuir primero: 2x + 6 = 18, despues restar 6 para obtener 2x = 12 y dividir por 2. En ambos caminos, x = 6.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_word_problems_q2_brief_m1c03_v1',
          completeId: 'paes_m1_linear_equations_word_problems_q2_complete_m1c03_v1',
          version: 'm1-c03-authored-feedback-v1',
          brief:
            'Junta los terminos con x en un lado y los numeros en el otro. Mantener el orden de los signos es clave.',
          complete:
            'La ecuacion es 4x - 5 = 2x + 11. Resta 2x en ambos lados para juntar las x: 2x - 5 = 11. Luego suma 5 en ambos lados: 2x = 16. Finalmente divide por 2: x = 8. La alternativa correcta es 8.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_word_problems_q3_brief_m1c03_v1',
          completeId: 'paes_m1_linear_equations_word_problems_q3_complete_m1c03_v1',
          version: 'm1-c03-authored-feedback-v1',
          brief:
            'Primero elimina el +7. Despues recuerda que x/2 significa que x esta dividido por 2.',
          complete:
            'La ecuacion es (x/2) + 7 = 15. Resta 7 en ambos lados: x/2 = 8. Para deshacer la division por 2, multiplica ambos lados por 2: x = 16. La alternativa correcta es 16. Un error comun es detenerse en 8, pero 8 es el valor de x/2, no de x.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_word_problems_q4_brief_m1c03_v1',
          completeId: 'paes_m1_linear_equations_word_problems_q4_complete_m1c03_v1',
          version: 'm1-c03-authored-feedback-v1',
          brief:
            'Ordena la ecuacion antes de despejar: distribuye el 3 o elimina primero el +6 y luego divide.',
          complete:
            'La ecuacion es 3(x - 4) + 6 = 24. Una forma directa es restar 6 en ambos lados: 3(x - 4) = 18. Luego divide por 3: x - 4 = 6. Finalmente suma 4: x = 10. Si distribuyes, obtienes 3x - 12 + 6 = 24, es decir 3x - 6 = 24; al sumar 6 y dividir por 3 tambien llegas a x = 10.',
        },
      },
    ],
    currentLimitationNotice:
      'Puedes seleccionar tus respuestas y enviarlas desde esta p\u00e1gina. ' +
      'Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'AS1',
      sliceName: 'AS1 algebra/functions - initial corridor',
      axis: 'algebra_functions',
      roadmapNodes: ['internal:as1_linear_equations_word_problems', 'internal:as1_context_to_equation'],
      officialSkillRefs: ['internal:modelar', 'internal:resolver_problemas', 'internal:representar'],
      difficultyBand: 'transition',
      primaryPurpose: 'bridge',
      evidenceType: 'mc_submission',
      estimatedMinutes: 30,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },

  'PAES M1 \u2014 Refuerzo de ecuaciones lineales': {
    contentKey: 'paes_m1_linear_equations_reinforcement',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Refuerzo de ecuaciones lineales',
    program: 'PAES_M1',
    topic: 'Ecuaciones lineales (refuerzo)',
    estimatedMinutes: '20\u201330 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opci\u00f3n m\u00faltiple sobre ecuaciones lineales.\n\n' +
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_reinforcement_q1_brief_m1c04_v1',
          completeId: 'paes_m1_linear_equations_reinforcement_q1_complete_m1c04_v1',
          version: 'm1-c04-refuerzo-authored-feedback-v1',
          brief:
            'Primero elimina el -7 sumando 7 a ambos lados. Despues divide por 4 y verifica el resultado.',
          complete:
            'La ecuacion es 4x - 7 = 21. Paso 1: suma 7 a ambos lados para deshacer la resta: 4x = 28. Paso 2: divide ambos lados por 4: x = 7. Paso 3: verifica reemplazando: 4 * 7 - 7 = 28 - 7 = 21. Por eso la alternativa correcta es x = 7.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_reinforcement_q2_brief_m1c04_v1',
          completeId: 'paes_m1_linear_equations_reinforcement_q2_complete_m1c04_v1',
          version: 'm1-c04-refuerzo-authored-feedback-v1',
          brief:
            'Puedes partir dividiendo por 3 para simplificar el parentesis. Luego resta 2 para despejar x.',
          complete:
            'La ecuacion es 3(x + 2) = 24. Paso 1: divide ambos lados por 3: x + 2 = 8. Paso 2: resta 2 a ambos lados: x = 6. Paso 3: verifica reemplazando: 3(6 + 2) = 3 * 8 = 24. Por eso la alternativa correcta es x = 6.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_reinforcement_q3_brief_m1c04_v1',
          completeId: 'paes_m1_linear_equations_reinforcement_q3_complete_m1c04_v1',
          version: 'm1-c04-refuerzo-authored-feedback-v1',
          brief:
            'Primero resta 4 para aislar x/5. Luego multiplica por 5 para encontrar x.',
          complete:
            'La ecuacion es x/5 + 4 = 9. Paso 1: resta 4 a ambos lados: x/5 = 5. Paso 2: multiplica ambos lados por 5 para deshacer la division: x = 25. Paso 3: verifica reemplazando: 25/5 + 4 = 5 + 4 = 9. Por eso la alternativa correcta es x = 25.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_equations_reinforcement_q4_brief_m1c04_v1',
          completeId: 'paes_m1_linear_equations_reinforcement_q4_complete_m1c04_v1',
          version: 'm1-c04-refuerzo-authored-feedback-v1',
          brief:
            'Junta las x en un lado y los numeros en el otro. Despues comprueba reemplazando el valor.',
          complete:
            'La ecuacion es 2x + 9 = x + 17. Paso 1: resta x a ambos lados para juntar las variables: x + 9 = 17. Paso 2: resta 9 a ambos lados: x = 8. Paso 3: verifica reemplazando: 2 * 8 + 9 = 25 y 8 + 17 = 25. Ambos lados coinciden, por eso la alternativa correcta es x = 8.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni retroalimentaci\u00f3n autom\u00e1tica en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'AS1',
      sliceName: 'AS1 algebra/functions - initial corridor',
      axis: 'algebra_functions',
      roadmapNodes: ['internal:as1_linear_equations_reinforcement', 'internal:as1_equation_mechanics'],
      officialSkillRefs: ['internal:resolver_problemas', 'internal:representar'],
      difficultyBand: 'reinforcement',
      primaryPurpose: 'reinforce',
      evidenceType: 'mc_submission',
      estimatedMinutes: 25,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },

  'PAES M1 \u2014 Funciones lineales b\u00e1sicas I': {
    contentKey: 'paes_m1_linear_functions_basic',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Funciones lineales b\u00e1sicas I',
    program: 'PAES_M1',
    topic: 'Funciones lineales (inicio)',
    estimatedMinutes: '10\u201315 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opci\u00f3n m\u00faltiple sobre funciones lineales b\u00e1sicas.\n\n' +
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q1_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q1_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Reemplaza x por 4 en la regla de la funcion y calcula en orden: primero 2 * 4 y luego suma 3.',
          complete:
            'La funcion es f(x) = 2x + 3 y se pide f(4). Paso 1: identifica que el valor de entrada es x = 4. Paso 2: reemplaza x por 4 en la regla: f(4) = 2 * 4 + 3. Paso 3: calcula 2 * 4 = 8. Paso 4: suma 8 + 3 = 11. Por eso el valor de f(4) es 11.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q2_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q2_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Aqui f(x) ya vale 10. Escribe 3x - 5 = 10 y despeja x con operaciones inversas.',
          complete:
            'La regla es f(x) = 3x - 5 y el enunciado dice que f(x) = 10. Paso 1: iguala la expresion a 10: 3x - 5 = 10. Paso 2: suma 5 a ambos lados: 3x = 15. Paso 3: divide por 3: x = 5. Paso 4: comprueba reemplazando: 3 * 5 - 5 = 15 - 5 = 10. Por eso el valor de x es 5.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q3_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q3_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'La pendiente compara cuanto cambia y con cuanto cambia x entre los dos puntos.',
          complete:
            'Los puntos son (0, 2) y (3, 8). Paso 1: calcula el cambio en y: 8 - 2 = 6. Paso 2: calcula el cambio en x: 3 - 0 = 3. Paso 3: divide cambio en y por cambio en x: 6 / 3 = 2. Paso 4: interpreta que por cada 1 que aumenta x, y aumenta 2. Por eso la pendiente es 2.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q4_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q4_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'En la forma y = mx + b, el intercepto con el eje y es el numero constante b.',
          complete:
            'La funcion es y = -2x + 6. Paso 1: reconoce la forma y = mx + b. Paso 2: identifica que m es la pendiente, aqui -2. Paso 3: identifica que b es el termino constante, aqui 6. Paso 4: tambien puedes verificar con x = 0: y = -2 * 0 + 6 = 6. Por eso el intercepto con el eje y es 6.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni retroalimentaci\u00f3n autom\u00e1tica en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'AS1',
      sliceName: 'AS1 algebra/functions - initial corridor',
      axis: 'algebra_functions',
      roadmapNodes: ['internal:as1_linear_functions_basic', 'internal:as1_linear_representation'],
      officialSkillRefs: ['internal:representar', 'internal:resolver_problemas', 'internal:modelar'],
      difficultyBand: 'transition',
      primaryPurpose: 'bridge',
      evidenceType: 'mc_submission',
      estimatedMinutes: 12,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },

  'PAES M1 \u2014 Funciones lineales b\u00e1sicas II': {
    contentKey: 'paes_m1_linear_functions_basic_ii',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Funciones lineales b\u00e1sicas II',
    program: 'PAES_M1',
    topic: 'Funciones lineales (representaci\u00f3n y modelamiento)',
    estimatedMinutes: '10\u201315 minutos',
    instructions:
      'Esta actividad tiene 4 ejercicios de opci\u00f3n m\u00faltiple sobre funciones lineales b\u00e1sicas.\n\n' +
      '1. Trabaja en tu cuaderno o en una hoja de papel.\n' +
      '2. Identifica pendiente, intercepto o regla de la funci\u00f3n cuando corresponda.\n' +
      '3. Relaciona cada modelo lineal con la situaci\u00f3n o tabla presentada.\n' +
      '4. Selecciona la alternativa que corresponde.\n' +
      '5. Presiona \u201cEnviar respuestas\u201d.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n' +
      '7. No necesitas volver a /now para cerrar la actividad.\n\n' +
      'No hay presi\u00f3n por la perfecci\u00f3n. Lo importante es interpretar con orden la relaci\u00f3n entre variables.',
    items: [
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q5_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q5_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Busca una funcion donde el numero que multiplica a x sea 4 y el termino constante sea -1.',
          complete:
            'Se pide pendiente 4 e intercepto -1. Paso 1: usa la forma y = mx + b, donde m es la pendiente y b es el intercepto. Paso 2: reemplaza m por 4 y b por -1. Paso 3: la regla queda y = 4x - 1. Paso 4: revisa las opciones y confirma que solo esa tiene coeficiente 4 en x y constante -1. Por eso la funcion correcta es y = 4x - 1.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q6_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q6_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Separa el cobro fijo del cobro que depende de las horas: fijo 1000 y variable 500h.',
          complete:
            'El servicio cobra 1000 fijos mas 500 por cada hora h. Paso 1: el cobro fijo se suma una sola vez, por eso aparece como 1000. Paso 2: el cobro por hora depende de h, por eso es 500h. Paso 3: suma ambas partes para representar el costo total: C(h) = 1000 + 500h. Paso 4: verifica con 0 horas: el costo seria 1000, que coincide con el cobro fijo. Por eso la funcion correcta es C(h) = 1000 + 500h.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q7_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q7_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Reemplaza x por 3 y cuida el signo negativo: -x significa el opuesto del valor de x.',
          complete:
            'La funcion es f(x) = -x + 9 y se pide f(3). Paso 1: identifica que el valor de entrada es x = 3. Paso 2: reemplaza x por 3: f(3) = -3 + 9. Paso 3: calcula -3 + 9 = 6. Paso 4: interpreta que ese resultado es la salida de la funcion para x = 3. Por eso f(3) = 6.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_linear_functions_basic_q8_brief_m1c05_v1',
          completeId: 'paes_m1_linear_functions_basic_q8_complete_m1c05_v1',
          version: 'm1-c05-funciones-lineales-authored-feedback-v1',
          brief:
            'Mira el cambio en y cuando x aumenta de 1 en 1 y usa el valor inicial cuando x = 0.',
          complete:
            'La tabla muestra x = 0, 1, 2 y y = 1, 4, 7. Paso 1: observa que cuando x aumenta de 0 a 1, y aumenta de 1 a 4; el cambio es 3. Paso 2: de 1 a 2, y aumenta de 4 a 7; el cambio tambien es 3, entonces la pendiente es 3. Paso 3: cuando x = 0, y = 1, entonces el intercepto es 1. Paso 4: combina pendiente e intercepto: y = 3x + 1. Paso 5: verifica con x = 2: 3 * 2 + 1 = 7. Por eso la regla es y = 3x + 1.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni retroalimentaci\u00f3n autom\u00e1tica en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'AS1',
      sliceName: 'AS1 algebra/functions - initial corridor',
      axis: 'algebra_functions',
      roadmapNodes: ['internal:as1_linear_functions_basic', 'internal:as1_linear_representation'],
      officialSkillRefs: ['internal:representar', 'internal:resolver_problemas', 'internal:modelar'],
      difficultyBand: 'transition',
      primaryPurpose: 'bridge',
      evidenceType: 'mc_submission',
      estimatedMinutes: 12,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
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
        authoredFeedback: {
          briefId: 'paes_m1_balanced_entry_initial_q1_brief_m1c01_v1',
          completeId: 'paes_m1_balanced_entry_initial_q1_complete_m1c01_v1',
          version: 'm1-c01-balanced-entry-authored-feedback-v1',
          brief:
            'El foco es calcular el descuento, no el precio final. El 20% de 15.000 corresponde a 3.000.',
          complete:
            'El item pregunta cuanto dinero se descuenta en un producto de $15.000 con 20% de descuento. Paso 1: identifica que 20% equivale a 20/100 = 0,20. Paso 2: multiplica el precio por 0,20: 15.000 * 0,20 = 3.000. Paso 3: compara con las alternativas y elige $3.000. Un error tipico es calcular el precio final despues del descuento o mover mal el porcentaje.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_balanced_entry_initial_q2_brief_m1c01_v1',
          completeId: 'paes_m1_balanced_entry_initial_q2_complete_m1c01_v1',
          version: 'm1-c01-balanced-entry-authored-feedback-v1',
          brief:
            'Separa el cobro fijo del cobro por hora: 1.000 se suma una vez y 500 se multiplica por h.',
          complete:
            'El item pide representar el costo total de un arriendo con un cobro fijo y un cobro por hora. Paso 1: el cobro fijo de 1.000 se paga una sola vez, por eso aparece como 1000. Paso 2: el cobro de 500 depende de la cantidad de horas h, por eso se escribe 500h. Paso 3: suma ambas partes: 1000 + 500h. La alternativa correcta es B. Un error tipico es multiplicar tambien el cobro fijo por h o cambiar el orden de fijo y variable.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_balanced_entry_initial_q3_brief_m1c01_v1',
          completeId: 'paes_m1_balanced_entry_initial_q3_complete_m1c01_v1',
          version: 'm1-c01-balanced-entry-authored-feedback-v1',
          brief:
            'Para el area de un rectangulo, multiplica largo por ancho: 8 * 5 = 40.',
          complete:
            'El item pregunta por el area de un terreno rectangular. Paso 1: identifica las medidas relevantes: largo 8 metros y ancho 5 metros. Paso 2: usa la regla de area de un rectangulo: largo * ancho. Paso 3: calcula 8 * 5 = 40. Paso 4: como las unidades son metros por metros, el resultado es 40 m2. La alternativa correcta es C. Un error tipico es sumar 8 + 5 o calcular perimetro en vez de superficie.',
        },
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
        authoredFeedback: {
          briefId: 'paes_m1_balanced_entry_initial_q4_brief_m1c01_v1',
          completeId: 'paes_m1_balanced_entry_initial_q4_complete_m1c01_v1',
          version: 'm1-c01-balanced-entry-authored-feedback-v1',
          brief:
            'La probabilidad se calcula como casos favorables sobre casos totales: hay 2 azules de 5 bolitas.',
          complete:
            'El item pide la probabilidad de sacar una bolita azul. Paso 1: identifica los casos favorables: hay 2 bolitas azules. Paso 2: identifica el total de bolitas: 3 rojas + 2 azules = 5. Paso 3: escribe la probabilidad como favorables / total: 2/5. La alternativa correcta es B. Un error tipico es usar solo las bolitas rojas como total o comparar azul contra rojo en vez de azul contra todas las bolitas.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia inicial para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni diagn\u00f3stico autom\u00e1tico en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'BALANCED_ENTRY',
      sliceName: 'PAES M1 balanced entry signal',
      axis: 'balanced_entry',
      roadmapNodes: ['internal:balanced_entry_signal', 'internal:as1_entry'],
      officialSkillRefs: ['internal:resolver_problemas', 'internal:modelar', 'internal:representar'],
      difficultyBand: 'entry',
      primaryPurpose: 'diagnose',
      evidenceType: 'mc_submission',
      estimatedMinutes: 10,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },
  'PAES M1 \u2014 Lectura de tablas y gr\u00e1ficos I': {
    contentKey: 'paes_m1_data_representation_entry',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Lectura de tablas y gr\u00e1ficos I',
    program: 'PAES_M1',
    topic: 'Lectura de tablas y gr\u00e1ficos I',
    estimatedMinutes: '8\u201310 minutos',
    instructions:
      'Esta actividad tiene 4 preguntas de opci\u00f3n m\u00faltiple sobre lectura de tablas y gr\u00e1ficos simples.\n\n' +
      '1. Lee cada tabla o descripci\u00f3n con calma.\n' +
      '2. Busca el dato pedido antes de elegir una alternativa.\n' +
      '3. Si necesitas comparar datos, usa c\u00e1lculos breves y ordenados.\n' +
      '4. Selecciona una alternativa por pregunta.\n' +
      '5. Env\u00eda tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n\n' +
      'La idea es observar c\u00f3mo interpretas informaci\u00f3n presentada en tablas y gr\u00e1ficos simples.',
    items: [
      {
        key: 'q1',
        stem:
          'La tabla muestra libros leidos por curso.\n\n' +
          '\u00bfCuantos libros leyo 2 medio?',
        tableStimulus: {
          caption: 'Libros leidos por curso',
          headers: ['Curso', 'Libros leidos'],
          rows: [
            ['1 medio', '12'],
            ['2 medio', '15'],
            ['3 medio', '9'],
            ['4 medio', '14'],
          ],
        },
        options: [
          { label: 'A', text: '9' },
          { label: 'B', text: '12' },
          { label: 'C', text: '14' },
          { label: 'D', text: '15' },
        ],
        correctOptionKey: 'D',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q1_brief_m1c07_v1',
          completeId: 'paes_m1_data_representation_entry_q1_complete_m1c07_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Busca la fila o dato de 2 medio y lee su valor directamente: corresponde a 15 libros.',
          complete:
            'Se pide cuantos libros leyo 2 medio. Paso 1: identifica las categorias de la tabla: 1 medio, 2 medio, 3 medio y 4 medio. Paso 2: ubica la categoria 2 medio. Paso 3: lee el numero asociado a esa categoria: 15. Paso 4: compara con las alternativas y elige D. Un error tipico es responder otro curso cercano, como 1 medio o 4 medio, sin revisar la categoria pedida.',
        },
      },
      {
        key: 'q2',
        stem:
          'La tabla muestra asistentes a talleres.\n\n' +
          '\u00bfCuantos asistentes mas tuvo Ciencias que Musica?',
        tableStimulus: {
          caption: 'Asistentes a talleres',
          headers: ['Taller', 'Asistentes'],
          rows: [
            ['Arte', '18'],
            ['Ciencias', '24'],
            ['Musica', '16'],
          ],
        },
        options: [
          { label: 'A', text: '6' },
          { label: 'B', text: '8' },
          { label: 'C', text: '10' },
          { label: 'D', text: '40' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q2_brief_m1c07_v1',
          completeId: 'paes_m1_data_representation_entry_q2_complete_m1c07_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Compara Ciencias con Musica restando sus asistentes: 24 - 16 = 8.',
          complete:
            'Se pide cuantos asistentes mas tuvo Ciencias que Musica. Paso 1: lee el dato de Ciencias: 24. Paso 2: lee el dato de Musica: 16. Paso 3: como la pregunta dice cuantos mas, calcula la diferencia: 24 - 16 = 8. Paso 4: la alternativa que muestra 8 es B. Un cuidado importante es no sumar 24 + 16, porque eso daria el total entre ambos talleres, no la diferencia.',
        },
      },
      {
        key: 'q3',
        stem:
          'La tabla muestra ventas por dia.\n\n' +
          '\u00bfQue dia tuvo la mayor venta?',
        tableStimulus: {
          caption: 'Ventas por dia',
          headers: ['Dia', 'Ventas'],
          rows: [
            ['Lunes', '20'],
            ['Martes', '18'],
            ['Miercoles', '25'],
            ['Jueves', '21'],
          ],
        },
        options: [
          { label: 'A', text: 'Lunes' },
          { label: 'B', text: 'Martes' },
          { label: 'C', text: 'Mi\u00e9rcoles' },
          { label: 'D', text: 'Jueves' },
        ],
        correctOptionKey: 'C',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q3_brief_m1c07_v1',
          completeId: 'paes_m1_data_representation_entry_q3_complete_m1c07_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Busca el mayor numero de ventas en la tabla: 25 corresponde a miercoles.',
          complete:
            'Se pide identificar el dia con mayor venta. Paso 1: lee los valores: lunes 20, martes 18, miercoles 25 y jueves 21. Paso 2: compara los cuatro numeros. Paso 3: el mayor valor es 25. Paso 4: ese valor corresponde a miercoles, por eso la alternativa correcta es C. Un error tipico es elegir el ultimo dia de la lista o un dia cercano sin verificar cual numero es mayor.',
        },
      },
      {
        key: 'q4',
        stem:
          'Un grafico de barras describe visitas a una biblioteca. Los datos del grafico son:\n\n' +
          '\u00bfQue tendencia muestran las visitas?',
        tableStimulus: {
          caption: 'Datos del grafico de barras',
          headers: ['Mes', 'Visitas'],
          rows: [
            ['Marzo', '30'],
            ['Abril', '36'],
            ['Mayo', '42'],
          ],
        },
        options: [
          { label: 'A', text: 'Aumentan mes a mes' },
          { label: 'B', text: 'Disminuyen mes a mes' },
          { label: 'C', text: 'Se mantienen iguales' },
          { label: 'D', text: 'Primero bajan y luego suben' },
        ],
        correctOptionKey: 'A',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q4_brief_m1c07_v1',
          completeId: 'paes_m1_data_representation_entry_q4_complete_m1c07_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Observa los valores en orden: 30, 36 y 42. Como suben cada mes, la tendencia aumenta.',
          complete:
            'Se pide describir la tendencia de las visitas. Paso 1: ordena los meses como aparecen: marzo, abril y mayo. Paso 2: lee sus valores: 30, 36 y 42. Paso 3: compara mes a mes: de 30 a 36 aumenta, y de 36 a 42 tambien aumenta. Paso 4: la descripcion correcta es que aumentan mes a mes, alternativa A. Un cuidado importante es mirar el orden temporal, no solo los numeros aislados.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni diagn\u00f3stico autom\u00e1tico en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'PE1',
      sliceName: 'PE1 data and probability entry',
      axis: 'data_probability',
      roadmapNodes: [
        'internal:pe1_data_representation_entry',
        'internal:pe1_tables_and_graphs_reading',
      ],
      officialSkillRefs: [
        'internal:interpretar_representaciones',
        'internal:leer_tablas_y_graficos',
      ],
      difficultyBand: 'entry',
      primaryPurpose: 'bridge',
      evidenceType: 'mc_submission',
      estimatedMinutes: 8,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },
  'PAES M1 \u2014 Lectura de tablas y gr\u00e1ficos II': {
    contentKey: 'paes_m1_data_representation_entry_ii',
    contentVersion: 'v1',
    title: 'PAES M1 \u2014 Lectura de tablas y gr\u00e1ficos II',
    program: 'PAES_M1',
    topic: 'Lectura de tablas y gr\u00e1ficos II',
    estimatedMinutes: '8\u201310 minutos',
    instructions:
      'Esta actividad tiene 4 preguntas de opci\u00f3n m\u00faltiple sobre lectura de tablas y gr\u00e1ficos simples.\n\n' +
      '1. Lee cada tabla o descripci\u00f3n con calma.\n' +
      '2. Busca el dato pedido antes de elegir una alternativa.\n' +
      '3. Si necesitas sumar o promediar, usa c\u00e1lculos breves y ordenados.\n' +
      '4. Selecciona una alternativa por pregunta.\n' +
      '5. Env\u00eda tus respuestas.\n' +
      '6. Luego deja tu autorreporte y finaliza la actividad en esta misma p\u00e1gina.\n\n' +
      'La idea es observar c\u00f3mo interpretas informaci\u00f3n presentada en tablas y gr\u00e1ficos simples.',
    items: [
      {
        key: 'q5',
        stem:
          'La tabla muestra colaciones vendidas.\n\n' +
          '\u00bfCuantas colaciones se vendieron en total?',
        tableStimulus: {
          caption: 'Colaciones vendidas',
          headers: ['Colacion', 'Cantidad vendida'],
          rows: [
            ['Frutas', '10'],
            ['Yogures', '8'],
            ['Jugos', '12'],
          ],
        },
        options: [
          { label: 'A', text: '20' },
          { label: 'B', text: '28' },
          { label: 'C', text: '30' },
          { label: 'D', text: '32' },
        ],
        correctOptionKey: 'C',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q5_brief_m1c08_v1',
          completeId: 'paes_m1_data_representation_entry_q5_complete_m1c08_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Para el total, suma las tres categorias: 10 + 8 + 12 = 30.',
          complete:
            'Se pide cuantas colaciones se vendieron en total. Paso 1: identifica las cantidades de cada categoria: frutas 10, yogures 8 y jugos 12. Paso 2: como se pide total, suma todas las cantidades. Paso 3: calcula 10 + 8 + 12 = 30. Paso 4: la alternativa correcta es C. Un error tipico es sumar solo dos categorias o elegir el valor mayor, pero el total usa todos los datos.',
        },
      },
      {
        key: 'q6',
        stem:
          'La tabla muestra temperaturas de tres dias.\n\n' +
          '\u00bfCual es el promedio?',
        tableStimulus: {
          caption: 'Temperaturas de tres dias',
          headers: ['Dia', 'Temperatura (grados C)'],
          rows: [
            ['Lunes', '18'],
            ['Martes', '20'],
            ['Miercoles', '22'],
          ],
        },
        options: [
          { label: 'A', text: '18 \u00b0C' },
          { label: 'B', text: '20 \u00b0C' },
          { label: 'C', text: '21 \u00b0C' },
          { label: 'D', text: '22 \u00b0C' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q6_brief_m1c08_v1',
          completeId: 'paes_m1_data_representation_entry_q6_complete_m1c08_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Suma las tres temperaturas y divide por 3: (18 + 20 + 22) / 3 = 20.',
          complete:
            'Se pide el promedio de tres temperaturas. Paso 1: lee los valores: 18, 20 y 22 grados. Paso 2: suma los valores: 18 + 20 + 22 = 60. Paso 3: divide por la cantidad de datos, que es 3: 60 / 3 = 20. Paso 4: el promedio es 20 grados, alternativa B. Un cuidado importante es dividir por 3 datos, no por 2 ni elegir simplemente el valor del medio sin comprobar.',
        },
      },
      {
        key: 'q7',
        stem:
          'La tabla muestra estudiantes que prefieren actividades.\n\n' +
          '\u00bfQue conclusion esta apoyada por la tabla?',
        tableStimulus: {
          caption: 'Preferencias de actividades',
          headers: ['Actividad', 'Estudiantes'],
          rows: [
            ['Deporte', '14'],
            ['Lectura', '9'],
            ['Videojuegos', '11'],
          ],
        },
        options: [
          { label: 'A', text: 'La lectura es la actividad m\u00e1s preferida' },
          { label: 'B', text: 'El deporte es la actividad m\u00e1s preferida' },
          { label: 'C', text: 'Videojuegos y lectura tienen la misma preferencia' },
          { label: 'D', text: 'Ning\u00fan estudiante prefiere deporte' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q7_brief_m1c08_v1',
          completeId: 'paes_m1_data_representation_entry_q7_complete_m1c08_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'El deporte tiene la frecuencia mas alta: 14 supera a lectura 9 y videojuegos 11.',
          complete:
            'Se pide elegir una conclusion apoyada por la tabla. Paso 1: lee las preferencias: deporte 14, lectura 9 y videojuegos 11. Paso 2: compara las frecuencias. Paso 3: la mayor frecuencia es deporte con 14. Paso 4: por eso la conclusion respaldada es que el deporte es la actividad mas preferida, alternativa B. Un error tipico es elegir una afirmacion que suena posible pero no esta apoyada por los datos.',
        },
      },
      {
        key: 'q8',
        stem:
          'La tabla muestra colores elegidos por un grupo.\n\n' +
          '\u00bfQue colores tienen la misma frecuencia?',
        tableStimulus: {
          caption: 'Colores elegidos por un grupo',
          headers: ['Color', 'Frecuencia'],
          rows: [
            ['Azul', '7'],
            ['Verde', '5'],
            ['Rojo', '7'],
            ['Amarillo', '3'],
          ],
        },
        options: [
          { label: 'A', text: 'Azul y rojo' },
          { label: 'B', text: 'Verde y amarillo' },
          { label: 'C', text: 'Azul y verde' },
          { label: 'D', text: 'Rojo y amarillo' },
        ],
        correctOptionKey: 'A',
        authoredFeedback: {
          briefId: 'paes_m1_data_representation_entry_q8_brief_m1c08_v1',
          completeId: 'paes_m1_data_representation_entry_q8_complete_m1c08_v1',
          version: 'm1-c07-c08-lectura-tablas-graficos-authored-feedback-v1',
          brief:
            'Compara las frecuencias y busca las iguales: azul y rojo tienen 7.',
          complete:
            'Se pide identificar que colores tienen la misma frecuencia. Paso 1: lee cada dato: azul 7, verde 5, rojo 7 y amarillo 3. Paso 2: compara los numeros entre si. Paso 3: azul y rojo comparten la misma frecuencia, 7. Paso 4: la alternativa correcta es A. Un cuidado importante es no elegir colores cercanos en la lista; hay que verificar que sus valores sean exactamente iguales.',
        },
      },
    ],
    currentLimitationNotice:
      'Tus respuestas se guardan como evidencia para revisi\u00f3n. ' +
      'No recibir\u00e1s puntaje PAES ni diagn\u00f3stico autom\u00e1tico en esta versi\u00f3n.',
    pedagogicalMetadata: {
      programCode: 'PAES_M1',
      sliceId: 'PE1',
      sliceName: 'PE1 data and probability entry',
      axis: 'data_probability',
      roadmapNodes: [
        'internal:pe1_data_representation_entry',
        'internal:pe1_tables_and_graphs_reading',
      ],
      officialSkillRefs: [
        'internal:interpretar_representaciones',
        'internal:leer_tablas_y_graficos',
      ],
      difficultyBand: 'entry',
      primaryPurpose: 'bridge',
      evidenceType: 'mc_submission',
      estimatedMinutes: 12,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
  },
  'PAES L1 - Localizacion de informacion - Piloto interno 01': {
    contentKey: 'l1_locating_information_pilot_set_01',
    contentVersion: 'internal-v0.1',
    contentType: 'reading_l1_locating_information',
    title: 'PAES L1 - Localizacion de informacion - Piloto interno 01',
    program: 'PAES_L1',
    skillFamily: 'locating_information',
    topic: 'Competencia Lectora - localizacion de informacion',
    estimatedMinutes: '8-12 minutos',
    instructions:
      'Lee el texto y responde usando solo la informacion que aparece en el. ' +
      'Despues de enviar tus respuestas, revisa la retroalimentacion breve. ' +
      'La explicacion completa estara disponible si quieres verla.',
    readingText: {
      textId: 'original_l1_text_locating_information_01_draft',
      textVersion: 'draft-0.1',
      title: 'Taller de organizacion de materiales',
      body:
        'El taller de organizacion de materiales se realizara el martes en la sala norte del edificio comunitario ficticio. ' +
        'La actividad comenzara a las 16:00 y terminara a las 17:30. ' +
        'Al llegar, cada participante debera dejar su mochila en la mesa azul y retirar una tarjeta con su nombre. ' +
        'Luego, el grupo separara cuadernos, lapices y carpetas en tres cajas distintas. ' +
        'La caja verde sera para los cuadernos en buen estado, la caja blanca para los lapices que aun escriben y la caja gris para las carpetas que puedan reutilizarse. ' +
        'La coordinadora del taller revisara las cajas al final de la jornada. ' +
        'Si sobran materiales, se guardaran en el armario pequeno que esta junto a la ventana. ' +
        'La actividad se suspendera solo si la sala no esta disponible antes de las 15:30.',
      sourceClass: 'original_bexauri_created_candidate',
      rightsBasis: 'original_bexauri_created',
      officialSourceDependency: 'none',
      copyrightedSourceDependency: 'none',
      reviewStatus: 'reviewed_for_internal_pilot',
    },
    items: [
      {
        key: 'l1_locating_information_item_01',
        basedOnTextId: 'original_l1_text_locating_information_01_draft',
        stem: 'A que hora comenzara la actividad?',
        options: [
          { label: 'A', text: 'A las 15:30.' },
          { label: 'B', text: 'A las 16:00.' },
          { label: 'C', text: 'A las 17:30.' },
          { label: 'D', text: 'El martes, sin hora indicada.' },
        ],
        correctOptionKey: 'B',
        authoredFeedback: {
          briefId: 'l1_locating_information_item_01_feedback_breve',
          completeId: 'l1_locating_information_item_01_feedback_completo',
          version: 'reviewed-v0.1',
          brief:
            'Respuesta correcta: la actividad comienza a las 16:00. Ese dato corresponde a la hora de inicio, no a una condicion ni a la hora de termino.',
          complete:
            'La opcion B esta apoyada por el dato explicito de inicio: la actividad comienza a las 16:00. La opcion A no corresponde porque 15:30 es la hora usada para la condicion de suspension. La opcion C no corresponde porque 17:30 es la hora de termino. La opcion D no responde la pregunta, porque menciona el dia pero no la hora de inicio.',
        },
      },
      {
        key: 'l1_locating_information_item_02_revised',
        basedOnTextId: 'original_l1_text_locating_information_01_draft',
        stem: 'Que debe retirar cada participante al llegar?',
        options: [
          { label: 'A', text: 'Una tarjeta con su nombre.' },
          { label: 'B', text: 'Un cuaderno en buen estado.' },
          { label: 'C', text: 'Una caja verde.' },
          { label: 'D', text: 'Una carpeta reutilizable.' },
        ],
        correctOptionKey: 'A',
        authoredFeedback: {
          briefId: 'l1_locating_information_item_02_revised_feedback_breve',
          completeId: 'l1_locating_information_item_02_revised_feedback_completo',
          version: 'reviewed-v0.1',
          brief:
            'Respuesta correcta: cada participante debe retirar una tarjeta con su nombre al llegar. Las otras opciones nombran materiales o cajas de una accion posterior.',
          complete:
            'La opcion A esta apoyada por la instruccion de llegada: cada participante debe retirar una tarjeta con su nombre. La opcion B no corresponde porque el cuaderno en buen estado es un material que se clasifica despues. La opcion C no corresponde porque la caja verde es un contenedor para cuadernos. La opcion D no corresponde porque la carpeta reutilizable es otro material que se separa despues.',
        },
      },
      {
        key: 'l1_locating_information_item_03',
        basedOnTextId: 'original_l1_text_locating_information_01_draft',
        stem: 'Donde se guardaran los materiales si sobran?',
        options: [
          { label: 'A', text: 'En la caja verde.' },
          { label: 'B', text: 'En la mesa azul.' },
          { label: 'C', text: 'En el armario pequeno que esta junto a la ventana.' },
          { label: 'D', text: 'En la sala norte del edificio comunitario ficticio.' },
        ],
        correctOptionKey: 'C',
        authoredFeedback: {
          briefId: 'l1_locating_information_item_03_feedback_breve',
          completeId: 'l1_locating_information_item_03_feedback_completo',
          version: 'reviewed-v0.1',
          brief:
            'Respuesta correcta: los materiales sobrantes se guardaran en el armario pequeno junto a la ventana. Esa es la ubicacion indicada para los sobrantes.',
          complete:
            'La opcion C esta apoyada por el dato explicito sobre los materiales que sobran: se guardan en el armario pequeno junto a la ventana. La opcion A no corresponde porque la caja verde se usa para cuadernos en buen estado. La opcion B no corresponde porque la mesa azul es para dejar mochilas al llegar. La opcion D no corresponde porque la sala norte es el lugar de la actividad, no el lugar de almacenamiento de sobrantes.',
        },
      },
    ],
    currentLimitationNotice:
      'Actividad interna de lectura. Tus respuestas se guardan como evidencia de esta actividad. ' +
      'No recibiras puntaje PAES, diagnostico automatico ni declaracion de dominio.',
    pedagogicalMetadata: {
      programCode: 'PAES_L1',
      sliceId: 'L1_LOCATING_INFORMATION_01',
      sliceName: 'PAES L1 locating information internal pilot',
      axis: 'competencia_lectora',
      roadmapNodes: ['internal:l1_locating_information_pilot_set_01'],
      officialSkillRefs: ['internal:locating_information'],
      difficultyBand: 'low_moderate',
      primaryPurpose: 'practice',
      evidenceType: 'mc_submission',
      estimatedMinutes: 10,
      reviewStatus: 'internal_provisional',
      expertReviewed: false,
      routingStatus: 'available_not_universal',
    },
    approvalMetadata: {
      registryScope: 'internal_pilot_candidate_only',
      studentUseApproved: false,
      productUseApproved: false,
      salesReadyImplication: 'none',
      continuityPolicy: 'no_automatic_next_l1_studyload_without_second_reviewed_registry_ready_set',
    },
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
