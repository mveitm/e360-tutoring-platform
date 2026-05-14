import type { Prisma } from '@prisma/client'
import {
  getStudyLoadContent,
  getStudyLoadContentByKey,
} from '@/lib/study-load-content'

const NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY: Record<string, Record<string, string>> = {
  PAES_M1: {
    paes_m1_balanced_entry_initial: 'paes_m1_linear_equations_basic',
    paes_m1_linear_equations_basic: 'paes_m1_linear_equations_word_problems',
    paes_m1_linear_equations_word_problems: 'paes_m1_linear_equations_reinforcement',
    paes_m1_linear_equations_reinforcement: 'paes_m1_linear_functions_basic',
    // Rule-based bridge v0: PE1 is available_not_universal after the current
    // AS1 endpoint. This is not adaptive AI and makes no score/theta/mastery
    // or diagnosis claim.
    paes_m1_linear_functions_basic: 'paes_m1_data_representation_entry',
  },
}

export type NextStudyLoadContinuityOutcome =
  | { status: 'created'; studyLoadId: string; contentKey: string }
  | { status: 'skipped_existing'; studyLoadId: string; contentKey: string }
  | { status: 'not_content_backed' }
  | { status: 'end_of_sequence'; contentKey: string }
  | { status: 'missing_content'; contentKey: string }
  | { status: 'program_mismatch'; contentKey: string; expectedProgram: string; actualProgram: string }

export async function prepareNextStudyLoadAfterCompletion(args: {
  tx: Prisma.TransactionClient
  completedStudyLoadTitle: string
  learningCycleId: string
  programCode: string
}): Promise<NextStudyLoadContinuityOutcome> {
  const currentContent = getStudyLoadContent(args.completedStudyLoadTitle)
  if (!currentContent) {
    return { status: 'not_content_backed' }
  }

  const nextContentKey =
    NEXT_STUDYLOAD_BY_PROGRAM_AND_CONTENT_KEY[args.programCode]?.[currentContent.contentKey]

  if (!nextContentKey) {
    return { status: 'end_of_sequence', contentKey: currentContent.contentKey }
  }

  const nextContent = getStudyLoadContentByKey(nextContentKey)
  if (!nextContent) {
    return { status: 'missing_content', contentKey: nextContentKey }
  }

  if (nextContent.program !== args.programCode) {
    return {
      status: 'program_mismatch',
      contentKey: nextContentKey,
      expectedProgram: args.programCode,
      actualProgram: nextContent.program,
    }
  }

  const existingNextLoad = await args.tx.studyLoad.findFirst({
    where: {
      learningCycleId: args.learningCycleId,
      title: nextContent.title,
      status: { in: ['pending', 'in_progress', 'completed'] },
    },
    select: { id: true },
  })

  if (existingNextLoad) {
    return {
      status: 'skipped_existing',
      studyLoadId: existingNextLoad.id,
      contentKey: nextContentKey,
    }
  }

  const nextLoad = await args.tx.studyLoad.create({
    data: {
      learningCycleId: args.learningCycleId,
      title: nextContent.title,
      loadType: 'practice',
      status: 'pending',
    },
    select: { id: true },
  })

  return {
    status: 'created',
    studyLoadId: nextLoad.id,
    contentKey: nextContentKey,
  }
}
