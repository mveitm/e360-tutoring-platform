'use client'

/**
 * Phase EG — Minimal admin-only attention-signal presentation.
 *
 * Two tiny, read-only renderers that consume the mapping in
 * `lib/admin/attention-signal.ts`:
 *   - AttentionSignalLine (detail header use; verbatim advisory note)
 *   - AttentionSignalCell (enrollments list use; compact single-line)
 *
 * Advisory only. Not a workflow decision. Not a blocking condition.
 * Not a write authorization. Not a source-of-truth resolution. Not a
 * materializer-of-record change. No buttons, no menus, no tooltips,
 * no filters, no modals, no dialogs, no banners.
 */

import {
  mapPostureToAttentionSignal,
  ATTENTION_SIGNAL_LABELS,
  type AttentionSignal,
} from '@/lib/admin/attention-signal'
import { cn } from '@/lib/utils'

const SIGNAL_CLASSES: Record<AttentionSignal, string> = {
  attention_required: 'text-amber-700',
  monitor: 'text-blue-700',
  stable: 'text-emerald-700',
  no_governance_record: 'text-muted-foreground',
}

interface AttentionSignalLineProps {
  posture: string | null | undefined
}

export function AttentionSignalLine({ posture }: AttentionSignalLineProps) {
  const signal = mapPostureToAttentionSignal(posture)
  const label = ATTENTION_SIGNAL_LABELS[signal]
  return (
    <div className="text-sm">
      <p className={cn('font-medium', SIGNAL_CLASSES[signal])}>{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Advisory only. Does not block workflow.
      </p>
    </div>
  )
}

interface AttentionSignalCellProps {
  posture: string | null | undefined
}

export function AttentionSignalCell({ posture }: AttentionSignalCellProps) {
  const signal = mapPostureToAttentionSignal(posture)
  const label = ATTENTION_SIGNAL_LABELS[signal]
  return (
    <span className={cn('text-xs font-medium', SIGNAL_CLASSES[signal])}>
      {label}
    </span>
  )
}
