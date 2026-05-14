import type { StudyLoadContent } from '@/lib/study-load-content'
import {
  describePedagogicalEvidenceForContent,
  getPedagogicalMetadataForContent,
} from '@/lib/study-load-pedagogy'

export type NextLoadDecisionTypeV0 =
  | 'advance'
  | 'reinforce'
  | 'bridge'
  | 'validate'
  | 'hold'
  | 'redirect'
  | 'spiral'
  | 'cycle_milestone'
  | 'async_review_request'

export type NextLoadDecisionRecordV0 = Readonly<{
  decisionType: NextLoadDecisionTypeV0
  fromContentKey: string
  fromContentVersion: string
  fromTitle: string
  toContentKey: string | null
  toContentVersion: string | null
  toTitle: string | null
  basis: string[]
  source: 'existing_rule_based_continuity'
  confidence: 'operational_rule'
  metadataStatus: 'metadata_present' | 'metadata_missing'
  reviewStatus: string | null
  expertReviewed: boolean | null
  limitations: string[]
}>

export function createNextLoadDecisionRecordV0(args: {
  fromContent: StudyLoadContent
  toContent?: StudyLoadContent | null
}): NextLoadDecisionRecordV0 {
  return describeExistingContinuityDecisionV0(args.fromContent, args.toContent ?? null)
}

export function describeExistingContinuityDecisionV0(
  fromContent: StudyLoadContent,
  toContent: StudyLoadContent | null,
): NextLoadDecisionRecordV0 {
  const fromEvidence = describePedagogicalEvidenceForContent(fromContent)
  const toMetadata = getPedagogicalMetadataForContent(toContent)
  const metadataStatus =
    fromEvidence.reviewStatus && (!toContent || toMetadata)
      ? 'metadata_present'
      : 'metadata_missing'

  return {
    decisionType: getDecisionTypeForExistingContinuity(toContent),
    fromContentKey: fromContent.contentKey,
    fromContentVersion: fromContent.contentVersion,
    fromTitle: fromContent.title,
    toContentKey: toContent?.contentKey ?? null,
    toContentVersion: toContent?.contentVersion ?? null,
    toTitle: toContent?.title ?? null,
    basis: buildExistingContinuityBasis(fromContent, toContent),
    source: 'existing_rule_based_continuity',
    confidence: 'operational_rule',
    metadataStatus,
    reviewStatus: fromEvidence.reviewStatus,
    expertReviewed: fromEvidence.expertReviewed,
    limitations: [
      'internal_provisional_metadata',
      'not_a_paes_score',
      'no_theta_mastery_or_adaptive_ai_claim',
      'does_not_change_existing_continuity_selection',
    ],
  }
}

function getDecisionTypeForExistingContinuity(
  toContent: StudyLoadContent | null,
): NextLoadDecisionTypeV0 {
  const toMetadata = getPedagogicalMetadataForContent(toContent)

  if (!toContent) {
    return 'hold'
  }

  if (toMetadata?.primaryPurpose === 'reinforce') {
    return 'reinforce'
  }

  if (toMetadata?.primaryPurpose === 'bridge') {
    return 'bridge'
  }

  if (toMetadata?.primaryPurpose === 'validate') {
    return 'validate'
  }

  return 'advance'
}

function buildExistingContinuityBasis(
  fromContent: StudyLoadContent,
  toContent: StudyLoadContent | null,
): string[] {
  const basis = [
    'existing_rule_based_content_key_continuity',
    `from_content_key:${fromContent.contentKey}`,
  ]

  if (!toContent) {
    return [...basis, 'no_next_content_key_available']
  }

  return [
    ...basis,
    `to_content_key:${toContent.contentKey}`,
    'metadata_read_only_context',
  ]
}
