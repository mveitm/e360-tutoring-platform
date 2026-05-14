import {
  getStudyLoadContent,
  type StudyLoadContent,
  type StudyLoadPedagogicalMetadata,
} from '@/lib/study-load-content'

export type StudyLoadPedagogicalEvidenceDescription = Readonly<{
  contentKey: string
  contentVersion: string
  title: string
  programCode: 'PAES_M1' | null
  sliceId: string | null
  axis: string | null
  primaryPurpose: string | null
  evidenceType: string | null
  reviewStatus: string | null
  expertReviewed: boolean | null
  routingStatus: string | null
  limitations: readonly string[]
}>

export function getPedagogicalMetadataForContent(
  content: StudyLoadContent | null | undefined,
): StudyLoadPedagogicalMetadata | null {
  return content?.pedagogicalMetadata ?? null
}

export function getPedagogicalMetadataByTitle(
  title: string,
  contentKey?: string,
  contentVersion?: string,
): StudyLoadPedagogicalMetadata | null {
  const content = getStudyLoadContent(title)

  if (!content) {
    return null
  }

  if (contentKey !== undefined && content.contentKey !== contentKey) {
    return null
  }

  if (contentVersion !== undefined && content.contentVersion !== contentVersion) {
    return null
  }

  return getPedagogicalMetadataForContent(content)
}

export function describePedagogicalEvidenceForContent(
  content: StudyLoadContent,
): StudyLoadPedagogicalEvidenceDescription {
  const metadata = getPedagogicalMetadataForContent(content)

  if (!metadata) {
    return {
      contentKey: content.contentKey,
      contentVersion: content.contentVersion,
      title: content.title,
      programCode: null,
      sliceId: null,
      axis: null,
      primaryPurpose: null,
      evidenceType: null,
      reviewStatus: null,
      expertReviewed: null,
      routingStatus: null,
      limitations: [
        'pedagogical_metadata_missing',
        'not_for_routing',
        'no_paes_score_theta_mastery_or_adaptive_ai_claim',
      ],
    }
  }

  return {
    contentKey: content.contentKey,
    contentVersion: content.contentVersion,
    title: content.title,
    programCode: metadata.programCode,
    sliceId: metadata.sliceId,
    axis: metadata.axis,
    primaryPurpose: metadata.primaryPurpose,
    evidenceType: metadata.evidenceType,
    reviewStatus: metadata.reviewStatus,
    expertReviewed: metadata.expertReviewed,
    routingStatus: metadata.routingStatus,
    limitations: [
      'internal_provisional_metadata',
      'expert_review_pending',
      'not_for_routing',
      'no_paes_score_theta_mastery_or_adaptive_ai_claim',
    ],
  }
}
